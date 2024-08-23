import React from "react";
import avatar from "../assets/avatar.jpg"
import { useState } from "react";
import { Flex, Space , Input , Button , Card , Popover , Divider } from "antd"
import type { MenuProps } from "antd";
import { Dropdown } from 'antd';
import { Avatar } from 'antd';
import Logout from "../Components/logout"
import { FireFilled , TwitterOutlined , HomeFilled , MenuOutlined , CaretDownOutlined , BellFilled , EnvironmentFilled} from '@ant-design/icons';
import "../styles/home.css"

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

export default function Navbar(){

     const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };    

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
            <Button style={{ width : "100%" , backgroundColor : "#051017" , border : "black"  , borderRadius : "20px" , color : "white"}}> View Profile </Button>
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
                    <TwitterOutlined style={{fontSize : "40px" , marginTop : "20px"}} className='logo'/>
                    <Input placeholder="#  Explore" className='input' />
                </Space>

                <Space size="middle"> 
                    <Button style={{ borderRadius : "20px" }}>
                        <HomeFilled className='logo'/>
                        <span style={{ color : "#051017"}}>Home</span>
                    </Button>
                    <Space size="large" style={{ marginRight : "20px"}}>
                        <EnvironmentFilled style={{ fontSize : "22px"}} />
                        <FireFilled style={{ fontSize : "22px"}} />
                    </Space>
                        <Dropdown menu={{ items }}>
                            <Space split={<Divider style={{ backgroundColor : "#113852" , height : "30px"}} type="vertical"/>}>
                            <BellFilled style={{ fontSize : "22px"}} />
                            <Button style={{ borderRadius : "20px" , height : "40px"  , backgroundColor: "#44505c" , border : "none" , display : "flex" , flexDirection : "row" , color : "lightgrey"}}>
                                <Space>
                                    <Avatar src={avatar.src} style={{ border : "black",  verticalAlign: 'middle' , backgroundColor : "white" , marginTop : "-12px" }}></Avatar>
                                    <p style={{ marginTop : "6px" , fontWeight : "bold" }}>Vibhor Phalke</p>
                                    <CaretDownOutlined style={{ fontSize : "25px" , marginTop : "-5px"}} />
                            </Space>
                            </Button>
                            </Space>
                        </Dropdown>
                    <MenuOutlined style={{ fontSize : "22px" , marginTop : "10px" }}/>
                </Space>
            </Flex>

            <Flex align="center" justify="space-between" className="mobile-visible" style={{ width : "100%"}}>
                <Space size="middle">
                    <TwitterOutlined style={{fontSize : "40px" , marginTop : "20px"}} className='logo'/>
                    <Input placeholder="#  Explore" className='input' />
                </Space>

                <Space size="middle"> 
                        <Dropdown menu={{ items }}>
                            <Space split={<Divider style={{ backgroundColor : "#113852" , height : "30px"}} type="vertical"/>}>
                            <Button style={{ borderRadius : "20px" , height : "40px"  , backgroundColor: "#44505c" , border : "none" , display : "flex" , flexDirection : "row" , color : "lightgrey"}}>
                                <Space>
                                    <Avatar src={avatar.src} style={{ border : "black",  verticalAlign: 'middle' , backgroundColor : "white" , marginTop : "-12px" }}></Avatar>
                                    <p style={{ marginTop : "6px" , fontWeight : "bold" }}>Vibhor Phalke</p>
                                    <CaretDownOutlined style={{ fontSize : "25px" , marginTop : "-5px"}} />
                            </Space>
                            </Button>
                            </Space>
                        </Dropdown>
                    <MenuOutlined style={{ fontSize : "22px" , marginTop : "10px" }}/>
                </Space>
            </Flex>

            <Flex align="center" justify="space-between" className="extra-small-mobile" style={{ width : "100%" }}>
                <Space size="middle">
                    <TwitterOutlined style={{fontSize : "40px" , marginTop : "20px"}} className='logo'/>
                    <Input placeholder="#  Explore" className='input' />
                </Space>

                <Space size="middle"> 
                        <Dropdown menu={{ items }}>
                            <Space split={<Divider style={{ backgroundColor : "#113852" , height : "30px"}} type="vertical"/>}>
                                <Avatar src={avatar.src} style={{ border : "black",  verticalAlign: 'middle' , backgroundColor : "white" , marginTop : "-12px" }}></Avatar>
                            </Space>
                        </Dropdown>
                    <MenuOutlined style={{ fontSize : "22px" , marginTop : "10px" }}/>
                </Space>
            </Flex>
        </>
    )
}