import "../styles/profile.css"
import coverImage from "../assets/avatar.jpg"
import coverImage2 from "../assets/lavelisProPic.jpg"
import { useAppSelector , useAppDispatch } from "@/lib/hooks"
import { Card , Flex , Image, Avatar , Modal , Space , Button , Typography } from "antd"
import { fetchBioState } from "@/lib/features/services/home/getBio"
import { useEffect, useState } from "react"
import PostSkeleton from "./PostSkeleton"
import EditProfile from "./EditProfile"
import { getFollowersCall , getFollowingCall } from "@/lib/features/services/profile/getFollowersAndFollowing"

const { Paragraph } = Typography;

export default function ProfileComponent(){

    
    const [viewProfileImage , setViewProfileState] = useState<boolean>(false);
    const [editProfile , setEditProfile] = useState<boolean>(false)
    const [active , setActive] = useState<string>("POSTS")
    const firstName = useAppSelector((state) => state.getBio.firstname);
    const lastName = useAppSelector((state) => state.getBio.lastname);
    const noOfFollowers = useAppSelector((state) => state.getBio.noOfFollowers);
    const noOfFollowing = useAppSelector((state) => state.getBio.noOfFollowing);
    const noOfPosts = useAppSelector((state) => state.getBio.noOfPosts);
    const bio = useAppSelector((state) => state.getBio.bio);
    const avatar = useAppSelector((state) => state.getBio.avatar);
    const username = useAppSelector((state) => state.getBio.username);
    
    const userId = useAppSelector((state) => state.global.userId);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (userId) {
            dispatch(fetchBioState({ userId }))
        }
    },[userId])

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
                <Card className="profile-bio-card" style={{ backgroundColor : "#051017" , border : "none" , margin : "0px" , paddingBottom : "10px" , borderBottom : "1px solid #4a4c4c" , borderRadius : "0px"}} bodyStyle={{ padding: 0}}>
                    <Card
                        hoverable={true}
                        style={innerCardStyle}
                        cover={<Image alt="cover" src={coverImage2.src}  style={imageStyle} />}
                        bordered={false}
                        bodyStyle={{ padding: 0}}
                    />
                    <div className="bio-div-above_500px-responsive"  style={{ marginTop :"-55px"}}>
                        <Space className="profile-bio_avatar-div" style={{ display : "flex" , alignContent : "center" , justifyContent : "space-between"}}>
                            <Space>
                            <Avatar className="profile-profilePic" draggable={true} onClick={() => {setViewProfileState(true)}} src={avatar} style={{border : "none" , cursor : "pointer" , backgroundColor: "white" }}/>
                            <Flex align="start" justify="start" vertical style={{ paddingTop : "60px" , width : "100%"}}>
                                <Button className="profile-bio-name" style={{ backgroundColor : "transparent" , border : "none" , fontWeight : "bold" , color : "#c7c7c7"}}>{firstName} {lastName}</Button>
                                <Space direction="vertical">
                                    <Button className="profile-username" style={{ backgroundColor : "transparent" , border : "none" , color : "#55616b"}}>{username}</Button>
                                </Space>
                                <Flex className="profile-pff-mainDiv" align="center" justify="center">
                                    <Space style={{ width : "100%"  , display : "flex" , alignContent : "center" , justifyContent : "space-between" , paddingBottom : "10px"}}>
                                        <Flex align="center" justify="center">
                                            <Typography.Text className="profile-bold-text" style={{ color : "white" , margin : "10px" , fontWeight : "bolder"}}>{`${noOfPosts}`}</Typography.Text>
                                            <Typography.Text className="profile-plain-text" style={{ color : "#5c6165" , fontWeight : "bolder"}}>Posts</Typography.Text>
                                        </Flex>
                                        <Flex align="center" justify="center">
                                            <Typography.Text className="profile-bold-text" style={{ color : "white" , margin : "10px" , fontWeight : "bolder"}}>{`${noOfFollowing}`}</Typography.Text>
                                            <Typography.Text className="profile-plain-text" style={{ fontWeight : "bolder" , color : "#5c6165" }}>Following</Typography.Text>
                                        </Flex>
                                        <Flex align="center" justify="center">
                                            <Typography.Text className="profile-bold-text" style={{ color : "white" , margin : "10px" , fontWeight : "bolder"}}>{`${noOfFollowers}`}</Typography.Text>
                                            <Typography.Text className="profile-plain-text" style={{ color : "#5c6165" , fontWeight : "bolder"}}>Follower</Typography.Text>
                                        </Flex>
                                    </Space>
                                </Flex>
                                <Paragraph className="profile-bio" style={{ color : "#adacac" , marginLeft : "-20px"}}>{bio}</Paragraph>
                            </Flex>
                            </Space>
                            <Button className="profile-editProfile" onClick={() => {setEditProfile(true)}} style={{ borderRadius : "20px"}}>Edit Profile</Button>
                        </Space>
                    </div>

                    <div className="bio-div-500px-responsive">
                        <Space className="profile-bio_avatar-div-500px" style={{ display : "flex" , alignContent : "center" , justifyContent : "space-between"}}>
                            <Space direction="vertical">
                            <Flex align="center" justify="center" style={{ width : "350px" }}>
                                <Avatar className="profile-profilePic-500px" draggable={true} onClick={() => {setViewProfileState(true)}} src={ coverImage.src} style={{border : "none" , backgroundColor: "white" , cursor : "pointer"}}/>
                            </Flex>
                            <Flex align="center" justify="center" vertical style={{width : "100%"}}>
                                <Button className="profile-bio-name" style={{ backgroundColor : "transparent" , border : "none" , fontWeight : "bold" , color : "#c7c7c7"}}>{firstName} {lastName}</Button>
                                <Space direction="vertical">
                                    <Button className="profile-username" style={{ backgroundColor : "transparent" , border : "none" , color : "#55616b"}}>{username}</Button>
                                </Space>
                                <Flex className="profile-pff-mainDiv-500px" align="center" justify="center">
                                    <Space style={{ width : "100%"  , display : "flex" , alignContent : "center" , justifyContent : "space-between" , paddingBottom : "10px"}}>
                                        <Flex align="center" justify="center">
                                            <Typography.Text className="profile-bold-text" style={{ color : "white" , margin : "10px" , fontWeight : "bolder"}}>{`${noOfPosts}`}</Typography.Text>
                                            <Typography.Text className="profile-plain-text" style={{ color : "#5c6165" , fontWeight : "bolder"}}>Posts</Typography.Text>
                                        </Flex>
                                        <Flex align="center" justify="center">
                                            <Typography.Text className="profile-bold-text" style={{ color : "white" , margin : "10px" , fontWeight : "bolder"}}>{`${noOfFollowing}`}</Typography.Text>
                                            <Typography.Text className="profile-plain-text" style={{ fontWeight : "bolder" , color : "#5c6165" }}>Following</Typography.Text>
                                        </Flex>
                                        <Flex align="center" justify="center">
                                            <Typography.Text className="profile-bold-text" style={{ color : "white" , margin : "10px" , fontWeight : "bolder"}}>{`${noOfFollowers}`}</Typography.Text>
                                            <Typography.Text className="profile-plain-text" style={{ color : "#5c6165" , fontWeight : "bolder"}}>Follower</Typography.Text>
                                        </Flex>
                                    </Space>
                                </Flex>
                                <Paragraph className="profile-bio" style={{ color : "#adacac" , textAlign : "center" }}>{bio}</Paragraph>
                            </Flex>
                            </Space>
                        </Space>
                        <Flex align="center" justify="center">
                            <Button className="profile-editProfile" onClick={() => {setEditProfile(true)}} style={{ borderRadius : "20px"}}>Edit Profile</Button>
                        </Flex>
                    </div>

                </Card>
                <Flex align="center" justify="space-between" className="profile-toggle-button-mainDiv" style={{ backgroundColor: 'transparent', height : "80px"  , border : "none" , borderRadius : "20px"}}>
                    <Button className="profile-toggle-button" style={{ background : "transparent" , borderRadius : "10px" , color : "white"}} onClick={() => { setActive("POSTS")}}>Posts</Button>
                    <Button className="profile-toggle-button" style={{ background : "transparent" , borderRadius : "10px" , color : "white"}} onClick={() => { setActive("FOLLOWERS")}}>Followers</Button>
                    <Button className="profile-toggle-button" style={{ background : "transparent" , borderRadius : "10px" , color : "white"}} onClick={() => { setActive("FOLLOWING")}}>Following</Button>
                </Flex>
                <div className="profile-widthDiv">
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
                style={{  padding: 0, margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                className="profile-avatar-view-modal"
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

    const dispatch = useAppDispatch();
    const followers = useAppSelector((state) => state.getFollower.followers);

    useEffect(() => {
        dispatch(getFollowersCall());
    }, [dispatch]);
    

    //     const fetchedProfile = [
    //     {
    //         name : "Ivanka James",
    //         username : "@ivankajames",
    //         img : coverImage
    //     },
    //     {
    //         name : "Big Bundah Girl",
    //         username : "@bigBgirl",
    //         img : coverImage2 
    //     },
    //     {
    //         name : "GlizzyGobbler",
    //         username : "@GZperiod",
    //         img : coverImage
    //     },
    //     {
    //         name : "Tiny Weenie",
    //         username : "@teeniweeni",
    //         img : coverImage    
    //     },
    //     {
    //         name : "Bob Loader",
    //         username : "@BLnigger",
    //         img : coverImage
    //     },
    //     {
    //         name : "Dee Snuts",
    //         username : "@DjNutter",
    //         img : coverImage
    //     }
    // ]
    
    return(
        <div style={{
            height: "60vh",
            overflowY: "scroll",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        }}>
            {followers.map((value, index) => (
                <Flex align="center" justify="space-between" style={{ marginBottom : "30px" , paddingInline : "20px" , backgroundColor : "#1B2730" , paddingBlock : "10px" , borderRadius : "30px"}}>
                    <Space>
                        <Avatar className="profile-ff-avatar" alt="Profile Pic" src={value.img} style={{position : "relative" }}/>
                        <Flex vertical>
                            <Typography.Text className="profile-ff-name" style={{ color : "#c7c7c7" , fontWeight : "bolder"}}>{value.name}</Typography.Text>
                            <Typography.Text className="profile-ff-username" style={{ color : "#55616b"}}>{value.username}</Typography.Text>
                        </Flex>
                    </Space>
                    <Button className="profile-ff-button">Remove</Button>
                </Flex>
            ))}
        </div>   
    )
}

function Following(){

    const dispatch = useAppDispatch();
    // const { followers, following, status, error } = useAppSelector((state) => state.);
    const following = useAppSelector((state) => state.getFollower.following);

    useEffect(() => {
        dispatch(getFollowingCall());
    }, [dispatch]);


    // const fetchedProfile = [
    //     {
    //         name : "Ivanka James",
    //         username : "@ivankajames",
    //         img : coverImage
    //     },
    //     {
    //         name : "Big Bundah Girl",
    //         username : "@bigBgirl",
    //         img : coverImage2 
    //     },
    //     {
    //         name : "GlizzyGobbler",
    //         username : "@GZperiod",
    //         img : coverImage
    //     },
    // ]

    return(
        <div style={{
            height: "60vh",
            overflowY: "scroll",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        }}>
            {following.map((value, index) => (
                <Flex align="center" justify="space-between" style={{ marginBottom : "30px" , paddingInline : "20px" , backgroundColor : "#1B2730" , paddingBlock : "10px" , borderRadius : "30px"}}>
                    <Space>
                        <Avatar className="profile-ff-avatar" alt="Profile Pic" src={value.img} style={{position : "relative"}}/>
                        <Flex vertical>
                            <Typography.Text className="profile-ff-name" style={{ color : "#c7c7c7" , fontWeight : "bolder"}}>{value.name}</Typography.Text>
                            <Typography.Text className="profile-ff-username" style={{ color : "#55616b"}}>{value.username}</Typography.Text>
                        </Flex>
                    </Space>
                    <Button className="profile-ff-button">Remove</Button>
                </Flex>
            ))}
        </div>   
    )
}