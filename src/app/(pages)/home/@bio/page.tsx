"use client"

import React from "react";
import { Card, Avatar , Image, Flex, Button, Space} from "antd";
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;
import coverImage from "../../../assets/coverImage.jpeg";
import avatar from "../../../assets/avatar.jpg"
import tiger from "../../../assets/wallpaperflare.ico"

export default function Bio() {
  const imageStyle = {
    width: "100%", // Decrease the width to 50% of the original
    height: "auto", // Maintain the aspect ratio
    borderRadius: "20px",
  };

  const outerCardStyle = {
    backgroundColor: "#1B2730",
    border: "none",
    borderRadius: "20px",
    color: "white",
    height: "auto",
    width: "100%",
  };

  const innerCardStyle = {
    transform: "scaleY(0.6)", // Shrink vertically
    transformOrigin: "top",
    margin : "0px",
    padding : "0px",
    backgroundColor: "transparent",
  };

  return (
    <Card style={outerCardStyle} bodyStyle={{ padding: 0 }}>
        <Card
            hoverable={true}

            style={innerCardStyle}
            cover={<Image alt="cover" src={coverImage.src}  style={imageStyle} />}
            bordered={false}
        />
        <div style={{ marginTop : "-190px" , zIndex : "4"}}>
            <Flex align="center" justify="center" style={{ width : "100%"}}>
                <Avatar size={85} src={avatar.src} style={{border : "none" , backgroundColor: "white", position: "relative" }}/>
            </Flex>
            <Space direction="vertical" style={{backgroundColor: "#1B2730"  , zIndex : "3" , border : "none" , paddingInline: "15px" , margin : "0px" , width : "100%"}}>
                <Flex align="center" justify="center" vertical>
                        <Button style={{ backgroundColor : "#1B2730" , border : "none" , fontWeight : "bold" , fontSize : "21px" , color : "#c7c7c7"}}>Vibhor Phalke</Button>
                        <Button style={{ backgroundColor : "#1B2730" , border : "none" , fontSize : "17px" , color : "#55616b"}}>@vibhorphalke</Button>
                        <Paragraph style={{ fontSize : "16px" , color : "#adacac" }}>Hey there! I'm Vibhor, a huge food enthusiast. </Paragraph>
                </Flex>
                
            </Space>  
        </div>
    </Card>
  );
}
