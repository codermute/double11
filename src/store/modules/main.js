import { defineStore } from "pinia";
import {changeDraw,getUserJob} from '@/service'

export const useMain = defineStore('main', {
  state: () => ({}),
  actions: {
    async fetchDraw() {
      const res = await changeDraw()
      console.log(res, '抽奖');
    },
    async fetchUserJob() {
      const res = await getUserJob()
      console.log(res, '任务列表');
    }
  }
})
