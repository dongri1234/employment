import axios from 'axios'
import qs from 'qs'
const baseUrl = 'http://140.143.161.242/api'
const getRequest = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + url + '?' + qs.stringify(params),
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((res) => {
        reject(res)
      })
  })
}

export {
  getRequest
}
