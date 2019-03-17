<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <p class="display-1">Dashboard</p>
        <v-divider />
      </v-flex>

      <v-flex xs12>
        <v-layout pa-2 row>
          <v-flex xs6>
            <v-layout column>
              <v-flex pa-2>
                <p class="headline">Connection Info</p>
                <p class="subheading">The following contains connections infomation:</p>
                <v-divider />
              </v-flex>
              <!-- Heading -->

              <v-flex pa-2>
                <p><strong>Connection Options:</strong></p>
                <p class="px-5" style="white-space: pre-wrap;">{{ options }}</p>
              </v-flex>
              <!-- Connection Options -->

              <v-flex pa-2>
                <p><strong>Connection State:</strong></p>
                <p class="px-5">{{ state }}</p>
              </v-flex>
              <!-- Connection State -->

            </v-layout>
          </v-flex>

          <v-divider vertical />
          
          <v-flex xs6>
            <v-layout column>
              <v-flex pa-2>
                <p class="headline">Present Users</p>
                <p class="subheading">The following contains users and their status:</p>
                <v-divider />
              </v-flex>
              <!-- Heading -->

              <v-flex pa-2>
                <p><strong>Connected Users:</strong></p>
                <p class="px-5" style="white-space: pre-wrap;">{{ users }}</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>

      

      


    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',

  data() {
    return {
      options: {}, // Connection options container
      state: {}, // Connection state container
      users: {}
    }
  },

  created() {
    console.log('deepstream', this.$ds)
    // Set data
    this.options = Object.assign({}, this.$ds.$client._options)
    this.state = this.$ds.$client.getConnectionState()

    // SUbscribe to presence
    this.$ds.$client.presence.getAll(usernames => {
      console.log('usernames', usernames)
    })

    // Subscribe to presence changes
    this.$ds.$client.presence.subscribe((username, login) => {
      console.log('subscribe', username, login)
      this.users[username] = login
    })
  },

  beforeDestroy() {
    this.$ds.$client.presence.unsubscribe()
  }
}
</script>
