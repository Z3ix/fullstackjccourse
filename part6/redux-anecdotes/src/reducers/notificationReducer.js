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

const { notify, clearNotification } = notificationSlice.actions

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let timeoutHandle = null;

export const setNotification = (text, timeout) => {
    return (dispatch) => {
        dispatch(notify(text));
        if (timeoutHandle){
            clearTimeout(timeoutHandle)
        }
        //await delay(timeout);
        timeoutHandle = setTimeout(() => {
            dispatch(clearNotification())
        },timeout)
        //dispatch(clearNotification())

    }
}
export default notificationSlice.reducer