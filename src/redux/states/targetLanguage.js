import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const targetLanguageSlice = createSlice({
    name: "language",
    initialState,
    reducers:{
        setLanguage: (state,action)=>{
           state.value = action.payload
        }
    }
})

export const {setTargetLanguage} = targetLanguageSlice.actions

export default targetLanguageSlice.reducer