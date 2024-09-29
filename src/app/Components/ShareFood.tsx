import React, { useState } from 'react';
import { Input, Modal, Space, Image, Button, Upload, Form, Select } from 'antd';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RestFilled,
} from '@ant-design/icons';
import { FileImageOutlined } from '@ant-design/icons';
import { CuisineOptions, DishOptions, RateOptions, TypeOptions } from './InputValues';
import CustomRemoveIcon from "@ant-design/icons";
import CustomClearIcon from "@ant-design/icons";

export default function ShareFood() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [displayImage, setDisplayImage] = React.useState('none');
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDownload = () => {
    console.log(imageUrl);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };


  const displaytoggle = () => {
    setDisplayImage("flex");
  }

  return (
    <div>
      <Button className="upload-buttons" onClick={showModal}>
        <RestFilled style={{ fontSize: '19px', color: '#20D997' }} />
        Share Food
      </Button>
      <Modal
        visible={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "20px", fontWeight: 600, color: "#c7c7c7" }}>
            Share Food
          </span></div>
        <Input
          placeholder="Create Title"
          className="custom-input"
          style={{
            backgroundColor: '#051017',
            color: '#c7c7c7',
            border: 'none',
            height: '50px',
           
            marginTop: '20px',
          }}
        />

<Form.Item  name="Types"  rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select style={{marginTop:"10px"}}  mode="multiple"  placeholder="Types" options={TypeOptions} optionRender={(option) => (
              <Space >
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label ant-select-selector ant-select-outline"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />} />
          </Form.Item>
           <Form.Item  name="Dishs"  rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select  style={{marginTop:"-10px"}} mode="multiple"  placeholder="Dishs" options={DishOptions} optionRender={(option) => (
              <Space >
                <span style={{ color: "white" }}>{option.data.desc}</span>
              </Space>
            )} popupClassName="custom-dropdown" dropdownStyle={{ backgroundColor: 'black' }} className="custom-select custom-selected-label"  allowClear={{ clearIcon: <CustomClearIcon /> }}  removeIcon={<CustomRemoveIcon />} />
          </Form.Item>
           <Form.Item  name="Cuisine"  rules={[{ required: true, message: 'Please input your choice' }]}>
            <Select style={{marginTop:"-10px"}}  mode="multiple"  placeholder="Cuisine" options={CuisineOptions} optionRender={(option) => (
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
            <Image
              width={300}
              src={imageUrl}

              preview={{
                toolbarRender: (_, { transform: { scale }, actions }) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={onDownload} />
                    <SwapOutlined rotate={90} onClick={actions.onFlipY} />
                    <SwapOutlined onClick={actions.onFlipX} />
                    <RotateLeftOutlined onClick={actions.onRotateLeft} />
                    <RotateRightOutlined onClick={actions.onRotateRight} />
                    <ZoomOutOutlined disabled={scale === 1} onClick={actions.onZoomOut} />
                    <ZoomInOutlined disabled={scale === 50} onClick={actions.onZoomIn} />
                    <UndoOutlined onClick={actions.onReset} />
                  </Space>

                ),
              }}
            />
          </div>

          <div style={{display:"flex", justifyContent:"space-between" , justifyItems:"center" , alignContent:"center" , alignItems:"center"}}>
            <Upload beforeUpload={handleUpload}
              showUploadList={false} style={{ display: "flex", alignItems: "start" }} >
              <Button onClick={displaytoggle} style={{ backgroundColor: "transparent", border: "none", color: "#29a7f6" }} icon={<FileImageOutlined style={{ fontSize: "25px", marginTop: "20px" }} />}></Button>
            </Upload>
            <Button type='primary' style={{backgroundColor:"transparent" , color:"#29a7f6" , fontWeight:"bold"}} >Post</Button>
          </div>


        </div>

      </Modal>
    </div>
  );
}
