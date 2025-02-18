import { configureStore } from "@reduxjs/toolkit";
import dialogue from "./states/dialogue";
import replyIsLoading from "./states/replyIsLoading";
import placeholder2 from "./states/placeholder2";
import language from "./states/language"
import error from "./states/error";

export const store = configureStore({
    reducer: {
        dialogue,
        replyIsLoading,
        placeholder2,
        error,
        language
    }
})