"use cleint";

import React from "react";
import { Flex, Space , Input , Button , Divider , Image} from "antd"
import type { MenuProps } from "antd";
import { Dropdown } from 'antd';
import { Avatar , Drawer } from 'antd';
import { useRouter } from "next/navigation";
import Logout from "./Logout"
import { HomeFilled , CaretDownOutlined , BellFilled , MessageOutlined , UserOutlined } from '@ant-design/icons';
import "../styles/home.css"
import chefIcon from "../assets/icons8-chef-hat-30.png"
import logo from "../assets/cravefeed_logo.png"
import { useAppSelector } from "@/lib/hooks";
import { Badge } from "antd";
import { useEffect, useState } from "react";
const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

export default function Navbar(){
    const [notificationCount, setNotificationCount] = useState(0);
    const token = useAppSelector( state => state.global.token);
    useEffect(() => {
        if(token){
            const wsUrl = "ws://ec2-13-127-122-96.ap-south-1.compute.amazonaws.com:3000";
                const ws = new WebSocket(wsUrl, token);
        
            ws.onopen = () => {
            console.log("WebSocket connected");
            };
        
            ws.onmessage = (event) => {
            console.log("WebSocket message:", event.data);
            try {
                const data = JSON.parse(event.data);
                if (data.type === "notification" && data.count) {
                setNotificationCount(data.count);
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
            };
        
            ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            };
        
            ws.onclose = () => {
            console.log("WebSocket connection closed");
            };
        
            // Cleanup on component unmount
            return () => {
            ws.close();
            };
        }
      }, []);


    const avatar = useAppSelector((state) => state.getBio.avatar);
    const firstname = useAppSelector((state) => state.getBio.firstname);
    const lastname = useAppSelector((state) => state.getBio.lastname);
    const router = useRouter();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
            <Button onClick={() => { router.push("/profile") }} style={{ width : "100%" , backgroundColor : "#051017" , border : "black"  , borderRadius : "20px" , color : "white"}}> View Profile </Button>
            ),
        },
        {
            key: '2',
            label: (
            <Logout/> 
            ),
        },
    ];

    return(
        <>
            <Flex align="center" justify="space-between" className="mobile-hidden" style={{ width : "100%" }}>
                <Space size="middle">
                    <Image preview={false} onClick={()=>{ router.push("/home")}} src={logo.src} style={{fontSize : "40px" , width : "100px" , marginTop : "28px"}} className='logo'/>
                    <Input placeholder="#  Explore" className='input' />
                </Space>

                <Space size="middle">
                    <Space size="large" style={{ marginRight : "20px"}}>
                        <img src={chefIcon.src} onClick={() => {router.push("/nibbles")}} style={{ width : "24px",marginLeft : "20px" , color : "white" }} />
                        <MessageOutlined onClick={() => { router.push("/chat")}} style={{ fontSize : "22px" , marginTop : "24px"}} />
                    </Space>
                        <Space split={<Divider style={{ backgroundColor : "#113852" , height : "30px"}} type="vertical"/>}>
                            <Badge count={notificationCount} overflowCount={99}>
                                <BellFilled onClick={() => {router.push("/home/notifications")}} style={{ fontSize : "22px" , color : "white"}} />
                            </Badge>
                            <Dropdown 
                                menu={{ items }}
                                // overlayStyle={{ backgroundColor: "blue"}}
                                >
                                <Button style={{ borderRadius : "20px" , height : "40px"  , backgroundColor: "#44505c" , border : "none" , display : "flex" , flexDirection : "row" , color : "lightgrey"}}>
                                    <Space>
                                        <Avatar src={avatar} style={{ border : "black",  verticalAlign: 'middle' , backgroundColor : "white"}}></Avatar>
                                        <p style={{ fontWeight : "bold" }}>{firstname} {lastname} </p>
                                        <CaretDownOutlined style={{ fontSize : "25px" , marginTop : "5px"}} />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </Space>
                </Space>
            </Flex>

            {/* Mobile and Tablet */}

            <Flex align="center" justify="space-between" className="mobile-visible" style={{ width : "100%"}}>
                <Space size="middle">
                    <Image preview={false} onClick={()=>{ router.push("/home")}} src={logo.src} style={{fontSize : "40px" , width : "80px" , marginTop : "20px"}} className='logo'/>
                    <Input placeholder="#  Explore" className='input' />
                </Space>

                <Space size="middle"> 
                        <Dropdown menu={{ items }}>
                            <Space split={<Divider style={{ backgroundColor : "#113852" , height : "30px" }} type="vertical"/>}>
                            <Button style={{ borderRadius : "20px" , height : "40px"  , backgroundColor: "#44505c" , border : "none" , marginTop : "15px" , display : "flex" , flexDirection : "row" , color : "lightgrey"}}>
                                <Space>
                                    <Avatar src={avatar} style={{ border : "black",  verticalAlign: 'middle' , backgroundColor : "white" }}></Avatar>
                                    <p style={{ fontWeight : "bold" }}>{firstname} {lastname} </p>
                                    <CaretDownOutlined style={{ fontSize : "23px" , marginTop : "2px"}} />
                            </Space>
                            </Button>
                            </Space>
                        </Dropdown>
                    {/* <MenuOutlined onClick={showDrawer} style={{ fontSize : "22px" , marginTop : "25px" }}/> */}
                </Space>
            </Flex>

            {/* Extra-small-mobile */}

            <Flex align="center" justify="space-between" className="extra-small-mobile" style={{ width : "100%" }}>
                <Space size="middle">
                    <Image preview={false} onClick={()=>{ router.push("/home")}} src={logo.src} style={{fontSize : "40px" , width : "70px" , marginTop : "25px"}} className='logo'/>
                    <Input placeholder="#  Explore" className='input' />
                </Space>

                <Space size="middle"> 
                        <Dropdown menu={{ items }}>
                            <Space split={<Divider style={{ backgroundColor : "#113852" , height : "30px"}} type="vertical"/>}>
                                <Avatar src={avatar} style={{ border : "black",  verticalAlign: 'middle' , backgroundColor : "white" , marginTop : "-0px" }}></Avatar>
                            </Space>
                        </Dropdown>
                    {/* <MenuOutlined onClick={showDrawer} style={{ fontSize : "22px" , marginTop : "25px" }}/> */}
                </Space>
            </Flex>
        </>
    )
}