"use client"
import { Button, Card, Col, Form, Input, Row, Space } from 'antd'
import React from 'react'
import '../styles/login.css'
import SignTypo from '../Components/SignTypo'
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'

export default function page() {
  return (
    <>
    
    <header className='header-style'>
      <span style={{padding:"30px 0 0 60px" , fontSize:"20px"}}>LOGO-SPACE</span>
      <div style={{padding:"30px 60px 0 0"  }}>
      <Button type='primary' style={{padding:"5px 20px 5px 20px"}}><span>SignUp</span></Button>
      </div>
    </header>
   <div  className='main-style'>
    <Card  style={{ width: 600, height: 500 ,padding:"20px" }} className='Login-card'>
     <h5 style={{color:"whitesmoke", fontSize:"20px", margin:"auto" ,textAlign:"center"}}>Welcome Back To CraveFeed</h5>
     
      <Form style={{paddingTop:"40px"}}>
     <Form.Item
      label={<span style={{color:'white'}}>Username</span>}
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label={<span style={{color:'white'}}>Password</span>}
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    </Form>
    <h5 style={{textAlign:"right",cursor:"pointer"}}>Forgot Password ?</h5>
    <div style={{display: "flex", justifyContent: "center"}}>
    <Button style={{backgroundColor:"#87CEEB",display:"flex" , alignItems:"center" , verticalAlign:"middle"}} > <span style={{color:"black", fontWeight:"700", padding:"5px 50px 5px 50px",letterSpacing:"5px" }}>EXPLORE</span></Button></div>

    <div style={{padding:"20px" , paddingTop:"70px"}}>
    <Button style={{margin:"5px"}}  className='button-google' block>
      <img src={google.src} style={{width:"25px"}}></img>
     <span style={{color:"#1B2730",fontWeight:"600"}}>SIGN IN WITH GOOGLE</span>
    </Button>
    <Button style={{margin:"5px"}}  className='button-google' block>
      <img src={facebook.src} style={{width:"30px"}}></img>
    <span style={{color:"#1B2730" , fontWeight:"600"}}>SIGN IN WITH FACEBOOK</span>
    </Button>
    </div>
    
   </Card>
 
    <SignTypo />
  </div>
  
   </>
  )
}
