// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './appSlice';
import signInReducer from './AuthModule/signInSlice';
import signupReducer from './AuthModule/signupSlice';
import updateProfileReducer from './AuthModule/updateProfileSlice';
import verifyEmailReducer from './AuthModule/verifyEmailSlice';
import verifyEmailCodeReducer from './AuthModule/verifyEmailCodeSlice';
import resetPasswordReducer from './AuthModule/resetPasswordSlice';
import createConnectedAccountReducer from './PaymentSlices/createConnectedAccountSlice';
import accountOnboardingReducer from './PaymentSlices/accountOnboardingSlice';
import checkStripeFilledStatusReducer from './PaymentSlices/checkStripeFilledStatusSlice';
import setTempCredentialsReducer from './setTempCredentialsSlice';
import getAllNearbyBuddyReducer from './UserDashboard/getAllNearbyBuddySlice';
import getAddressByLatLongReducer from './getAddressByLatLongSlice';
import getAllCategoriesReducer from './getAllCategoriesSlice';
import getLanguagesReducer from './getLanguagesSlice';
import appOpenedReducer from './appOpenedSlice';
import sendRequestReducer from './UserDashboard/sendRequestSlice';
import likeDislikeBuddyReducer from './UserDashboard/likeDislikeBuddySlice';
import userBuddyActionReducer from './userBuddyActionSlice';
import applyFilterTogetBuddiesReducer from './UserDashboard/applyFilterTogetBuddiesSlice';
import accountSubscriptionReducer from './accountSubscriptionSlice';
import getAllBuddyRequestRequest from './BuddyDashboard/getAllBuddyRequestSlice';
import acceptRejectUserRequestReducer from './BuddyDashboard/acceptRejectUserRequestSlice';
import getRequestByIdReducer from './BuddyDashboard/getRequestByIdSlice';
import requestBackBuddyReducer from './BuddyDashboard/requestBackBuddySlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'signup', 'accountSubscription']  // Persist 'auth' and 'signup' slices
};

const rootReducer = combineReducers({
    auth: signInReducer,
    signup: signupReducer,
    createProfile: updateProfileReducer,
    verifyEmail: verifyEmailReducer,
    verifyEmailCode: verifyEmailCodeReducer,
    resetPassword: resetPasswordReducer,
    connectedAccount: createConnectedAccountReducer,
    accountOnboarding: accountOnboardingReducer,
    checkStripeFilledStatus: checkStripeFilledStatusReducer,
    tempCredentials: setTempCredentialsReducer,
    nearByBuddy: getAllNearbyBuddyReducer,
    getAddress: getAddressByLatLongReducer,
    getCategories: getAllCategoriesReducer,
    getLanguages: getLanguagesReducer,
    appOpened: appOpenedReducer,
    sendRequest: sendRequestReducer,
    likeDislikeBuddy: likeDislikeBuddyReducer,
    userBuddyAction: userBuddyActionReducer,
    applyFilter: applyFilterTogetBuddiesReducer,
    accountSubscription: accountSubscriptionReducer,
    getAllBuddyRequest: getAllBuddyRequestRequest,
    acceptRejectUserRequest: acceptRejectUserRequestReducer,
    getRequestById: getRequestByIdReducer,
    requestBackBuddy: requestBackBuddyReducer,
    app: appReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
