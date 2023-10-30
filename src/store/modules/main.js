import { defineStore } from "pinia";
import {showToast} from 'vant'
import {changeDraw,getUserJob, changeDoJob, changeActivityShare} from '@/service'

export const useMain = defineStore('main', {
  state: () => ({
    taskList: [],
    shareUrl: '' // 分享链接
  }),
  actions: {
    async fetchDraw() {
      const res = await changeDraw()
      console.log(res, '抽奖');
    },
    async fetchUserJob() {
      const res = await getUserJob()
      console.log(res, '任务列表');
      this.taskList = res.list
    },
    async fetchDoJob(id) {
      const res = await changeDoJob(id)
      console.log(res, '做任务');
      showToast(res.msg)
      if(res.url) {
        window.location.href = res.url
      }
      this.fetchUserJob()
    },
    async fetchActivityShare() {
      const res = await changeActivityShare()
      console.log(res);
      this.shareUrl = res.url
    }
  }
})
