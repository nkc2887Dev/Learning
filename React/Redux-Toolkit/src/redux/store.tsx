import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/index";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch