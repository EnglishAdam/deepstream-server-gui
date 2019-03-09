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

    <v-card-text>
      <v-form>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row>
              <v-flex xs2>
                <v-select
                  v-model="selectedProtocol"
                  :items="protocolList"
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
          
          <v-flex xs12>
            <v-text-field v-model="authUsername" label="Username" placeholder="admin" />
          </v-flex>
          <!-- Input for URL -->

          <v-flex xs12>
            <v-text-field v-model="authPassword" label="Password" placeholder="password" />
          </v-flex>
          <!-- Input for URL -->
        </v-layout>
      </v-form>
    </v-card-text>
    <!-- Login Form -->

    <v-card-actions>
      <v-spacer />

      <v-btn color="primary" :loading="isLoggingIn" @click="login">
          Login
      </v-btn>
    </v-card-actions>
    <!-- Form Actions -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      wsUrl: 'localhost:8080', // Deepstream websockets url
      // Deepstream connection options
      options: {
        /**
         * mergeStrategy: 'MERGE_STRATEGIES.REMOTE_WINS',
         * reconnectIntervalIncrement: 4000,
         * maxReconnectInterval: 180000,
         * maxReconnectAttempts: 5,
         * rpcAckTimeout: 6000,
         * rpcResponseTimeout: 10000,
         * subscriptionTimeout: 2000,
         * recordReadAckTimeout: 1000,
         * recordReadTimeout: 3000,
         * recordDeleteTimeout: 3000,
         * maxMessagesPerPacket: 100,
         * timeBetweenSendingQueuedPackages: 16,
         * recordDeepCopy: true
         */
      },
      protocolList: ['ws://', 'wss://'], // Available protocols
      selectedProtocol: 'ws://', // Select protocol
      authType: 'email', // Conection type
      authUsername: '', // Login username
      authPassword: '', // Login password
      isLoggingIn: false, // Flag indicating if logging in
      isLoggingInSuccess: false, // Flag indicaing state of login
      loginData: {}, // Container for successful logging in data
      connectionState: null, // Connection for the container state
      error: null, // Error message container
      errorEvent: null, // Error event message container
      errorTopic: null // Error topic message container
    }
  },

  computed: {
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

  methods: {
    /**
     * Logs into and sets up the Deepstream client
     */
    login() {
      // Log into deepstream
      // Set up client
      console.log('Setting Up Deepstream Client')
      this.loginData = {}
      this.isLoggingIn = false
      this.isLoggingInSuccess = false
      this.$ds = this.$deepstream(this.url, this.options)

      // Set up login events
      console.log('Setting Up Deepstream Client Events')
      this.$ds.on('connectionStateChanged', connectionState => {
        this.connectionState = connectionState
      })

      this.$ds.on('error', (error, event, topic) => {
        this.error = error
        this.errorEvent = event
        this.errorTopic = topic
      })

      // Login
      console.log('Logging in Deepstream Client')
      this.isLoggingIn = true
      this.$ds.login(this.authParams, (success, data) => {
        // Set login status
        this.isLoggingInSuccess = !!success

        // Set login data
        this.loginData = data

        if (success) {
          console.log('Log In Successful')
          this.$router.push('dashboard')
        } else {
          console.log('Log In Failed')
        }

        // Set logging in status
        this.isLoggingIn = false
      })
    }
  }
}
</script>
