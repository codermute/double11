import { defineStore } from "pinia";
import { showLoadingToast, showToast } from 'vant'
import _ from 'lodash'

import { AUTHURL, TOKEN } from '@/constant'
import { sessionCache, getUrlParams } from '@/utils'
import { fetchAuthCode, getCaptcha, getSendSms, changeLogin } from "@/service";

export const useLogin = defineStore('login', {
  state:() => ({
    token: sessionCache.getCache(TOKEN),
    captchaKey: '' // 图形验证码key
  }),
  actions:{
    // getCampusCode() {
    //   window.location.href = AUTHURL
    // },
    getToken: _.throttle(async function () {
      const loading = showLoadingToast({
        message: '登录中...',
        duration: 0,
        overlay: true,
        forbidClick: true,
      })
      try {
        const state = getUrlParams('state')
        const code = getUrlParams('code')

        const res = await fetchAuthCode({code, state})
        console.log(res, '授权');
        sessionCache.setCache(TOKEN, res.data)
        this.token = res.token
      } catch (error) {
        console.log(error, '000');
      }
      loading?.close()
    }, 200),
    // 获取图形验证码
    async fetchGraphCode() {
      const res = await getCaptcha()
      console.log(res, '图形验证码');
    },
    async fetchSendSms(payload) {
      const res = await getSendSms(payload)
      console.log(res, '获取验证码');
    },
    async fetchLogin(payload) {
      const res = await changeLogin(payload)
      console.log(res, '登录');
      showToast('登录成功')
    }
  }
})
