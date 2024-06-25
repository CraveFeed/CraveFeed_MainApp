"use client"

import { TwitterOutlined } from '@ant-design/icons';
import { Avatar, Button , Flex, Space , Typography} from "antd"
import "../../../styles/shared_post.css"
import "../../../styles/profile.css"
import PostSkeleton from '@/app/Components/PostSkeleton';
export default function ExternallyAvailablePostPage(){
    return(
        <div >
            <Flex align="center" justify="center" style={{ marginTop : "10px" , paddingInline : "15px"}}>
                <Flex style={{ width : "700px" }} align='center' justify="space-between">
                    <TwitterOutlined className='shared-logo' style={{ color : "#29a7f6" }}/>
                    <Space split>
                        <Button className='shared-btn' style={{border : "none" , backgroundColor : "#29a7f6" , color : "#051017" , borderRadius : "20px" }}>SignIn</Button>
                        <Button className='shared-btn' style={{backgroundColor : "transparent" , color : "#29a7f6" , border : "none" }}>SignUp</Button>
                    </Space>
                </Flex> 
            </Flex>
            <Flex align='center' justify='center'>
                <div className='shared-post-div'>
                    <PostSkeleton/>
                </div>
            </Flex>
        </div>
    )
}