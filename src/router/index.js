import { createRouter, createWebHashHistory } from 'vue-router'
import { useLogin } from '@/store'

const routes = [
	{
	  path: '/',
	  redirect: '/ttqGame'
	},
	//option-5(惠战双11，跳跳棋活动)
	{
	  path: '/ttqGame',
	  name: 'ttqGame',			// 登录
	  component: () => import('@/views/option-5/index'),
	},
	{
	  path: '/abnormal',
	  name: 'abnormal',
	  component: () => import('@/views/option-5/abnormal'),
	},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
	const loginStore = useLogin()

	if(!loginStore.token) {
    await loginStore.getToken();
	}
});

export default router
