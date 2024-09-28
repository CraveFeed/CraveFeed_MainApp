"use client";
import React from 'react';
import "../../styles/signup.css";
import { Avatar, Button, Card, Form, Input, Select, Space, Steps } from 'antd';
import { CloseCircleOutlined, CloseOutlined, EyeOutlined, UserOutlined, SolutionOutlined, SecurityScanOutlined, SmileOutlined, ProfileOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { options, sweetenerOptions, fatOilOptions, seasoningOptions, RateOptions, TypeOptions } from '../../Components/InputValues';
import { EnvironmentOutlined } from "@ant-design/icons";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 0,
  lng: 0,
};

export default function Signup() {
  const [current, setCurrent] = React.useState(0);
  const [choices, newChoices] = React.useState(null);
  const [avatars, newAvatar] = React.useState(null);
  const [security, newSecurity] = React.useState(null);
  const [profile, newProfile] = React.useState(null);
  const [explore, newexplore] = React.useState(null);
  const [isMapVisible, setIsMapVisible] = React.useState(false);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [cityName, setCityName] = React.useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1qpx2DBSIsvLYbFpYvS9Md0y-E",
    libraries,
  });

  const handleMapClick = (event) => {
    const lat = parseFloat(event.latLng.lat().toFixed(2));
    const lng = parseFloat(event.latLng.lng().toFixed(2));
    setLatitude(lat);
    setLongitude(lng);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        const city = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        setCityName(city ? city.long_name : "Unknown City");
        setIsMapVisible(false);
      }
    });
  };

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  const onFinishLoginForm = (value) => {
    newProfile(value);
    setCurrent(current + 1);
  };

  const onFinishAvatarForm = (value) => {
    newAvatar(value);
    setCurrent(current + 1);
  };

  const onFinishChoicesForm = (value) => {
    newChoices(value);
    setCurrent(current + 1);
  };

  const onFinishSecurityForm = (value) => {
    newSecurity(value);
    setCurrent(current + 1);
  };

  const onFinish = (value) => {
    newSecurity(value);
    setCurrent(current + 1);
  };

  const goPrevious = () => {
    setCurrent(current - 1);
  };

  const forms = [
    <ProfileInfo onFinish={onFinishLoginForm} initialValues={profile} goPrevious={goPrevious} />,
    <AvatarFunction onFinish={onFinishAvatarForm} initialValues={avatars} goPrevious={goPrevious} />,
    <Choices onFinish={onFinishChoicesForm} initialValues={choices} goPrevious={goPrevious} />,
    <Security onFinish={onFinishSecurityForm} initialValues={security} goPrevious={goPrevious} />,
    <Finish onFinish={onFinish} goPrevious={goPrevious} />
  ];

  const isStepDisabled = (step) => {
    if (step === 0) return false;
    if (step === 1) return profile === null;
    if (step === 2) return profile === null || avatars === null;
    if (step === 3) return profile === null || avatars === null || choices === null;
    if (step === 4) return profile === null || avatars === null || choices === null || explore === null;
    return false;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
      <div className='main-align' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
        <div className='Sign-in'>Sign Up</div>
        <div className="horizontal-steps" style={{ display: "none" }}>
          <Steps onChange={setCurrent} current={current}>
            <Steps.Step disabled={isStepDisabled(0)} title={<span>Profile</span>} icon={<UserOutlined style={{ color: "white" }} />} />
            <Steps.Step disabled={isStepDisabled(1)} title={<span>Avatar</span>} icon={<UserOutlined style={{ color: "white" }} />} />
            <Steps.Step disabled={isStepDisabled(2)} title={<span>Choices</span>} icon={<SolutionOutlined style={{ color: "white" }} />} />
            <Steps.Step disabled={isStepDisabled(3)} title={<span>Security</span>} icon={<SecurityScanOutlined style={{ color: "white" }} />} />
            <Steps.Step disabled={isStepDisabled(4)} title={<span>Explore</span>} icon={<SmileOutlined style={{ color: "white" }} />} />
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
          <Form.Item name={"First name"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white" ,width:"20rem" }} placeholder="First Name" />
          </Form.Item>
          <Form.Item name={"Last name"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white",width:"20rem" }} placeholder="Last Name" />
          </Form.Item>
          <Form.Item name={"email"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white",width:"20rem" }} placeholder="E-mail" />
          </Form.Item>
          <Form.Item name={"City"} rules={[{ required: true }]}>
            <Input style={{ backgroundColor: "#051017", color: "white",width:"20rem" }} placeholder="City" />
          </Form.Item>
          <Form.Item name="location">
            <Button
              icon={<EnvironmentOutlined />}
              style={{ backgroundColor: "#051017", color: "white", width: "100%" }}
              onClick={toggleMapVisibility}
            >
              {cityName || "Select your location"}
            </Button>
            {isMapVisible && isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={{ lat: 22.3511, lng: 78.6677 }}
                onClick={handleMapClick}
              >
                {latitude && longitude && <Marker position={{ lat: latitude, lng: longitude }} />}
              </GoogleMap>
            )}
            {latitude && longitude && (
              <div style={{ marginTop: "10px", color: "white" }}>
                Selected Location: {cityName} (Lat: {latitude}, Lon: {longitude})
              </div>
            )}
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
          <Form.Item name={"NickName"} rules={[{ required: true }]} style={{ marginTop: "30px" }}>
            <Input style={{ backgroundColor: "#051017", color: "white",width:"20rem" }} placeholder="UserName" />
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
        <Form.Item label={"Dish"} name={"Dish"} rules={[{ required: true }]} style={{ marginTop: "30px" }}>
            <Input style={{ backgroundColor: "#00090f", color: "white",width:"30rem",padding:"0.60rem", border:"1px solid white" }}  />
          </Form.Item>

         {/*  Sweeteners */}  

          <Form.Item  name="Types" label="Types" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select style={{width:"30rem"}}  mode="multiple"  placeholder="Types" options={TypeOptions} optionRender={(option) => (
              <Space >
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />} />
          </Form.Item>
          
          
         


          {/* rating options */}

          <div  className='ratingoptions' >
          <Form.Item name="Spiciness" label="Spiciness"  rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  style={{width:"6rem"}} mode="tags" placeholder="Spiciness" options={RateOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          <Form.Item name="Sweetness" label="Sweetness" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  style={{width:"6rem"}} mode="tags" placeholder="Sweetness" options={RateOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          <Form.Item name="Sourness" label="Sourness" rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select style={{width:"6rem"}} mode="tags" placeholder="Sourness" options={RateOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>

          </div>

          
          
          <div className='button-align'>
            <Button className='button-inner' type='primary' onClick={goPrevious} style={{ marginRight: '8px' }}>Previous</Button>
            <Button className='button-inner' type='primary' htmlType='submit'>Next</Button>
          </div>
        </Form>
      </>
    );
  }

  function Security({ onFinish, initialValues, goPrevious }) {
    const CustomEyeIcon = ({ visible, onClick }) => {
      return visible ? <EyeOutlined onClick={onClick} /> : <EyeInvisibleOutlined onClick={onClick} />;
    };
    return (
      <>
        <div style={{ color: "white", fontSize: "25px", paddingBottom: "40px", fontWeight: "600" }}><SecurityScanOutlined style={{ paddingRight: "10px" }} />Security</div>
        <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="Password" name={"password"} rules={[{ required: true }]} >
            <Input.Password  style={{ backgroundColor: "#051017", color: "white", width:"20rem" }}   iconRender={(visible) => (
              <CustomEyeIcon visible={visible} onClick={() => setPasswordVisible(!passwordVisible)}  />
            )} />
          </Form.Item>
          <Form.Item label="Confirmed" name={"confirmed"} rules={[{ required: true }]}>
            <Input.Password  style={{ backgroundColor: "#051017", color: "white", width:"20rem" }}  iconRender={(visible) => (
              <CustomEyeIcon visible={visible} onClick={() => setPasswordVisible(!passwordVisible)} />
            )}/>
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