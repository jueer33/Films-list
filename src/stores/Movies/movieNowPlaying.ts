import { defineStore } from "pinia";
import { options} from '../../http/authorization';
import {fileAPI} from '@/http/api'
import  apllyApi from '@/utils/apiUtil'
// 调用函数并传递 options 参数
const result =await apllyApi(fileAPI.movieNowPlaying,options)

// console.log(result)

// console.log(data)
export const  usemovieNowPlaying = defineStore('movieNowPlaying',{
    state:()=>({result}),
    getters:{},
    actions:{}
})

