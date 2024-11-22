import { createRouter, createWebHistory } from 'vue-router'
import tv from '@/views/tv/tv.vue'
import movie from '@/views/movie/movie.vue'
import home from '@/views/home.vue'
import people from '@/views/people/people.vue'


import moviePopularity from '@/views/movie/moviePopularity.vue'
import movieTopRated from '@/views/movie/movieTopRated.vue'
import movieUpcoming from '@/views/movie/movieUpcoming.vue'
import movieNowPlaying from '@/views/movie/movieNowPlaying.vue'


import TVAiringToday from '@/views/tv/TVAiringToday.vue'
import TVPopular from '@/views/tv/TVPopular.vue'
import TVonTheAir from '@/views/tv/TVonTheAir.vue'

import TVtopRated from '@/views/tv/TVtopRated.vue'
import movieDetail from '@/views/movie/movieDetail.vue'
import TVdetail from '@/views/tv/TVdetail.vue'
import discover from '@/views/discover/discover.vue'
import setting from "@/views/setting/setting.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:home ,
    },
    {
      path:'/discover',
      name:'discover',
      component:discover
    },
    {
      path:'/TV',
      name:'TV',
      component:tv,
      redirect: '/TV/TVAiringToday',
      children:[
        {
          path:'TVAiringToday',
          name:'TVAiringToday',
          component:TVAiringToday
        },
        {
          path:'TVPopular',
          name:'TVPopular',
          component:TVPopular
        },
        {
          path:'TVonTheAir',
          name:'TVonTheAir',
          component:TVonTheAir
        },
        {
          path:'TVtopRated',
          name:'TVtopRated',
          component:TVtopRated
        },
        {
          path:'TVDetail',
          name:'TVDetail',
          component:TVdetail
        }
      ]
    },
    {
      path:'/movie',
      name:'movie',
      component:movie ,
      redirect: '/movie/movieNowPlaying',
      children:[
        {
          path:'movieUpcoming',
          name:'movieUpcoming',
          component:movieUpcoming
        },
        {
          path:'moviePopularity',
          name:'moviePopularity',
          component:moviePopularity,
        },
        {
          path:'movieTopRated',
          name:'movieTopRated',
          component:movieTopRated,
        },
        {
          path:'movieNowPlaying',
          name:'movieNowPlaying',
          component:movieNowPlaying,
        },{
          path:'movieDetail',
          name:'movieDetail',
          component:movieDetail,
        }
      ]
    },

    {
      path:'/people',
      name:'people',
      component:people
    },
    {
      path:'/setting',
      name:'setting',
      component:setting
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
