"use client"

import "../../styles/chat.css"
import { useState } from "react";
import { Avatar, List, Button, Input, Flex } from "antd";
import { LeftOutlined, SendOutlined} from "@ant-design/icons"

interface Contact {
    id: number;
    name: string;
    avatar: string;
}

const contacts: Contact[] = [
    { id: 1, name: "Vibhor Phalke", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },
    { id: 2, name: "Shashwat Singh", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },
    { id: 3, name: "Ritika Verma", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" },

];

// Initialize with some previous interactions
const initialChatHistory: Record<number, { sender: string; content: string; timestamp: string }[]> = {
    1: [
        { sender: "Vibhor Phalke", content: "Hey, how’s it going?", timestamp: "10:00 AM" },
        { sender: "You", content: "All good! How about you?", timestamp: "10:05 AM" },
    ],
    2: [
        { sender: "Shashwat Singh", content: "Are we still on for the meeting?", timestamp: "11:30 AM" },
        { sender: "You", content: "Yes, see you there!", timestamp: "11:32 AM" },
    ],
    3: [
        { sender: "Ritika Verma", content: "Did you finish the project?", timestamp: "9:45 AM" },
        { sender: "You", content: "Almost done, just a few tweaks left.", timestamp: "9:50 AM" },
    ],
};

export default function Chat() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState(initialChatHistory);

    const handleSendMessage = () => {
        if (!message.trim() || !selectedContact) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessage = { sender: "You", content: message, timestamp };

        setChatHistory(prevHistory => ({
            ...prevHistory,
            [selectedContact.id]: [...(prevHistory[selectedContact.id] || []), newMessage],
        }));

        setMessage("");
    };

    const renderMessages = () => {
        if (!selectedContact) return null;

        const messages = chatHistory[selectedContact.id] || [];
        return messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px", alignSelf: msg.sender === "You" ? "flex-end" : "flex-start" }}>
                <div
                    className="renderMessages-Mobile-text"
                    style={{
                        backgroundColor: msg.sender === "You" ? "#fd7077" : "#3a3b3c",
                        color: "white",
                        padding: "10px 15px",
                        borderRadius: "15px",
                        maxWidth: "100%",
                        fontSize : "18px"
                    }}
                >
                    {msg.content}
                </div>
                <small className="renderMessages-Mobile-timestamp" style={{ color: "#888", fontSize: "14px" }}>{msg.timestamp}</small>
            </div>
        ));
    };

    return (
        <div style={{ display: "flex", height: "89vh", backgroundColor: "#1B2730" , marginTop : "10px" , overflowY : "hidden" }}>
            {/* Left Sidebar - Contact List */}
            <div className="left-container display-desktop" style={{ borderRight: "1px solid #333" , borderTop :"1px solid #333", overflowY: "scroll" , scrollbarWidth : "none" , msOverflowStyle : "none" , backgroundColor: "#051017be" , padding : "20px" }}>
                <h2 style={{ color: "white", fontSize: "18px", fontWeight: "bold", marginBottom: "20px" , paddingBottom : "0px"}}>Chats</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={contacts}
                    renderItem={contact => (
                        <List.Item
                            style={{
                                cursor: "pointer",
                                padding: "10px 5px",
                                borderRadius: "8px",
                                transition: "background 0.3s",
                                backgroundColor: selectedContact?.id === contact.id ? "#113852" : "transparent",
                                marginTop : "3px"
                            }}
                            onClick={() => setSelectedContact(contact)}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size={45} src={contact.avatar} />}
                                title={
                                    <Flex align="start" vertical justify="center">
                                        <span style={{ color: "white", fontWeight: "500" }}>{contact.name}</span>
                                        <p style={{ color : "white"}}>Last meassage </p>
                                    </Flex>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>

            {selectedContact == null && (
                <div className="left-container display-mobile" style={{ borderRight: "1px solid #333" , borderTop :"1px solid #333", overflowY: "scroll" , scrollbarWidth : "none" , msOverflowStyle : "none" , backgroundColor: "#051017be" , padding : "20px" }}>
                    <h2 style={{ color: "white", fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>Chats</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={contacts}
                        renderItem={contact => (
                            <List.Item
                                style={{
                                    cursor: "pointer",
                                    padding: "10px 5px",
                                    borderBlock : "1px solid #1B2730",
                                    transition: "background 0.3s",
                                }}
                                onClick={() => setSelectedContact(contact)}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={45} src={contact.avatar} />}
                                    title={
                                        <Flex align="start" vertical justify="center">
                                            <span style={{ color: "white", fontWeight: "500" , fontSize : "19px" }}>{contact.name}</span>
                                            <p style={{ color : "white" , fontSize : "12px"}}>Last meassage </p>
                                        </Flex>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            )}


            {/* Chat Area - Right Side */}
            <div className="display-desktop" style={{  width: "75%", display: "flex", flexDirection: "column", backgroundColor: "#051017be" , borderTop : "1px solid #333" }}>
                {selectedContact ? (
                    <>
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #333", backgroundColor: "#051017" }}>
                            <Avatar size={50} src={selectedContact.avatar} />
                            <div style={{ marginLeft: "15px" }}>
                                <h2 style={{ color: "white", margin: 0 }}>{selectedContact.name}</h2>
                                <p style={{ color: "#aaa", margin: 0 }}>Active now</p>
                            </div>
                        </div>

                        {/* Message Area */}
                        <div style={{ flex: 1, padding: "20px", overflowY: "scroll" , scrollbarWidth : "none" , msOverflowStyle : "none", display: "flex", flexDirection: "column" }}>
                            {renderMessages()}
                        </div>

                        {/* Input Box */}
                        <div style={{ padding: "15px 20px", backgroundColor: "#051017be", display: "flex", alignItems: "center" }}>
                            <Input
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onPressEnter={handleSendMessage}
                                style={{ flex: 1, marginRight: "10px", borderRadius: "20px", backgroundColor: "#051017", color: "white" , border : "1px solid gray" , height : "50px" }}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<SendOutlined style={{color : "black"}} />}
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                                style={{ backgroundColor: "#fd7077", border: "none" }}
                            />
                        </div>
                    </>
                ) : (
                    <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", color: "#aaa" }}>
                        <h2>Select a chat to view messages</h2>
                    </div>
                )}
            </div>


                {selectedContact && (
                <div className="display-mobile" style={{ width: "100%" , backgroundColor: "#051017be" }}>
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #333" , borderTop : "1px solid #333", backgroundColor: "#051017be" }}>
                            <LeftOutlined onClick={() => { setSelectedContact(null)}} style={{fontSize : "13px" , backgroundColor : "#fd7077" , borderRadius : "50%" , padding : "5px" , marginRight : "20px"}}/>
                            <Avatar size={50} src={selectedContact.avatar} />
                            <div style={{ marginLeft: "15px" }}>
                                <h2 style={{ color: "white", margin: 0 , fontSize : "17px" }}>{selectedContact.name}</h2>
                                <p style={{ color: "#aaa", margin: 0 , fontSize : "13px" }}>Active now</p>
                            </div>
                        </div>

                        {/* Message Area */}
                        <div style={{ flex: 1, padding: "20px", overflowY: "scroll" , scrollbarWidth : "none" , msOverflowStyle : "none" , display: "flex", flexDirection: "column" }}>
                            {renderMessages()}
                        </div>

                        {/* Input Box */}
                        <div style={{ padding: "15px 20px", borderTop: "1px solid #333", backgroundColor: "#051017be", display: "flex", alignItems: "center" }}>
                            <Input
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onPressEnter={handleSendMessage}
                                style={{ flex: 1, marginRight: "10px", borderRadius: "20px", backgroundColor: "#051017", color: "white" , border : "1px solid gray" , height : "40px" }}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<SendOutlined style={{ color : "black"}} />}
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                                style={{ backgroundColor: "#fd7077", border: "none" }}
                            />
                        </div>
                    </div>
                )}
        </div>
    );
}
