import Vue from 'vue'
import deepstream from 'deepstream.io-client-js'

// Create cotainers
// let deepstreamObj = deepstream
// let clientObj = null

class DS {
  constructor(deepstream) {
    this._ds = deepstream
    this._client = null
  }

  get $deepstream() {
    return this._ds
  }

  set $deepstream(deepstream) {
    this._ds = deepstream
  }

  get $ds() {
    return this._client
  }

  set $ds(client) {
    this._client = client
  }
}

const ds = new DS(deepstream)

// Vue.prototype.$deepstream = ds.$deepstream
// Vue.prototype.$ds = ds.$ds

// export default ({ app }, inject) => {
//   // Set the function directly on the context.app object
//   app.$deepstream = ds.$deepstream
//   app.$ds = ds.$ds
// }

// Create ds plugin
const Deepstream = {}
Deepstream.install = function(Vue, options) {
  Vue.prototype.$deepstream = function(...args) {
    // Add $deepstream
    ds.$deepstream = deepstream(...args)
    return ds.$deepstream
  }

  // Represents the client
  Vue.prototype.$ds = function() {
    // Add $ds
    ds.$ds = deepstream(options.url, options.options)
    return ds.$ds
  }
}

// Attach to vue
Vue.use(Deepstream)

// Attach to store and context
export default ({ app }, inject) => {
  // Add $deepstream
  // inject('deepstream', function() {
  //   return ds.$deepstream
  // })

  // Add $ds
  inject('ds', ds)
}
