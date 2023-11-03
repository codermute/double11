import { defineStore } from "pinia";
import { showLoadingToast, showToast } from 'vant'
import _ from 'lodash'
import dayjs from 'dayjs'

import { useMain } from "./main";
import { AUTHURL, TOKEN } from '@/constant'
import { sessionCache, getUrlParams } from '@/utils'
import { fetchAuthCode, getCaptcha, getSendSms, changeLogin, getMate60 } from "@/service";

export const useLogin = defineStore('login', {
  state:() => ({
    token: sessionCache.getCache(TOKEN),
    captchaKey: '', // 图形验证码key
    imageCode: '', // 图形验证码
    prizeData: '',
    showKoiPrize: false
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
      const mainStore = useMain()
      try {
        const state = getUrlParams('state')
        const code = getUrlParams('code')

        const res = await fetchAuthCode({code, state})
        console.log(res, '授权');
        sessionCache.setCache(TOKEN, res.data)
        this.token = res.data
        mainStore.canDrawNum = res.canDrawNum || 0

        this.fetchMate60()
      } catch (data) {
        console.log(data, '000');
        sessionCache.setCache('openid', data.userInfo?.openid)
        sessionCache.setCache('state', data.userInfo?.channel)
      }
      loading?.close()
    }, 200),
    // 获取图形验证码
    async fetchGraphCode() {
      const res = await getCaptcha(this.captchaKey)
      console.log(res, '图形验证码');
      this.captchaKey = res.data.imageCodeKey
      this.imageCode = res.data.base64
    },
    async fetchSendSms(payload) {
      const res = await getSendSms(payload)
      console.log(res, '获取验证码');
      showToast(res.msg)
    },
    async fetchLogin(payload) {
      const mainStore = useMain()
      const res = await changeLogin(payload)
      console.log(res, '登录');
      sessionCache.setCache(TOKEN, res.data)
      this.token = res.data
      mainStore.canDrawNum = res.canDrawNum || 0
      showToast('登录成功')
      this.fetchMate60()
    },
    async fetchMate60() {
      // console.log(dayjs().isAfter(dayjs('2023-11-11')));
      if (!dayjs().isAfter(dayjs('2023-11-03'))) return
      const res = await getMate60()
      console.log(res, 'getMate60');
      this.prizeData = res.prize
      this.showKoiPrize = true
    }
  }
})
