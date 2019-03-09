<template>
  <v-container fill-height>
    <v-layout row justify-center align-center>
      <v-flex xs12 sm6 md4>
        <ds-connection-form />
      </v-flex>
      <!-- Connection Form -->
    </v-layout>
  </v-container>
</template>

<script>
import ConnectionForm from '~/components/form/ConnectionForm.vue'

export default {
  layout: 'blank',

  components: {
    'ds-connection-form': ConnectionForm
  },

  data() {
    return {
      //
    }
  },

  methods: {
    //
  }
}
</script>
