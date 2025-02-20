import { configureStore } from "@reduxjs/toolkit";
import dialogue from "./states/dialogue";
import placeholder2 from "./states/placeholder2";
import targetLanguage from "./states/targetLanguage"
import error from "./states/error";

export const store = configureStore({
    reducer: {
        dialogue,
        placeholder2,
        error,
        targetLanguage
    }
})