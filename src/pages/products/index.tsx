import React, { FC, useState, useRef, useEffect } from 'react';
import { Divider, message, Button, Card, Row, Col, Input, Select, Form, Popover } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, Search } from '@ant-design/pro-table';
import { PlusOutlined, ToTopOutlined , StopOutlined } from '@ant-design/icons'

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



const handleRemove = async () => {

}

const namespace = 'products';
const namespaceToLocal = '产品';

const TableList: FC = () => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ editRecord, setEditRecord ] = useState<IProductProps | undefined>();
    const [ initialValues, setInitialValues ] = useState<IProductProps | undefined>();
    const [ form ] = Form.useForm();
    const [ searchValue, setSearchValue ] = useState<string | number>("");
    const [ params, setParams ] = useState();
    const actionRef = useRef<ActionType>();
    const { Option } = Select;
    const { Search } = Input;

    // 
    useEffect(()=>{
        console.log("***editRecord changed***");
        console.log(editRecord);
        console.log("*** ***");

        setInitialValues(editRecord);
    },[editRecord])

    const onAddProduct = () => {
        setInitialValues(undefined);
        setModalVisible(true);

    }
    // e.g. {"status":0,"data":"新增产品成功"}
    const handleAdd = async ( newProduct: any) => {
        const response = await ProductsService.addProduct(newProduct);
        if( response.status === 0 ) {
            setModalVisible(false);
            if(actionRef.current){
                console.log("actionRef here==handleAdd");
                actionRef.current.reload();
            }
            message.success(response.data);    
            return true;    
        } else {
            message.error("新增产品失败！");
            return false;
        }
    }

    const handleUpdate = async ( currentProduct: IProductProps ) => {
        console.log("handleUpdate here");
        let currentProductId:number = 0;
        currentProduct.id ? currentProductId = currentProduct.id :'';
        const response = await ProductsService.getProductById(currentProductId);
        if( response.status === 0 && response.data) {
            setEditRecord(response.data);
            if(actionRef.current){
                console.log("actionRef here==handleUpdate");
                actionRef.current.reload();
            }
            //setInitialValues(response.data);
            setModalVisible(true);
            return true;    
        } else {
            return false;
        }            
    }

    const handleSetProductStatus = async ( currentProduct: IProductProps ) => {
        const { id, status } = currentProduct;
        console.log("待改id 和 状态是： ");
        console.log(id);
        console.log(status);        
        const response = await ProductsService.setProductStatus( {id, status});
        if( response.status === 0 && response.data) {
            //setEditRecord(response.data);
            //setInitialValues(response.data);
            //setModalVisible(true);
            message.info(response.data);
            if(actionRef.current){
                console.log("actionRef here==handleSetProductStatus");
                actionRef.current.reload();
            }
            return true;    
        } else {
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
            hideInSearch: true,
            render: (text: any, record: IProductProps) => {
                interface IProductStatus {
                    statusText: '在售' | '已下架'
                    btnText: '上架' | '下架'
                    btnRedColor: true | false
                    btnIcon: 'stop' | 'arrow'
                };
                let currentProductStatus: IProductStatus = { // 默认status=1,意指在售
                    statusText: '在售',
                    btnText: '下架',
                    btnRedColor: true,
                    btnIcon: 'stop',
                };
                const { status } = record;
                if(status !== 1) {                    
                    currentProductStatus = {
                        statusText: '已下架',
                        btnText: '上架',
                        btnRedColor: false,
                        btnIcon: 'arrow',
                    }; 
                }
                return(
                    <>
                        <span>{currentProductStatus.statusText}</span>
                        <Divider type="vertical" />
                        <Popover content={currentProductStatus.btnText}>
                            <Button 
                                onClick={()=>handleSetProductStatus(record)} 
                                shape="circle"  
                                danger={currentProductStatus.btnRedColor}
                            >
                                    {status !== 1?<ToTopOutlined />:<StopOutlined />}
                            </Button>
                        </Popover>

                    </>
                )
            }
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
            render: (text: any, record: IProductProps) => (
                <>
                    <a onClick={() => handleUpdate(record)}>查看{record.id}</a>
                    <Divider type="vertical" />
                    <a>编辑{record.name}</a>
                    <Divider type="vertical" />
                    <a onClick={() => {
                        if(actionRef.current) {
                            actionRef.current.reload();
                            console.log("手动刷新");
                        }
                    }}>手动刷新</a>
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
              if (type === 'form') {
                return null;
              }
              const searchType = form.getFieldValue('searchType');
              return (
                <Search allowClear onSearch={(value, event) => protableRequestHandler(searchType, value, event)}/>
              );
            },
        },                    
    ]
    return(
        <>
            <ProTable
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
                editRecord={editRecord}
            >
                <ProTable
                    type="form" 
                    //form={{ initialValues:editRecord }}
                    form={{ initialValues }}
                    columns={columns} 
                    onSubmit={(value) => handleAdd(value)}  
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