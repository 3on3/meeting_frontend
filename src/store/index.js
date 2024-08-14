import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Login-slice";
import FilterReducer from "./Filter-slice";

// 단일 리덕스 스토어 생성
const store = configureStore({
  reducer: {
    login: loginReducer,
    filter: FilterReducer,
  },
});

export default store;
