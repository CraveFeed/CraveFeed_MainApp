"use client"

import Navbar from '@/app/Components/Navbar';
import ProfileComponent from '@/app/Components/Profile';
import { Layout , Row, Col , Flex , Space, Card} from 'antd';

const { Header, Content, Footer } = Layout;

export default function ProfilePage() {
    return(
        <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "#051017", color: "white", padding: "10px", paddingTop: "10px" }}>
        <Navbar />
      </Header>
      <Content  style={{ backgroundColor: "#051017" , padding : "20px" }}>
        <Row  gutter={16}>
            <Col span={4}>
            </Col>
            <Col span={16}>
                <ProfileComponent/>
            </Col>
            <Col span={4}>
            </Col>
        </Row>
      </Content>
        </Layout>

    )
}