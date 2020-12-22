import React, { FC } from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
    modalVisible: boolean
    onCancel: () => void
    children: any
}

const CreateForm: FC<CreateFormProps> = ( props) => {
    const { modalVisible, onCancel } = props;
    return(
        <Modal 
            visible={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            {props.children}
        </Modal>
    )
}

export default CreateForm;