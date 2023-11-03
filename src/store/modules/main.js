import { defineStore } from "pinia";
import {showToast} from 'vant'
import {changeDraw,getUserJob, changeDoJob, changeActivityShare, getMyPrize, getCanDrawNum,changeluck1111, changeReceive, getReg} from '@/service'

export const useMain = defineStore('main', {
  state: () => ({
    taskList: [], // 任务列表
    shareUrl: '', // 分享链接
    prizeList: [], // 奖品列表
    canDrawNum: 0, // 抽奖次数
    prizeDesc: '',
    reg: {} // 收货信息
  }),
  actions: {
    async fetchDraw() {
      try {
        const res = await changeDraw()
        console.log(res, '抽奖');
        this.fetchCanDrawNum()
        return res
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserJob() {
      const res = await getUserJob()
      console.log(res, '任务列表');
      this.taskList = res.list
    },
    async fetchDoJob(id) {
      try {
        const res = await changeDoJob(id)
        console.log(res, '做任务');

        if(res.url) {
          this.fetchCanDrawNum()
          this.fetchUserJob()
          window.location.href = res.url
        } else {
          setTimeout(() => {
            this.fetchCanDrawNum()
            this.fetchUserJob()
          }, 700);
          showToast(res.msg)
        }
      } catch (err) {
        console.log(err);
        if (err.url) {
          location.href = err.url
        }
      }

    },
    async fetchActivityShare() {
      const res = await changeActivityShare()
      console.log(res);
      this.shareUrl = res.url
    },
    async fetchMyPrize() {
      const res = await getMyPrize()
      console.log(res, '我的奖品');
      this.prizeList = res.list
    },
    async fetchCanDrawNum() {
      const res = await getCanDrawNum()
      console.log(res, '抽奖次数');
      this.canDrawNum = res.canDrawNum
    },
    async fetchluck1111() {
      const res = await changeluck1111()
      console.log(res, '111活动');
      this.prizeDesc = res.prize?.prizeDesc
      this.canDrawNum = res?.canDrawNum || 0
    },
    async fetchReceive(payload) {
      const res = await changeReceive(payload)
      console.log(res, '实物');
      showToast('登记成功')
    },
    async fetchReg(id) {
      const res = await getReg(id)
      console.log(res, '收货信息');
      this.reg = res.reg || {}
    }
  }
})
