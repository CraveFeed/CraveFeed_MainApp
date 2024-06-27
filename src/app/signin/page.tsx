"use client"
import { Button, Card, Form, Input } from 'antd'
import React from 'react'
import '../signin/login.css'


export default function page() {
  return (
    
   <div  className='main-style'>
    <Card   className='Login-card '>
     <h5 style={{color:"whitesmoke", fontSize:"20px", margin:"auto" ,textAlign:"center"}}>Welcome Back To CraveFeed</h5>
     
      <Form layout="vertical"style={{paddingTop:"40px"}}>
     <Form.Item
      
      label={<span style={{color:'white'}}>Username</span>}
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input style={{height:"35px",backgroundColor:"rgba(0, 0, 0, 0.194)" , color:"white" , }}/>
    </Form.Item>
    <Form.Item
      label={<span style={{color:'white'}}>Password</span>}
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password style={{height:"35px",backgroundColor:"rgba(0, 0, 0, 0.194)" , color:"white"}}/>
    </Form.Item>
    </Form>
    <h5 style={{textAlign:"right",cursor:"pointer"}}>Forgot Password ?</h5>
    <div style={{display: "flex", justifyContent: "center"}}>
    <Button style={{backgroundColor:"#051017",display:"flex" , alignItems:"center" , verticalAlign:"middle"}} > <span style={{color:"white", fontWeight:"700", padding:"10px 30px 10px 30px",letterSpacing:"5px" }}>EXPLORE</span></Button></div>
    <div style={{paddingTop:"30px",display:"flex", justifyContent:"center"}}>
      <span className='create-new'>Don't have an account ? <span style={{color:"blue"}}>Create one</span></span>
    </div>
   </Card>
 
    
  </div>
  
 
  )
}
