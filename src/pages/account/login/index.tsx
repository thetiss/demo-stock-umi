import React, { useEffect } from 'react';
import ProForm, { ProFormText, ProFormCaptcha, ProFormSwitch } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { userLogin } from '../../../services/userLogin';
import styles from './style.less';

export interface IUserLoginForm {
  username: string
  password: string
  isAdmin: boolean
}

const Login = () => {
    const handleUserLogin = async ( value: IUserLoginForm ) => {
      const response = await userLogin(value);
      console.log("here is ");
      console.log(value);
      console.log(response);
    }
    return(
        <>
        <div className={styles.container}>        
            <ProForm
              onReset={()=>{alert('reset btn')}}
              submitter={{
                searchConfig: {
                  submitText: '登录',
                  resetText: '重置',
                },
                // 完全自定义整个区域
                render: (props, doms) => {
                  console.log(props);
                  console.log(props.form?.getFieldValue());
                  return [
                    <button type="button" key="rest" onClick={() => props.form?.resetFields()}>
                      重置
                    </button>,
                    <button type="button" key="submit" onClick={() => props.form?.submit?.()}>
                      提交
                    </button>,
                  ];
                },
                submitButtonProps: {
                  size: 'large',
                  style: {
                    width: '25%',
                  },
                },
               
              }}
            >
                <div className={styles.iconSets}>
                    <img className={styles.icon} alt="logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"/>
                </div>   
                <span className={styles.loginTitle}>
                    <h3>登录仓管系统</h3>
                </span>  
                <ProFormText
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined />,
                    }}
                    name="username"
                    placeholder="请输入用户名"
                    rules={[
                        {
                        required: true,
                        message: '请输入用户名!',
                        },
                        {
                        pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                        message: '4到16位（字母，数字，下划线，减号）!',
                        },
                    ]}
                    />       
                 <ProFormText
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined />,
                    }}
                    name="password"
                    placeholder="请输入密码"
                    rules={[
                        {
                        required: true,
                        message: '请输入密码!',
                        },
                        {
                        pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
                        message: '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符!',
                        },
                    ]}
                  />
                <ProFormSwitch  
                  name='isAdmin'     
                  label='是否管理员'
                  checkedChildren={<CheckOutlined />}       
                  unCheckedChildren={<CloseOutlined />}       
                  initialValue={true} 
                />

            </ProForm>
        </div>
        </>
    )
}
export default Login;