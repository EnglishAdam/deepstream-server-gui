<template>
  <v-navigation-drawer v-model="value" clipped fixed :app="app">
    <v-list>
      <v-list-tile v-for="(item, index) in items" :key="'navigation-sidemenu-' + index" :to="item.to" router exact>
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <!-- Menu List -->

  </v-navigation-drawer>
  <!-- Navigation Side Left -->

</template>

<script>
export default {
  props: {
    // Flag if drawer should be open
    value: {
      type: Boolean,
      required: true
    },

    // Flag if drawer should have app scaling
    app: {
      type: Boolean,
      default: false
    },

    // List of menu items
    items: {
      type: Array,
      required: true,
      validator: function(value) {
        // Validate schema of objects
        let isCheckSuccess = true
        value.forEach(item => {
          if (!item.hasOwnProperty('to')) isCheckSuccess = false
          if (!item.hasOwnProperty('icon')) isCheckSuccess = false
          if (!item.hasOwnProperty('title')) isCheckSuccess = false
        })
        return isCheckSuccess
      }
    }
  }
}
</script>
