import { createSlice } from "@reduxjs/toolkit";
const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: tokenFromStorage || null,
        user: userFromStorage ? JSON.parse(userFromStorage) : null,
        loading: true
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = ""
            state.user = null
            localStorage.removeItem('token')

        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { login, logout, setLoading } = authSlice.actions


export default authSlice.reducer