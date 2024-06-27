"use client"

import React, { useEffect } from "react";
import { Card, Avatar , Image, Flex, Button, Space} from "antd";
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;
import coverImage from "../../../assets/coverImage.jpeg";
import avatar from "../../../assets/avatar.jpg"
import tiger from "../../../assets/wallpaperflare.ico"
import background from "../../../assets/coverImage.jpeg"
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import { getBioState } from "@/lib/features/services/getBio";


export default function Bio() {
  
  // useEffect(() => {
  //   dispatch(getBioState());
  // },[])

  const dispatch = useAppDispatch();
  
  const bio = useAppSelector(state => state.getBio.bio);
  const username = useAppSelector(state => state.getBio.username);
  const firstName = useAppSelector(state => state.getBio.firstName);
  const lastname = useAppSelector(state => state.getBio.lastname);
  const noOfFollowers = useAppSelector(state => state.getBio.noOfFollowers);
  const noOfFollowing = useAppSelector(state => state.getBio.noOfFollowing);
  // const Avatar = useAppSelector(state => state.getBio.Avatar);
  const getBioStatus = useAppSelector(state => state.getBio.getBioStatus);


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
    transform: "scaleY(0.6)",
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
                  <Avatar className="bio-profile-pic" src={avatar.src} style={{border : "none" , backgroundColor: "white", position: "relative" }}/>
              </Flex>
              <Space direction="vertical" style={{backgroundColor: "#1B2730"  , zIndex : "3" , border : "none" , paddingInline: "15px" , margin : "0px" , width : "100%"}}>
                  <Flex align="center" justify="center" vertical>
                          <Button className="follower-title" style={{ backgroundColor : "#1B2730" , border : "none" , fontWeight : "bold" , color : "#c7c7c7"}}>{firstName} {lastname}</Button>
                          <Button className="follower-text" style={{ backgroundColor : "#1B2730" , border : "none" , color : "#55616b"}}>{username}</Button>
                          <Paragraph className="bio-description" style={{ color : "#adacac" }}>{bio}</Paragraph>
                  </Flex>
              </Space>
              <Flex align="center" justify="center" style={{ borderBlock : "1px solid #28343E" , marginInline : "5px"}} >
                <Space className="follower-space-padding" split={<Divider type="vertical" style={{ backgroundColor : "#4C5965" , marginTop : "13px" , height : "50px"}}/>} style={{ width : "100%"  , display : "flex" , alignContent : "center" , justifyContent : "space-between" , paddingBottom : "10px"}}>
                    <Flex align="center" justify="center" vertical>
                        <Typography.Title className="follower-title" style={{ color : "#c7c7c7"}}>{noOfFollowing}</Typography.Title>
                        <Typography.Text className="follower-text" style={{ marginTop : "-15px" , fontWeight : "bolder" , color : "#5c6165" }}>Following</Typography.Text>
                    </Flex>
                    <Flex vertical align="center" justify="center">
                        <Typography.Title className="follower-title" style={{ color : "#c7c7c7"}}>{noOfFollowers}</Typography.Title>
                        <Typography.Text className="follower-text" style={{ marginTop : "-15px" , color : "#5c6165" , fontWeight : "bolder"}}>Follower</Typography.Text>
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
