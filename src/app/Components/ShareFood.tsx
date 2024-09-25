import React, { useState } from 'react';
import { Input, Modal, Space, Image, Button, Upload } from 'antd';
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
            fontSize: '25px',
            marginTop: '20px',
          }}
        />
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
