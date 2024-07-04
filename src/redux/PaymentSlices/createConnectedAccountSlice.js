// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';

const initialState = {
    response: null,
    loading: false,
    error: null,
};

export const createConnectedAccount = createAsyncThunk(
    'connectedAccount/createConnectedAccount',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { bearerToken } = getState().bearerToken;
            const data = await makeRequest('POST', '/payments/connected-account/create', null, null, bearerToken);
            return data;
        } catch (error) {
            return error
        }
    }
);

const createConnectedAccountSlice = createSlice({
    name: 'connectedAccount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createConnectedAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createConnectedAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload?.result;
            })
            .addCase(createConnectedAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default createConnectedAccountSlice.reducer;
