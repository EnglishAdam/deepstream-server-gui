import Vue from 'vue'
import deepstream from 'deepstream.io-client-js'

class DS {
  constructor(deepstreamObj) {
    this._ds = deepstreamObj
    this._client = null
  }

  get $deepstream() {
    return this._ds
  }

  set $deepstream(deepstreamObj) {
    this._ds = deepstreamObj
  }

  get $client() {
    return this._client
  }

  set $client(client) {
    this._client = client
  }
}

const ds = new DS(deepstream)

// Create ds plugin
const Deepstream = {}
Deepstream.install = function(Vue, options) {
  Vue.prototype.$deepstream = function(...args) {
    // Add $deepstream
    ds.$deepstream = deepstream(...args)
    return ds.$deepstream
  }

  // Represents the client
  Vue.prototype.$client = function() {
    // Add $ds
    ds.$client = deepstream(options.url, options.options)
    return ds.$client
  }
}

// Attach to vue
Vue.use(Deepstream)

// Attach to store and context
export default ({ app }, inject) => {
  // Add $ds
  inject('ds', ds)
}
