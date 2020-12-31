import { extend } from 'umi-request'
import { message } from 'antd'

const errorHandler = function (error: any) {
    if(error.response){
        console.log(error.response);
        if(error.response.status > 400){
            console.log(error.data)
            message.error(error.data.message?error.data.message:error.data)
        }else{
            message.error('Network Error')
        }
    }
    throw error;
}
const extendRequest = extend({errorHandler});

export const fetchTotalNum = async () => {
    return extendRequest('/api/manage/statistic/base_count.do')
}
