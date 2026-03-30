import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action){
            return action.payload
        },
    }
})

export const userReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':{
            return action.payload;
        }
        case 'LOGOUT':{
            return null
        }
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer