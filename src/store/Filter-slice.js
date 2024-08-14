import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  filterDto: {
    gender: null,
    groupPlace: null,
    maxNum: null,
    isMatched: false,
    pageNo: 1,
    pageSize: 4,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterModifyDto(state, action) {
      //업데이트할 것들
      const { gender, groupPlace, maxNum, isMatched, pageNo } = action.payload;
      if (gender !== undefined) state.filterDto.gender = gender;
      if (groupPlace !== undefined) state.filterDto.groupPlace = groupPlace;
      if (maxNum !== undefined) state.filterDto.maxNum = maxNum;
      if (isMatched !== undefined) state.filterDto.isMatched = isMatched;
      // if (pageNo !== undefined) state.filterDto.pageNo = pageNo;
      console.log("filterDto : ", current(state.filterDto));
    },
  },
});

export const filterAction = filterSlice.actions;
export default filterSlice.reducer;
