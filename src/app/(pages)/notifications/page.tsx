"use client";

import { Avatar, Flex, Button } from "antd";
import { formatDistanceToNow, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import { fetchNotifications } from "@/lib/features/services/notification/notification";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { Dock } from "@/app/Components/Dock";

import { Notification as ImportedNotification } from "@/lib/features/services/notification/notification";

type Notification = ImportedNotification;

export default function Notifications() {



    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.global.token);
    const Notifications = useAppSelector(state => state.notificationsSlice.notifications)
    useEffect(() => {
        if(token){
            dispatch(fetchNotifications(token));
        }
    }, [dispatch]);

    console.log("NONOTI Fications :- " , Notifications);
    const notifications: Notification[] = [
        {
            id: "1",
            name: "Shashwat Singh",
            action: "liked your post",
            category: "like",
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            timestamp: "2024-11-09T00:00:00Z",
            read: false,
        },
        {
            id: "2",
            name: "Shashwat Singh",
            action: "liked your post",
            category: "like",
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            timestamp: "2024-11-07T10:00:00Z",
            read: false,
        },
        {
            id: "3",
            name: "Ritika Verma",
            action: "started following you",
            category: "follow",
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            timestamp: "2024-10-29T12:30:00Z",
            read: false,
        },
        {
            id: "4",
            name: "John Doe",
            action: "commented on your post",
            category: "comment",
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            timestamp: "2024-09-10T15:20:00Z",
            read: true,
        },
    ];

    const getTimeCategory = (date: Date): string => {
        if (isToday(date)) return "Today";
        if (isThisWeek(date, { weekStartsOn: 1 })) return "Last Week";
        if (isThisMonth(date)) return "Last Month";
        return "A Few Months Ago";
    };

    const groupedNotifications = Notifications.reduce<Record<string, Record<string, Notification[]>>>((acc, notification) => {
        const date = parseISO(notification.timestamp);
        const timeCategory = getTimeCategory(date);
        if (!acc[timeCategory]) acc[timeCategory] = {};
        if (!acc[timeCategory][notification.category]) acc[timeCategory][notification.category] = [];
        acc[timeCategory][notification.category].push(notification);
        return acc;
    }, {});

    const unreadNotifications = Notifications.filter((n) => !n.read);

    return (
        <>
            <Flex
                vertical
                style={{
                    backgroundColor: "#051017",
                    color: "white",
                    width: "100%",
                    height: "90vh",
                    overflowY: "scroll",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    paddingLeft: "30px",
                    paddingBottom: "50px"
                }}
            >
                {unreadNotifications.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <h2 style={{ color: "#f31277", fontWeight: "bold", marginTop: "20px" , paddingBottom : "15px"}}>Unread Notifications</h2>
                        {unreadNotifications.map((notification) => (
                            <Flex style={{backgroundColor: "#1d2a36", marginBottom : "5px" , borderRadius : "20px"}} align="center" justify="space-between" key={notification.id}>
                                <Flex
                                    style={{
                                        color: "white",
                                        marginBottom: "15px",
                                        borderRadius: "8px",
                                        padding: "5px",
                                    }}
                                    align="center"
                                >
                                    <Avatar size={55} src={notification.avatar} />
                                    <div style={{ marginLeft: "6px" }}>
                                        <Flex>
                                            <h1 style={{ marginRight: "5px", fontWeight: "bold", fontSize: "13px", color: "#f31277" }}>{notification.name}</h1>
                                            <p style={{ margin: 0 }}>{notification.action}</p>
                                        </Flex>
                                        <small style={{ color: "#aaa" }}>
                                            {formatDistanceToNow(parseISO(notification.timestamp), { addSuffix: true })}
                                        </small>
                                    </div>
                                </Flex>
                                <Button style={{ marginRight: "10px", marginTop: "-20px", borderRadius: "20px", fontSize: "10px" }}>Follow</Button>
                            </Flex>
                        ))}
                    </div>
                )}

                {Object.entries(groupedNotifications).map(([timeCategory, actions]) => (
                    <div key={timeCategory} style={{ marginBottom: "20px" }}>
                        <h2 style={{ color: "#ccc", fontWeight: "bold", marginTop: "20px" }}>{timeCategory}</h2>
                        {Object.entries(actions).map(([actionCategory, items]) => (
                            <div key={actionCategory}>
                                <h3 style={{ color: "#888", fontWeight: "bold", marginTop: "10px" }}>
                                    {actionCategory.charAt(0).toUpperCase() + actionCategory.slice(1)}
                                </h3>
                                {items.map((notification) => (
                                    <Flex align="center" justify="space-between" key={notification.id}>
                                        <Flex
                                            style={{ color: "white", marginBottom: "15px" }}
                                            align="center"
                                        >
                                            <Avatar size={55} src={notification.avatar} />
                                            <div style={{ marginLeft: "6px" }}>
                                                <Flex>
                                                    <h1 style={{ marginRight: "5px", fontWeight: "bold", fontSize: "13px" }}>{notification.name}</h1>
                                                    <p style={{ margin: 0 }}>{notification.action}</p>
                                                </Flex>
                                                <small style={{ color: "#aaa" }}>
                                                    {formatDistanceToNow(parseISO(notification.timestamp), { addSuffix: true })}
                                                </small>
                                            </div>
                                        </Flex>
                                        <Button style={{ marginRight: "10px", marginTop: "-20px", borderRadius: "20px", fontSize: "10px" }}>Follow</Button>
                                    </Flex>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </Flex>

            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "#051017",
                    zIndex: 1000,
                    height: "50px",
                }}
            >
                <Dock index={0}/>
            </div>
        </>
    );
}
