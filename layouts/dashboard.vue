<template>
  <v-app>
    <ds-navigation-drawer>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
      <!-- Route -->

    </ds-navigation-drawer>
    <!-- Navigation Drawer -->

    <v-footer fixed app>
      <span>Adam English, &copy; 2019</span>
    </v-footer>
    <!-- Footer -->
  </v-app>
</template>

<script>
import NavigationDrawer from '~/components/nav/NavigationDrawer'
export default {
  components: {
    'ds-navigation-drawer': NavigationDrawer
  }
}
</script>
