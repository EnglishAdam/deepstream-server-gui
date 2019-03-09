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
                <v-text-field v-model="url" label="URL" placeholder="127.0.0.1" />
              </v-flex>
              <!-- Input for URL -->
            </v-layout>
          </v-flex>
          <!-- Inputs for URL -->
          
          <v-flex xs12>
            <v-text-field v-model="username" label="Username" placeholder="admin" />
          </v-flex>
          <!-- Input for URL -->

          <v-flex xs12>
            <v-text-field v-model="password" label="Password" placeholder="password" />
          </v-flex>
          <!-- Input for URL -->
        </v-layout>
      </v-form>
    </v-card-text>
    <!-- Login Form -->

    <v-card-actions>
      <v-spacer />

      <v-btn color="primary" @click="login">
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
      url: 'localhost:8080', // Deepstream websockets url
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
      username: '', // Login username
      password: '' // Login password
    }
  },

  computed: {
    /**
     * Returns the selected url
     */
    getUrl() {
      return this.selectedProtocol + this.url
    }
  },

  methods: {
    /**
     * Logs into and sets up the Deepstream client
     */
    login() {
      console.log('Logging in to: ', this.getUrl)
      console.log('ds', this.$deepstream, Object.keys(this.$deepstream))
      console.log('client', this.$ds, Object.keys(this.$ds))

      // Log into deepstream
      // Set up client
      this.$ds = this.$deepstream(this.getUrl, this.options)

      console.log('this.$ds', this.$ds)

      // Log in
      this.$ds = this.$deepstream(this.getUrl, this.options).login()
      // this.$ds.login()

      console.log('this.$ds.login()', this.$ds)
    }
  }
}
</script>
