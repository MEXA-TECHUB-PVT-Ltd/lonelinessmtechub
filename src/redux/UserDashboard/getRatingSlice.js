// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';
const baseEndpoint = "/rating/get-all/buddy?page=1&limit=15";

const initialState = {
    ratings: [],
    loading: false,
    error: null,
};

export const getAllRating = createAsyncThunk(
    'getRating/getAllRating',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth
            const bearerToken = `Bearer ${token}`
            const data = await makeRequest('GET', baseEndpoint, null, null, bearerToken);
            return data;
        } catch (error) {
            return error
        }
    }
);

const getAllRatingSlice = createSlice({
    name: 'getRating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRating.fulfilled, (state, action) => {
                state.loading = false;
                state.ratings = action.payload?.result;
            })
            .addCase(getAllRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default getAllRatingSlice.reducer;
