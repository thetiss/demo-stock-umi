import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import moment from 'moment'
import styles from './DataCardItem';
import './CreateForm.css'

interface CreateFormProps {
    modalVisible: boolean
    onCancel: () => void
    editRecord: any
}


const namespace = 'products';
const namespaceToLocal = '产品';

const CreateForm: FC<CreateFormProps> = ( props) => {
    const { modalVisible, onCancel, editRecord } = props;   
    return(
        <Modal 
            title={(editRecord?"编辑":"新建")+namespaceToLocal}
            width={1000}//className="modal"
            visible={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
            destroyOnClose
        >
            {props.children}
        </Modal>
    )
}

export default CreateForm;