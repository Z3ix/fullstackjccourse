import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notify(state, action) {
            return action.payload
        },
        clearNotification(){
            return null
        }
    }
})

export const { notify, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer