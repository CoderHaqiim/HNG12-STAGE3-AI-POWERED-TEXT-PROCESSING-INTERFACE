import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const replyIsLoadingSlice = createSlice({
    name: "brandLoading",
    initialState,
    reducers:{
        setReplyIsLoading: (state,action)=>{
           state.value = action.payload
        }
    }
})

export const {setReplyIsLoading} = replyIsLoadingSlice.actions

export default replyIsLoadingSlice.reducer