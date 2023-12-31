import Request from '../request'

/**
 * @description: 授权接口
 * @param {code, state, ticket}
 * @return {token}
 */
export function fetchAuthCode(params) {
  return Request.get({
    url: '/dbElvDrawAuth/authCode',
    showLoading: false,
    isReject: true,
    params
  })
}

/**
 * @description: 获取图形二维码
 * @param {key}
 */
export function getCaptcha(key) {
  return Request.get({
    url: '/dbElvDrawAuth/captcha',
    showLoading: false,
    params: {
      key
    }
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
    isReject: true,
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

/**
 * @description: 登录成功调用
 */
export function getMate60() {
  return Request.get({
    url: '/api/dbElvDraw/mate60',
    hideToast: true,
    showLoading: false
  })
}

