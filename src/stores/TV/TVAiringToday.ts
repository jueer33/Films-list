import { defineStore } from "pinia";
import { options} from '../../http/authorization';
import {fileAPI} from '@/http/api'
import  apllyApi from '@/utils/apiUtil'
// 调用函数并传递 options 参数
const result =await apllyApi(fileAPI.TVAiringToday,options)

// console.log(result)

// console.log(data)
export const  useTVAiringToday = defineStore('TVAiringToday',{
    state:()=>({result}),
    getters:{},
    actions:{}
})

