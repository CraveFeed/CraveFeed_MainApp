"use client";

import { Layout } from 'antd';
import Navbar from '@/app/Components/Navbar';
import { ReactNode } from 'react';
import { Dock } from '@/app/Components/Dock';
import "../../styles/home.css";

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
    </Layout>
  );
}