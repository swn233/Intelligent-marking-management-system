import {createRouter,createWebHistory}from "vue-router";
import {unauthorized} from '@/net'
const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'welcome',
            component:()=>import('../views/Welcome.vue'),
            children:[
                {
                    path:'',
                    name:'welcome-login',
                    component:()=>import('../views/welcome/LoginPage.vue')
                },
                {
                    path:'register',
                    name:'welcome-register',
                    component:()=>import('../views/welcome/RegisterPage.vue')
                },
                {
                    path:'reset',
                    name:'welcome-reset',
                    component:()=>import('../views/welcome/ResetPage.vue')
                }
            ]
        },{
            path:'/index/',
            name:'index',
            component:()=>import('../views/welcome/IndexView.vue'),
            children:[
                {
                    path:'',
                    name:'index-overview',
                    component:()=>import('../views/index/PhotoOverview.vue')
                },{
                    path:'PhotoManage',
                    name:'index-manage',
                    component:()=>import('../views/index/PhotoManage.vue')
                },{
                    path:'PhotoShow',
                    name:'index-show',
                    component:()=>import('../views/index/PhotoShow.vue')
                }
            ]
        }
    ]
})

router.beforeEach((to,from,next)=>{
    const isUnauthorized=unauthorized()
    if(to.name.startsWith('welcome-')&&!isUnauthorized){
        next('/index')
    }else if(to.fullPath.startsWith('/index')&&isUnauthorized){
        next('/')
    }else {
        next()
    }
})

export default router