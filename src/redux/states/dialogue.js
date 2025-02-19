import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const dialogueSlice = createSlice({
    name: "dialogue",
    initialState,
    reducers:{
        addDialogue: (state, action)=>{
           state.value = action.payload
        },

        addMessageToDialogue: (state, action) => {
            const { index, payload } = action.payload;

            if (!Array.isArray(state.value[index])) {
                state.value[index] = [];
            }else{
                state.value[index].push(payload);
            }
        },

        changeTranslation: (state, action) => {
            const { index, payload} = action.payload;

            let innerArray = state.value[index]
            const deleteIndex = innerArray.findIndex(item => item.id == payload.id)
            innerArray.splice(deleteIndex,1)
            state.value[index] = [...innerArray, payload]
        }

    }
})

export const {addDialogue, changeTranslation, addMessageToDialogue} = dialogueSlice.actions

export default dialogueSlice.reducer