import "../styles/profile.css"
import coverImage from "../assets/avatar.jpg"
import coverImage2 from "../assets/lavelisProPic.jpg"
import { Card , Flex , Col ,Row , Image, Avatar , Modal , Space , Button , Typography , Divider} from "antd"
import { useState } from "react"
import PostSkeleton from "./PostSkeleton"
import EditProfile from "./EditProfile"

const { Title, Paragraph, Text } = Typography;

export default function ProfileComponent(){

    const [viewProfileImage , setViewProfileState] = useState<boolean>(false);
    const [editProfile , setEditProfile] = useState<boolean>(false)
    const [active , setActive] = useState<string>("POSTS")
    const imageStyle = {
        height : "30vh" ,
        marginBottom : "10px",
        width: "100%",
        borderRadius: "20px",
    };

    const innerCardStyle = {
        height : "auto",
        margin : "0px",
        padding : "0px",
        backgroundColor: "transparent" ,
    };

    return(
        <Card style={{ backgroundColor : "#051017" , border : "none"}}>
            <Flex vertical align="center" justify="center">
                <Card style={{ width : "52vw" , backgroundColor : "#051017" , border : "none" , margin : "0px" , paddingBottom : "10px" , borderBottom : "1px solid #4a4c4c" , borderRadius : "0px"}} bodyStyle={{ padding: 0}}>
                    <Card
                        hoverable={true}
                        style={innerCardStyle}
                        cover={<Image alt="cover" src={coverImage2.src}  style={imageStyle} />}
                        bordered={false}
                        bodyStyle={{ padding: 0}}
                    />
                    <div style={{ marginTop :"-55px"}}>
                        <Space style={{ width : "100%", paddingLeft : "10px" , display : "flex" , alignContent : "center" , justifyContent : "space-between"}}>
                            <Space>
                            <Avatar draggable={true} onClick={() => {setViewProfileState(true)}} src={ coverImage.src} style={{border : "none" , backgroundColor: "white" , width : "150px" , height : "150px" }}/>
                            <Flex align="start" justify="start" vertical style={{ paddingTop : "60px" , width : "100%"}}>
                                <Button style={{ backgroundColor : "transparent" , fontSize : "24px" , border : "none" , fontWeight : "bold" , color : "#c7c7c7"}}>Vibhor Phalke</Button>
                                <Space direction="vertical">
                                    <Button style={{ backgroundColor : "transparent" , fontSize : "14px" , border : "none" , color : "#55616b"}}>@vibhorphalke</Button>
                                </Space>
                                <Flex align="center" justify="center">
                                    <Space style={{ width : "100%"  , display : "flex" , alignContent : "center" , justifyContent : "space-between" , paddingBottom : "10px"}}>
                                        <Flex align="center" justify="center">
                                            <Typography.Text style={{ color : "white" , margin : "10px" , fontSize : "16px" , fontWeight : "bolder"}}>10</Typography.Text>
                                            <Typography.Text style={{ color : "#5c6165" , fontWeight : "bolder"}}>Posts</Typography.Text>
                                        </Flex>
                                        <Flex align="center" justify="center">
                                            <Typography.Text style={{ color : "white" , margin : "10px" , fontSize : "16px" , fontWeight : "bolder"}}>6005</Typography.Text>
                                            <Typography.Text style={{ fontWeight : "bolder" , color : "#5c6165" }}>Following</Typography.Text>
                                        </Flex>
                                        <Flex align="center" justify="center">
                                            <Typography.Text style={{ color : "white" , margin : "10px" , fontSize : "16px" , fontWeight : "bolder"}}>5000</Typography.Text>
                                            <Typography.Text style={{ color : "#5c6165" , fontWeight : "bolder"}}>Follower</Typography.Text>
                                        </Flex>
                                    </Space>
                                </Flex>
                                <Paragraph style={{ color : "#adacac" , fontSize : "16px" , marginLeft : "-20px"}}>Hey there! I'm Vibhor, a huge food enthusiast. </Paragraph>
                            </Flex>
                            </Space>
                            <Button onClick={() => {setEditProfile(true)}} style={{ backgroundColor : "transparent" , color : "#c7c7c7" , width : "6.5vw" , height : "4vh" , borderRadius : "20px"}}>Edit Profile</Button>
                        </Space>
                    </div>
                </Card>
                <Flex align="center" justify="space-between" style={{width : "51vw" , backgroundColor: 'transparent', height : "80px"  , border : "none" , borderRadius : "20px" , paddingInline : "30px"}}>
                    <Button style={{ background : "transparent" , width : "10vw" , borderRadius : "10px" , height : "4vh" , color : "white"}} onClick={() => { setActive("POSTS")}}>Posts</Button>
                    <Button style={{ background : "transparent" , width : "10vw" , borderRadius : "10px" , height : "4vh" , color : "white"}} onClick={() => { setActive("FOLLOWERS")}}>Followers</Button>
                    <Button style={{ background : "transparent" , width : "10vw" , borderRadius : "10px" , height : "4vh" , color : "white"}} onClick={() => { setActive("FOLLOWING")}}>Following</Button>
                </Flex>
                <div style={{ width : "51vw"}}>
                    {active === "POSTS" && <PostSkeleton/>}
                    {active === "FOLLOWERS" && <Followers/>}
                    {active === "FOLLOWING" && <Following/>}
                </div>
            </Flex>
            <EditProfile editProfile={editProfile} setEditProfile={setEditProfile}/>
            <Modal 
                footer={null} 
                bodyStyle={{ padding: 0 }} 
                open={viewProfileImage} 
                onCancel={() => { setViewProfileState(false) }} 
                style={{ background: "transparent", padding: 0, margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                width="auto"
                >
                <Image 
                    src={coverImage.src} 
                    preview={true}
                    style={{ display: 'block', width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
            </Modal>
        </Card>
    )
}

function Followers(){

        const fetchedProfile = [
        {
            name : "Ivanka James",
            username : "@ivankajames",
            img : coverImage
        },
        {
            name : "Big Bundah Girl",
            username : "@bigBgirl",
            img : coverImage2 
        },
        {
            name : "GlizzyGobbler",
            username : "@GZperiod",
            img : coverImage
        },
        {
            name : "Tiny Weenie",
            username : "@teeniweeni",
            img : coverImage    
        },
        {
            name : "Bob Loader",
            username : "@BLnigger",
            img : coverImage
        },
        {
            name : "Dee Snuts",
            username : "@DjNutter",
            img : coverImage
        }
    ]
    
    return(
        <div style={{
            height: "60vh",
            overflowY: "scroll",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        }}>
            {fetchedProfile.map((value, index) => (
                <Flex align="center" justify="space-between" style={{ marginBottom : "30px" , paddingInline : "20px" , backgroundColor : "#1B2730" , paddingBlock : "10px" , borderRadius : "30px"}}>
                    <Space>
                        <Avatar alt="Profile Pic" src={value.img.src} style={{position : "relative" , width : "8vh" , height : "8vh" }}/>
                        <Flex vertical>
                            <Typography.Text style={{ fontSize : "24px" , color : "#c7c7c7" , fontWeight : "bolder"}}>{value.name}</Typography.Text>
                            <Typography.Text style={{ color : "#55616b"}}>{value.username}</Typography.Text>
                        </Flex>
                    </Space>
                    <Button>Remove</Button>
                </Flex>
            ))}
        </div>   
    )
}

function Following(){

        const fetchedProfile = [
        {
            name : "Ivanka James",
            username : "@ivankajames",
            img : coverImage
        },
        {
            name : "Big Bundah Girl",
            username : "@bigBgirl",
            img : coverImage2 
        },
        {
            name : "GlizzyGobbler",
            username : "@GZperiod",
            img : coverImage
        },
    ]

    return(
        <div style={{
            height: "60vh",
            overflowY: "scroll",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        }}>
            {fetchedProfile.map((value, index) => (
                <Flex align="center" justify="space-between" style={{ marginBottom : "30px" , paddingInline : "20px" , backgroundColor : "#1B2730" , paddingBlock : "10px" , borderRadius : "30px"}}>
                    <Space>
                        <Avatar alt="Profile Pic" src={value.img.src} style={{position : "relative" , width : "8vh" , height : "8vh" }}/>
                        <Flex vertical>
                            <Typography.Text style={{ fontSize : "24px" , color : "#c7c7c7" , fontWeight : "bolder"}}>{value.name}</Typography.Text>
                            <Typography.Text style={{ color : "#55616b"}}>{value.username}</Typography.Text>
                        </Flex>
                    </Space>
                    <Button>Remove</Button>
                </Flex>
            ))}
        </div>   
    )
}
