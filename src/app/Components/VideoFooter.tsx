import { Button, Avatar, Flex, theme , Drawer} from "antd";
import { useState } from "react";
import { CommentOutlined, SendOutlined } from "@ant-design/icons";
import "../styles/nibbles.css";

interface VideoCardProps {
    channel: string;
    avatarSrc: string;
    song: string;
    url: string;
    likes: number;
    shares: number;
    title : string;
}

export default function VideoFooter(props: VideoCardProps) {
    const [likePosts, setLikePosts] = useState<Boolean>(false);
    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);
  
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };

    const containerStyle: React.CSSProperties = {
        position: 'fixed',  // Ensure it's fixed position relative to the viewport
        backgroundColor: '#fff',
        zIndex: 9999,  // Ensure it's on top
    };
  

    return (
        <div className="videoFooter">
            <div className="videoFooter-text">
                <Flex justify="center" align="center">
                    <Avatar style={{ width :"55px" , height : "55px" ,  marginRight : "5px"}} src={props.avatarSrc} />
                    <h3 style={{  fontSize :  "16px"}}>
                        {props.channel} •{" "}
                        <Button
                            style={{
                                color: "white",
                                backgroundColor: "transparent",
                                borderRadius: "20px",
                                fontSize: "13px",
                                paddingInline: "20px",
                                height: "29px",
                                textTransform: "inherit"
                            }}
                        >
                            Follow
                        </Button>
                    </h3>
                </Flex>
                <h3 style={{ marginTop : "-10px"}}>{props.title}</h3>
            </div>
            <div className="videoFooter-actions">
                <Flex justify="space-between" vertical align="center" style={{ height: "200px" }}>
                    <Flex vertical align="center">
                        <button
                            className="nibble-action-button"
                            onFocus={(e) => e.target.blur()}>
                            <div className="nibble-action-button-likeBg" >
                                <div onClick={() => {
                                setLikePosts(!likePosts);
                            }}  className={`nibble-action-button-like ${likePosts ? "liked" : ""}`} />
                            </div>
                        </button>
                        <h2>{props.likes}</h2>
                    </Flex>
                    <Flex
                        vertical
                        justify="center"
                        align="center"
                        onClick={showDrawer}
                    >
                        <CommentOutlined style={{ fontSize: "30px" }} />
                        <h2>{props.shares}</h2>
                    </Flex>
                    <SendOutlined style={{ fontSize: "28px" }} />
                </Flex>
            </div>

            {/* <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
                getContainer={false}
                style={containerStyle}
            >
                <p>Some contents...</p>
            </Drawer> */}
        </div>
    );
}
