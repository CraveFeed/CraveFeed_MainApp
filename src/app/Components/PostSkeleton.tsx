"use client"

import React from "react";
import { useState } from "react";
import type { MenuProps } from "antd";
import { Comment } from "@ant-design/compatible";
import { Tooltip, List } from 'antd';
import { useEffect } from "react";
import { useAppSelector , useAppDispatch } from "@/lib/hooks";
import { Avatar, Card , Space , Flex , Input, Button, Typography,  Form,  Dropdown , Modal} from "antd";
import type { StatisticProps } from 'antd';
import { Tag , Image , Statistic } from "antd";
import { fetchHotPost } from "@/lib/features/services/home/getHotPost";
import { RestFilled , EnvironmentFilled , HeartFilled , UploadOutlined , PullRequestOutlined , MessageFilled } from "@ant-design/icons";
import avatar from "../assets/avatar.jpg";
import startship from "../assets/starship.jpeg"
import profilePic3 from "../assets/lavelisProPic.jpg"
import { FacebookShare , WhatsappShare } from 'react-share-kit';
import CountUp from 'react-countup';
import "../styles/content.css";
import "../styles/profile.css";
import { getProfilePost } from "@/lib/features/services/profile/getProfilePosts";
import Carousel from "./Carousal";
import { ConfigProvider } from 'antd';
import { SendOutlined } from "@ant-design/icons";

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

    const dispatch = useAppDispatch();

    const [commentContent , setCommentContent ] = useState("");
    const [showComments ,setShowComments] = useState<boolean>(false);
    const [ addComment , setAddComment ] = useState<boolean>(false);
    const [ id , setId ] = useState<string>();


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

    // const postData

    const postData = useAppSelector(state => state.getProfilePost.posts);
    console.log("post data :-    " ,  postData);

    // const postData = [
    //     {
    //         id: 1,
    //         name: 'Elon Musk',
    //         time: 'Few minutes ago',
    //         tag: 'Business',
    //         content: 'Ice cream is an amazing invention',
    //         location : "",
    //         profilePeopleSrc: startship.src,
    //         postImage: elonPost.src,
    //         likeCount : 112893
    //     },
    //     {
    //         id: 2,
    //         name: 'Maison Longan',
    //         time: '2 hrs ago',
    //         content: 'I love shrek pizza',
    //         profilePeopleSrc: profilePic2.src,
    //         postImage: foodPost2.src ,
    //         likeCount : 12000
    //     },
    //     {
    //         id: 3,
    //         name: 'lavelis',
    //         time: '22 hrs ago',
    //         content: 'She found everything but Vietnamese food I’m in tears',
    //         profilePeopleSrc: profilePic3.src,
    //         postImage: foodPost3.src ,
    //         likeCount : 1341
    //     },
    // ];

    return(
        <>
            {postData.map((item) => (
                <Card
                key={item.postId}
                bodyStyle={{ padding: 0 }}
                style={{width: '100%', backgroundColor: 'transparent', border: '1px solid #3f474f', borderRadius: '20px', paddingBlock: '10px' , marginTop : "20px" }}
                className="profile-card-container"
                >
                <Flex gap={6} align="center" justify="space-between" style={{paddingInline : "2%" }}>
                    <Flex gap={3}>
                        <Avatar src={item.userAvatar} className="profile_profile_pic" />
                        <Flex vertical>
                        <Flex >
                            <Flex gap={25} >
                                <Typography.Title className="profile-name" level={2}>{item.name}</Typography.Title>
                                <Typography.Text className="profile_time">{item.timeDescription}</Typography.Text>
                            </Flex>
                        </Flex>
                            <Flex>
                                {item.tag === "Business" && (<Tag className="profile-user-tags" color="#55616b" style={{ marginTop: '-10px' , borderRadius : "10px" }}>
                                    <Flex justify="center" align="center">
                                        {item.tag}
                                    </Flex>
                                </Tag>)}
                                <Tag className="profile-user-tags" onClick={() => {window.open(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`);}} icon={<EnvironmentFilled />} color="#55616b" style={{ marginTop: '-10px' , cursor : "pointer" , borderRadius : "10px" }}>Locate</Tag>
                            </Flex>
                        </Flex>
                    </Flex>
                        <Button className="profile_follow_btn">Follow</Button>
                </Flex>
                <Flex wrap style={{ marginInline: '0.5%', marginTop: '10px' }}>
                    <Typography.Paragraph className="profile_description" style={{ paddingInline : "2%" }}>
                        {item.description}
                    </Typography.Paragraph>
                </Flex>

                <Flex className="display-all" wrap style={{ marginInline: '20%' }}>
                    <Carousel slides={item.pictures}/>
                </Flex>

                <Flex className="display-500px">
                    <Carousel slides={item.pictures}/>
                </Flex>

                <Flex className="profile-likes_comments" align="center" justify="space-between">
                    <Flex gap={4} style={{ marginInline : "10%" , marginTop : "20px"}}>
                        <HeartFilled className="profile-likes_comments_heart"/>
                        <RestFilled className="profile-likes_comments_comment" />
                        <Statistic className="profile-custom-statistic" value={item.likes} formatter={formatter} />
                    </Flex>
                    <Typography.Text className="profile-comment-count" style={{ cursor : "pointer" , marginRight : "20px"}}>{item.comments?.length ?? 0} impressions</Typography.Text>
                </Flex>

                {/* DeskTop And Tab View */}
                <Flex gap={20} className="post-action-button-mainDiv display-all" align="center" justify="space-between">
                    <Button className="post-action-button" key={item.postId}>
                        <Flex style={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                            <div className="post-action-button-likeBg">
                                <div className={`post-action-button-like`} />
                            </div>
                            <Typography.Text className="post-action-button-text post-action-button-textLike">Like</Typography.Text>
                        </Flex>
                    </Button>
                    <Button className="post-action-button">
                        <Space size="small">
                            <PullRequestOutlined className="post-action-button-icon"/>
                            <Typography.Text className="post-action-button-text">Repost</Typography.Text>
                        </Space>
                    </Button>
                    {/* <Button onClick={() => { setAddComment(true)}} className="post-action-button">
                        <Space size="small" onClick={() => {}} >
                            <MessageFilled className="post-action-button-icon"/>
                            <Typography.Text className="post-action-button-text">Comment</Typography.Text>
                        </Space>
                    </Button> */}
                    <Button 
                        onClick={() => { 
                            if(item.postId == id) {
                                setShowComments(!showComments)
                            } else {
                                setShowComments(true)
                            }
                            setId(item.postId)
                        }} 
                        className="post-action-button"
                    >
                        <Space size="small">
                            <MessageFilled className="post-action-button-icon"/>
                            <Typography.Text className="post-action-button-text">Comment</Typography.Text>
                        </Space>
                    </Button>
                    <Button className="post-upload-button">
                        <Space size="small">
                            <Dropdown menu={{ items }}>
                                <UploadOutlined className="post-upload-button-icon"/>
                            </Dropdown>
                        </Space>
                    </Button>
                </Flex>

                {/* Mobile View */}

                <Flex gap={20} className="post-action-button-mainDiv display-500px" align="center" justify="center">
                    <ConfigProvider wave={{ disabled: true }}>
                        <Button className="post-action-button" style={{ width : "40px" , border : "none"}} key={item.postId}>
                            <Flex>
                                <div className="post-action-button-likeBg">
                                    <div className={`post-action-button-like`} />
                                </div>
                            </Flex>
                        </Button>
                    </ConfigProvider>
                    <Button className="post-action-button">
                        <Space size="small">
                            <PullRequestOutlined className="post-action-button-icon"/>
                        </Space>
                    </Button>
                    <Button className="post-action-button"
                        onClick={() => { 
                            if(item.postId == id) {
                                setShowComments(!showComments)
                            } else {
                                setShowComments(true)
                            }
                            setId(item.postId)
                        }} 
                    >
                        <Space size="small">
                            <MessageFilled className="post-action-button-icon"/>
                        </Space>
                    </Button>
                    <Button className="post-upload-button">
                        <Space size="small">
                            <Dropdown menu={{ items }}>
                                <UploadOutlined className="post-upload-button-icon"/>
                            </Dropdown>
                        </Space>
                    </Button>
                </Flex>
                {/* // Comments */}
                {showComments && (id == item.postId) && (
                    <List
                        className="profile-comment-list"
                        style={{
                            maxHeight: '400px',
                            overflowY: 'auto',
                            paddingInline : "6%",
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE and Edge
                            backgroundColor : "transparent !important"
                        }}
                        header={
                            <Flex vertical gap={10} style={{ position: 'sticky', top: 0, backgroundColor: 'transparent', zIndex: 1, padding: '10px 0' }}>
                                <span style={{ color: "#4991FD" }}>{item.comments.length} comments</span>
                                <Comment
                                    style={{ 
                                        backgroundColor: "transparent", 
                                        color: "white",
                                        borderRadius: '12px',
                                    }}
                                    avatar={<Avatar src={avatar.src} alt="User" />}
                                    content={
                                        <Form style={{ width: '100%' }}>
                                            <Form.Item style={{ marginBottom: '12px' }}>
                                                <TextArea
                                                    value={commentContent}
                                                    onChange={(e) => setCommentContent(e.target.value)}
                                                    placeholder="Write a comment..."
                                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                                    style={{ 
                                                        backgroundColor: "#253541",
                                                        border: "1px solid #364d79",
                                                        borderRadius: '8px',
                                                        color: "white",
                                                        padding: '8px 12px',
                                                        fontSize: '14px',
                                                    }}
                                                />
                                                <Button 
                                                    type="text"
                                                    style={{
                                                        position: 'absolute',
                                                        right: '8px',
                                                        bottom: '8px',
                                                        color: '#4991FD',
                                                        padding: '4px',
                                                        height: 'auto'
                                                    }}
                                                    onClick={() => {
                                                        setCommentContent("");
                                                    }}
                                                    icon={<SendOutlined />}
                                                />
                                            </Form.Item>
                                        </Form>
                                    }
                                />
                            </Flex>
                        }
                        itemLayout="horizontal"
                        dataSource={item.comments}
                        renderItem={(comment) => (
                                <Comment
                                    style={{ 
                                        backgroundColor: "transparent", 
                                        color: "white",
                                        transition: 'background-color 0.2s',
                                        marginTop : "-10px",
                                    }}
                                    author={<span style={{ color: "ghostwhite", fontWeight: 500 }}>{comment.author}</span>}
                                    avatar={comment.avatar}
                                    content={<p style={{ color: '#e1e1e1'}}>{comment.content}</p>}
                                    datetime={
                                        <span style={{ 
                                            color: "gray", 
                                            fontSize: '12px'
                                        }} 
                                        title={comment.fullDateTime}>
                                            {comment.relativeTime}
                                        </span>
                                    }
                                />
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