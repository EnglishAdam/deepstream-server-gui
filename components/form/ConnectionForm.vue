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
        <v-stepper-header class="elevation-0">
          <v-stepper-step step="1" :complete="step > 1">
            Setup Connection
            <!-- <small>Optionally supply connection options</small> -->
          </v-stepper-step>

          <v-divider />

          <v-stepper-step step="2" :complete="step > 2">
            Server Login
            <!-- <small>Optionally supply authentication parameters</small> -->
          </v-stepper-step>
        </v-stepper-header>
        <!-- Stepper Header -->

        <v-divider />

        <v-stepper-items>
          <v-stepper-content step="1">
            <!-- <v-card class="mb-5">
              <v-card-text> -->
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
                              <v-text-field v-model="wsUrl" label="URL" placeholder="127.0.0.1" />
                            </v-flex>
                            <!-- Input for URL -->
                          </v-layout>
                        </v-flex>
                        <!-- Inputs for URL -->

                        <v-flex v-if="showOptions" class="text-xs-center" xs12>
                          <v-btn flat @click="showOptions = true">
                            <v-icon>add</v-icon> 
                            Customise Connection Options
                          </v-btn>
                        </v-flex>
                        <!-- Input for URL -->

                        <v-flex v-else xs12>
                          <v-textarea
                            v-model="options"
                            box
                            label="Connection Options"
                            hint="Set the connection options"
                            auto-grow
                            :placeholder="JSON.stringify(DEFAULT_OPTIONS, null, 2)"
                          />
                        </v-flex>
                        <!-- Input for URL -->

                        <v-flex v-if="!showOptions" class="text-xs-right" xs12>
                          <v-btn small flat color="primary" @click="resetOptions">
                            <v-icon small>refresh</v-icon> &nbsp; Set Default
                          </v-btn>
                          <!-- Reset Defaults -->

                          <v-btn small flat color="primary" @click="resetOptions">
                            <v-icon small>cancel</v-icon> &nbsp; Cancel
                          </v-btn>
                          <!-- Cancel Options -->
                        </v-flex>
                        <!-- Connection Options Fresh -->

                      </v-layout>
                    </v-form>                 
                  </v-flex>
                </v-layout>
                <!-- Init Form -->
              <!-- </v-card-text>
            </v-card> -->
          </v-stepper-content>
          <!-- Init Step -->

          <v-stepper-content step="2">
            <!-- <v-card color="grey lighten-1" class="mb-5" height="200px" /> -->
            <v-btn color="primary" @click="step = 1">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>
          <!-- Init Step -->
        </v-stepper-items>
      </v-stepper>

      
    </v-card-text>
    <!-- Login Form -->

    <v-divider />

    <v-card-actions v-if="step === 1">
      <v-spacer />
      <v-btn color="primary" :loading="isLoggingIn" @click="login(url, options)">Login</v-btn>
      <!-- Options Buttons -->

    </v-card-actions>
    <!-- Form Actions -->

    <v-card-actions v-else-if="step === 2">
      <v-spacer />
      <v-btn color="primary" :loading="isLoggingIn" @click="login(url, options)">Logina</v-btn>
      <v-btn flat @click="test">testa</v-btn>
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
      DEFAULT_WS_URL: 'localhost:8080', // Deepstream websockets url
      wsUrl: '', // Deepstream websockets url

      // Deepstream default connection options
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
      options: '', // Deepstream connection options
      DEFAULT_PROTOCOL: 'ws://', // Default selected protocol
      PROTOCOL_LIST: ['ws://', 'wss://'], // Available protocols
      selectedProtocol: '', // Select protocol container

      authType: 'email', // Conection type
      authUsername: '', // Login username
      authPassword: '' // Login password
    }
  },

  computed: {
    ...mapGetters({
      isLoggingIn: 'client/isLoggingIn',
      isLoggingInSuccess: 'client/isLoggingInSuccess',
      loginData: 'client/loginData',
      connectionState: 'connection/connectionState',
      error: 'connection/error',
      errorEvent: 'connection/errorEvent',
      errorTopic: 'connection/errorTopic'
    }),

    /**
     * Returns the selected url
     */
    url() {
      return this.selectedProtocol + this.wsUrl
    },

    /**
     * Returns the authentication param
     */
    authParams() {
      return {
        type: this.authType,
        email: this.authUsername,
        password: this.authPassword
      }
    }
  },

  mounted() {
    // Set defaults
    this.setloginData({ data: {} })
    this.step = 1
    this.wsUrl = this.DEFAULT_WS_URL
    this.options = JSON.stringify(this.DEFAULT_OPTIONS, null, 2)
    this.selectedProtocol = this.DEFAULT_PROTOCOL
  },

  methods: {
    ...mapActions({
      setLoggingIn: 'client/setLoggingIn',
      setLoggingInSuccess: 'client/setLoggingInSuccess',
      setloginData: 'client/setloginData',
      init: 'client/init',
      setConnectionState: 'connection/setConnectionState',
      setError: 'connection/setError',
      setErrorEvent: 'connection/setErrorEvent',
      setErrorTopic: 'connection/setErrorTopic',
      test: 'connection/test'
    }),

    /**
     * Sets the options to their default
     */
    resetOptions() {
      this.options = JSON.stringify(this.DEFAULT_OPTIONS, null, 2)
    },

    // initClient () {
    //   this.init({url: this.url})
    // },

    /**
     * Logs into and sets up the Deepstream client
     */
    login() {
      // Log into deepstream
      // Set up client
      console.log('Setting Up Deepstream Client')
      this.setloginData({ data: {} })
      this.setLoggingIn({ status: false })
      this.setLoggingInSuccess({ status: false })
      this.$ds = this.$deepstream(this.url, this.options)

      // Set up login events
      console.log('Setting Up Deepstream Client Events')
      this.$ds.on('connectionStateChanged', connectionState => {
        console.log('Connection State Changed', connectionState)
        this.setConnectionState({ connectionState })
      })

      this.$ds.on('error', (error, event, topic) => {
        console.log('Connection Error', error, event, topic)
        this.setError({ error })
        this.setErrorEvent({ event })
        this.setErrorTopic({ topic })
      })

      // Login
      console.log('Logging in Deepstream Client')
      this.setLoggingIn({ status: true })
      this.$ds.login(this.authParams, (success, data) => {
        // Set login status
        this.setLoggingInSuccess({ status: !!success })

        // Set login data
        this.setloginData({ data })

        if (success) {
          console.log('Log In Successful')
          this.$router.push('dashboard')
        } else {
          console.log('Log In Failed')
        }

        // Set logging in status
        this.setLoggingIn({ status: false })
      })
    }
  }
}
</script>
