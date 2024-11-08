import { LeftOutlined, CameraOutlined , MessageOutlined , HeartOutlined, SendOutlined} from "@ant-design/icons"
import { Flex } from "antd"

export default function VideoHeader(){
    return(
        <div className="videoHeader">
            <LeftOutlined style={{fontSize : "20px" }}/>
            <h3 style={{fontSize : "20px" }}>Nibbles</h3>
            <CameraOutlined style={{fontSize : "20px" }}/>
        </div>
    )
}