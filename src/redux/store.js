import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "./slices/membersSlice";
import roleReducer from "./slices/roleSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["members/setAutoResetTimer"],
        ignoredPaths: ["members.autoResetTimer"],
      },
    }),
});
