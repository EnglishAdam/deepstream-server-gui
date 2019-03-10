/**
 * Client Store
 *
 * This is concerned with the actions of the client, logging in and out
 *
 */

export const state = () => ({
  isInit: false, // Flag indicatin if client has been init
  isLoggingIn: false, // Flag indicating if logging in
  isLoggedIn: false, // Flag indicaing state of login
  loginData: {} // Container for successful logging in data
})

export const getters = {
  isInit: state => state.isInit,
  loginData: state => state.loginData,
  isLoggingIn: state => state.isLoggingIn,
  isLoggedIn: state => state.isLoggedIn
}

export const mutations = {
  /**
   * Set fFlag if user is logging in
   */
  setInit: (state, payload) => {
    state.isInit = !!payload.status
  },

  /**
   * Set fFlag if user is logging in
   */
  setLoggingIn: (state, payload) => {
    state.isLoggingIn = !!payload.status
  },

  /**
   * Set flag if logging is successful
   */
  setLoggedIn: (state, payload) => {
    state.isLoggedIn = !!payload.status
  },

  /**
   * Set data returned from login
   */
  setloginData: (state, payload) => {
    state.loginData = Object.assign({}, payload.data)
  }
}

export const actions = {
  /**
   * Set flag if client initialised
   */
  setInit({ commit }, payload) {
    if (payload.hasOwnProperty('status')) commit('setInit', payload)
    else console.warn('Payload does not have "status" property in "client/setInit"')
  },
  /**
   * Set flag if user is logging in
   */
  setLoggingIn({ commit }, payload) {
    if (payload.hasOwnProperty('status')) commit('setLoggingIn', payload)
    else console.warn('Payload does not have "status" property in "client/setLoggingIn"')
  },

  /**
   * Set flag if logging is successful
   */
  setLoggedIn({ commit }, payload) {
    if (payload.hasOwnProperty('status')) commit('setLoggedIn', payload)
    else console.warn('Payload does not have "status" property in "client/setLoggedIn"')
  },

  /**
   * Set data returned from login
   */
  setloginData({ commit }, payload) {
    if (payload.hasOwnProperty('data')) commit('setloginData', payload)
    else console.warn('Payload does not have "data" property in "client/setloginData"')
  },

  /**
   * Setup client
   */
  init({ getters, dispatch }, payload) {
    if (!payload.hasOwnProperty('url')) return console.warn('Unable to login, no "url" supplied')
    if (getters.isInit) return console.warn('Unable to initalise, client already initialised')
    if (getters.isLoggedIn) return console.warn('Unable to initalise, client already logged in')

    // Pre-set init state
    dispatch('setInit', { status: false })
    dispatch('setloginData', { data: {} })
    dispatch('setLoggingIn', { status: false })
    dispatch('setLoggedIn', { status: false })

    // Initialise client
    this.$ds.$client = this.$ds.$deepstream(payload.url, payload.options)

    // Set up login events
    this.$ds.$client.on('connectionStateChanged', connectionState => {
      dispatch('connection/setConnectionState', { connectionState }, { root: true })
    })

    this.$ds.$client.on('error', (error, event, topic) => {
      dispatch('connection/setError', { error }, { root: true })
      dispatch('connection/setErrorEvent', { event }, { root: true })
      dispatch('connection/setErrorTopic', { topic }, { root: true })
    })

    // Set complete status
    dispatch('setInit', { status: true })
  },

  /**
   * Cancel client
   */
  cancel({ getters, dispatch }, payload) {
    // If logged in close
    if (getters.isLoggedIn && this.$ds.$client.close) this.$ds.$client.close()

    // Pre-set init state
    dispatch('setInit', { status: false })
    dispatch('setloginData', { data: {} })
    dispatch('setLoggingIn', { status: false })
    dispatch('setLoggedIn', { status: false })

    // Initialise client
    this.$ds.$client = null
  },

  /**
   * Logs into client
   */
  login({ getters, dispatch }, payload) {
    if (!payload.hasOwnProperty('authParams')) return console.warn('Login failed, no "authParams" in "client/login"')
    if (!getters.isInit) return console.warn('Unable to login, client not initialised')
    if (getters.isLoggedIn) return console.warn('Unable to login, client already logged in')

    // Pre-set login state
    dispatch('setLoggingIn', { status: true })

    // Login
    this.$ds.$client.login(payload.authParams, (success, data) => {
      // Set login status
      dispatch('setLoggedIn', { status: success })

      // Set login data
      dispatch('setloginData', { data })

      // Set logging in status
      dispatch('setLoggingIn', { status: false })
    })
  }
}
