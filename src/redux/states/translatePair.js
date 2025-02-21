import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const translatePairSlice = createSlice({
    name: "translatePair",
    initialState,
    reducers:{
        setPair: (state,action)=>{
           state.value = action.payload
        }
    }
})

export const {setPair} = translatePairSlice.actions

export default translatePairSlice.reducer