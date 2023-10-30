import Request from '../request'

/**
 * @description: 授权接口
 * @param {code, state}
 * @return {token}
 */
export function fetchAuthCode(params) {
  return Request.get({
    url: '/dbElvDrawAuth/authCode',
    showLoading: false,
    params
  })
}

/**
 * @description: 获取图形二维码
 * @param {}
 */
export function getCaptcha() {
  return Request.get({
    url: '/dbElvDrawAuth/captcha'
  })
}

/**
 * @description: 获取验证码
 * @param {mobile} 手机号码
 * @param {captchaCode} 输入的图形验证码
 * @param {captchaKey} 图形验证码接口获取
 */
export function getSendSms(params) {
  return Request.get({
    url: '/dbElvDrawAuth/sendSms',
    params
  })
}

/**
 * @description: 登录
 * @param {mobile} 手机号码
 * @param {smsCode} 验证码
 * @param {state, openid}
 */
export function changeLogin(params) {
  return Request.get({
    url: '/dbElvDrawAuth/login',
    params
  })
}
