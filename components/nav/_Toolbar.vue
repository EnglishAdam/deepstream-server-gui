<template>
  <v-toolbar fixed clipped-left app>
    <v-toolbar-side-icon @click="$emit('click')" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
  </v-toolbar>
</template>

<script>
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
  }
}
</script>
