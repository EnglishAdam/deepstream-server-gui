export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    // console.log('onRequest: Making request to ' + config.url)
  })

  $axios.onResponse(response => {
    // console.log('onResponse: Recieving response ' + response)
  })

  $axios.onError(error => {
    // console.log('onError', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/400')
    }
  })

  $axios.onRequestError(_error => {
    // console.log('onError', _error)
  })

  $axios.onResponseError(_error => {
    // console.log('onError', _error)
  })
}
