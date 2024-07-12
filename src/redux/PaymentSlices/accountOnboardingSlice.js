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
            const { bearerToken } = getState().signup;
            const token = `Bearer ${bearerToken}`;
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
