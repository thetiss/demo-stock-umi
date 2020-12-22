import { extend } from 'umi-request'
import { message } from 'antd'
import { IProductProps } from './data';

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

interface IQueryProductsParams  {
    pageNum: number
}

export const queryProducts = async (params: IQueryProductsParams = {pageNum: 1}) => {
    return extendRequest('/api/manage/product/list.do', {
        params
    })
}

export const addProduct = async ( params: IProductProps) => {
    return extendRequest('/api/manage/product/save.do',{
        params
    })
}




