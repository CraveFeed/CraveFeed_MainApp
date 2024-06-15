import "../styles/profile.css"
import coverImage from "../assets/everestspices_logo.jpeg"
import coverImage2 from "../assets/everest_post.jpeg"
import { Card , Flex , Col ,Row , Image, Avatar , Modal , Space , Button , Typography , Divider} from "antd"
import { useState } from "react"

const { Title, Paragraph, Text } = Typography;

export default function ProfileComponent(){

    const [viewProfileImage , setViewProfileState] = useState<boolean>(false);

    const imageStyle = {
        width: "100%", // Decrease the width to 50% of the original
        borderRadius: "20px",
    };

    const innerCardStyle = {
        transform: "scaleY(0.37)",
        transformOrigin: "top", 
        margin : "0px",
        padding : "0px",
        backgroundColor: "transparent",
    };

    return(
        <Card style={{ backgroundColor : "#051017" , border : "none"}}>
            <Row>
            <Col span={2}>
                <p></p>
            </Col>
            <Col span={20}>
                <Card style={{ backgroundColor : "#051017" , border : "none" , margin : "0px" , paddingBottom : "10px" , borderBottom : "1px solid gray" , borderRadius : "0px"}} bodyStyle={{ padding: 0}}>
                    <Card
                        hoverable={true}
                        style={innerCardStyle}
                        cover={<Image alt="cover" src={coverImage2.src}  style={imageStyle} />}
                        bordered={false}
                        bodyStyle={{ padding: 0}}
                    />
                    <div style={{ marginTop : "-400px" , zIndex : "4"}}>
                        <Space style={{ width : "100%", paddingLeft : "10px" , display : "flex" , alignContent : "center" , justifyContent : "space-between"}}>
                            <Space>
                            <Avatar draggable={true} src={ coverImage.src} style={{border : "none" , backgroundColor: "white" , width : "150px" , height : "150px" }}/>
                            <Flex align="start" justify="start" vertical style={{ paddingTop : "60px" , width : "100%"}}>
                                <Button className="follower-title" style={{ backgroundColor : "transparent" , border : "none" , fontWeight : "bold" , color : "#c7c7c7"}}>Vibhor Phalke</Button>
                                <Space direction="vertical">
                                    <Button className="follower-text" style={{ backgroundColor : "transparent" , border : "none" , color : "#55616b"}}>@vibhorphalke</Button>
                                </Space>
                                <Flex align="center" justify="center" style={{ marginLeft : "-45px"}} >
                                    <Space className="follower-space-padding" style={{ width : "100%"  , display : "flex" , alignContent : "center" , justifyContent : "space-between" , paddingBottom : "10px"}}>
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
                                <Paragraph className="bio-description" style={{ color : "#adacac"}}>Hey there! I'm Vibhor, a huge food enthusiast. </Paragraph>
                            </Flex>
                            </Space>
                            <Button style={{ backgroundColor : "transparent" , color : "#c7c7c7" , width : "6.5vw" , height : "4vh" , borderRadius : "20px"}}>Edit Profile</Button>
                        </Space>
                    </div>
                </Card>
                <Flex align="center" justify="space-between" style={{ border : "2px solid red" , paddingInline : "30px"}}>
                    <Button>Posts</Button>
                    <Button>Followers</Button>
                    <Button>Following</Button>
                </Flex>
            </Col>
            <Col span={2}>
                <p></p>
            </Col>
            </Row>
            
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