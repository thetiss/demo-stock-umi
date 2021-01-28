import { extend } from 'umi-request';
import { message } from 'antd';
import { IUserLoginForm } from '../pages/account/login';

const errorHandler = function (error: any) {
    if(error.response){
        console.log(error.response);
        if(error.response.status > 400){
            // console.log(error.data);
            // console.log(error.data.status);
            message.error(error.data.message?error.data.message:error.data)
        }else{
            message.error('Network Error')
        }
    }
    throw error;
}
const extendRequest = extend({errorHandler});

export const userLogin = async ( params: IUserLoginForm ) => {
    params = {
        isAdmin: params.isAdmin,
        username: params.username,
        password: params.password
    };
    console.log('params',params);

    return extendRequest('/api/manage/user/login.do',{ // 不清楚为啥不能登录，怪事情
        method: "POST",
        data: params
    })
}