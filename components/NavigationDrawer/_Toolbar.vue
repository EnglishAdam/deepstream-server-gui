<template>
  <v-toolbar fixed clipped-left :app="app">
    <v-toolbar-side-icon @click="$emit('click')" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn icon flat @click="cancel">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    // Flag if drawer should have app scaling
    app: {
      type: Boolean,
      default: false
    },

    // Title string
    title: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions({
      cancel: 'client/cancel'
    })
  }
}
</script>
