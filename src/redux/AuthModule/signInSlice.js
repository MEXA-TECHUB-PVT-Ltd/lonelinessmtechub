// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';

const initialState = {
    token: null,
    role: null,
    user_id: null,
    response: null,
    userLoginInfo: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await makeRequest('POST', '/auth/sign-in', credentials);
            return data;
        } catch (error) {
            return error
        }
    }
);

const signInSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.response = null;
            state.role = null;
            state.role = null;
            state.user_id = null,
                state.userLoginInfo = null
        },
        updateUserLoginInfo(state, action) {
            if (state.userLoginInfo) {
                state.userLoginInfo = {
                    ...state.userLoginInfo,
                    user: {
                        ...state.userLoginInfo.user,
                        ...action.payload
                    }
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload?.result?.token;
                state.role = action.payload?.result?.role;
                state.response = action.payload?.result;
                state.userLoginInfo = action.payload?.result;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, updateUserLoginInfo } = signInSlice.actions;
export default signInSlice.reducer;
