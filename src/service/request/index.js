import axios from 'axios'
import { showLoadingToast, showToast } from 'vant'

import { TOKEN } from '@/constant'
import { useLogin } from '@/store'
import { baseURL, TIMEOUT, DEAFULT_LOADING } from './config'
import { sessionCache, DecryptData, getSm2Encrypt } from '@/utils'

class Request {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: TIMEOUT
    })

    this.showLoading = DEAFULT_LOADING

    this.instance.interceptors.request.use(
      (config) => {
        const loginStore = useLogin()

        if (this.showLoading) {
          this.loading = showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
            loadingType: 'spinner'
          })
        }

        const token = loginStore.token
        if (token) {
          config.headers['token'] = token
        }

        if (config.params) {
          config.params = { paraStr: getSm2Encrypt(config.params) }
        }

        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        const loginStore = useLogin()
        this.loading?.close()
        const data = DecryptData(res.data)
        // console.log(data, '+++++');

        if (data?.code === 10125 || data?.code === 40053) {
          setTimeout(() => {
            sessionCache.deleteCache(TOKEN)
            loginStore.token = ''
            const state = sessionCache.getCache('state')
            location.href = `${baseURL}/dbElvDrawAuth/index?state=${state}`
          }, 100)
        }
        return data
      },
      (err) => {
        this.loading?.close()

        return err
      }
    )
  }

  request(config) {
    if (config.showLoading === !DEAFULT_LOADING) {
      this.showLoading = config.showLoading
    } else {
      this.showLoading = DEAFULT_LOADING
    }

    return new Promise((resolve, reject) => {
      this.instance.request(config).then((res) => {
        if(res?.code === 0) {
          resolve(res)
        } else {
          if (!config.hideToast && res?.msg) showToast(res.msg);
          if (config.isReject) reject(res)
        }
      }).catch((err) => {
        console.log(err);
        showToast('网络错误,请稍后')
        // reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

export default new Request(baseURL)
