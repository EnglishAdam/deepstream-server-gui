<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">Deepstream Server GUI</div>
        <span class="grey--text">Connect below</span>
      </div>
    </v-card-title>
    <!-- Heading -->

    <v-divider />
    <!-- Horizontal Rule -->

    <v-card-text class="pa-0">
      <v-stepper class="elevation-0" v-model="step">
        <v-stepper-header class="elevation-0 grey lighten-3">
          <v-stepper-step step="1" :complete="isInit">
            Setup Connection
            <!-- <small>Optionally supply connection options</small> -->
          </v-stepper-step>

          <v-divider />

          <v-stepper-step step="2" :complete="step > 2">
            Login
            <!-- <small>Optionally supply authentication parameters</small> -->
          </v-stepper-step>
        </v-stepper-header>
        <!-- Stepper Header -->

        <v-divider />

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout row>
              <v-flex xs12>
                <v-form>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-layout row>
                        <v-flex xs2>
                          <v-select
                            v-model="selectedProtocol"
                            :items="PROTOCOL_LIST"
                            label="Protocol"
                          />
                        </v-flex>
                        <!-- Protocol Select -->

                        <v-flex xs12>
                          <v-text-field
                            v-model="wsUrl"
                            label="URL"
                            placeholder="127.0.0.1"
                          />
                        </v-flex>
                        <!-- Input for URL -->
                      </v-layout>
                    </v-flex>
                    <!-- Inputs for URL -->

                    <v-flex v-if="!showOptions" class="text-xs-right" xs12>
                      <v-btn flat small color="primary" @click="showOptions = true">
                        <v-icon small>add</v-icon> &nbsp; Customise Connection Options
                      </v-btn>
                    </v-flex>
                    <!-- Input for URL -->

                    <v-flex v-else xs12>
                      <v-textarea
                        v-model="optionsString"
                        box
                        label="Connection Options"
                        hint="Set the connection options"
                        auto-grow
                        :placeholder="JSON.stringify(DEFAULT_OPTIONS, null, 2)"
                        :error-messages="(optionsJSONParseError) ? ['Invalid JSON object'] : []"
                      />
                    </v-flex>
                    <!-- Input for URL -->

                    <v-flex v-if="showOptions" class="text-xs-right" xs12>
                      <v-btn small flat color="primary" @click="resetOptions">
                        <v-icon small>refresh</v-icon> &nbsp; Set Default
                      </v-btn>
                      <!-- Reset Defaults -->

                      <v-btn small flat color="primary" @click="showOptions = false">
                        <v-icon small>cancel</v-icon> &nbsp; Cancel
                      </v-btn>
                      <!-- Cancel Options -->
                    </v-flex>
                    <!-- Connection Options Fresh -->

                  </v-layout>
                </v-form>                 
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <!-- Init Form Step-->

          <v-stepper-content step="2">
            <v-layout row>
              <v-flex xs12>
                <v-form>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-textarea
                        v-model="authParams"
                        box
                        label="Authentication Options"
                        hint="Set the authentication options"
                        auto-grow
                        :placeholder="JSON.stringify(DEFAULT_AUTH_PARAMS, null, 2)"
                        :error-messages="(authsJSONParseError) ? ['Invalid JSON object'] : []"
                      />
                    </v-flex>
                    <!-- Input for URL -->

                    <v-flex class="text-xs-right" xs12>
                      <v-btn small flat color="primary" @click="resetAuthParams">
                        <v-icon small>refresh</v-icon> &nbsp; Set Default
                      </v-btn>
                      <!-- Reset Defaults -->
                    </v-flex>
                    <!-- Connection Options Fresh -->

                  </v-layout>
                </v-form>                 
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <!-- Init Step -->
        </v-stepper-items>
      </v-stepper>

      
    </v-card-text>
    <!-- Login Form -->

    <v-divider />

    <v-card-actions v-if="step === 1">
      <v-spacer />
      <v-btn color="primary" :disabled="optionsJSONParseError" :loading="isLoggingIn" @click="clientInit">Set Connection</v-btn>
      <!-- Options Buttons -->

    </v-card-actions>
    <!-- Form Actions -->

    <v-card-actions v-else-if="step === 2">
      <v-spacer />
      <v-btn flat :disabled="isLoggingIn" @click="clientCancel">
        <v-icon>keyboard_arrow_left</v-icon> &nbsp; Change Connection
      </v-btn>
      <v-btn color="primary" :disabled="authsJSONParseError" :loading="isLoggingIn" @click="clientLogin">Login</v-btn>
      <!-- Options Buttons -->

    </v-card-actions>
    <!-- Form Actions -->
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      showOptions: false, // Flag showing options
      step: 1, // Step value used by the stepper

      // WS Connection
      DEFAULT_WS_URL: 'localhost:8080', // Deepstream websockets url
      wsUrl: '', // Deepstream websockets url

      // Connection Options
      DEFAULT_OPTIONS: {
        mergeStrategy: 'MERGE_STRATEGIES.REMOTE_WINS',
        reconnectIntervalIncrement: 4000,
        maxReconnectInterval: 180000,
        maxReconnectAttempts: 5,
        rpcAckTimeout: 6000,
        rpcResponseTimeout: 10000,
        subscriptionTimeout: 2000,
        recordReadAckTimeout: 1000,
        recordReadTimeout: 3000,
        recordDeleteTimeout: 3000,
        maxMessagesPerPacket: 100,
        timeBetweenSendingQueuedPackages: 16,
        recordDeepCopy: true
      },
      optionsString: '', // Deepstream connection options

      // Protocol
      DEFAULT_PROTOCOL: 'ws://', // Default selected protocol
      PROTOCOL_LIST: ['ws://', 'wss://'], // Available protocols
      selectedProtocol: '', // Select protocol container

      // Authentication paramets
      DEFAULT_AUTH_PARAMS: {
        email: 'example@example.com',
        username: 'exampleName',
        password: '**********'
      },
      authParams: '',
      //
      authType: 'email', // Conection type
      authUsername: '', // Login username
      authPassword: '', // Login password

      // Errors
      optionsJSONParseError: false, // Flag indicating if there is an error parsing the options JSON
      authsJSONParseError: false // Flag indicating if there is an error parsing the auths object
    }
  },

  computed: {
    ...mapGetters({
      isInit: 'client/isInit',
      isLoggingIn: 'client/isLoggingIn',
      isLoggedIn: 'client/isLoggedIn'
    }),

    /**
     * Returns the selected url
     */
    url() {
      return this.selectedProtocol + this.wsUrl
    }
  },

  watch: {
    isInit(value) {
      if (value) this.step = 2
      else this.step = 1
    },

    optionsString() {
      this.optionsJSONParseError = false
      try {
        JSON.parse(this.optionsString)
      } catch (error) {
        this.optionsJSONParseError = true
      }
    },

    authParams() {
      this.authsJSONParseError = false
      try {
        JSON.parse(this.authParams)
      } catch (error) {
        this.authsJSONParseError = true
      }
    }
  },

  mounted() {
    // Set defaults
    this.showOptions = false
    this.wsUrl = this.DEFAULT_WS_URL
    this.optionsString = JSON.stringify(this.DEFAULT_OPTIONS, null, 2)
    this.authParams = JSON.stringify(this.DEFAULT_AUTH_PARAMS, null, 2)
    this.selectedProtocol = this.DEFAULT_PROTOCOL
    this.optionsJSONParseError = false
    this.authsJSONParseError = false
    if (this.isInit) this.step = 2
    else this.step = 1
  },

  methods: {
    ...mapActions({
      init: 'client/init',
      cancel: 'client/cancel',
      login: 'client/login'
    }),

    /**
     * Sets the options to their default
     */
    resetOptions() {
      this.optionsString = JSON.stringify(this.DEFAULT_OPTIONS, null, 2)
    },

    /**
     * Sets the auth params to their default
     */
    resetAuthParams() {
      this.authParams = JSON.stringify(this.DEFAULT_AUTH_PARAMS, null, 2)
    },

    /**
     * Attempt to init
     */
    clientInit() {
      let options
      const url = this.url
      if (!this.showOptions) return this.init({ url, options: {} })
      this.optionsJSONParseError = false
      // Attempt to parse options and init
      try {
        options = JSON.parse(this.optionsString)
        this.init({ url, options })
      } catch (error) {
        console.error(error)
        this.optionsJSONParseError = true
      }
    },

    /**
     * Attempt to change connection
     */
    clientCancel() {
      this.cancel()
    },

    /**
     * Logs into and sets up the Deepstream client
     */
    clientLogin() {
      // Log into deepstream
      try {
        const authParams = JSON.parse(this.authParams)
        console.log('clientLogin', { authParams })
        this.login({ authParams })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
