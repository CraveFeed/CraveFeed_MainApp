"use client"
import { Button, Card, Form, Input, Select, Space, Steps } from 'antd'
import React from 'react'
import "../signup/signup.css"
import { CgProfile } from "react-icons/cg";
import { AiFillProfile } from "react-icons/ai";
import profilelogo from "../assets/Profilelogo.png"
import Securitylogo from "../assets/Securitylogo.png"

import { options, sweetenerOptions, fatOilOptions, seasoningOptions } from '../Components/MainIngredient'
import { ProfileOutlined, SecurityScanOutlined } from '@ant-design/icons';
export default function Signup() {
  const [current, setCurrent] = React.useState(0)
  const [choices, newChoices] = React.useState(null);
  const [security, newSecurity] = React.useState(null);
  const [profile, newProfile] = React.useState(null);
  const onfinishloginform = (value) => {
    newProfile(value);
    setCurrent(1)
  }
  const onfinishChoicesform = (value) => {
    newChoices(value);
    setCurrent(2)
  }
  const onfinishsecurityform = (value) => {
    newSecurity(value);
    setCurrent(3)
  }
  const onfinish = (value) => {
    newSecurity(value);
    setCurrent(4)
  }
  const forms = [
    <Profileinfo onFinish={onfinishloginform} initialValues={profile} />,
    <Choices onFinish={onfinishChoicesform} initialValues={choices} />,
    <Security onFinish={onfinishsecurityform} initialValues={security} />,
    <Finish onFinish={onfinish} />
  ]
  return (
    <>
    
      <div className='main-align'>

        <div className='left-part'>
          <div className='left-inside'>
            <div style={{ fontSize: "40px", paddingBottom: "50px" }}>
              <span style={{color:"white"}}>CraveFeed</span></div>
            <Steps direction="vertical" style={{ color: "white" }} className="custom-steps" onChange={setCurrent} current={current}>
              <Steps.Step title="Personal Info" className='steps'></Steps.Step>
              <Steps.Step title="Choices" className='steps'></Steps.Step>
              <Steps.Step title="Security"></Steps.Step>
              <Steps.Step title="Finish"></Steps.Step>
            </Steps></div>
        </div>
        <div >
          <Card style={{ width: 900, padding: "50px 60px 50px 60px" }} className='Card-left'>
            <span className='Sign-in'>SIGN IN</span>
            <Card style={{ padding: "0 60px 60px 60px" ,backgroundColor:" #051017",}} className='hello'>
              {forms[current]}
            </Card>
          </Card>
        </div>
      </div>

    </>
  )





  function Profileinfo({ onFinish, initialValues }) {
    return (
      <>
        <div style={{color:"white",fontSize: "25px", paddingBottom: "40px", paddingTop: "30px", fontWeight: "600" }}><ProfileOutlined style={{paddingRight:"10px"}}/>Profile Information</div>
        <Form onFinish={onFinish} initialValues={initialValues}>

          <Form.Item label="First Name" name={"First name"} rules={[{ required: true }]}>
            <Input style={{backgroundColor:"#051017",color:"white"}}></Input>
          </Form.Item>
          <Form.Item label="Last Name" name={"Last name"} rules={[{ required: true }]}>
            <Input style={{backgroundColor:"#051017",color:"white"}}></Input>
          </Form.Item>
          <Form.Item label="E-mail" name={"email"} rules={[{ required: true }]}>
            <Input style={{backgroundColor:"#051017",color:"white"}}></Input>
          </Form.Item>
          <div className='button-align'>
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button></div>
        </Form>
      </>
    );
  }

  function Choices({ onFinish, initialValues }) {
    return (
      <>
        <div style={{ color:"white", fontSize: "25px", paddingBottom: "40px", paddingTop: "30px", fontWeight: "600" }}><ProfileOutlined style={{paddingRight:"10px"}}/>Choices</div>
        <Form onFinish={onFinish} initialValues={initialValues}>
         
          <Form.Item label="Nick-Name" name={"NickName"} rules={[{ required: false }]}>
            <Input style={{backgroundColor:"#051017",color:"white"}}></Input>
          </Form.Item>

          <Form.Item 
            name="Main Ingredient"
            label="Main Ingredient"
            rules={[{ required: false, message: 'Please input Intro' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' ,backgroundColor:"black"}}
              placeholder="Main Ingredient"
 
              options={options}
              optionRender={(option) => (
                <Space >
                  <span style={{ color: "black"}}>{option.data.desc}</span>
                </Space>
              )}
            /></Form.Item>

          <Form.Item
            name="Sweetner"
            label="Sweetner"
            rules={[{ required: false, message: 'Please input Intro' }]}
          >
            <Select style={{backgroundColor:"#051017",color:"white",width: '100%' }}
              mode="multiple"
              
              placeholder="Sweeteners"

              options={sweetenerOptions}
              optionRender={(option) => (
                <Space>
                  <span style={{ color: "black" }}>{option.data.desc}</span>
                </Space>
              )}
            /></Form.Item>

          <Form.Item
            name="Fat/Oil"
            label="Fat/Oil"
            rules={[{ required: false, message: 'Please input Intro' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Fat/Oil"

              options={fatOilOptions}
              optionRender={(option) => (
                <Space>
                  <span style={{ color: "black" }}>{option.data.desc}</span>
                </Space>
              )}
            /></Form.Item>

          <Form.Item
            name="Seasoning"
            label="Seasoning"
            rules={[{ required: false, message: 'Please input Intro' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%', color: "black" }}
              placeholder="Seasoning"

              options={seasoningOptions}
             
              optionRender={(option) => (
                <Space >
                  <span style={{ color: "black" }}>{option.data.desc}</span>
                </Space>
              )}
            /></Form.Item>

          <Form.Item
            name="Allergence"
            label="Allergence"
            rules={[{ required: false, message: 'Please input Intro' }]}
          >


            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Allergence"

              options={options}
              optionRender={(option) => (
                <Space>
                  <span style={{ color: "black" }}>{option.data.desc}</span>
                </Space>
              )}
            /></Form.Item>
          <div className='button-align'>
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button></div>
        </Form></>
    );
  }

  function Security({ onFinish, initialValues }) {
    return (
      <>
        <div style={{ color:"white", fontSize: "25px", paddingBottom: "40px", paddingTop: "30px", fontWeight: "600" }}><SecurityScanOutlined style={{paddingRight:"10px"}} />Security</div>
        <Form onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="Password" name={"First name"} rules={[{ required: true }]}>
            <Input.Password style={{backgroundColor:"#051017",color:"white"}} />
          </Form.Item>
          <Form.Item label="Confirmed" name={"Last name"} rules={[{ required: true }]}>
            <Input.Password style={{backgroundColor:"#051017",color:"white"}} />
          </Form.Item>

          <div className='button-align'>
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button></div>

        </Form></>
    );
  }
  function Finish() {
    return (
      <>

        <Form >
          <div className='finish-page'>
          <span style={{ color: "white" ,fontSize:"15px",fontWeight:700, paddingRight:"10px"}}>Thank you for Registering </span>
          <span style={{ color: "white" ,fontSize:"15px"}}>lets explore the world of Food with CraveFeed</span>
          </div>
          <div className='button-align'>
            <Button className='button-inner' type='primary' htmlType='submit'>Explore</Button></div>
        </Form></>
    );
  }

}

