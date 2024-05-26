"use client"

import { Layout,Space, Input } from 'antd';
import Navbar from '@/app/Components/Navbar';
import "../../styles/home.css"
const { Header, Content, Footer } = Layout;


export default function Home(){
    return(
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' , backgroundColor : "#051017" , color : "white" , padding : "10px" ,  paddingTop : "10px"}}>
                <Navbar/>
            </Header>
        </Layout>
    )
}