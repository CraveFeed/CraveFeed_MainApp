/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from 'react'
import {  Button, Form, Input, Modal, Space  ,  Upload} from 'antd';
import "../styles/CreatePost.css"
import { EnvironmentOutlined, FileImageOutlined, GifOutlined, MehOutlined} from '@ant-design/icons';
import {  PlusCircleFilled  } from "@ant-design/icons";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

import { UploadOutlined } from '@ant-design/icons';


import { Image,Typography } from 'antd';
const { Text } = Typography;

export default function logout() {
  
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [displayImage, setDisplayImage] = React.useState('none'); 
    const [CityTag , setCityTag] = React.useState("none")
    const [imageUrl, setImageUrl] = React.useState(null);
    

      const displaytoggle = () =>{
        setDisplayImage("flex");
      }
      const Citytoggle = () =>{
        setCityTag("flex");
      }
   
     

    const onDownload = () => {
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
   
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    //upload image 
    const handleUpload = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      return false; // Prevent default upload behavior
    };

   
  
    return (
        <>
      
      <Button onClick={showModal} className="upload-buttons">
        <PlusCircleFilled style={{ marginTop: "1px", fontSize: "19px", color: "#FF6B6B" }} />
        Create Post
      </Button>
        <Modal  footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  >
          <div style={{display:"flex" , justifyContent:"space-between" , marginTop:"20px"}}> 
            <span style={{fontSize:"20px" , fontWeight:600 , color:"#c7c7c7"}}>
            Create Post
          </span>
          <Text keyboard style={{ display:CityTag , marginRight:"20px" , marginTop:"10px"}} >Guna</Text>
         
          </div>
         <span style={{color:"grey", marginLeft:"8px", padding:"5px"}}>UserID</span>
         
         
          <Form style={{marginTop:"20px"}}>
         
             <Input placeholder='Create Title' className='custom-input' style={{backgroundColor:"#051017", color:"#c7c7c7" , border:"none" ,height:"50px" , fontSize:"25px", marginTop:"10px"}}></Input>
             
               
               <Input placeholder='RestaurantID' className='custom-input' style={{backgroundColor:"#051017", color:"#c7c7c7" , border:"none" ,height:"40px" , fontSize:"20px", marginTop:"10px"}}></Input>
               <Input.TextArea className='custom-input2' placeholder='Write description' style={{backgroundColor:"#051017", color:"#c7c7c7" , border:"none" ,height:"50px" , fontSize:"15px", marginTop:"10px"}} />
             <div style={{display: displayImage , justifyContent:"center" , marginTop:"30px"}}>
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
          },
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
    /></div>
             
          
           
          </Form>
          <div style={{borderTop:"1px solid grey" , marginTop:"30px"}}>
          <div style={{display:"flex" , justifyContent:"space-between", marginTop:"10px" , }}>
          <div style={{display:"flex"}}>
            
          <Upload  beforeUpload={handleUpload}
                showUploadList={false} >
    <Button onClick={displaytoggle}  style={{backgroundColor:"transparent" , border:"none" , color:"#29a7f6"}} icon={<FileImageOutlined />}></Button>
  </Upload>
          <MehOutlined style={{paddingRight:"10px" ,fontSize:"18px" , color:"#29a7f6" , cursor:"pointer"}} />
          <GifOutlined style={{paddingRight:"10px" ,fontSize:"18px" , color:"#29a7f6" ,cursor:"pointer"}}/>
          <EnvironmentOutlined onClick={Citytoggle} style={{paddingRight:"10px" ,fontSize:"18px" , color:"#29a7f6" ,cursor:"pointer"}}/>
          <Text keyboard style={{ display:CityTag , marginRight:"20px" , marginTop:"10px"}} >Longitutde</Text>
          <Text keyboard style={{ display:CityTag , marginRight:"20px" , marginTop:"10px"}} >Latitude</Text>
        
          
          </div>
          <div >
            <Button type='primary' >Post</Button>
          </div>
          </div>
          </div>
       
          
        </Modal>
      </>
  )
}
