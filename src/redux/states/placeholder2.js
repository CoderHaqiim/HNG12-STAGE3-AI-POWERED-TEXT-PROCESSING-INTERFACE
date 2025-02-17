import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const placeholder2Slice = createSlice({
    name: "brandLoading",
    initialState,
    reducers:{
        setPlaceholder2: (state,action)=>{
           state.value = action.payload
        }
    }
})

export const {setPlaceholder2} = placeholder2Slice.actions

export default placeholder2Slice.reducer