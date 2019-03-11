export default function({ store, route, redirect }) {
  if (store.getters['connection/isDisconnected']) redirect({ name: 'index' })
}
