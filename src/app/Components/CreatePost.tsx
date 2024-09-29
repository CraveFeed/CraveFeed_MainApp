/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { Button, Form, Input, Modal, Select, Space, Upload } from "antd";
import "../styles/CreatePost.css";

import {
  EnvironmentOutlined,
  FileImageOutlined,
  GifOutlined,
  MehOutlined,
} from "@ant-design/icons";
import CustomRemoveIcon from "@ant-design/icons";
import CustomClearIcon from "@ant-design/icons";
import {
  PlusCircleFilled,
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Typography } from "antd";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { CuisineOptions, DishOptions, RateOptions, TypeOptions } from "./InputValues";

require("dotenv").config();

const { Text } = Typography;

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [displayImage, setDisplayImage] = React.useState("none");
  const [CityTag, setCityTag] = React.useState("none");
  const [imageUrl, setImageUrl] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [cityName, setCityName] = React.useState("");
  
  const [showMap, setShowMap] = React.useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1qpx2DBSIs5EaMIsvLYbFpYvS9Md0y-E", // Replace with your actual API key
    libraries: ["places"],
  });

  const displaytoggle = () => {
    setDisplayImage("flex");
  };

  const Citytoggle = () => {
    setShowMap(true); // Show the Google Map modal
  };

  const onDownload = () => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Upload image
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  // Handle map click to get latitude, longitude, and city name
  const handleMapClick = (event) => {
    const lat = parseFloat(event.latLng.lat().toFixed(2)); // Limit to two decimal places
    const lng = parseFloat(event.latLng.lng().toFixed(2)); // Limit to two decimal places
    setLatitude(lat);
    setLongitude(lng);

    // Use reverse geocoding to get the city name
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        const city = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        setCityName(city ? city.long_name : "Unknown City");
        setCityTag("flex");
        setShowMap(false); // Hide the map after selection
      }
    });
  };

    // Handle Emoji Picker
    const handleEmojiClick = (event, emojiObject) => {
      setPostContent((prevContent) => prevContent + emojiObject.emoji); // Append the selected emoji to the content
      setShowEmojiPicker(false); // Close the emoji picker after selection
    };

  return (
    <>
      <Button onClick={showModal} className="upload-buttons">
        <PlusCircleFilled
          style={{ marginTop: "1px", fontSize: "19px", color: "#FF6B6B" }}
        />
        Create Post
      </Button>
      <Modal
        style={{
          background: "transparent",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          padding: 0,
          alignItems: "center",
        }}
        className="modal-createpost"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems:"center",
            marginTop: "20px",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: 600, color: "#c7c7c7" }}>
            Create Post
          </span>
          <Text
            keyboard
            style={{
              display: CityTag,
              marginRight: "20px",
              marginTop: "10px",
              
              backgroundColor: "transparent",
            }}
          >
            {cityName}
          </Text>
        </div>
        

        <Form style={{ marginTop: "20px" }}>
          <Input
            placeholder="Create Title"
            style={{
              backgroundColor: "#051017",
              color: "#c7c7c7",
              border: "none",
              height: "50px",
              marginTop: "10px",
              fontSize:"16px"
            }}
          ></Input>
         
          <Input.TextArea
            className="custom-input2"
            placeholder="Write description"
            style={{
              backgroundColor: "#051017",
              color: "#c7c7c7",
              border: "none",
              height: "50px",
              fontSize: "15px",
              marginTop: "10px",
            }}
          />
            
           <Form.Item  name="Types"  rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select style={{marginTop:"10px"}}  mode="multiple"  placeholder="Types" options={TypeOptions} optionRender={(option) => (
              <Space >
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label ant-select-selector ant-select-outline"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />} />
          </Form.Item>
           <Form.Item  name="Dish"  rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  style={{marginTop:"-10px"}} mode="multiple"  placeholder="Dish" options={DishOptions} optionRender={(option) => (
              <Space >
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />} />
          </Form.Item>
           <Form.Item  name="Cuisin"  rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select style={{marginTop:"-10px"}}  mode="multiple"  placeholder="Cuisions" options={CuisineOptions} optionRender={(option) => (
              <Space >
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />} />
          </Form.Item>

          {/* rating options */}

          <div  style={{display:"flex" , justifyContent:"space-between" , marginTop:"30px"}} >

             <Form.Item name="Spiciness"   rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  style={{width:"6rem"}} mode="tags" placeholder="Spiciness" options={RateOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }}   allowClear={{ clearIcon: <CustomClearIcon /> }} className="custom-select " removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          <Form.Item name="Sourness"   rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  style={{width:"6rem"}} mode="tags" placeholder="Sourness" options={RateOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }}  allowClear={{ clearIcon: <CustomClearIcon /> }} className="custom-select " removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          <Form.Item name="Sweetness"   rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  style={{width:"6rem"}} mode="tags" placeholder="Sweetness" options={RateOptions} optionRender={(option) => (
              <Space>
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" className="custom-select " dropdownStyle={{ backgroundColor: 'black' }}   allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />}/>
          </Form.Item>
          </div>
         
          <div
            style={{
              display: displayImage,
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Image
              width={300}
              src={imageUrl}
              preview={{
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: {
                      onFlipY,
                      onFlipX,
                      onRotateLeft,
                      onRotateRight,
                      onZoomOut,
                      onZoomIn,
                      onReset,
                    },
                  }
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={onDownload} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                    <UndoOutlined onClick={onReset} />
                  </Space>
                ),
              }}
            />
          </div>
        </Form>
        <div style={{ borderTop: "1px solid grey", marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex" }}>
              <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button
                  onClick={displaytoggle}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#29a7f6",
                  }}
                  icon={<FileImageOutlined />}
                ></Button>
              </Upload>
             
             
              <EnvironmentOutlined
                onClick={Citytoggle}
                style={{
                  paddingRight: "10px",
                  fontSize: "18px",
                  color: "#29a7f6",
                  cursor: "pointer",
                }}
              />
              <Text
                keyboard
                style={{ display: CityTag, marginRight: "20px", marginTop: "10px" }}
              >
                Lon: {longitude}
              </Text>
              <Text
                keyboard
                style={{ display: CityTag, marginRight: "20px", marginTop: "10px" }}
              >
                Lat: {latitude}
              </Text>
            </div>
            <div>
              <Button type="primary" style={{backgroundColor:"transparent" , color:"#29a7f6" , fontWeight:"bold"}}>Post</Button>
            </div>
          </div>
        </div>
      </Modal>

      {showMap && isLoaded && (
        <Modal visible={true} onCancel={() => setShowMap(false)} footer={null}>
          <div style={{ height: "400px", width: "100%" }}>
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              zoom={10}
              center={{ lat: 22.3511, lng: 78.6677 }} // Default to India
              onClick={handleMapClick}
            >
              {latitude && longitude && (
                <Marker position={{ lat: latitude, lng: longitude }} />
              )}
            </GoogleMap>
          </div>
        </Modal>
      )}
    </>
  );
}
