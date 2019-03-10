/**
 * Connection Store
 *
 * This is concerned with management of the connection state of the client
 *
 */

export const state = () => ({
  /**
   * Connection states:
   * 'OPEN', // The connection is established; everything is fine.
   * 'CLOSED', // The connection was deliberately closed by the user via client.close(). No reconnection attempts will be made. The client also starts in this state, but almost immediatly switches to AWAITING_CONNECTION.
   * 'ERROR', // The connection is finally declared unrecoverable, e.g. as a result from too many failed reconnection attempts or missed heartbeats. No further reconnection attempts will be made.
   * 'AWAITING_CONNECTION', // The client has established the physical connection and waits for the initial response from the server.
   * 'CHALLENGING', // The client is currently undergoing a negotiation sequence that might result in a redirect or exchange of configuration.
   * 'AWAITING_AUTHENTICATION', // State after the client was initialised, but before .login() was called.
   * 'AUTHENTICATING', // State after .login() was called, but before the response from the platform is received.
   */
  connectionState: null, // Connection for the container state
  error: null, // Error message container
  errorEvent: null, // Error event message container
  errorTopic: null // Error topic message container
})

export const getters = {
  isConnected: state => state.connectionState === 'OPEN', // True if connection established
  // True if not connected or esablishing
  isNotConnected: state => {
    return ['ERROR', 'CLOSED'].some(status => {
      return state.connectionState.includes(status)
    })
  },
  // True if estabilisting connection
  isEstablishingConnection: state => {
    return ['OPEN', 'ERROR', 'CLOSED'].some(status => {
      return !state.connectionState.includes(status)
    })
  },
  // loginData: state => state.loginData,
  connectionState: state => state.connectionState,
  error: state => state.error,
  errorEvent: state => state.errorEvent,
  errorTopic: state => state.errorTopic
}

export const mutations = {
  /**
   * Set current connection state
   */
  setConnectionState: (state, payload) => {
    state.connectionState = payload.connectionState
  },

  /**
   * Set returned connection error
   */
  setError: (state, payload) => {
    state.error = payload.error
  },

  /**
   * Set returned connection error event
   */
  setErrorEvent: (state, payload) => {
    state.errorEvent = payload.event
  },

  /**
   * Set returned connection error topic
   */
  setErrorTopic: (state, payload) => {
    state.errorTopic = payload.topic
  }
}

export const actions = {
  test(ctx, payload) {
    console.log('test', ctx)
    console.log('test', this.$deepstream)
    console.log('test', this.$ds)
  },

  /**
   * Set current connection state
   */
  setConnectionState({ commit }, payload) {
    if (payload.hasOwnProperty('connectionState')) commit('setConnectionState', payload)
    else console.warn('Payload does not have "connectionState" property in "connection/setConnectionState"')
  },

  /**
   * Set returned connection error
   */
  setError({ commit }, payload) {
    if (payload.hasOwnProperty('error')) commit('setError', payload)
    else console.warn('Payload does not have "error" property in "connection/setError"')
  },

  /**
   * Set returned connection error event
   */
  setErrorEvent({ commit }, payload) {
    if (payload.hasOwnProperty('event')) commit('setErrorEvent', payload)
    else console.warn('Payload does not have "event" property in "connection/setErrorEvent"')
  },

  /**
   * Set returned connection error topic
   */
  setErrorTopic({ commit }, payload) {
    if (payload.hasOwnProperty('topic')) commit('setErrorTopic', payload)
    else console.warn('Payload does not have "topic" property in "connection/setErrorTopic"')
  }
}
