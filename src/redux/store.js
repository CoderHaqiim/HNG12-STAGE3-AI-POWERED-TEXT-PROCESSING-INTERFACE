import { configureStore } from "@reduxjs/toolkit";
import dialogue from "./states/dialogue";
import replyIsLoading from "./states/replyIsLoading";
import translatePair from "./states/translatePair";
import targetLanguage from "./states/targetLanguage"
import error from "./states/error";

export const store = configureStore({
    reducer: {
        dialogue,
        replyIsLoading,
        translatePair,
        error,
        targetLanguage
    }
})