import { createSlice } from "@reduxjs/toolkit"

const chatNotifSlice = createSlice({
    name: "chatNotif",
    initialState: {
        unreadMessage: 0,
        dataMessage: []
    },
    reducers: {
        setUnreadMessage: (state, action) => {
            state.unreadMessage = action.payload;
        },
    },
});

export const { setUnreadMessage } = chatNotifSlice.actions;

export default chatNotifSlice.reducer;
