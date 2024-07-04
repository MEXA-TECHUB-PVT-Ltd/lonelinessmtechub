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

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'signup']  // Persist 'auth' and 'signup' slices
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
