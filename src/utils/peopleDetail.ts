// 获取某个人的具体详细信息
import { options} from '@/http/authorization';
import {fileAPI} from '@/http/api'
import  apllyApi from '@/utils/apiUtil'
// 调用函数并传递 options 参数
async function getPeopleDetail(peopleID:number){
    const url = `${fileAPI.personDetail}${peopleID}`
    const result =await apllyApi(url,options)
    return result
}

export default getPeopleDetail