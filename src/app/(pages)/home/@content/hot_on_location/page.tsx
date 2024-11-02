"use client"

import React, { use } from "react";
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import { addCommentCall } from "@/lib/features/services/addComment";
import { useState  , useEffect} from "react";
import type { MenuProps } from "antd";
import { Comment } from "@ant-design/compatible";
import { Tooltip, List } from 'antd';
import { Avatar, Card , Space , Flex , Input, Button, Typography, FloatButton ,  Form,  Dropdown , Modal , Menu } from "antd";
import type { StatisticProps } from 'antd';
import { Tag , Image , Statistic } from "antd";
import { RestFilled , ReadFilled , PlusCircleFilled , PlusOutlined , FireFilled , CompassFilled , HomeFilled , EnvironmentFilled , HeartFilled , UploadOutlined , PullRequestOutlined , MessageFilled } from "@ant-design/icons";
import { setViewUserId } from "@/lib/features/services/global";
// import elonPost from "../../../../assets/elon_food_post.jpeg"
// import startship from "../../../../assets/starship.jpeg"
// import foodPost2 from "../../../../assets/food_post2.jpeg"
// import foodPost3 from "../../../../assets/food_post3.jpeg"
// import foodPost4 from "../../../../assets/food_post4.jpeg"
// import profilePic2 from "../../../../assets/profilePic2.jpg"
// import profilePic3 from "../../../../assets/lavelisProPic.jpg"
// import profilePic4 from "../../../../assets/profilePic4.jpg"
import { FacebookShare , WhatsappShare } from 'react-share-kit';
import CountUp from 'react-countup';
import { useRouter } from "next/navigation";
import "../../../../styles/content.css";
import { fetchHomePost } from "@/lib/features/services/home/getHomePost";
import ShareFood from "@/app/Components/ShareFood";
import CreatePost from "@/app/Components/CreatePost";

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const { TextArea } = Input;

export default function Content(){
  
    const userId = useAppSelector(state => state.global.userId);

    useEffect(() => {
        if (userId) {
            dispatch(fetchHomePost({ userId }));
        } else {
            console.error("User ID is null");
        }
    },[]);

    const [commentContent , setCommentContent ] = useState("");
    const [showComments ,setShowComments] = useState<boolean>(false);
    const [ addComment , setAddComment ] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [liked , setLiked] = useState<boolean>(false);
    const [ id , setId ] = useState<number>();
    const avatar = useAppSelector(state => state.getBio.avatar);
    // const [data, setData] = useState([
    //             {
    //         author: <span style={{ color : "ghostwhite" }}>Han Solo</span>,
    //         avatar: profilePic3.src,
    //         content: (
    //             <p>
    //             We supply a series of design principles, practical patterns and high quality design
    //             resources (Sketch and Axure), to help people create their product prototypes beautifully and
    //             efficiently.
    //         </p>
    //         ),
    //         datetime: (
    //             <Tooltip title="2016-11-22 11:22:33">
    //             <span>8 hours ago</span>
    //         </Tooltip>
    //         ),
    //     },
    //     {
    //         author: <span style={{ color : "ghostwhite" }}>Han Solo</span>,
    //         avatar: startship.src,
    //         content: (
    //             <p>
    //             We supply a series of design principles, practical patterns and high quality design
    //             resources (Sketch and Axure), to help people create their product prototypes beautifully and
    //             efficiently.
    //         </p>
    //         ),
    //         datetime: (
    //             <Tooltip title="2016-11-22 10:22:33">
    //             <span>9 hours ago</span>
    //         </Tooltip>
    //         ),
    //     },
    // ]);
    const dispatch = useAppDispatch();
    // add Comment State
    const content = useAppSelector(state => state.addComment.content);
    const router = useRouter();    
    
    const Editor = () => (
        <Form>
            <Form.Item>
                <TextArea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
            </Form.Item>
            <Form.Item>
            <Button type="primary" onClick={() => {
                // dispatch(addCommentCall({postId : "1" , userId : "1" , content : commentContent}));
                // let newComment = {
                //     author: <span style={{ color : "ghostwhite" }}>Han Solo</span>,
                //     avatar: profilePic3.src,
                //     content: (
                //         <p>
                //             {commentContent}
                //         </p>
                //     ),
                //     datetime: (
                //         <Tooltip title="2016-11-22 11:22:33">
                //             <span>8 hours ago</span>
                //         </Tooltip>
                //     ),    
                // };
                // setData(prevData => [newComment , ...prevData]);
                // setAddComment(false);
            }}>
                Add Comment
            </Button>
            </Form.Item>
        </Form>
    );
    
    
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

    const postData = useAppSelector(state => state.getHomePost);
    
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
    //     {
    //         id: 4,
    //         name: 'Vedant Samaiya(Modi ka Parivar)',
    //         time: '5 mon ago',
    //         content: 'Gujarati people to food cuisine',
    //         profilePeopleSrc: profilePic4.src,
    //         postImage: foodPost4.src ,
    //         likeCount : 12
    //     },
    // ];
    
    const MenuItems = [
        {
            key: 1,
            icon: <HomeFilled className="nav-buttons-icons" />,
            label: <span className="nav-buttons-text">Home</span>,   
            route: "/home"
        },
        {
            key: 2,
            icon: <CompassFilled  className="nav-buttons-icons"/>,
            label: <span className="nav-buttons-text">Explore</span>,
            route: "/home/explore"
        },
        {
            key: 3,
            icon: <FireFilled className="nav-buttons-icons"/>,
            label: <span className="nav-buttons-text">For You</span>,
            route: "/home/hot_on_location"
        },
    ];
    useEffect(() => {
        const path = window.location.pathname;
        const index = MenuItems.findIndex(item => item.route === path);
        setSelectedIndex(index !== -1 ? index : 0);
    }, []);

    const handleMenuClick = (index: number) => {
        setSelectedIndex(index);
        console.log(selectedIndex);
    }

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
            <Card className="home-desktop" style={{width : "100%" , backgroundColor : "#1B2730" , border : "none" , borderRadius : "20px" , height : "auto" , marginBottom : "10px"}}>
                <Flex style={{marginBottom : "20px"}}>
                    <Avatar size={60} style={{ marginRight : "20px"}} src={avatar}/>
                    <Input className="input" placeholder="Basic usage"/>;
                </Flex>
                <Flex align="center" justify="start" style={{ paddingLeft : "7%"}}>
                    <Space size="large">
                        <ShareFood/>
                        <Button className="upload-buttons"><ReadFilled style={{marginTop : "1px" ,  fontSize : "19px" , color : "#4991FD"}}/> Share Recipe</Button>
                       <CreatePost/>
                    </Space>
                </Flex>
            </Card>
            <Menu
                style={{backgroundColor : "#1B2730" , padding : "20px" , borderRadius : "20px" ,  height : "auto" , width : "100%" , color : "white"}}
                mode="horizontal"
                defaultSelectedKeys={['1']}
                className="menu-bar home-mobile"
                selectedKeys={[String(selectedIndex + 1)]}
            >
            {MenuItems?.map((item, index) => (
                <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => { handleMenuClick(index); router.push(item.route); }}
                    style={{ color : "ghostwhite" }} 
                >
                    {item.label}
                </Menu.Item>
            ))}
            </Menu>
            <FloatButton icon={<PlusOutlined />} className="home-mobile" />
            {postData.map((item) => (
                <Card
                key={item.postId}
                bodyStyle={{ padding: 0 }}
                style={{width: '100%', backgroundColor: '#1B2730', border: 'none', borderRadius: '20px', paddingInline: '6%', paddingBlock: '10px' , marginTop : "20px" }}
                className="card-container"
                >
                <Flex gap={6} align="center" justify="space-between">
                    <Flex gap={3}>
                        <Avatar src={item.userAvatar} className="post_profile_pic" />
                        <Flex vertical>
                        <Flex >
                            <Flex gap={25} >
                                <Typography.Title onClick={() => { dispatch(setViewUserId(item.userId)); router.push("/view_profile") }} className="post-name" style={{ cursor : "pointer" }} level={2}>{item.name}</Typography.Title>
                                <Typography.Text className="post_time">{item.timeDescription}</Typography.Text>
                            </Flex>
                        </Flex>
                            <Flex>
                                {item.tag && (<Tag className="user-tags" color="#55616b" style={{ marginTop: '-10px' , borderRadius : "10px" }}>{item.tag}</Tag>)}
                                <Tag className="user-tags" onClick={() => {window.open(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`);}} icon={<EnvironmentFilled />} color="#55616b" style={{ marginTop: '-10px' , cursor : "pointer" , borderRadius : "10px" }}>Locate</Tag>
                            </Flex>
                        </Flex>
                    </Flex>
                        <Button className="post_follow_btn">Follow</Button>
                </Flex>
                <Flex wrap style={{ marginInline: '8.5%', marginTop: '10px' }}>
                    <Typography.Paragraph className="post_description">
                        {item.description}
                    </Typography.Paragraph>
                </Flex>
                <Flex wrap style={{ marginInline: '25%' }}>
                    <Card
                    bodyStyle={{ padding: 0 }}
                    style={{ border : "4px solid #3f474f" , width: '100%', backgroundColor: '#1B2730', borderRadius: '30px' }}
                    cover={<Image src={item.pictures} style={{ borderRadius: '30px' }} />}
                    ></Card>
                </Flex>
                <Flex className="likes_comments" align="center" justify="space-between">
                    <Flex gap={4} style={{ marginInline : "10%" , marginTop : "20px"}}>
                        <HeartFilled className="likes_comments_heart"/>
                        <RestFilled className="likes_comments_comment" />
                        <Statistic className="custom-statistic" value={item.likes} formatter={formatter} />
                    </Flex>
                    <Typography.Text className="comment-count" style={{ cursor : "pointer"}} onClick={() => { if(item.postId == id){setShowComments(!showComments)}; setId(item.postId)}}>{item.comments?.length ?? 0} comments</Typography.Text>
                </Flex>
                <Flex gap={20} className="post-action-button-mainDiv" align="center" justify="space-between">
                    <Button className="post-action-button" onClick={() => {setLiked(!liked)}}>
                        <Flex style={{ display : "flex" , alignContent : "center" , justifyContent : "center" , alignItems : "center"}}>
                            <div className="post-action-button-likeBg">
                                <div className={`post-action-button-like ${liked ? 'liked' : ' '}`}>
                                </div>
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
                    <Button onClick={() => { setAddComment(true)}} className="post-action-button">
                        <Space size="small" onClick={() => {}} >
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
                {/* // Comments */}
                {showComments && (id == item.postId) && (
                     <List
                        className="comment-list"
                        header={<span style={{ color: "#4991FD" }}>{item.comments.length} comments</span>}
                        itemLayout="horizontal"
                        dataSource={item.comments}
                        renderItem={(comment) => (
                            <li>
                            <Comment
                                style={{ backgroundColor: "#1B2730", color: "white" }}
                                author={<span style={{ color: "ghostwhite" }}>{comment.name}</span>}
                                avatar={comment.userAvatar}
                                content={<p>{comment.content}</p>}
                                datetime={
                                <span style={{ color : "gray"}} title={comment.commentTime}>
                                    {comment.relativeTime}
                                </span>
                                }
                            />
                            </li>
                        )}
                        />
                    )}

                    <Modal footer={null} bodyStyle={{ padding: 0 }} open={addComment} onCancel={() => { setAddComment(false)}} className="custom-modal">
                        <Comment
                            style={{ backgroundColor : "#1B2730" , color : "white"}}
                            avatar={<Avatar src={avatar} alt="Han Solo" />}
                            content={
                            <Editor/>
                            }
                        />
                    </Modal>
            </Card>
            ))}
        </Flex>
    )
}