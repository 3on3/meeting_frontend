import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Login-slice"

// 단일 리덕스 스토어 생성
const store = configureStore({
    reducer: {
        login: loginReducer,
    }
});

export default store;

