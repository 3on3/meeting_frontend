import { createSlice } from "@reduxjs/toolkit";

/**
 * 메인 미팅 리스트 GET Fetch Loading 관리
 */

//초기 상태
const initialState = {
  loading: false,
};

const mainFilterLoading = createSlice({
  name: "filterLoading",
  initialState,
  reducers: {
    // 로딩 중
    filterLoadingStartAction(state) {
      state.loading = true;
    },
    // 로딩 끝
    filterLoadingStopAction(state) {
      state.loading = false;
    },
  },
});

//액션 함수들 내보내기
export const mainFilterLoadingActions = mainFilterLoading.actions;
export default mainFilterLoading.reducer;
