/*
 * @Author: 13649723325 2557223628@qq.com
 * @Date: 2023-10-30 09:35:26
 * @LastEditors: 13649723325 2557223628@qq.com
 * @LastEditTime: 2023-10-31 09:20:24
 * @FilePath: \activity\src\store\modules\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { showLoadingToast, showToast } from 'vant'
import _ from 'lodash'

import { useMain } from "./main";
import { AUTHURL, TOKEN } from '@/constant'
import { sessionCache, getUrlParams } from '@/utils'
import { fetchAuthCode, getCaptcha, getSendSms, changeLogin } from "@/service";

export const useLogin = defineStore('login', {
  state:() => ({
    token: sessionCache.getCache(TOKEN),
    captchaKey: '', // 图形验证码key
    imageCode: '' // 图形验证码
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
    }
  }
})
