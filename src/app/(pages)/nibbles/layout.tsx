"use client";

import { Layout } from 'antd';
import Navbar from '@/app/Components/Navbar';
import "../../styles/home.css";
import { ReactNode } from 'react';

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
    </Layout>
  );
}