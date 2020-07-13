import axios from 'axios'
import qs from 'qs'
import request from '@/utils/request'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import storage from 'store'
// const baseUrl = 'http://124.70.154.132'
const baseUrl = 'http://124.70.154.132'
const token = sessionStorage.getItem('token')
export function getData2(url, params) {
  return request({
    url: baseUrl + url + '?' + qs.stringify(params),
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function getData(url, parameter) {
  return request({
    url: url,
    method: 'get',
    params: parameter
  })
}

const postRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
        url: baseUrl + url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}

const getRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    axios({
        url: baseUrl + url + '?' + qs.stringify(params),
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token
        }
      })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}
const putRequest = (url, params, data) => {
  return new Promise((resolve, reject) => {
    axios({
        url: baseUrl + url + '?' + qs.stringify(params),
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}
const delRequest = (url, id) => {
  return new Promise((resolve, reject) => {
    axios({
        url: baseUrl + url + '/' + id,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}
const UpdateAlumnuInfo = (id, data) => {
  return new Promise((resolve, reject) => {
    axios({
        url: baseUrl + '/api/alumnus?id=' + id,
        data: data,
        method: 'put',
        headers: {
          'content-type': 'application/json'
          // 'authorization': 'Bearer ' + token
        }
      })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}
const AddAlumnuInfo = (url, body) => {
  return new Promise((resolve, reject) => {
    axios({
        url: baseUrl + url,
        data: body,
        method: 'post',
        headers: {
          'content-type': 'application/json'
          // 'authorization': 'Bearer ' + token
        }
      })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}
const searchAlumnuInfo = (url, name) => {
  return new Promise((resolve, reject) => {
    axios({
        url: baseUrl + url + name,
        // data: body,
        method: 'get',
        headers: {
          'content-type': 'application/json'
          // 'authorization': 'Bearer ' + token
        }
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export {
  getRequest,
  putRequest,
  postRequest,
  delRequest,
  UpdateAlumnuInfo,
  AddAlumnuInfo,
  searchAlumnuInfo
}
