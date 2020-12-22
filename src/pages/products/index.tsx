import React, { FC, useState, useRef } from 'react';
import { Divider, message, Button } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons'

import CreateForm from './components/CreateForm';
import { ITableIistItem, IProductProps } from './data';
import * as ProductsService from './service';

// 查询后端接口
// 返回 Promise
const requestHandler = async (params: any, sort: any, filter: any) => {
    const response = await ProductsService.queryProducts({
        pageNum: params.current
    });
    if ( response.status ===0 && response.data.list ) {
        //message.success("查询成功");
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

// e.g. {"status":0,"data":"新增产品成功"}
const handleAdd = async ( fields: IProductProps) => {
    const response = await ProductsService.addProduct(fields);
    console.log("response",response);
    if( response.status === 0 ) {
        message.success(response.data);    
        return true;    
    } else {
        message.error("新增产品失败！");
        return false;
    }
}

const handleUpdate = async () => {

}

const handleRemove = async () => {

}

const namespace = 'products';
const namespaceToLocal = '产品';

const TableList: FC = () => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    // const [ editRecord, setModalVisible ] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const onAddProduct = () => {
        setModalVisible(true);
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
        },
        {
            title: '描述',
            dataIndex: 'subtitle',
            key: 'subtitle',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            hideInForm: true,
        },  
        {
            title: '一级分类',
            dataIndex: 'parentCategoryId',
            key: 'parentCategoryId',
            hideInTable: true,
        },                        
        {
            title: '二级分类',
            dataIndex: 'categoryId',
            key: 'categoryId',
            hideInTable: true,
        },        
        {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            hideInTable: true,
        },                        
        {
            title: '图片主机',
            dataIndex: 'imageHost',
            key: 'imageHost',
            hideInTable: true,
        }, 
        {
            title: '图片',
            dataIndex: 'mainImage',
            key: 'mainImage',
            hideInTable: true,
        },                        
        {
            title: '详情',
            dataIndex: 'detail',
            key: 'detail',
            hideInTable: true,
        }, 
        {
            title: '操作',
            dataIndex: 'action',
            hideInForm: true,
            render: () => (
                <>
                    <a>查看</a>
                    <Divider type="vertical" />
                    <a>编辑</a>
                </>                
            )            
        },
    ]
    return(
        <>
            <ProTable<IProductProps>
                columns={columns}
                request={requestHandler}
                toolBarRender={ () => [
                    <Button key='addUser' type='primary' onClick={() => onAddProduct()} >
                    <PlusOutlined />新建{namespaceToLocal}
                    </Button>
                ]}
                rowKey="id"
                actionRef={actionRef}              
            />
            <CreateForm 
                modalVisible={modalVisible}
                onCancel={() => setModalVisible(false)}
            >
                <ProTable<IProductProps>
                    type="form"
                    columns={columns}         
                    onSubmit={ async (value: IProductProps) => {
                        console.log("onSummit here");
                        console.log(value);
                        const response = await handleAdd(value);
                        if(response){
                            setModalVisible(false);
                            if(actionRef.current){
                                actionRef.current.reload();
                            }
                        }
                    }}       
                />
            </CreateForm>
        </>
    )
}
export default TableList;