"use client"

import { Flex, Typography , Menu , List } from "antd";
import { useEffect, useState } from "react";
import "../../../styles/misc.css";
import { HomeFilled , CompassFilled , FireFilled , LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Misc() {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const router = useRouter();

    const items = [
        {
            key: 1,
            icon: <HomeFilled style={{ fontSize : "18px"}} />,
            label: "Home",   
            route: "/home"
        },
        {
            key: 2,
            icon: <CompassFilled style={{ fontSize : "18px"}} />,
            label: "Explore",
            route: "/home/explore"
        },
        {
            key: 3,
            icon: <FireFilled style={{ fontSize : "18px"}} />,
            label: "For You",
            route: "/home/hot_on_location"
        },
    ];

    useEffect(() => {
        const path = window.location.pathname;
        const index = items.findIndex(item => item.route === path);
        setSelectedIndex(index !== -1 ? index : 0);
    }, []);

    const handleMenuClick = (index: number) => {
        setSelectedIndex(index);
    }

    const data = [
        {
            id: 1,
            description: 'Life is better with a slice of Kaju Katli.',
            name: { last: 'Bikaner' },
        },
        {
            id: 2,
            description: 'Kaju Katli: Because calories don’t count during festivals.',
            name: { last: 'Lallu Sweets' },
        }
    ];

    return(
        <>
            <Menu
                style={{backgroundColor : "#1B2730" , padding : "20px" , borderRadius : "20px" ,  height : "auto" , width : "100%" , color : "white"}}
                mode="inline"
                defaultSelectedKeys={['1']}
                className="menu-bar"
                selectedKeys={[String(selectedIndex + 1)]}
            >
            {items?.map((item, index) => (
                <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => { handleMenuClick(index); router.push(item.route); }}
                    style={{ color: selectedIndex === index ? "black" : "ghostwhite" }}
                >
                    {item.label}
                </Menu.Item>
            ))}
            </Menu>

            <Flex vertical style={{ border : "2px solid #1B2730" , padding : "10px" , marginTop : "20px" , borderRadius : "20px" , height : "auto"}}>
                <Typography.Text style={{ color : "ghostwhite", fontSize : "18px"}} >Trends for you</Typography.Text>
                    <Flex vertical style={{ marginTop : "6px"}}>
                        <Typography.Text style={{ color : "#55616b"}}>#KAJU KATLI</Typography.Text>
                        <List
                        style={{ marginTop : "-5px" , width : "100%"}}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                            <List.Item.Meta
                                title={<a style={{color : "ghostwhite" }}>{item.name.last}</a>}
                                description={<span className="trend_description" style={{ color : "#55616b" }}>{item.description}</span>}
                            />
                            </List.Item>
                        )}
                        />
                    </Flex>
                    <span style={{ backgroundColor : "#414c57" ,width : "100%" , height : "1px"}}></span>
                    <Flex vertical style={{ marginTop : "6px"}}>
                        <Typography.Text style={{ color : "#55616b"}}>#ButterChicken</Typography.Text>
                        <List
                        style={{ marginTop : "-5px" , width : "100%"}}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                            <List.Item.Meta
                                title={<a style={{color : "ghostwhite",}} href="https://ant.design">{item.name.last}</a>}
                                description={<span className="trend_description" style={{ color : "#55616b" }}>{item.description}</span>}
                            />
                            </List.Item>
                        )}
                        />
                    </Flex>
            </Flex>
        </>
    )
}
