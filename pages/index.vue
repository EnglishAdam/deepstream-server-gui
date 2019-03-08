<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <h1>Deepstream Server GUI</h1>
      <p>{{ baseUrl }}</p>
      <p>{{ healthCheck }}</p>
    </v-flex>

    <v-flex>
      <p>Wake up server via {{ healthCheck }}</p>
      <v-btn @click="wakeUp">
        Wake Up Server
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: '',
      healthCheck: ''
    }
  },

  asyncData(ctx) {
    console.log('@', ctx)
    return {
      baseUrl: ctx.env.BASE_URL,
      healthCheck: ctx.env.DS_HEALTH_CHECK
    }
  },

  methods: {
    async wakeUp() {
      let res
      try {
        this.$axios.setHeader('Access-Control-Allow-Origin', '*')
        this.$axios.setHeader('Access-Control-Max-Age', '1728000')
        res = await this.$axios.$get('https://postman-echo.com/headers')
      } catch (error) {
        console.log('error', error)
      }
      console.log('res', res)
    }
  }
}
</script>
