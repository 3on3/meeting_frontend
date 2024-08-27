import { createSlice } from "@reduxjs/toolkit";
import {userDataLoader} from "../config/auth";

const initialState = {
    // 유저토큰인 있다면 true, 없다면 false
    isLogin: (!!userDataLoader()),
};


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // 상태변경 행위 (액션함수)
        loginAction(state){
            state.isLogin = !!userDataLoader();
        },
    }
});

// 액션 함수들 내보내기
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;