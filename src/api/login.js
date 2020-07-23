import request from '@/utils/request'

const userApi = {
  // Login: '/auth/login',
  Login: 'http://124.70.188.227/api/user/Auth',
  Logout: process.env.VUE_APP_API_BASE_URL + '/auth/logout',
  ForgePassword: process.env.VUE_APP_API_BASE_URL + '/auth/forge-password',
  Register: process.env.VUE_APP_API_BASE_URL + '/auth/register',
  twoStepCode: process.env.VUE_APP_API_BASE_URL + '/auth/2step-code',
  SendSms: process.env.VUE_APP_API_BASE_URL + '/account/sms',
  SendSmsErr: process.env.VUE_APP_API_BASE_URL + '/account/sms_err',
  // get my info
  UserInfo: process.env.VUE_APP_API_BASE_URL + '/user/info',
  UserMenu: process.env.VUE_APP_API_BASE_URL + '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return request({
    url: userApi.Login + '?' + 'userid=' + parameter.password + '&name=' + parameter.name,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav() {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
