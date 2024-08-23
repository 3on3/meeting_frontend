import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Login-slice";
import mainFilterLoadingReducer from "./MainFilterLoading-slice";

// 단일 리덕스 스토어 생성
const store = configureStore({
  reducer: {
    login: loginReducer,
    mainFilterLoading: mainFilterLoadingReducer,
  },
});

export default store;
