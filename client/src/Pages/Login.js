import React from 'react'
import {Form, Input, Button} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'
const Login = () => {
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) =>{
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/login',values);
            dispatch(hideLoading())
            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('token',response.data.data)
                navigate('/')
                window.location.reload();
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
                toast.error("Something Went Wrong")
        }
    }
  return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Login Page</h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label={<span style={{ color: 'white' }}>Email</span>} name='email'>
                    <Input id='input'  />
                </Form.Item>
                <Form.Item label={<span style={{ color: 'white' }}>Password</span>} name='password'>
                    <Input id='input' type='password' />
                </Form.Item>
                <div className="d-flex flex-column align-items-center">
                    <Button className='primary-button my-2 full-width-button' htmlType='submit'>Login</Button>
                    <Link to='/register' className='anchor white' >CLICK HERE TO REGISTER</Link>
                </div>
            </Form>
        </div>
        
    </div>
  )
}

export default Login