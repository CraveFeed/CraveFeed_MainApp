"use client"

import { Avatar, Card , Space , Flex , Input, Button, Typography } from "antd";
import { Tag , Image } from "antd";
import { RestFilled , ReadFilled , PlusCircleFilled} from "@ant-design/icons";
import avatar from "../../../assets/avatar.jpg";
import image from "../../../assets/wallpaperflare.ico";
import elonPost from "../../../assets/elon_food_post.jpeg"
import startship from "../../../assets/starship.jpeg"
import foodPost2 from "../../../assets/food_post2.jpeg"
import foodPost3 from "../../../assets/food_post3.jpeg"
import foodPost4 from "../../../assets/food_post4.jpeg"
import profilePic2 from "../../../assets/profilePic2.jpg"
import profilePic3 from "../../../assets/lavelisProPic.jpg"
import profilePic4 from "../../../assets/profilePic4.jpg"
import "../../../styles/content.css";

export default function Content(){


    const postData = [
        {
            id: 1,
            name: 'Elon Musk',
            time: 'Few minutes ago',
            tag: 'Business',
            content: 'Ice cream is an amazing invention',
            profilePeopleSrc: startship.src,
            postImage: elonPost.src
        },
        {
            id: 2,
            name: 'Maison Longan',
            time: '2 hrs ago',
            tag: 'Personal',
            content: 'I love shrek pizza',
            profilePeopleSrc: profilePic2.src,
            postImage: foodPost2.src
        },
        {
            id: 3,
            name: 'lavelis',
            time: '22 hrs ago',
            tag: 'Personal',
            content: 'She found everything but Vietnamese food I’m in tears',
            profilePeopleSrc: profilePic3.src,
            postImage: foodPost3.src
        },
        {
            id: 4,
            name: 'Vedant Samaiya(Modi ka Parivar)',
            time: '5 mon ago',
            tag: 'Personal',
            content: 'Gujarati people to food cuisine',
            profilePeopleSrc: profilePic4.src,
            postImage: foodPost4.src
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
                style={{ width: '100%', backgroundColor: '#1B2730', border: 'none', borderRadius: '20px', paddingInline: '6%', paddingBlock: '10px' , marginTop : "20px" }}
                >
                <Flex gap={6}>
                    <Avatar src={item.profilePeopleSrc} size={60} />
                    <Flex vertical>
                    <Flex gap={25}>
                        <Typography.Title level={2} style={{ marginTop: '7px', color: '#D5DEE1' }}>{item.name}</Typography.Title>
                        <Typography.Text style={{ marginTop: '15px', color: '#6D7B88' }}>{item.time}</Typography.Text>
                    </Flex>
                    <Flex>
                        <Tag color="#55616b" style={{ marginTop: '-10px' }}>{item.tag}</Tag>
                    </Flex>
                    </Flex>
                </Flex>
                <Flex wrap style={{ marginInline: '8.5%', marginTop: '20px' }}>
                    <Typography.Paragraph style={{ fontWeight: 'bolder', fontSize: '18px', color: '#C6D0D2' }}>
                    {item.content}
                    </Typography.Paragraph>
                </Flex>
                <Flex wrap style={{ marginInline: '25%' }}>
                    <Card
                    bodyStyle={{ padding: 0 }}
                    style={{ width: '100%', backgroundColor: '#1B2730', border: 'none', borderRadius: '30px', height: '10%' }}
                    cover={<Image src={item.postImage} style={{ borderRadius: '30px' }} />}
                    ></Card>
                </Flex>
            </Card>
            ))}
        </Flex>
    )
}