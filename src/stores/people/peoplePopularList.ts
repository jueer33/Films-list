import { defineStore } from "pinia";
import { options} from '../../http/authorization';
import {fileAPI} from '@/http/api'
import  apllyApi from '@/utils/apiUtil'
// 调用函数并传递 options 参数
const result =await apllyApi(fileAPI.peoplePopularList,options)

// console.log(result)

// console.log(data)
export const  uespeoplePopularList = defineStore('peoplePopularList',{
    state:()=>({result}),
    getters:{},
    actions:{}
})

