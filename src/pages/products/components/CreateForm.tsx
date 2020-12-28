import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import moment from 'moment'
import styles from './DataCardItem';
import './CreateForm.css'

interface CreateFormProps {
    modalVisible: boolean
    onCancel: () => void
    editRecord: any
    children: any
    form: any
}


const namespace = 'products';
const namespaceToLocal = '产品';

const CreateForm: FC<CreateFormProps> = ( props) => {
    const { modalVisible, onCancel, editRecord, form } = props;
    if( editRecord && editRecord.hasOwnProperty('id') ) {
        console.log("update btn");
        let currentEditRecord: any= {};
        currentEditRecord.name = editRecord.name;
        currentEditRecord.subtitle = editRecord.subtitle;
        currentEditRecord.price = editRecord.price;
        currentEditRecord.parentCategoryId = editRecord.parentCategoryId;
        currentEditRecord.categoryId = editRecord.categoryId;
        currentEditRecord.stock = editRecord.stock;
        currentEditRecord.imageHost = editRecord.imageHost;
        currentEditRecord.mainImage = editRecord.mainImage;
        currentEditRecord.detail = editRecord.detail;

        console.log(currentEditRecord);
        const searchType = form.getFieldValue('subtitle');
        console.log("what form");
        console.log(searchType);

        form.setFieldsValue({
            // currentEditRecord,
            name: editRecord.name,
            subtitle: editRecord.subtitle,
            price: editRecord.price,            
            parentCategoryId: editRecord.parentCategoryId,
            categoryId: editRecord.categoryId,
            stock: editRecord.stock,           
            imageHost: editRecord.imageHost,
            mainImage: editRecord.mainImage,
            detail: editRecord.detail,
       })
    } else {
       console.log("add btn");
       form.resetFields();    
    }      
    return(
        <Modal 
            title={(editRecord?"编辑":"新建")+namespaceToLocal}
            width={1000}//className="modal"
            visible={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            {props.children}
        </Modal>
    )
}

export default CreateForm;