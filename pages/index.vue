<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <h1>Deepstream Server GUI</h1>
      <p>{{ baseUrl }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: 'f'
    }
  },

  asyncData(ctx) {
    console.log('@', ctx)
    return {
      baseUrl: ctx.env.BASE_URL
    }
  },

  methods: {
    test() {
      console.log('@')
    }
  }
}
</script>
