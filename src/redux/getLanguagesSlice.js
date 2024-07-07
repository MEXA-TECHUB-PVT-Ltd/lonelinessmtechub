// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '../configs/makeRequest';

const initialState = {
    languages: null,
    loading: false,
    error: null,
};

export const getLanguages = createAsyncThunk(
    'getLanguages/getLanguages',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { bearerToken } = getState().signup
            const token = `Bearer ${bearerToken}`
            console.log('bearerToken ----->', token)
            const data = await makeRequest('GET', '/universal/languages/getAll', null, null, token);
            return data;
        } catch (error) {
            return error
        }
    }
);

const getLanguagesSlice = createSlice({
    name: 'getLanguages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLanguages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.languages = action.payload?.result;
            })
            .addCase(getLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default getLanguagesSlice.reducer;
