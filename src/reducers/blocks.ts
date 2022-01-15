import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/configureStore";
import fetch from "cross-fetch";
import { Block } from "../types/Block";
import initialStateBlocks from "./initialStateBlocks";

export interface BlocksState {
  list: Block[];
}

const INITIALSTATE = 0;

export const getBlocks = createAsyncThunk(
  "blocks/getBlocks",
  async (url: string) => {
    const response = await fetch(`${url}/api/v1/blocks`);
    const responseJson = await response.json();
    return responseJson;
  }
);

export const blocksSlice = createSlice({
  name: "blocks",
  initialState: initialStateBlocks().blocks as BlocksState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlocks.pending, (state, action) => {
      state.list[INITIALSTATE].status = "loading";
    });
    builder.addCase(getBlocks.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
    builder.addCase(getBlocks.rejected, (state, action) => {
      state.list[INITIALSTATE].status = "error";
    });
  },
});

export const selectBlocks = (state: RootState) => state.blocks.list;
export default blocksSlice.reducer;
