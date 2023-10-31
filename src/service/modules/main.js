import Request from '../request'

/**
 * @description: 抽奖
 * @param {}
 */
export function changeDraw() {
  return Request.get({
    url: '/api/dbElvDraw/draw',
    isReject: true
  })
}

/**
 * @description: 查询任务信息
 * @return {id} 任务id
 * @return {jobFinishNum} 任务完成情况 大于0说明已完成
 * @return {jobType} 1签到  2跳转链接  3办理销售品，4分享  5登录任务
 * @return {jobName} 任务名称
 * @return {jobBtn} 按钮名称
 */
export function getUserJob() {
  return Request.get({
    url: '/api/dbElvDraw/getUserJob'
  })
}

/**
 * @description: 做任务
 * @param {jobId} 任务id
 */
export function changeDoJob(jobId) {
  return Request.get({
    url: '/api/dbElvDraw/userDoJob',
    params: {
      jobId
    }
  })
}

/**
 * @description: 分享
 * @param {}
 */
export function changeActivityShare() {
  return Request.get({
    url: '/api/dbElvDraw/share',
  })
}

/**
 * @description: 我的奖品
 * @param {}
 */
export function getMyPrize() {
  return Request.get({
    url: '/api/dbElvDraw/myPrize',
  })
}

/**
 * @description: 获取可抽奖次数
 * @param {}
 */
export function getCanDrawNum() {
  return Request.get({
    url: '/api/dbElvDraw/getCanDrawNum',
  })
}

/**
 * @description: 幸运1111
 * @param {}
 */
export function changeluck1111() {
  return Request.get({
    url: '/api/dbElvDraw/luck1111',
  })
}
