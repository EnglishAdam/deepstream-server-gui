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
            <v-text-field v-model="url" label="URL" placeholder="127.0.0.1" />
          </v-flex>
          <!-- Input for URL -->
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
  date() {
    return {
      url: '',
      username: '',
      password: ''
    }
  },

  methods: {
    login() {
      alert('login')
    }
  }
}
</script>
