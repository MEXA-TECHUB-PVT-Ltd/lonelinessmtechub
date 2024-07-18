// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../../configs/makeRequest';
const baseEndpoint = "/users/get-likes/buddy";

const initialState = {
    likes: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
};

export const getLikes = createAsyncThunk(
    'getLikes/getLikes',
    async ({ page = 1, limit = 10 }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const bearerToken = `Bearer ${token}`;
            const data = await makeRequest('GET', `${baseEndpoint}?page=${page}&limit=${limit}`, null, null, bearerToken);
            return data;
        } catch (error) {
            return error
        }
    }
);

const getLikesSlice = createSlice({
    name: 'getLikes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLikes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLikes.fulfilled, (state, action) => {
                state.loading = false;
                if (action.meta.arg.page === 1) {
                    state.likes = action.payload.result?.data;
                } else {
                    state.likes = [...state.likes, ...action.payload.result?.data];
                }
                state.currentPage = action.meta.arg.page;
                state.totalPages = action.payload.result?.totalPages;
            })
            .addCase(getLikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default getLikesSlice.reducer;
