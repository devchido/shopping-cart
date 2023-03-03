import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  spinnerLoading: false,
  fetchCount: 0
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showSpinner(state, action) {
      return {
        ...state,
        spinnerLoading: action.payload
      };
    },
    increaseFetch(state, action) {
      return {
        ...state,
        fetchCount: state.fetchCount + 1
      }
    },
    decreaseFetch(state, action) {
      const fetchCount = (state.fetchCount - 1) < 0 ? 0 : (state.fetchCount - 1)
      return {
        ...state,
        fetchCount
      }
    }
  },
})


export const { showSpinner, increaseFetch, decreaseFetch } = commonSlice.actions;

export default commonSlice.reducer;