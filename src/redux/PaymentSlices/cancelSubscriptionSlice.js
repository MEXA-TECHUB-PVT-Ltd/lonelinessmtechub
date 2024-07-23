// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';

const initialState = {
    response: null,
    loading: false,
    error: null,
};

export const cancelSubscription = createAsyncThunk(
    'cancelSubscription/cancelSubscription',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = `Bearer ${auth.token}`
            const data = await makeRequest('POST', '/payments/subscription/cancel', null, null, token);
            return data;
        } catch (error) {
            return error
        }
    }
);

const cancelSubscriptionSlice = createSlice({
    name: 'cancelSubscription',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(cancelSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload?.result;
            })
            .addCase(cancelSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cancelSubscriptionSlice.reducer;
