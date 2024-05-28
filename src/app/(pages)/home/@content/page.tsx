"use client"

import React from "react";
import { Avatar, Card , Space , Flex , Input, Button, Typography } from "antd";
import type { StatisticProps } from 'antd';
import { Tag , Image , Statistic } from "antd";
import { RestFilled , ReadFilled , PlusCircleFilled , EnvironmentFilled , HeartFilled , UploadOutlined , PullRequestOutlined , MessageFilled } from "@ant-design/icons";
import avatar from "../../../assets/avatar.jpg";
import elonPost from "../../../assets/elon_food_post.jpeg"
import startship from "../../../assets/starship.jpeg"
import foodPost2 from "../../../assets/food_post2.jpeg"
import foodPost3 from "../../../assets/food_post3.jpeg"
import foodPost4 from "../../../assets/food_post4.jpeg"
import profilePic2 from "../../../assets/profilePic2.jpg"
import profilePic3 from "../../../assets/lavelisProPic.jpg"
import profilePic4 from "../../../assets/profilePic4.jpg"
import CountUp from 'react-countup';
import { useRouter } from "next/navigation";
import "../../../styles/content.css";

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

export default function Content(){

    const router = useRouter();
    const postData = [
        {
            id: 1,
            name: 'Elon Musk',
            time: 'Few minutes ago',
            tag: 'Business',
            content: 'Ice cream is an amazing invention',
            location : "",
            profilePeopleSrc: startship.src,
            postImage: elonPost.src,
            likeCount : 112893
        },
        {
            id: 2,
            name: 'Maison Longan',
            time: '2 hrs ago',
            content: 'I love shrek pizza',
            profilePeopleSrc: profilePic2.src,
            postImage: foodPost2.src ,
            likeCount : 12000
        },
        {
            id: 3,
            name: 'lavelis',
            time: '22 hrs ago',
            content: 'She found everything but Vietnamese food I’m in tears',
            profilePeopleSrc: profilePic3.src,
            postImage: foodPost3.src ,
            likeCount : 1341
        },
        {
            id: 4,
            name: 'Vedant Samaiya(Modi ka Parivar)',
            time: '5 mon ago',
            content: 'Gujarati people to food cuisine',
            profilePeopleSrc: profilePic4.src,
            postImage: foodPost4.src ,
            likeCount : 12
        },
    ];

    return (
        <Flex 
            vertical 
            style={{ 
                backgroundColor : "#051017",
                border : "none",
                color : "white" ,
                width : "100%" ,
                height: "90vh",
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
            }}>
            <Card style={{width : "100%" , backgroundColor : "#1B2730" , border : "none" , borderRadius : "20px" , height : "auto" , marginBottom : "10px"}}>
                <Flex style={{marginBottom : "20px"}}>
                    <Avatar size={60} style={{ marginRight : "20px"}} src={avatar.src}/>
                    <Input className="input" placeholder="Basic usage"/>;
                </Flex>
                <Flex align="center" justify="start" style={{ paddingLeft : "7%"}}>
                    <Space size="large">
                        <Button className="upload-buttons"><RestFilled style={{ fontSize : "19px" , color : "greenyellow"}}/>Share Food</Button>
                        <Button className="upload-buttons"><ReadFilled style={{marginTop : "1px" ,  fontSize : "19px" , color : "yellow"}}/> Share Recipe</Button>
                        <Button className="upload-buttons"><PlusCircleFilled style={{marginTop : "1px" , fontSize : "19px" , color : "coral"}}/>Create Post</Button>
                    </Space>
                </Flex>
            </Card>
            {postData.map((item) => (
                <Card
                key={item.id}
                bodyStyle={{ padding: 0 }}
                style={{width: '100%', backgroundColor: '#1B2730', border: 'none', borderRadius: '20px', paddingInline: '6%', paddingBlock: '10px' , marginTop : "20px" }}
                >
                <Flex gap={6} align="center" justify="space-between">
                    <Flex gap={12}>
                        <Avatar src={item.profilePeopleSrc} size={60} style={{ marginTop : "10px"}} />
                        <Flex vertical>
                        <Flex >
                            <Flex gap={25} >
                                <Typography.Title level={2} style={{ marginTop: '7px', color: '#D5DEE1' }}>{item.name}</Typography.Title>
                                <Typography.Text style={{ marginTop: '15px', color: '#6D7B88' }}>{item.time}</Typography.Text>
                            </Flex>
                        </Flex>
                            <Flex>
                                {item.tag && (<Tag color="#55616b" style={{ marginTop: '-10px' , borderRadius : "10px" }}>{item.tag}</Tag>)}
                                <Tag onClick={() => {window.open(`https://www.google.com/maps/search/?api=1&query=guna`)}} icon={<EnvironmentFilled />} color="#55616b" style={{ marginTop: '-10px' , cursor : "pointer" , borderRadius : "10px" }}>Locate</Tag>
                            </Flex>
                        </Flex>
                    </Flex>
                        <Button style={{ borderRadius : "20px" , height : "45px" , width : "100px"}}>Follow</Button>
                </Flex>
                <Flex wrap style={{ marginInline: '8.5%', marginTop: '10px' }}>
                    <Typography.Paragraph style={{ fontWeight: 'bolder', fontSize: '18px', color: '#C6D0D2' }}>
                    {item.content}
                    </Typography.Paragraph>
                </Flex>
                <Flex wrap style={{ marginInline: '25%' }}>
                    <Card
                    bodyStyle={{ padding: 0 }}
                    style={{ border : "4px solid #3f474f" , width: '100%', backgroundColor: '#1B2730', borderRadius: '30px' }}
                    cover={<Image src={item.postImage} style={{ borderRadius: '30px' }} />}
                    ></Card>
                </Flex>
                <Flex align="center" justify="space-between">
                    <Flex gap={4} style={{ marginInline : "10%" , marginTop : "20px"}}>
                        <HeartFilled className="likes_comments" style={{ color : "white" , border : "8px solid #c70700" , backgroundColor : "#c70700" , zIndex : "3" }}/>
                        <RestFilled className="likes_comments" style={{ color : "white" , border : "8px solid #4681f4" , backgroundColor : "#4681f4" , zIndex : "2" , marginLeft : "-10px"}}/>
                        <Statistic valueStyle={{ fontSize : "19px" , color : "white" , marginTop : "3px"}} value={item.likeCount} formatter={formatter} />
                    </Flex>
                    <Typography.Text style={{ fontSize : "17px" , color : "#5D6A77"}}>44 Comments</Typography.Text>
                </Flex>
                <Flex gap={20} align="center" justify="space-between" style={{ marginTop : "30px" , paddingInline : "90px" , marginBottom : "20px"}}>
                    <Button style={{ height : "50px", borderRadius : "15px" , width : "200px" , backgroundColor : "#28343E" , border : "none"}}>
                        <Space size="small">
                            <HeartFilled style={{ fontSize : "22px" , color : "#FEFEFE" }}/>
                            <Typography.Text style={{ fontSize : "19px" , color : "#C6D0D2" }}>Like</Typography.Text>
                        </Space>
                    </Button>
                    <Button style={{ height : "50px", borderRadius : "15px" , width : "200px" , backgroundColor : "#28343E" , border : "none"}}>
                        <Space size="small">
                            <PullRequestOutlined style={{ fontSize : "22px" , color : "#FEFEFE" }}/>
                            <Typography.Text style={{ fontSize : "19px" , color : "#C6D0D2" }}>Repost</Typography.Text>
                        </Space>
                    </Button>
                    <Button style={{ height : "50px", borderRadius : "15px" , width : "200px" , backgroundColor : "#28343E" , border : "none"}}>
                        <Space size="small">
                            <MessageFilled style={{ fontSize : "22px" , color : "#FEFEFE" }}/>
                            <Typography.Text style={{ fontSize : "19px" , color : "#C6D0D2"}}>Comment</Typography.Text>
                        </Space>
                    </Button>
                    <Button style={{ height : "50px", borderRadius : "15px" , width : "60px" , backgroundColor : "#1B2730" , border : "3px solid #3a4349"}}>
                        <Space size="small">
                            <UploadOutlined style={{ fontSize : "22px" , color : "#FEFEFE" }}/>
                        </Space>
                    </Button>
                </Flex>
            </Card>
            ))}
        </Flex>
    )
}