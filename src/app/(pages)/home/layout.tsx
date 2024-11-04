"use client";

import { Layout , Row, Col , Flex , Space} from 'antd';
import Navbar from '@/app/Components/Navbar';
import "../../styles/home.css";
import { ReactNode } from 'react';

const { Header, Content, Footer } = Layout;

interface LayoutProps {
  children: ReactNode;
  bio : ReactNode;
  content : ReactNode;
  misc : ReactNode;
}

export default function HomeLayout({
    children,
    bio, 
    content ,
    misc,
    }: LayoutProps) {
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "#051017", color: "white", padding: "10px", paddingTop: "10px" }}>
        <Navbar />
      </Header>
      <Content className='home-desktop' style={{ backgroundColor: "#051017" , padding : "20px" }}>
        <Row  gutter={16}>
            <Col span={5}>
                {bio}
            </Col>
            <Col span={14}>
                {content}
            </Col>
            <Col span={5}>
                {misc}
            </Col>
        </Row>
      </Content>
        
        <Content className='home-mobile' style={{ backgroundColor: "#051017" , paddingTop : "10px" }}>
          <Flex vertical justify='center'align='center'>
              {/* <Space >
                  {misc}
                  <></>
              </Space> */}
              <Space >
                  {content}
              </Space>
          </Flex>
        </Content>


    </Layout>
  );
}