import { Button, Avatar, Flex, Typography } from "antd"
import { LeftOutlined, CameraOutlined , MessageOutlined , HeartOutlined, SendOutlined, CommentOutlined} from "@ant-design/icons"
import "../styles/nibbles.css"

interface VideoCardProps {
    channel: string;
    avatarSrc: string;
    song: string;
    url: string;
    likes: number;
    shares: number;
}

export default function VideoFooter(props : VideoCardProps){
    return(
        <div className="videoFooter">
            <div className="videoFooter-text">
                <Avatar src={props.avatarSrc}/>
                <h3>{props.channel} • <Button style={{color : "white" , backgroundColor :  "transparent" , borderRadius :  "20px", width :  "auto" , height : "auto" , fontSize : "8px" ,paddingInline:"10px", textTransform : "inherit"}}>Follow</Button></h3>
            </div>
            <div className="videoFooter-actions">
                <Flex  justify="space-between" vertical align="center"  style={{  height :  "130px"}}>
                    <Flex vertical justify="center" align="center">
                        <HeartOutlined style={{ fontSize : "24px"}}/>
                        <h2>{props.likes}</h2>
                    </Flex>
                    <Flex vertical justify="center" align="center">
                        <CommentOutlined style={{ fontSize : "24px"}}/>
                        <h2>{props.shares}</h2>
                    </Flex>
                    <SendOutlined style={{ fontSize : "24px"}}/>    
                </Flex>
            </div>
            {/* <div className="videoFooter-actions">
                <div className="videoFooter-actionsLeft">
                    <HeartOutlined/>
                    <MessageOutlined/>
                    <SendOutlined/>
                </div>
                <div className="videoFooter-actionsRight">
                <div className="videoFooter-stat">
                        <HeartOutlined/>
                        <p>{props.likes}</p>
                    </div>
                    <div className="videoFooter-stat">
                        <CommentOutlined/>
                        <p>{props.shares}</p>
                    </div>
                </div>
            </div> */}
        </div>
    )
}