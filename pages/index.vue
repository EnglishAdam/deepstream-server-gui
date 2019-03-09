<template>
  <v-container fill-height>
    <v-layout column justify-center align-center>
      <v-flex>
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
