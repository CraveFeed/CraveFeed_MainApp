"use client"
import { Button, Card, Form, Input, Select, Space, Steps } from 'antd'
import React from 'react'
import "../signup/signup.css"
import { CgProfile } from "react-icons/cg";
import { AiFillProfile } from "react-icons/ai";

import { options, sweetenerOptions, fatOilOptions, seasoningOptions } from '../Components/MainIngredient'
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
      {/* <header className='header-style'>
        <span style={{ padding: "30px 0 0 60px", fontSize: "20px", color: "white" }}>LOGO-SPACE</span>
        <div style={{ padding: "30px 60px 0 0" }}>
          <Button type='primary' style={{ padding: "5px 20px 5px 20px" }}><span>SignUp</span></Button>
        </div>
      </header> */}
      <div className='main-align'>

        <div className='left-part'>
          <div className='left-inside'>
            <div style={{ fontSize: "40px", paddingBottom: "50px" }}>
              <span >CraveFeed</span></div>
            <Steps direction="vertical" style={{ color: "white" }} className="custom-steps" onChange={setCurrent} current={current}>
              <Steps.Step title="Personal Info" className='steps'></Steps.Step>
              <Steps.Step title="Choices" className='steps'></Steps.Step>
              <Steps.Step title="Security"></Steps.Step>
              <Steps.Step title="Finish"></Steps.Step>
            </Steps></div>
        </div>
        <div >
          <Card style={{ width: 900, padding: "30px 30px 30px 30px" }} className='Card-left'>
            <span className='Sign-in'>SIGN IN</span>
            <Card style={{ padding: "0 60px 60px 60px" }}>
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
        <div style={{ color: "black", fontSize: "25px", paddingBottom: "40px", paddingTop: "30px", fontWeight: "600" }}>Profile Information</div>
        <Form onFinish={onFinish} initialValues={initialValues}>

          <Form.Item label="First Name" name={"First name"} rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Last Name" name={"Last name"} rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="E-mail" name={"email"} rules={[{ required: true }]}>
            <Input></Input>
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
        <div style={{ color: "black", fontSize: "25px", paddingBottom: "40px", paddingTop: "30px", fontWeight: "600" }}>Choices</div>
        <Form onFinish={onFinish} initialValues={initialValues}>
          <span>Profile Info</span>
          <Form.Item label="Nick-Name" name={"NickName"} rules={[{ required: false }]}>
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="Main Ingredient"
            label="Main Ingredient"
            rules={[{ required: false, message: 'Please input Intro' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Main Ingredient"

              options={options}
              optionRender={(option) => (
                <Space>
                  <span style={{ color: "black" }}>{option.data.desc}</span>
                </Space>
              )}
            /></Form.Item>

          <Form.Item
            name="Sweetner"
            label="Sweetner"
            rules={[{ required: false, message: 'Please input Intro' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
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
                  {option.data.desc}
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
        <div style={{ color: "black", fontSize: "25px", paddingBottom: "40px", paddingTop: "30px", fontWeight: "600" }}>Security</div>
        <Form onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="Password" name={"First name"} rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirmed" name={"Last name"} rules={[{ required: true }]}>
            <Input.Password />
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
          <span style={{ color: "black" ,fontSize:"15px",fontWeight:700}}>Thank you for Registering </span>
          <span style={{ color: "black" ,fontSize:"15px"}}>lets explore the world of Food with CraveFeed</span>
          <div className='button-align'>
            <Button className='button-inner' type='primary' htmlType='submit'>Explore</Button></div>
        </Form></>
    );
  }

}

