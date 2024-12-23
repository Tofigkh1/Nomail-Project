import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import messageReducer from "../Features/messageSlice/messageSlice";

// MakeStore fonksiyonunu tanımlıyoruz
const makeStore = () =>
  configureStore({
    reducer: {
      message: messageReducer,
    },
  });

// Store'u burada oluşturuyoruz
export const store = makeStore();

// Typing için gerekli tanımlamalar
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Next.js ile Redux'u sarmalayan wrapper
export const wrapper = createWrapper(makeStore);