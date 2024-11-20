import "../styles/profile.css"
import coverImage2 from "../assets/lavelisProPic.jpg"
import { useAppSelector , useAppDispatch } from "@/lib/hooks"
import { Card , Flex , Image, Avatar, Space , Button , Typography } from "antd"
import { fetchBioState } from "@/lib/features/services/home/getBio"
import { useEffect, useState } from "react"
import PostSkeleton from "./PostSkeleton"
import EditProfile from "./EditProfile"
import { getFollowersCall , getFollowingCall } from "@/lib/features/services/profile/getFollowersAndFollowing"
import veg from "../assets/veg-removebg-preview.png"

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
    
    const {token , userId } = useAppSelector((state) => state.global);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (userId && token) {
            dispatch(fetchBioState({ token, userId }))
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

    const buttonStyle = (buttonName: string) => ({
        backgroundColor: active === buttonName ? "#2b3b47" : "#1d262e",
        border: "1px solid black",
        borderRadius: "10px",
        color: active === buttonName ? "#ffffff" : "#c7c7c7",
    });

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
                                            <Typography.Text className="profile-plain-text" style={{ color : "#5c6165" , fontWeight : "bolder" }}>Posts</Typography.Text>
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
                            <Button className="profile-editProfile" onClick={() => {setEditProfile(true)}} style={{ borderRadius : "20px" , border : "none" , fontWeight : "600" , backgroundColor : "#fd7077" , color : "black"}}>Edit Profile</Button>
                        </Space>
                    </div>

                    <div className="bio-div-500px-responsive">
                        <Space className="profile-bio_avatar-div-500px" style={{ display : "flex" , alignContent : "center" , justifyContent : "space-between"}}>
                            <Space direction="vertical">
                            <Flex align="center" justify="center" style={{ width : "350px" }}>
                                <Avatar className="profile-profilePic-500px" draggable={true} onClick={() => {setViewProfileState(true)}} src={ avatar } style={{border : "none" , backgroundColor: "white" , cursor : "pointer"}}/>
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
                            <Button className="profile-editProfile" onClick={() => {setEditProfile(true)}} style={{ borderRadius : "20px" , fontWeight : "600" , backgroundColor : "#fd7077" , color : "black" , border : "none"}}>Edit Profile</Button>
                        </Flex>
                    </div>

                </Card>
                <Flex align="center" gap={20} justify="space-between" className="profile-toggle-button-mainDiv" style={{ backgroundColor: 'transparent', height : "80px"  , border : "none" , borderRadius : "20px"}}>
                    <Button
                        className="profile-toggle-button"
                        style={buttonStyle("POSTS")}
                        onClick={() => setActive("POSTS")}
                    >
                        Posts
                    </Button>
                    <Button
                        className="profile-toggle-button"
                        style={buttonStyle("FOLLOWERS")}
                        onClick={() => setActive("FOLLOWERS")}
                    >
                        Followers
                    </Button>
                    <Button
                        className="profile-toggle-button"
                        style={buttonStyle("FOLLOWING")}
                        onClick={() => setActive("FOLLOWING")}
                    >
                        Following
                    </Button>
                    <Button
                        className="profile-toggle-button"
                        style={buttonStyle("MENU")}
                        onClick={() => setActive("MENU")}
                    >
                        Menu
                    </Button>
                </Flex>
                <div className="profile-widthDiv">
                    {active === "POSTS" && <PostSkeleton/>}
                    {active === "FOLLOWERS" && <Followers/>}
                    {active === "FOLLOWING" && <Following/>}
                    {active === "MENU" && <Menu/>}
                </div>
            </Flex>
            <EditProfile editProfile={editProfile} setEditProfile={setEditProfile}/>
            {/* <Modal 
                footer={null} 
                bodyStyle={{ padding: 0 }} 
                open={viewProfileImage} 
                onCancel={() => { setViewProfileState(false) }} 
                style={{  padding: 0, margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                className="profile-avatar-view-modal"
                width="auto"
                >
                <Image 
                    src={avatar} 
                    preview={true}
                    style={{ display: 'block', width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
            </Modal> */}
        </Card>
    )
}

function Followers(){

    const dispatch = useAppDispatch();
    const followers = useAppSelector((state) => state.getFollower.followers);
    const { token , userId } = useAppSelector((state) => state.global);

    useEffect(() => {
        if (userId && token) {
            dispatch(getFollowersCall({userId , token}));
        }
    }, [dispatch]);
    
    return(
        <div style={{
            height: "60vh",
            overflowY: "scroll",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        }}>
            {followers?.map((value, index) => (
                <Flex align="center" justify="space-between" style={{ marginBottom : "30px" , paddingInline : "20px" , backgroundColor : "#1B2730" , paddingBlock : "10px" , borderRadius : "30px"}}>
                    <Space>
                        <Avatar className="profile-ff-avatar" alt="Profile Pic" src={value.avatar} style={{position : "relative" }}/>
                        <Flex vertical>
                            <Typography.Text className="profile-ff-name" style={{ color : "#c7c7c7" , fontWeight : "bolder"}}>{value.firstName + " " + value.lastName}</Typography.Text>
                            <Typography.Text className="profile-ff-username" style={{ color : "#55616b"}}>{value.username}</Typography.Text>
                        </Flex>
                    </Space>
                    <Button className="profile-ff-button">Remove</Button>
                </Flex>
            ))}
        </div>   
    )
}

function Menu() {
    return (
        <>
        <div
             className="profile-menu-div-desktop"
            style={{
                height: "60vh",
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                padding: "10px",
            }}
        >
            <Flex
                style={{
                    marginBottom: "30px",
                    backgroundColor: "#1B2730",
                    borderRadius: "20px",
                }}
            >
                <Image
                    style={{
                        height: "auto",
                        width: "250px",
                        objectFit: "cover",
                        borderEndStartRadius: "15px",
                        borderStartStartRadius: "15px",
                    }}
                    src="https://res.cloudinary.com/dpuzfcod1/image/upload/v1730629335/chipotle_cw1j61.jpg"
                />
                <Flex
                    vertical
                    align="start"
                    justify="start"
                    style={{ padding: "0 15px", flex: 1 }}
                >
                    <Flex align="center" justify="space-between" style={{ width: "100%" }}>
                        <Typography.Text
                            style={{
                                color: "#c7c7c7",
                                fontWeight: "bolder",
                                fontSize: "24px",
                            }}
                        >
                            Burrito
                        </Typography.Text>
                        <Image
                            style={{
                                height: "22px",
                                width: "22px",
                            }}
                            preview={false}
                            src={veg.src}
                        />
                    </Flex>
                    <Typography.Text
                        style={{
                            color: "white",
                            fontSize: "18px",
                            marginTop: "5px",
                        }}
                    >
                        ₹800
                    </Typography.Text>
                    <Typography.Text
                        style={{
                            color: "#b0b0b0",
                            fontSize: "16px",
                            marginTop: "10px",
                        }}
                    >
                        A delightful mix of paneer chunks tossed in a spicy chilli sauce, perfect for a cozy evening.
                    </Typography.Text>
                    <Button
                        className="profile-menu-button"
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "20px",
                            alignSelf: "flex-end",
                        }}
                    >
                        Order Now
                    </Button>
                </Flex>
            </Flex>
        </div>
        
        <div
        className="profile-menu-div-700px"
        style={{
            height: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            marginBottom : "60px"
        }}
    >
        <Flex
            style={{
                marginBottom: "30px",
                backgroundColor: "#1B2730",
                borderRadius: "20px",
                flexDirection: "column", // Vertical layout
                alignItems: "center",
                padding: "5px",
            }}
        >
            <Image
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "15px",
                    marginBottom: "15px",
                }}
                src="https://res.cloudinary.com/dpuzfcod1/image/upload/v1730629335/chipotle_cw1j61.jpg"
            />
            <Typography.Text
                style={{
                    color: "#c7c7c7",
                    fontWeight: "bolder",
                    fontSize: "24px",
                    textAlign: "center",
                }}
            >
                Burrito
            </Typography.Text>
            <Flex
                align="center"
                justify="center"
                style={{ margin: "10px 0" }}
            >
                <Image
                    style={{
                        height: "20px",
                        width: "20px",
                        marginRight: "5px",
                    }}
                    preview={false}
                    src={veg.src}
                />
                <Typography.Text
                    style={{
                        color: "white",
                        fontSize: "18px",
                    }}
                >
                    ₹800
                </Typography.Text>
            </Flex>
            <Typography.Text
                style={{
                    color: "#b0b0b0",
                    fontSize: "16px",
                    margin: "10px 0",
                    textAlign: "center",
                }}
            >
                A delightful mix of paneer chunks tossed in a spicy chilli sauce, perfect for a cozy evening.
            </Typography.Text>
            <Button
                style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "20px",
                    marginTop: "15px",
                    marginBottom : "20px"
                }}
            >
                Order Now
            </Button>
        </Flex>
    </div>
    </>
    )
}

function Following(){

    const dispatch = useAppDispatch();
    const following = useAppSelector((state) => state.getFollower.following);
    const { token , userId } = useAppSelector((state) => state.global);

    useEffect(() => {
        if (userId && token) {
            dispatch(getFollowingCall({userId , token}));
        }
    }, [dispatch]);

    console.log(following);

    return(
        <div style={{
            height: "60vh",
            overflowY: "scroll",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        }}>
            {following?.map((value, index) => (
                <Flex align="center" justify="space-between" style={{ marginBottom : "30px" , paddingInline : "20px" , backgroundColor : "#1B2730" , paddingBlock : "10px" , borderRadius : "30px"}}>
                    <Space>
                        <Avatar className="profile-ff-avatar" alt="Profile Pic" src={value.avatar} style={{position : "relative"}}/>
                        <Flex vertical>
                            <Typography.Text className="profile-ff-name" style={{ color : "#c7c7c7" , fontWeight : "bolder"}}>{value.firstName + " " + value.lastName}</Typography.Text>
                            <Typography.Text className="profile-ff-username" style={{ color : "#55616b"}}>{value.username}</Typography.Text>
                        </Flex>
                    </Space>
                    <Button className="profile-ff-button">Remove</Button>
                </Flex>
            ))}
        </div>   
    )
}