"use client";

import { Layout } from 'antd';
import Navbar from '@/app/Components/Navbar';
import "../../styles/nibbles.css";
import { ReactNode } from 'react';
import { Dock } from '@/app/Components/Dock';

const { Header, Content, Footer } = Layout;

interface LayoutProps {
  children: ReactNode;
}

export default function HomeLayout({
    children,
    }: LayoutProps) {
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "#051017", color: "white", padding: "10px", paddingTop: "10px" }}>
        <Navbar />
      </Header>
      <Content style={{ backgroundColor: "#051017" }}>
        {children}
      </Content>
        
        {/* <Content className='home-mobile' style={{ backgroundColor: "#051017" , paddingTop : "10px" , color :  "white"}}>
          <Flex vertical justify='center'align='center'>
            this is  mobile content
          </Flex>
        </Content> */}
        <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "#051017",
                    zIndex: 1000, // Ensure it stays on top
                    height: "50px",
                }}
            >
                <Dock index={3} />
            </div>
    </Layout>
  );
}