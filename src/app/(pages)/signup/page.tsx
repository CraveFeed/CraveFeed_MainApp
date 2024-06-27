"use client"
import React from 'react';
import "../../styles/signup.css";
import { Avatar, Button, Card, Form, Input, Select, Space, Steps } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons'
import { CloseOutlined } from '@ant-design/icons';
import { UserOutlined, SolutionOutlined, SecurityScanOutlined, SmileOutlined, ProfileOutlined } from '@ant-design/icons';
import { options, sweetenerOptions, fatOilOptions, seasoningOptions } from '../../Components/InputValues';


export default function Signup() {
  const [current, setCurrent] = React.useState(0);
  const [choices, newChoices] = React.useState(null);
  const [avatars, newAvatar] = React.useState(null);
  const [security, newSecurity] = React.useState(null);
  const [profile, newProfile] = React.useState(null);
  const [explore, newexplore] = React.useState(null);

  const onFinishLoginForm = (value) => {
    newProfile(value);
    setCurrent(current + 1);
  }
  const onFinishAvatarForm = (value) => {
    newAvatar(value);
    setCurrent(current + 1);
  }
  const onFinishChoicesForm = (value) => {
    newChoices(value);
    setCurrent(current + 1);
  }
  const onFinishSecurityForm = (value) => {
    newSecurity(value);
    setCurrent(current + 1);
  }
  const onFinish = (value) => {
    newSecurity(value);
    setCurrent(current + 1);
  }
  
  const goPrevious = () => {
    setCurrent(current - 1);
  }

  const forms = [
    <ProfileInfo onFinish={onFinishLoginForm} initialValues={profile} goPrevious={goPrevious} />,
    <AvatarFunction onFinish={onFinishAvatarForm} initialValues={avatars} goPrevious={goPrevious} />,
    <Choices onFinish={onFinishChoicesForm} initialValues={choices} goPrevious={goPrevious} />,
    <Security onFinish={onFinishSecurityForm} initialValues={security} goPrevious={goPrevious} />,
    <Finish onFinish={onFinish} goPrevious={goPrevious} />
  ];

  const isStepDisabled = (step) => {
    if (step === 0) return false; // First step always enabled
    if (step === 1) return profile === null; // Enable only if profile is completed
    if (step === 2) return profile === null || avatars === null; // Enable only if profile and avatar are completed
    if (step === 3) return profile === null || avatars === null || choices === null; // Enable only if profile, avatar, and choices are completed
    if (step === 4) return profile === null || avatars === null || choices === null || explore === null ; // Enable only if profile, avatar, and choices are completed
    return false; // Default to false for all other steps
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
      <div className='main-align'>
        <div className='Sign-in'>SIGN UP</div>
        <div className="horizontal-steps">
          <Steps onChange={setCurrent} current={current}>
            <Steps.Step /* disabled={isStepDisabled(0)} */ title={<span>Profile</span>} icon={<UserOutlined style={{color:"white"}}/>} />
            <Steps.Step /* disabled={isStepDisabled(1)} */  title={<span>Avatar</span>} icon={<UserOutlined style={{color:"white"}} />} />
            <Steps.Step /* disabled={isStepDisabled(2)} */ title={<span>Choices</span>} icon={<SolutionOutlined style={{color:"white"}} />} />
            <Steps.Step /* disabled={isStepDisabled(3)} */ title={<span>Security</span>} icon={<SecurityScanOutlined style={{color:"white"}} />} />
            <Steps.Step /* disabled={isStepDisabled(4)} */ title={<span>Explore</span>} icon={<SmileOutlined style={{color:"white"}}/>} />
          </Steps>
        </div>
        <Card className='main-card'>
          <Card className="main-card-inner">
            {forms[current]}
          </Card>
        </Card>
      </div>
    </div>
  );

  function ProfileInfo({ onFinish, initialValues, goPrevious }) {
    return (
      <>
        <div style={{ color: "white", fontSize: "25px", paddingBottom: "40px", fontWeight: "600" }}><ProfileOutlined style={{ paddingRight: "10px" }} />Profile Information</div>
        <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="First Name" name={"First name"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white" }} />
          </Form.Item>
          <Form.Item label="Last Name" name={"Last name"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white" }} />
          </Form.Item>
          <Form.Item label="E-mail" name={"email"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white" }} />
          </Form.Item>
          <div className='button-align'>
          
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button>
          </div>
        </Form>
      </>
    );
  }

  function AvatarFunction({ onFinish, initialValues, goPrevious }) {
    return (
      <>
        <Form onFinish={onFinish} initialValues={initialValues} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div className="heading-form" style={{ color: "white", fontSize: "25px", paddingBottom: "40px", fontWeight: "600" }}>
            <UserOutlined style={{ paddingRight: "10px" }} />Choose Avatar
          </div>
          <Avatar size={{ xs: 84, sm: 82, md: 80, lg: 84, xl: 100, xxl: 100 }} style={{ color: "white" }} icon={<UserOutlined />} />
          <Form.Item label="UserName" name={"NickName"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white" }} className='nickname' />
          </Form.Item>
          <div className='button-align'>
            <Button className='button-inner' type='primary' onClick={goPrevious} style={{ marginRight: '8px' }}>Previous</Button>
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button>
          </div>
        </Form>
      </>
    );
  }

  function Choices({ onFinish, initialValues, goPrevious }) {
    const CustomRemoveIcon = () => <CloseOutlined style={{ color: 'white' }} />;
    const CustomClearIcon = () => (
      <CloseCircleOutlined style={{ color: 'white' }} />
    );
    return (
      <>
        <div style={{ color: "white", fontSize: "25px", paddingBottom: "30px", fontWeight: "600" }}><ProfileOutlined style={{ paddingRight: "10px" }} />Choices</div>
        <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Form.Item name="Main Ingredient" label="Main Ingredient" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select   mode="multiple"  placeholder="Main Ingredient" options={options} optionRender={(option) => (
              <Space style={{color:"white" }}>
                <span >{option.data.desc}</span>
               
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>

         {/*  Sweeteners */}  

          <Form.Item  name="Sweetner" label="Sweetner" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  mode="multiple"  placeholder="Sweeteners" options={sweetenerOptions} optionRender={(option) => (
              <Space >
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />} />
          </Form.Item>
          <Form.Item name="Fat/Oil" label="Fat/Oil" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select mode="multiple"  placeholder="Fat/Oil" options={fatOilOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          <Form.Item name="Seasoning" label="Seasoning" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select mode="multiple"  placeholder="Seasoning" options={seasoningOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          <Form.Item name="Allergence" label="Allergence" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select mode="multiple" placeholder="Allergence" options={options} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          <div className='button-align'>
            <Button className='button-inner' type='primary' onClick={goPrevious} style={{ marginRight: '8px' }}>Previous</Button>
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button>
          </div>
        </Form>
      </>
    );
  }

  function Security({ onFinish, initialValues, goPrevious }) {
    return (
      <>
        <div style={{ color: "white", fontSize: "25px", paddingBottom: "40px", fontWeight: "600" }}><SecurityScanOutlined style={{ paddingRight: "10px" }} />Security</div>
        <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="Password" name={"password"} rules={[{ required: true }]} >
            <Input.Password className="custom-password-input" style={{ backgroundColor: "#051017", color: "white" }} />
          </Form.Item>
          <Form.Item label="Confirmed" name={"confirmed"} rules={[{ required: true }]}>
            <Input.Password className="custom-password-input" style={{ backgroundColor: "#051017", color: "white" }} />
          </Form.Item>
          <div className='button-align'>
            <Button className='button-inner' type='primary' onClick={goPrevious} style={{ marginRight: '8px' }}>Previous</Button>
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button>
          </div>
        </Form>
      </>
    );
  }
  function Finish() {
    return (
    <>
    <Form>
    <div className='finish-page'>
    <span style={{ color: "white", fontSize: "15px", fontWeight: 700, paddingRight: "10px" }}>Thank you for Registering </span>
    <span style={{ color: "white", fontSize: "15px" }}>lets explore the world of Food with CraveFeed</span>
    </div>
    <div className='button-align'>
    <Button className='button-inner' type='primary' htmlType='submit'>Explore</Button>
    </div>
    </Form>
    </>
    );
  }
}
