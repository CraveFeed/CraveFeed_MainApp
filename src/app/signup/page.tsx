"use client"
import {  Card, Image, Space, Typography } from 'antd'
import React from 'react'
import '../signup/signup-style.css'
import google from '../assets/google.png'
const { Title } = Typography;

export default function SignUp() {
  return (
    <>
    <Card className='card-parent'>
    <span  className='heading-signup'>CraveFeed</span>
    <Space direction="vertical" size="middle">
     
     <Card className='card-child1'>
     <Image className="avatar" width={70} height={62} src={google.src}/>
  
     </Card>
     <Card className='card-child2'>

     </Card>
    </Space>
    </Card>
    </>
  )
}
