<template>
  <div class="page">
    <div v-if="!loginStore.token" @click="data.showLogin = true" class="cover"></div>
    <div class="hdgz-btn" @click="hdgzBtn">活<br />动<br />规<br />则</div>
    <div class="libao-btn" @click="libaoBtn">
      <img src="@/assets/images/option-5/lb-img.png" />
    </div>
    <div class="game_wrap">
      <div class="game_content">
        <div class="pic_pag2" v-if="data.signState">
          <img src="@/assets/images/option-5/photo.png" alt="" />
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="shaizi" @click="gameBtn"><span></span></div>
      <img
        class="game-btn"
        @click="gameBtn"
        src="@/assets/images/option-5/game-btn.gif"
      />
      <p class="cishu-text">剩余次数：<span>0</span></p>

      <div class="cishu-btn">
        <img @click="taskBtn" src="@/assets/images/option-5/cishu-img.png" />
      </div>
      <div class="prize-btn">
        <img
          @click="prizeBtn"
          src="@/assets/images/option-5/my-prize-img.png"
        />
      </div>
    </div>
    <img src="@/assets/images/option-5/bg.jpg" />

    <!-- 登录弹窗 -->
    <div class="popup" v-show="data.showLogin">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-title">
          <span>请登录</span>
          <img src="@/assets/images/option-5/title-bg1.png" />
        </div>
        <div class="popup-content">
          <div class="login-box">
            <div class="login-title">为了奖品发放成功，需输入手机号码哦~</div>
            <div class="fill-row">
              <img class="icon" src="@/assets/images/option-5/icon-phone.png" />
              <input
                type="text"
                class="fill-term"
                placeholder="请输入手机号码"
                maxlength="12"
                v-model="loginData.mobile"
              />
            </div>
            <div class="fill-row">
              <img class="icon" src="@/assets/images/option-5/icon-yz.png" />
              <input type="text" class="fill-term"  v-model="loginData.captchaCode" placeholder="请输入图形验证码" maxlength="8" />
              <img :src="loginStore.imageCode" class="graph-code" @click="changeGraphCode" alt="">
            </div>
            <div class="fill-row">
              <img class="icon" src="@/assets/images/option-5/icon-yz.png" />
              <input type="text" class="fill-term" v-model="loginData.smsCode" placeholder="请输入验证码" maxlength="6" />
              <div class="btn-yz" @click="get_sms_code">{{ data.content }}</div>
            </div>
            <div class="fill-tips">
              （登录成功后，后续将以该登录号码体验“湖南电信”公众号服务）
            </div>
            <a class="popup-bottom-btn" @click="handleLoginClick">开始游戏</a>
          </div>
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 活动规则 -->
    <div class="popup" v-show="data.showHdgz">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-title">
          <span>活动规则</span>
          <img src="@/assets/images/option-5/title-bg1.png" />
        </div>
        <div class="popup-content">
          <div class="popup-hdgz">
            一.活动时间：2023.9.22-2023.12.31<br />
            二.活动规则：每名用户每天可通过投掷骰子来获取大富翁游戏的步数，根据到达的格子来获取相对应的奖励，每人每天通过签到，完成任务，分享链接来获得投骰子的机会。<br />
            三.奖励说明：大富翁游戏可获得的奖励有以下几种<br />
            1.优惠券奖励：可在活动期间使用优惠券享对应的套餐优惠。<br />
            2.话费奖励：可直接兑换到对应的本机号码余额中。<br />
            3.流量奖励：可直接兑换到本月的套餐流量余额中。<br />
            4.实物奖励：将有工作人员联系通过邮寄方式发送到收货地址。
          </div>
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 获取次数 -->
    <div class="popup" v-show="data.showTask">
      <div class="popup-bg"></div>
      <div class="popup-info2">
        <div class="popup-title">
          <span>做任务，得次数</span>
          <img src="@/assets/images/option-5/title-bg2.png" />
        </div>
        <div class="popup-content">
          <div class="margin-bottom-sm text-center">
            完成一个任务得一次掷骰次数!
          </div>
          <div class="task-list">
            <div
              class="task-item"
              :class="item.bg ? 'red' : ''"
              v-for="item in data.taskList"
            >
              <img class="task-icon" :src="item.srcImg" />
              <div class="task-info">
                <div class="task-name">
                  {{ item.name }}<span>({{ item.num }}/1)</span>
                </div>
              </div>
              <a
                href="#"
                class="task-btn"
                v-if="item.btnState == 1"
                @click="signBtn"
                >签到</a
              >
              <a href="#" class="task-btn" v-if="item.btnState == 2">去查看</a>
              <a href="#" class="task-btn" v-if="item.btnState == 3"
                >领取奖励</a
              >
            </div>
          </div>
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 我的奖品 -->
    <div class="popup" v-show="data.showMyPrize">
      <div class="popup-bg"></div>
      <div class="popup-info2">
        <div class="popup-title">
          <span>我的奖品</span>
          <img src="@/assets/images/option-5/title-bg2.png" />
        </div>
        <div class="popup-content">
          <div class="task-list">
            <div class="task-item" v-for="item in data.prizeList">
              <img class="task-icon" :src="item.srcImg" />
              <div class="task-info">
                <div class="task-name">{{ item.name }}</div>
              </div>
              <a href="#" class="task-btn" v-if="item.btnState">去使用</a>
              <a href="#" class="task-btn" v-else @click="goodsBtn">去领取</a>
            </div>
          </div>
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 实物登记 -->
    <div class="popup" v-show="data.showGoods">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-title">
          <span>实物登记</span>
          <img src="@/assets/images/option-5/title-bg1.png" />
        </div>
        <div class="popup-content">
          <div class="login-box popup-goods">
            <div class="fill-row">
              <input
                type="text"
                class="fill-term"
                placeholder="请输入收件人手机号"
              />
            </div>
            <div class="fill-row">
              <input
                type="text"
                class="fill-term"
                placeholder="请输入收件人姓名"
              />
            </div>
            <div class="fill-row">
              <input
                type="text"
                class="fill-term"
                :value="data.addressValue"
                placeholder="请选择所在地市"
                @click="selectBtn"
                readonly
              />
            </div>
            <a href="#" class="popup-bottom-btn">登记</a>
          </div>
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>
    <van-popup v-model:show="data.showAddress" position="bottom">
      <van-area
        v-model="data.defValue"
        title="选择地市"
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <!-- 双11惊喜好礼 -->
    <div class="popup" v-show="data.showLibao">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-title">
          <span>双11惊喜好礼</span>
          <img src="@/assets/images/option-5/title-bg1.png" />
        </div>
        <div class="popup-content">
          <img class="gx-img" src="@/assets/images/option-5/gx-img.png" />
          <div class="popup-text text-center">
            您的在网时长超过1111天，特发放双十一惊喜好礼100元话费抵用券！
          </div>
          <a href="#" class="popup-bottom-btn">领取</a>
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 奖品-->
    <div class="popup" v-show="data.showPrize">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-title">
          <span>获得奖励</span>
          <img src="@/assets/images/option-5/title-bg1.png" />
        </div>
        <div class="popup-content">
          <img class="popup-icon" :src="data.prizeImg" />
          <div class="popup-text text-center">{{ data.prizeName }}</div>
          <a href="#" class="popup-bottom-btn">确定</a>
          <a href="#" class="popup-bottom-btn share-btn" @click="shareHBBtn"
            >分享</a
          >
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 答题-->
    <div class="popup" v-show="data.showPrizeAsk">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-title">
          <span>获得奖励</span>
          <img src="@/assets/images/option-5/title-bg1.png" />
        </div>
        <div class="popup-content">
          <div class="ask-title">什么动物最没有方向感？</div>
          <div class="ask-list">
            <div
              class="ask-item"
              @click="askBtn(item, index)"
              :class="data.currentIndex == index ? 'active' : ''"
              v-for="(item, index) in data.askList"
            >
              <img
                class="ask-icon"
                v-if="item.state"
                src="@/assets/images/option-5/icon-suc.png"
              />
              <img
                class="ask-icon"
                v-if="!item.state"
                src="@/assets/images/option-5/icon-err.png"
              />
              {{ item.text }}
            </div>
          </div>
          <a href="#" class="popup-bottom-btn share-btn" @click="shareBtn"
            >分享</a
          >
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 分享答题 -->
    <div class="popup" v-show="data.showShare">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-tips">长按图片保存至手机相册</div>
        <div class="popup-share">
          <img class="ewm-img" src="@/assets/images/option-5/ewm-img.jpg" />
          <img src="@/assets/images/option-5/share-img.png" />
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>

    <!-- 分享海报 -->
    <div class="popup" v-show="data.showShareHB">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-tips">长按图片保存至手机相册</div>
        <div class="popup-share">
          <img class="ewm-img" src="@/assets/images/option-5/ewm-img.jpg" />
          <img src="@/assets/images/option-5/share-img2.jpg" />
        </div>
        <img
          src="@/assets/images/option-5/close-white.png"
          @click="closeBtn"
          class="close-btn"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import "vant/es/toast/style";
import { reactive, ref, onMounted } from "vue";
import { Toast, showSuccessToast, showFailToast, showToast } from "vant";
import { areaList } from "@vant/area-data";
import { useLogin, useMain } from "@/store";
import {phoneReg} from '@/assets/data/regular'
import { sessionCache } from "@/utils";

const data = reactive({
  signState: true,
  currentIndex: null,
  quan: [2, 4, 8, 13, 17], //券
  hongbao: [5, 15, 19], //红包
  erji: [6], //耳机
  ask: [7, 11, 16], //问题
  shaizi: [10], //骰子
  luyouqi: [14], //路由器
  libao: [20], //终级礼包
  num: 0, //骰子点数的总和，初始值为0

  showPrize: false,
  showPrizeAsk: false,
  prizeImg: require("@/assets/images/option-5/prize-img1.png"),
  prizeName: "恭喜你获得10元副卡抵用券",

  content: "获取验证码",
  currentTime: 60,
  showLogin: false, //登录弹窗
  showHdgz: false, //登录活动规则
  showtask: false, //做任务
  showMyPrize: false, //我的奖品
  showGoods: false, //实物登记填写地址
  showAddress: false, //选择地址
  addressValue: "",
  defValue: "430002",
  showLibao: false, //双11惊喜好礼
  showShare: false, //分享答题
  showShareHB: false, //分享海报
  taskList: [
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon1.png"),
      name: "每日签到",
      num: 0,
      btnState: 1,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon2.png"),
      name: "每日签到",
      num: 0,
      btnState: 2,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon3.png"),
      name: "每日签到",
      num: 0,
      btnState: 2,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon7.png"),
      name: "参与门店活动领惊喜福利",
      num: 0,
      btnState: 3,
      bg: true,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon4.png"),
      name: "每日签到",
      num: 0,
      btnState: 2,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon5.png"),
      name: "每日签到",
      num: 0,
      btnState: 2,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon6.png"),
      name: "查看用户体验官",
      num: 0,
      btnState: 2,
    },
  ],
  prizeList: [
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon1.png"),
      name: "10元副卡抵用券",
      btnState: true,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon2.png"),
      name: "10元副卡抵用券",
      btnState: true,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon3.png"),
      name: "10元副卡抵用券",
      btnState: true,
    },
    {
      id: 0,
      srcImg: require("@/assets/images/option-5/task-icon4.png"),
      name: "实物礼品",
      btnState: false,
    },
  ],
  askList: [
    {
      id: 0,
      text: "A.狮子",
      state: false,
    },
    {
      id: 0,
      text: "B.斑马",
      state: false,
    },
    {
      id: 0,
      text: "C.麋鹿",
      state: true,
    },
  ],
});

const loginData = reactive({
  mobile: '',
  captchaCode: '',
  smsCode: ''
})

const mainStore = useMain()
// 获取任务列表
// mainStore.fetchUserJob()

const loginStore = useLogin()

onMounted(() => {
  if(!loginStore.token) {
    data.showLogin = true
    changeGraphCode()
  }

  for (var i = 1; i < 21; i++) {
    var _val = '<span id="site_' + i + '"></span>';
    $(".game_content").append(_val);
  }
});

/* 获取图形验证码 */
function changeGraphCode() {
  loginStore.fetchGraphCode()
}

// 抽奖
function gameBtn() {
  mainStore.fetchDraw()
  setTimeout(function () {
    data.signState = false;
  }, 1000);
  $(".shaizi span").addClass("yao");
  var the_num = Math.floor(Math.random() * 6 + 1);
  var the_val = '<em class="pic_pag"><span></span></em>';
  //console.log(the_num);
  setTimeout(function () {
    $(".shaizi span").removeClass("yao");
    if (the_num != 0) {
      $(".shaizi span").css("background-position", -2 * (the_num - 1) + "rem");
    }
    data.num += the_num;
    console.log(data.num);
    setTimeout(function () {
      if (data.quan.indexOf(data.num) != -1) {
        //券
        data.showPrize = true;
        (data.prizeImg = require("@/assets/images/option-5/prize-img1.png")),
          (data.prizeName = "恭喜你获得**元副卡抵用券");
      } else if (data.hongbao.indexOf(data.num) != -1) {
        //红包
        data.showPrize = true;
        (data.prizeImg = require("@/assets/images/option-5/prize-img2.png")),
          (data.prizeName = "恭喜你获得**元红包券");
      } else if (data.erji.indexOf(data.num) != -1) {
        //耳机
        data.showPrize = true;
        (data.prizeImg = require("@/assets/images/option-5/prize-img3.png")),
          (data.prizeName = "恭喜你获得蓝牙机");
      } else if (data.ask.indexOf(data.num) != -1) {
        //问题
        data.showPrizeAsk = true;
      } else if (data.shaizi.indexOf(data.num) != -1) {
        //骰子
        data.showPrize = true;
        (data.prizeImg = require("@/assets/images/option-5/prize-img5.png")),
          (data.prizeName = "恭喜你获得1次掷骰次数");
      } else if (data.luyouqi.indexOf(data.num) != -1) {
        //路由器
        data.showPrize = true;
        (data.prizeImg = require("@/assets/images/option-5/prize-img6.png")),
          (data.prizeName = "恭喜你获得路由器");
      } else if (data.libao.indexOf(data.num) != -1) {
        //礼包
        data.showPrize = true;
        (data.prizeImg = require("@/assets/images/option-5/prize-img7.png")),
          (data.prizeName = "恭喜你获得终级大礼包");
      } else {
      }
    }, 600);
    if (data.num < 20) {
      $(".pic_pag").remove();
      $("#site_" + data.num).append(the_val);
    } else if (data.num >= 20) {
      $(".pic_pag").remove();
      $("#site_20").append(the_val);
      data.showPrize = true;
      (data.prizeImg = require("@/assets/images/option-5/prize-img7.png")),
        (data.prizeName = "恭喜你获得终级大礼包");
    } /* else if(data.num>20){
				data.num =data.num%20;
				$(".pic_pag").remove();
				$("#site_"+data.num).append(the_val);
			}	 */
  }, 1000);
}

//获取短信验证码
async function get_sms_code() {
  let currentTime = data.currentTime;
  if (data.content == "获取验证码") {
    if (!phoneReg.test(loginData.mobile)) return showToast("请输入有效手机号码");
    if (!loginData.captchaCode) return showToast("请输入图像验证码");

    const params = {
      mobile: loginData.mobile,
      captchaCode: loginData.captchaCode,
      captchaKey: loginStore.captchaKey
    }
    try {
      await loginStore.fetchSendSms(params)
    data.content = data.currentTime + '秒'
    let tt = setInterval(function () {
      if (currentTime >= 1) {
        currentTime--;
        data.content = currentTime + "秒";
      } else {
        data.content = "获取验证码";
        clearInterval(tt);
      }
    }, 1000);
    } catch(err) {
      console.log(err);
      showToast(err.msg)
      changeGraphCode()
    }

  }
}

// 登录
async function handleLoginClick() {
  if (!phoneReg.test(loginData.mobile)) return showToast("请输入有效手机号码");
  if (!loginData.smsCode) return showToast("请输入验证码");
  const params = {
    mobile: loginData.mobile,
    smsCode: loginData.smsCode,
    state: sessionCache.getCache('state'),
    openid: sessionCache.getCache('openid')
  }
  await loginStore.fetchLogin(params)
  data.showLogin = false
}

//活动规则
function hdgzBtn() {
  data.showHdgz = true;
}

//双11惊喜礼包
function libaoBtn() {
  data.showLibao = true;
}

//获取次数
function taskBtn() {
  data.showTask = true;
}

//签到提示
function signBtn() {
  showSuccessToast("恭喜您，签到成功");
}

//我的奖品
function prizeBtn() {
  data.showMyPrize = true;
}

//实物登记
function goodsBtn() {
  data.showGoods = true;
  data.showMyPrize = false;
}

//选择地市
function selectBtn() {
  data.showAddress = true;
}
function onConfirm(selectedValues) {
  let value = `${selectedValues.selectedOptions[0].text}-${selectedValues.selectedOptions[1].text}-${selectedValues.selectedOptions[2].text}`;
  console.log(value);
  data.addressValue = value;
  data.showAddress = false;
}

//答题
function askBtn(item, index) {
  data.currentIndex = index;
  if (item.state) {
    showSuccessToast("恭喜回答正确，获得一次投掷次数");
  } else {
    showFailToast("对不起，回答错误");
  }
}

//分享答题
function shareBtn() {
  data.showShare = true;
  data.showPrizeAsk = false;
}

//分享海报
function shareHBBtn() {
  data.showShareHB = true;
  data.showPrize = false;
}

//关闭
function closeBtn() {
  data.showLogin = false;
  data.showHdgz = false;
  data.showTask = false;
  data.showGoods = false;
  data.showMyPrize = false;
  data.showLibao = false;
  data.showPrize = false;
  data.showPrizeAsk = false;
  data.showShare = false;
  data.showShareHB = false;
}
</script>
<style scoped>
@import "@/assets/css/option-5/style.css";

.page {
  position: relative;
  background: #ffc984;
  line-height: 0.55rem;
}
.page > .cover {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 799;
}
.hdgz-btn {
  position: absolute;
  right: 0;
  top: 2rem;
  background: #eab05d;
  color: #fff;
  padding: 0.2rem;
  text-align: center;
  border-radius: 0.2rem 0 0 0.2rem;
  line-height: 0.4rem;
}
.libao-btn {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 14.8rem;
  right: 0.1rem;
  z-index: 11;
}
.bottom-box {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0.1rem;
  padding-bottom: 0.15rem;
  z-index: 10;
}
.game-btn {
  position: relative;
  top: -0.8rem;
  z-index: 11;
  width: 50%;
  margin: auto;
  display: block;
}
.cishu-text {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
  color: #963500;
  z-index: 9;
  padding: 0 0.3rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cishu-btn,
.prize-btn {
  position: absolute;
  width: 1.8rem;
  height: 1.8rem;
  bottom: 0.3rem;
  z-index: 9;
}
.cishu-btn {
  left: 0.3rem;
}
.prize-btn {
  right: 0.3rem;
}

.popup-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0;
  z-index: 100;
}
.popup-title span {
  position: absolute;
  width: 100%;
  left: 0;
  color: #a56800;
  padding-top: 0.75rem;
  display: block;
}
.popup-info .popup-content {
  position: relative;
  width: auto;
  margin: -0.4rem 0.3rem 0;
  z-index: 99;
  padding: 0.8rem 0.4rem 0.4rem;
  background: #fff4e5;
  border-radius: 0 0 0.2rem 0.2rem;
}
.popup-info2 .popup-content {
  padding: 1.2rem 0.4rem 0.4rem;
  background: #fff4e5;
}
.popup-info2 .popup-title {
  margin: 0 auto -0.7rem;
  width: 60%;
}

/* 登录 */
/* .login-box {
	} */
.login-title {
  color: #a56800;
}
.fill-row {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0.2rem 0.3rem 0.2rem 0.8rem;
  margin-top: 0.3rem;
  border: solid 1px #ddd;
  border-radius: 0.2rem;
  box-sizing: border-box;
}
.fill-row .icon {
  position: absolute;
  left: 0.2rem;
  color: #0476fb;
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
}
.fill-row .graph-code {
  position: absolute;
  right: 0;
  height: 0.7rem;
  padding: 0 0.2rem;

}
.fill-term {
  flex: 1;
  outline: none;
  background: #fff;
  height: 0.7rem;
  font-size: 0.35rem;
}
.btn-yz {
  position: absolute;
  right: 0.2rem;
  width: 2.5rem;
  padding: 0 0.4rem;
  font-size: 0.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 0.7rem;
  background: #fff;
  border: solid 1px #ecb160;
  color: #ecb160;
  text-align: center;
  border-radius: 0.4rem;
}
.fill-tips {
  margin-top: 0.3rem;
  color: #999;
}
.popup-bottom-btn {
  display: block;
  margin: 0.2rem auto 0;
  width: 3.5rem;
  height: 1.2rem;
  line-height: 1.2rem;
  color: #fff;
  font-size: 0.4rem;
  font-weight: 700;
  background: url("@/assets/images/option-5/popup-btn-img.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.popup-bottom-btn.share-btn {
  color: #a56800;
  background: url("@/assets/images/option-5/popup-btn-img2.png") no-repeat;
  background-size: 100% 100%;
}
.popup-hdgz {
  color: #666;
  max-height: 9rem;
  overflow-y: scroll;
}

/* 任务 */
.task-list {
  max-height: 12rem;
  overflow-y: auto;
}
.task-item {
  position: relative;
  padding: 0.1rem 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffe7c1;
  margin-bottom: 0.3rem;
  border-radius: 0.2rem;
}
.task-item.red {
  background: #ffd1c5;
}
.task-icon {
  width: 1.1rem;
}
.task-info {
  flex: 1;
  padding-left: 0.3rem;
  color: #999;
}
.task-info span {
  color: red;
}
.task-name {
  color: #333;
}
.task-btn {
  position: absolute;
  right: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 0.7rem;
  padding: 0 0.3rem;
  border-radius: 0.4rem;
  color: #fff;
  background: linear-gradient(to right, #ff7e4e, #ff5e64);
}
.task-btn.gray {
  background: #ccc;
}
.popup-goods .fill-row {
  padding: 0.2rem 0.3rem;
}

/* 答题 */
.gx-img,
.popup-icon {
  display: block;
  margin: 0 auto 0.2rem;
  width: 2rem;
}
.ask-title {
  text-align: center;
}
.ask-item {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.8rem;
  background: #fff;
  margin-top: 0.3rem;
  border-radius: 0.5rem;
}
.ask-item.active {
  background: #ffc66f;
  color: #fff;
}
.ask-icon {
  position: absolute;
  left: 0.3rem;
  width: 0.35rem;
  height: 0.35rem;
}

.popup-tips {
  padding-bottom: 0.2rem;
  text-align: center;
  color: #fff;
}
.popup-share {
  position: relative;
}
.ewm-img {
  position: absolute;
  width: 1.7rem;
  height: 1.7rem;
  left: 1.15rem;
  bottom: 0.55rem;
}
.ewm-img2 {
  position: absolute;
  width: 1.7rem;
  height: 1.7rem;
  left: 1.15rem;
  bottom: 0.55rem;
}
</style>
