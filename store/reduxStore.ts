"use client";
import { configureStore } from "@reduxjs/toolkit";

import { type } from "os";
import loginReduser from "./redusersRedux/loginReduser";
import regimeSlice from "./redusersRedux/RefimeRediser";

export const store = configureStore({
  reducer: {
    login: loginReduser,
    regimes: regimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
