import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  name: string;
  action: string;
  category: string;
  avatar: string;
  timestamp: string;
  read: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL 

export interface NotificationsState {
  notifications: Notification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationsState = {
    notifications: [
      {
        id: "1",
        name: "Shashwat Singh",
        action: "liked your post",
        category: "like",
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        timestamp: "2024-11-09T00:00:00Z",
        read: true,
      },
      {
        id: "2",
        name: "Shashwat Singh",
        action: "liked your post",
        category: "like",
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        timestamp: "2024-11-07T10:00:00Z",
        read: true,
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
    ],
    status: "idle",
    error: null,
};
  
export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async (token: string, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_URL}/notification/read`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
  
        const data = await response.json();
  
        const transformedData: Notification[] = data.notifications.map((notif: any) => ({
          id: notif.creatorId,
          name: notif.creatorUserName,
          action: notif.message,
          category: notif.message.includes("following")
          ? "follow"
          : notif.message.includes("commented")
          ? "comment"
          : notif.message.includes("liked")
          ? "like"
          : "other",
          avatar: notif.avatar,
          timestamp: notif.createdAt,
          read: notif.read,
        }));
  
        console.log("This is notifications : - " , transformedData);

        return transformedData;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );  

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default notificationsSlice.reducer;
