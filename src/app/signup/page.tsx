"use client"
import {  Card, Form, Image, Input, Select, SelectProps, Space, Typography } from 'antd'
import React from 'react'
import '../signup/signup-style.css'
import google from '../assets/google.png'

import { options } from '../Components/MainIngredient' 
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};




export default function SignUp() {
  return (
    <>
    <Card className='card-parent' >
    <span  className='heading-signup'>CraveFeed</span>
    <Space direction="vertical" size="middle">
     
     <Card className='card-child1' >
     <Image className="avatar" width={70} height={62} src={google.src}/>
     <div className='align-first'>
     <Form.Item
      label={<span style={{color:'black'}}>First Name</span>}
      name="First Name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input/>
    </Form.Item>
     <Form.Item
      label={<span style={{color:'black'}}>Last Name</span>}
      name="Last Name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
     </div>
     <div>
     <Form.Item
      label={<span style={{color:'black'}}>Email</span>}
      name="email"
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}
    >
      <Input />
    </Form.Item>
     </div>


     <div className='align-first'>

     <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

  
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
     </div>
     <div>
     <Form.Item
        name="intro"
        label="Intro"
        rules={[{ required: true, message: 'Please input Intro' }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
     </div>
     </Card>
     <Card className='card-child2'>
      <div>
      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      </div>
      <div >
      <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Main Ingredient"
  
    options={options}
    optionRender={(option) => (
      <Space>
        {option.data.desc}
      </Space>
    )}
  />
      <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Main Ingredient"
    
    options={options}
    optionRender={(option) => (
      <Space>
        {option.data.desc}
      </Space>
    )}
  />
      </div>
      <div >
      <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Main Ingredient"
  
    options={options}
    optionRender={(option) => (
      <Space>
        {option.data.desc}
      </Space>
    )}
  />
      <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Main Ingredient"
    
    options={options}
    optionRender={(option) => (
      <Space>
        {option.data.desc}
      </Space>
    )}
  />
      </div>
      <div >
      <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Main Ingredient"
  
    options={options}
    optionRender={(option) => (
      <Space>
        {option.data.desc}
      </Space>
    )}
  />
      <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Main Ingredient"
    
    options={options}
    optionRender={(option) => (
      <Space>
        {option.data.desc}
      </Space>
    )}
  />
      </div>
     </Card>
    </Space>
    </Card>
    </>
  )
}
