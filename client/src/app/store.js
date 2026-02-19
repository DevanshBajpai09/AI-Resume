import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./Features/authSlice"
import networkReducer from "./Features/networkSlice"
export const store = configureStore({
    reducer : {
        auth: authReducer,
        network: networkReducer

    }
})