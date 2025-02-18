import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const errorSlice = createSlice({
    name:'error',
    initialState,
    reducers: {
        setError: (state,action) =>{
            state.value = action.payload
        }
    }
})

export const{setError} = errorSlice.actions
export default errorSlice.reducer