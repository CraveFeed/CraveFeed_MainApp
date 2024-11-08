"use client";
import { LeftOutlined, CameraOutlined , MessageOutlined , HeartOutlined, SendOutlined} from "@ant-design/icons"
import { useRouter } from "next/navigation";

export default function VideoHeader(){

    const router  = useRouter();

    return(
        <div className="videoHeader">
            <LeftOutlined onClick={() => { router.push("/home") }} style={{fontSize : "20px" }}/>
            <h3 style={{fontSize : "20px" }}>Nibbles</h3>
            <CameraOutlined style={{fontSize : "20px" }}/>
        </div>
    )
}