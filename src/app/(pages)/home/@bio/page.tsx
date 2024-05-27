"use client"

import React from "react";
import { Card, Avatar , Image, Flex, Button, Space} from "antd";
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;
import coverImage from "../../../assets/coverImage.jpeg";
import avatar from "../../../assets/avatar.jpg"
import tiger from "../../../assets/wallpaperflare.ico"
import background from "../../../assets/coverImage.jpeg"

export default function Bio() {
  const imageStyle = {
    width: "100%", // Decrease the width to 50% of the original
    borderRadius: "20px",
  };

  const outerCardStyle = {
    backgroundColor: "#1B2730",
    border: "none",
    borderRadius: "20px",
    color: "white",
    width: "100%",
  };

  const outerCard2Style = {
    backgroundColor: "#1B2730",
    border: "none",
    borderRadius: "20px",
    color: "white",
    width: "100%",
    paddingTop : "20px"
  };

  const innerCardStyle = {
    transform: "scaleY(0.6)", // Shrink vertically
    transformOrigin: "top",
    margin : "0px",
    padding : "0px",
    backgroundColor: "transparent",
  };

  const userData = [
    { id: 1, avatarSrc: tiger, name: 'Shashwat Singh', handle: '@ShashwatPS1' },
    { id: 2, avatarSrc: background, name: 'Day Dreamer', handle: '@AnotherHandle' },
    { id: 2, avatarSrc: background, name: 'Harshit Shrivastava', handle: '@harshitST' },
];

  return (
    <Flex vertical align="center">
      <Card style={outerCardStyle} bodyStyle={{ padding: 0}}>
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
              <Flex align="center" justify="center" style={{ borderBlock : "1px solid #28343E" , marginInline : "5px"}} >
                <Space split={<Divider type="vertical" style={{ backgroundColor : "#4C5965" , marginTop : "13px" , height : "50px"}}/>} style={{ width : "100%" , display : "flex" , alignContent : "center" , justifyContent : "space-between" , paddingInline : "50px" , paddingBottom : "10px"}}>
                    <Flex align="center" justify="center" vertical style={{}}>
                        <Typography.Title level={3} style={{ color : "#c7c7c7"}}>6005</Typography.Title>
                        <Typography.Text style={{ marginTop : "-15px" , fontSize : "bolder" , fontWeight : "bolder" , color : "#5c6165" }}>Following</Typography.Text>
                    </Flex>
                    <Flex vertical align="center" justify="center">
                        <Typography.Title level={3} style={{ padding : "0px" , color : "#c7c7c7"}}>5000</Typography.Title>
                        <Typography.Text style={{ marginTop : "-15px" , color : "#5c6165" , fontWeight : "bolder"}}>Follower</Typography.Text>
                    </Flex>
                </Space>

              </Flex>
              <Flex align="center" justify="center" style={{ marginBlock : "10px"}}>
                  <Button style={{ backgroundColor : "#1B2730" , border : "none" , fontSize : "16px" , color : "#2091d7" , fontWeight : "bolder"}}>My Profile</Button>
              </Flex>
          </div>
      </Card>
      <div style={{ height : "20px"}}></div>
      <Card style={outerCard2Style} bodyStyle={{ padding: 0 }}>
          <Flex vertical align="center" justify="center" style={{ paddingBottom : "10px" , overflow : "hidden"}}>
                {userData.map(user => (
                <Flex className="suggested-parent-Flex" key={user.id} align="center" justify="space-between" style={{ width: "90%",  marginBottom: "7px" }}>
                    <Avatar className="suggested-avatar" src={user.avatarSrc.src} style={{ overflow: "hidden", textOverflow: "ellipsis"}}/>
                    <Flex vertical align="center" justify="start">
                         <Typography.Title className="suggested-mobile-title" style={{
                        color: "#c7c7c7",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "160px"
                    }}>
                        {user.name}
                    </Typography.Title>
                        <Typography.Text className="suggested-mobile-text" style={{
                            marginTop: "-10px",
                            color: "#5c6368",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "160px"
                        }}>{user.handle}</Typography.Text>
                    </Flex>
                    <Button className="suggested-button" style={{ backgroundColor: "white", color: "black", borderRadius: "20px" }}>Follow</Button>
                </Flex>
            ))}
            <Flex align="center" justify="flex-start" style={{ marginBlock: "10px" , width : "100%" , paddingInline : "20px" }}>
                <Button style={{ backgroundColor: "#1B2730", border: "none", fontSize: "16px", color: "#2091d7", fontWeight: "bolder" }}>
                    Show More
                </Button>
            </Flex>
          </Flex>
      </Card>
    </Flex>
  );
}
