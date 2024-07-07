// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';

const initialState = {
    response: null,
    loading: false,
    error: null,
};

export const accountOnboarding = createAsyncThunk(
    'accountOnboarding/accountOnboarding',
    async (_, { getState, rejectWithValue }) => {
        try {
           // const { bearerToken } = getState().bearerToken;
            const token = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEsImlhdCI6MTcyMDM0NjYyMCwiZXhwIjoxNzIwNDMzMDIwfQ.2sKljSbO_DNO7mhxTxKkSze9duI8u1DYTCEdr8kfBlM'}`;
            const data = await makeRequest('POST', '/payments/connected-account/onboarding', null, null, token);
            return data;
        } catch (error) {
            return error
        }
    }
);

const accountOnboardingSlice = createSlice({
    name: 'accountOnboarding',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(accountOnboarding.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(accountOnboarding.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload?.result;
            })
            .addCase(accountOnboarding.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default accountOnboardingSlice.reducer;
