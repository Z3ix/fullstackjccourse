import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterTo(state, action) {
            return action.payload;
        }
    }       
})


/*
const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload;
        default: 
            return state;
    }

}

export const changeFilterTo = filter => {
    return {
        type: 'FILTER',
        payload: filter
    }
}*/

export const { filterTo } = filterSlice.actions;
export default filterSlice.reducer;