<template>
  <div>
    <ds-navigation-drawer-left :value="drawer" :items="items" app />
    <!-- Navigation Draw -->

    <ds-navigation-toolbar @click="drawer = !drawer" app />
    <!-- Toolbar -->

    <slot />
    <!-- Page -->

  </div>
</template>

<script>
import _Drawer from '~/components/nav/_Drawer.vue'
import _Toolbar from '~/components/nav/_Toolbar.vue'

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
  }
}
</script>
