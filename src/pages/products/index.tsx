import React, { FC, useState, useRef } from 'react';
import { Divider, message, Button, Card, Row, Col, Input, Select } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, Search } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons'

import CreateForm from './components/CreateForm';
import DataCardGroup from './components/DataCardItem';
import { IProductProps } from './data';
import * as ProductsService from './service';

// 查询后端接口
// 返回 Promise
const protableRequestHandler = async (params?: any, sort?: any, filter?: any,searchType?: string, searchValue?: string, event?: any) => {
    console.log("params",params);
    let fetchParams;
    if(!params.direction) {
        fetchParams = {
            pageNum: params.current
        }
    } else {
        fetchParams = {
            pageNum: params.current,
            searchType: params.searchType,
            searchValue: params.direction,
        }
    }
    const response = await ProductsService.fetchProducts(fetchParams);
    if ( response.status ===0 && response.data.list ) {
        return {
            data: response.data.list,
            success: true,
            total: response.data.total,
        };
    } else {
        message.error(response.msg);
        return {
            data: [],
            success: false,
            total: 0,
        }      
    }
}


 // onSubmit={ async (value: IProductProps) => {
                    //     console.log("onSummit here");
                    //     console.log(value);
                    //     const response = await handleAdd(value);
                    //     if(response){
                    //         setModalVisible(false);
                    //         if(actionRef.current){
                    //             actionRef.current.reload();
                    //         }
                    //     }
                    // }}   

const handleUpdate = async () => {

}

const handleRemove = async () => {

}

const namespace = 'products';
const namespaceToLocal = '产品';

const TableList: FC = () => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    // const [ editRecord, setModalVisible ] = useState<boolean>(false);
    const [ searchValue, setSearchValue ] = useState<string | number>("");
    const [ params, setParams ] = useState();
    const actionRef = useRef<ActionType>();
    const { Option } = Select;
    const { Search } = Input;
    const onAddProduct = () => {
        setModalVisible(true);
    }
    // e.g. {"status":0,"data":"新增产品成功"}
    const handleAdd = async ( newProduct: any) => {
        const response = await ProductsService.addProduct(newProduct);
        console.log("response",response);
        if( response.status === 0 ) {
            setModalVisible(false);
            if(actionRef.current){
                            actionRef.current.reload();
                        }
            message.success(response.data);    
            return true;    
        } else {
            message.error("新增产品失败！");
            return false;
        }
    }
    const columns: ProColumns< IProductProps>[] = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            hideInForm: true,
            hideInSearch: true
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            hideInSearch: true
        },
        {
            title: '描述',
            dataIndex: 'subtitle',
            key: 'subtitle',
            hideInSearch: true
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            hideInSearch: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            hideInForm: true,
            hideInSearch: true
        },  
        {
            title: '一级分类',
            dataIndex: 'parentCategoryId',
            key: 'parentCategoryId',
            hideInTable: true,
            hideInSearch: true
        },                        
        {
            title: '二级分类',
            dataIndex: 'categoryId',
            key: 'categoryId',
            hideInTable: true,
            hideInSearch: true
        },        
        {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            hideInTable: true,
            hideInSearch: true
        },                        
        {
            title: '图片主机',
            dataIndex: 'imageHost',
            key: 'imageHost',
            hideInTable: true,
            hideInSearch: true
        }, 
        {
            title: '图片',
            dataIndex: 'mainImage',
            key: 'mainImage',
            hideInTable: true,
            hideInSearch: true
        },                        
        {
            title: '详情',
            dataIndex: 'detail',
            key: 'detail',
            hideInTable: true,
            hideInSearch: true
        }, 
        {
            title: '操作',
            dataIndex: '',
            hideInForm: true,
            render: () => (
                <>
                    <a>查看</a>
                    <Divider type="vertical" />
                    <a>编辑</a>
                </>                
            )            
        },
        {
            title: '',
            dataIndex: 'searchType',
            hideInTable: true,
            hideInForm: true,
            initialValue: 'productName',
            valueType: 'select',
            request: async () => [
              {
                label: '按名称',
                value: 'productName',
              },
              {
                label: '按ID',
                value: 'productId',
              }
            ],
          },        
        {
            title: '',
            key: 'direction',
            hideInTable: true,
            hideInForm: true,
            dataIndex: 'direction',
            renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
                console.log("renderFormItem here");            
              if (type === 'form') {
                return null;
              }
              const searchType = form.getFieldValue('searchType');
              console.log("searchType here",searchType);
              return (
                <Search allowClear onSearch={(value, event) => protableRequestHandler(searchType, value, event)}/>
              );
            },
          },        
    ]
    return(
        <>
            <ProTable<IProductProps>
                params={params}
                columns={columns}
                request={protableRequestHandler}
                toolBarRender={ () => [
                    <Button key='addUser' type='primary' onClick={() => onAddProduct()} >
                    <PlusOutlined />新建{namespaceToLocal}
                    </Button>
                ]}
                rowKey="id"
                actionRef={actionRef}
                search={{
                    defaultCollapsed: false,
                    optionRender: ({ searchText, resetText }, { form }) => [

                    ]
                 }}         
            />
            <CreateForm 
                modalVisible={modalVisible}
                onCancel={() => setModalVisible(false)}
            >
                <ProTable<IProductProps>
                    type="form"
                    columns={columns} 
                    onSubmit={(value) => handleAdd(value)}        
                    // onSubmit={ async (value: IProductProps) => {
                    //     console.log("onSummit here");
                    //     console.log(value);
                    //     const response = await handleAdd(value);
                    //     if(response){
                    //         setModalVisible(false);
                    //         if(actionRef.current){
                    //             actionRef.current.reload();
                    //         }
                    //     }
                    // }}       
                />
            </CreateForm> 
        </>
    )
}

const ProductsInfo = () => {
    return(
        <PageContainer>
            <DataCardGroup />
            <TableList />
        </PageContainer>
    )
}
export default ProductsInfo;