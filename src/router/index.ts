import { KeepAlive } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:()=>import ('@/views/home.vue'),
      meta:{
        KeepAlive:true
      }
    },
    {
      path:'/discover',
      name:'discover',
      component:()=>import('@/views/discover/discover.vue'),
      meta:{
        KeepAlive:true
      }
    },
    {
      path:'/TV',
      name:'TV',
      component:()=>import('@/views/tv/tv.vue'),
      redirect: '/TV/TVAiringToday',
      children:[
        {
          path:'TVAiringToday',
          name:'TVAiringToday',
          component:()=>import('@/views/tv/TVAiringToday.vue')
        },
        {
          path:'TVPopular',
          name:'TVPopular',
          component:()=>import('@/views/tv/TVPopular.vue')
        },
        {
          path:'TVonTheAir',
          name:'TVonTheAir',
          component:()=>import('@/views/tv/TVonTheAir.vue')
        },
        {
          path:'TVtopRated',
          name:'TVtopRated',
          component:()=>import('@/views/tv/TVtopRated.vue')
        },
        {
          path:'TVDetail',
          name:'TVDetail',
          component:()=>import('@/views/tv/TVDetail.vue'),
          meta:{
            KeepAlive:true
          }
        }
      ]
    },
    {
      path:'/movie',
      name:'movie',
      component:()=>import('@/views/movie/movie.vue') ,
      redirect: '/movie/movieNowPlaying',
      children:[
        {
          path:'movieUpcoming',
          name:'movieUpcoming',
          component:()=>import('@/views/movie/movieUpcoming.vue')
        },
        {
          path:'moviePopularity',
          name:'moviePopularity',
          component:()=>import('@/views/movie/moviePopularity.vue'),
        },
        {
          path:'movieTopRated',
          name:'movieTopRated',
          component:()=>import('@/views/movie/movieTopRated.vue'),
        },
        {
          path:'movieNowPlaying',
          name:'movieNowPlaying',
          component:()=>import('@/views/movie/movieNowPlaying.vue'),
        },{
          path:'movieDetail',
          name:'movieDetail',
          component:()=>import('@/views/movie/movieDetail.vue'),
          meta:{
            KeepAlive:true
          }
        }
      ]
    },

    {
      path:'/people',
      name:'people',
      component:()=>import('@/views/people/people.vue')
    },
    {
      path:'/setting',
      name:'setting',
      component:()=>import('@/views/setting/setting.vue')
    }
  ],
})
// router.beforeEach((to, from, next) => {
//   if (to.fullPath !== '/home') {
//     // 当刷新时重定向到首页
//     next('/home');
//   } else {
//     next();
//   }
// });
export default router
