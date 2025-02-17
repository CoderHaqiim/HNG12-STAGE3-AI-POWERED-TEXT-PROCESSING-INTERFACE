import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const dialogueSlice = createSlice({
    name: "dialogue",
    initialState,
    reducers:{
        addDialogue: (state,action)=>{
           state.value.push(action.payload)
        }
    }
})

export const {addDialogue} = dialogueSlice.actions

export default dialogueSlice.reducer