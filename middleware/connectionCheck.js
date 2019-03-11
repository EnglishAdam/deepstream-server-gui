export default function({ store, route, redirect }) {
  if (!store.getters['connection/isConnected']) redirect({ name: 'index' })
}
