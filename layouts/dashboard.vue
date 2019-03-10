<template>
  <v-app>
    <ds-navigation-drawer-left :value="drawer" :items="items" app />
    <!-- Navigation Draw -->

    <ds-navigation-toolbar :title="title" @click="drawer = !drawer" app />
    <!-- Toolbar -->

    <v-content>
      <v-container app>
        <nuxt />
      </v-container>
    </v-content>
    <!-- Route -->

    <v-footer fixed app>
      <span>Adam English, &copy; 2019</span>
    </v-footer>
    <!-- Footer -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import _Drawer from '~/components/NavigationDrawer/_Drawer.vue'
import _Toolbar from '~/components/NavigationDrawer/_Toolbar.vue'

export default {
  components: {
    'ds-navigation-drawer-left': _Drawer,
    'ds-navigation-toolbar': _Toolbar
  },

  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'apps',
          title: 'Connection',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Record',
          to: '/inspire'
        }
      ],
      title: 'Deepstream Inspector'
    }
  },

  computed: {
    ...mapGetters({
      isDisconnected: 'connection/isDisconnected'
    })
  },

  watch: {
    isDisconnected(value) {
      if (value) return this.$router.push({ name: 'index' })
    }
  }
}
</script>
