// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../configs/makeRequest';

const initialState = {
    response: null,
    loading: false,
    error: null,
};

export const deleteAccount = createAsyncThunk(
    'deleteAccount/deleteAccount',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token, userLoginInfo } = getState().auth
            const bearerToken = `Bearer ${token}`
            const user_id = userLoginInfo?.user?.id
            const payload = {
                user_id: user_id
            }
            const data = await makeRequest('GET', `/users/delete`, payload, null, bearerToken);
            return data;
        } catch (error) {
            return error
        }
    }
);

const deleteAccountSlice = createSlice({
    name: 'deleteAccount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload?.result;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default deleteAccountSlice.reducer;
