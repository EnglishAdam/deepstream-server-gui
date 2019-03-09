import Vue from 'vue'
import deepstream from 'deepstream.io-client-js'

// Create ds plugin
const Deepstream = {}
Deepstream.install = function(Vue, options) {
  // // 1. add global method or property
  // Vue.myGlobalMethod = function () {
  //   // some logic ...
  // }

  // // 2. add a global asset
  // Vue.directive('my-directive', {
  //   bind (el, binding, vnode, oldVnode) {
  //     // some logic ...
  //   }
  //   ...
  // })

  // // 3. inject some component options
  // Vue.mixin({
  //   created: function () {
  //     // some logic ...
  //   }
  //   ...
  // })

  // 4. add an instance method
  // Represents the deepstream object container
  Vue.prototype.$deepstream = function(...args) {
    return deepstream(...args)
  }

  // Represents the client
  Vue.prototype.$ds = function() {
    const client = deepstream(options.url, options.options)
    return client
  }
}

Vue.use(Deepstream, {
  //
})
