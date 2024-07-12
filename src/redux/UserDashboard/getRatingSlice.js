// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';
const baseEndpoint = "/rating/get-all/buddy/";

const initialState = {
    ratings: [],
    loading: false,
    error: null,
};

export const getAllRating = createAsyncThunk(
    'getRating/getAllRating',
    async ({ page = 1, limit = 10, buddy_id }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth
            const bearerToken = `Bearer ${token}`
            const data = await makeRequest('GET', `${baseEndpoint}${buddy_id}?page=${page}&limit=${limit}`, null, null, bearerToken);
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
