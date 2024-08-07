// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';
const baseEndpoint = "/users/buddy/get-near-by";

const initialState = {
    response: null,
    loading: false,
    error: null,
};

export const getAllNearbyBuddy = createAsyncThunk(
    'nearByBuddy/getAllNearbyBuddy',
    async (payload, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth
            const bearerToken = `Bearer ${token}`
            const data = await makeRequest('GET', `${baseEndpoint}?latitude=${payload?.latitude}&longitude=${payload?.longitude}&distance=500000000&page=1&limit=50`, null, null, bearerToken);
            return data;
        } catch (error) {
            return error
        }
    }
);

const getAllNearbyBuddySlice = createSlice({
    name: 'nearByBuddy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNearbyBuddy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNearbyBuddy.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload?.result;
            })
            .addCase(getAllNearbyBuddy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default getAllNearbyBuddySlice.reducer;
