"use client"

import React from "react";
import { useState } from "react";
import type { MenuProps } from "antd";
import { Comment } from "@ant-design/compatible";
import { Tooltip, List } from 'antd';
import { Avatar, Card , Space , Flex , Input, Button, Typography,  Form,  Dropdown , Modal} from "antd";
import type { StatisticProps } from 'antd';
import { Tag , Image , Statistic } from "antd";
import { RestFilled , EnvironmentFilled , HeartFilled , UploadOutlined , PullRequestOutlined , MessageFilled } from "@ant-design/icons";
import avatar from "../assets/avatar.jpg";
import elonPost from "../assets/elon_food_post.jpeg"
import startship from "../assets/starship.jpeg"
import foodPost2 from "../assets/food_post2.jpeg"
import foodPost3 from "../assets/food_post3.jpeg"
import foodPost4 from "../assets/food_post4.jpeg"
import profilePic2 from "../assets/profilePic2.jpg"
import profilePic3 from "../assets/lavelisProPic.jpg"
import profilePic4 from "../assets/profilePic4.jpg"
import { FacebookShare , WhatsappShare } from 'react-share-kit';
import CountUp from 'react-countup';
import "../styles/profile.css";

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const { TextArea } = Input;
const Editor = () => (
<>
    <Form.Item>
    <TextArea rows={4} />
    </Form.Item>
    <Form.Item>
    <Button type="primary">
        Add Comment
    </Button>
    </Form.Item>
</>
);

export default function PostSkeleton(){

    const [showComments ,setShowComments] = useState<boolean>(false);
    const [ addComment , setAddComment ] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [ id , setId ] = useState<number>();


    const data = [
        {
            actions: [<span style={{ color : "gray"}} key="comment-list-reply-to-0">Reply to</span>],
            author: <span style={{ color : "ghostwhite" }}>Han Solo</span>,
            avatar: profilePic3.src,
            content: (
                <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
            ),
            datetime: (
                <Tooltip title="2016-11-22 11:22:33">
                <span>8 hours ago</span>
            </Tooltip>
            ),
        },
        {
            actions: [<span style={{ color : "gray"}} key="comment-list-reply-to-0">Reply to</span>],
            author: <span style={{ color : "ghostwhite" }}>Han Solo</span>,
            avatar: startship.src,
            content: (
                <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
            ),
            datetime: (
                <Tooltip title="2016-11-22 10:22:33">
                <span>9 hours ago</span>
            </Tooltip>
            ),
        },
    ];


    // Comments array
    
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Space style={{ borderRadius : "200px" , overflow : "hidden" , height: "60px" , width : "60px"}}>
                    <FacebookShare
                        windowHeight={20}
                        url={"https://nextjs.org/"}
                        title={'Share your views on what else should I try CraveFeed'}
                        hashtag={'#cravefeed'}
                        className="share-button"
                        >
                    </FacebookShare>
                </Space>
            ),
        },
        {
            key: '2',
            label: (
                <Space style={{ borderRadius : "200px" , overflow : "hidden" , height: "60px" , width : "60px"}}>
                    <WhatsappShare
                        windowHeight={20}
                        url={"https://nextjs.org/"}
                        title={'Share your views on what else should I try on CraveFeed'}
                        className="share-button"
                        >
                    </WhatsappShare>
                </Space>
            ),
        },
    ];

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
    ];

    return(
        <>
            {postData.map((item) => (
                <Card
                key={item.id}
                bodyStyle={{ padding: 0 }}
                style={{width: '100%', backgroundColor: 'transparent', border: '1px solid #3f474f', borderRadius: '20px', paddingInline: '6%', paddingBlock: '10px' , marginTop : "20px" }}
                className="profile-card-container"
                >
                <Flex gap={6} align="center" justify="space-between">
                    <Flex gap={3}>
                        <Avatar src={item.profilePeopleSrc} className="profile_profile_pic" />
                        <Flex vertical>
                        <Flex >
                            <Flex gap={25} >
                                <Typography.Title className="profile-name" level={2}>{item.name}</Typography.Title>
                                <Typography.Text className="profile_time">{item.time}</Typography.Text>
                            </Flex>
                        </Flex>
                            <Flex>
                                {item.tag && (<Tag className="profile-user-tags" color="#55616b" style={{ marginTop: '-10px' , borderRadius : "10px" }}>{item.tag}</Tag>)}
                                <Tag className="profile-user-tags" onClick={() => {window.open(`https://www.google.com/maps/search/?api=1&query=guna`)}} icon={<EnvironmentFilled />} color="#55616b" style={{ marginTop: '-10px' , cursor : "pointer" , borderRadius : "10px" }}>Locate</Tag>
                            </Flex>
                        </Flex>
                    </Flex>
                        <Button className="profile_follow_btn">Follow</Button>
                </Flex>
                <Flex wrap style={{ marginInline: '8.5%', marginTop: '10px' }}>
                    <Typography.Paragraph className="profile_description">
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
                <Flex className="profile-likes_comments" align="center" justify="space-between">
                    <Flex gap={4} style={{ marginInline : "10%" , marginTop : "20px"}}>
                        <HeartFilled className="profile-likes_comments_heart"/>
                        <RestFilled className="profile-likes_comments_comment" />
                        <Statistic className="profile-custom-statistic" value={item.likeCount} formatter={formatter} />
                    </Flex>
                    <Typography.Text className="profile-comment-count" style={{ cursor : "pointer"}} onClick={() => {setShowComments(!showComments) , setId(item.id)}}>2 comments</Typography.Text>
                </Flex>
                <Flex gap={20} className="profile-action-button-mainDiv" align="center" justify="space-between">
                    <Button className="profile-action-button">
                        <Space size="small">
                            <HeartFilled className="profile-action-button-icon"/>
                            <Typography.Text className="profile-action-button-text">Like</Typography.Text>
                        </Space>
                    </Button>
                    <Button className="profile-action-button">
                        <Space size="small">
                            <PullRequestOutlined className="profile-action-button-icon"/>
                            <Typography.Text className="profile-action-button-text">Repost</Typography.Text>
                        </Space>
                    </Button>
                    <Button onClick={() => { setAddComment(true)}} className="profile-action-button">
                        <Space size="small" >
                            <MessageFilled className="profile-action-button-icon"/>
                            <Typography.Text className="profile-action-button-text">Comment</Typography.Text>
                        </Space>
                    </Button>
                    <Button className="profile-upload-button">
                        <Space size="small">
                            <Dropdown menu={{ items }}>
                                <UploadOutlined className="profile-upload-button-icon"/>
                            </Dropdown>
                        </Space>
                    </Button>
                </Flex>
                {/* // Comments */}
                {showComments && id == item.id && (
                    <List
                        className="profile-comment-list"
                        header={ <span style={{ color : "#4991FD"}}>{data.length} comments</span>}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <li>
                            <Comment
                                style={{ backgroundColor : "transparent" , color : "white"}}
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                // datetime={item.datetime}
                            />
                        </li>
                        )}
                    />
                )}

                    <Modal footer={null} bodyStyle={{ padding: 0 }} open={addComment} onCancel={() => { setAddComment(false)}} className="profile-custom-modal">
                        <Comment
                            style={{ backgroundColor : "#1B2730" , color : "white"}}
                            avatar={<Avatar src={avatar.src} alt="Han Solo" />}
                            content={
                            <Editor
                            />
                            }
                        />
                    </Modal>
            </Card>
            ))}
        </>
    )
}