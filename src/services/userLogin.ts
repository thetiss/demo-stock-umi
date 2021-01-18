import { extend } from 'umi-request';
import { message } from 'antd';
import { IUserLoginForm } from '../pages/account/login';

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

export const userLogin = async ( params: IUserLoginForm ) => {
    return extendRequest('/api/manage/user/login.do',{
        method: "POST",
        data: params
    })
}