import { LeftOutlined, CameraOutlined , MessageOutlined , HeartOutlined, SendOutlined} from "@ant-design/icons"
import { Flex } from "antd"

export default function VideoHeader(){
    return(
        <div className="videoHeader">
            <LeftOutlined />
            <h3>Nibbles</h3>
            <CameraOutlined/>
        </div>
    )
}