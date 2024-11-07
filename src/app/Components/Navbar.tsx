import React from "react";
import { useState } from "react";
import { Flex, Space , Input , Button , Divider , Image} from "antd"
import type { MenuProps } from "antd";
import { Dropdown } from 'antd';
import { Avatar , Drawer } from 'antd';
import { useRouter } from "next/navigation";
import Logout from "./Logout"
import { FireFilled , HomeFilled , MenuOutlined , CaretDownOutlined , BellFilled , EnvironmentFilled } from '@ant-design/icons';
import "../styles/home.css"
import logo from "../assets/cravefeed_logo.png"
import { useAppSelector } from "@/lib/hooks";

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

export default function Navbar(){
    
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
                    <Button style={{ borderRadius : "20px" }} onClick={() => { router.push("/home") }}>
                        <HomeFilled className='logo'/>
                        <span style={{ color : "#051017"}}>Home</span>
                    </Button>
                    <Space size="large" style={{ marginRight : "20px"}}>
                        <EnvironmentFilled onClick={() => { router.push("/home/hot_on_location")}} style={{ fontSize : "22px"}} />
                        <FireFilled onClick={() => { router.push("/home/explore")}} style={{ fontSize : "22px"}} />
                    </Space>
                        <Space split={<Divider style={{ backgroundColor : "#113852" , height : "30px"}} type="vertical"/>}>
                            <BellFilled style={{ fontSize : "22px"}} />
                            <Dropdown 
                                menu={{ items }}
                                overlayStyle={{ backgroundColor: "blue"}}
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