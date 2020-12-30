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

interface IfetchProductsParams  {
    pageNum: number
    searchValue?: any
    searchType?: any
    [searchType: string]: any
}

interface ISearchProductsParams {
    searchValue: any
    searchType: any
}

// 根据params判断查询接口
export const fetchProducts = async (params: IfetchProductsParams = {pageNum: 1}) => {
    console.log('service here');
    console.log(' |params',params); 
    const isSearchParamsType = params.hasOwnProperty('searchValue');
    if(!isSearchParamsType) {
        return extendRequest('/api/manage/product/list.do', {
            params
        })
    } else {
        const { searchType, searchValue } = params;
        let searchParams = {
            listType: 'search',
            pageNum: 1,
            [searchType!]: searchValue
        }
        return extendRequest('/api/manage/product/search.do',{
            params: searchParams
        })        
    }
}

export const addProduct = async ( params: IProductProps) => {
    return extendRequest('/api/manage/product/save.do',{
        params
    })
}

export const searchProduct = async ( data: ISearchProductsParams ) => {
    const { searchType, searchValue } = data;
    let searchParams = {
        listType: 'search',
        pageNum: 1,
        [searchType!]: searchValue
    }
    return extendRequest('/api/manage/product/search.do',{
        params: searchParams
    })
}

//http://localhost:8000/api/manage/product/detail.do?productId=26
export const getProductById = async ( data: number) => {
    let params = {
        productId: data
    };
    return extendRequest('/api/manage/product/detail.do',{
        params
    })
}

export const setProductStatus = async ( data: any) => {
    const { id, status } = data;
    let params = {
        productId: id,
        status
    };
    return extendRequest('/api/manage/product/set_sale_status.do',{
        params
    })
}

