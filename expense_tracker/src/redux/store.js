import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        expenses: expenseSlice,
    },devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/setUser'],
                ignoredPaths: ['auth.user']
            }
        })
});

export default store;