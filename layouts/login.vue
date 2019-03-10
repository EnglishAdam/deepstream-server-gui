<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isConnected: 'connection/isConnected'
    })
  },

  watch: {
    isConnected(value) {
      if (value) return this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
