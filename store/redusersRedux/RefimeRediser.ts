"use client";
import { RegimeModel } from "@/models/RegimeModel";
import RegimeService from "@/services/regimeSetvice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface RegimeState {
  regimes: RegimeModel[];
  isLoadingR: boolean;
  error: any;
  regimeWithDay: RegimeModel;
}

const initalState: RegimeState = {
  regimes: [],
  isLoadingR: false,
  error: "",
  regimeWithDay: {} as RegimeModel,
};
export const getAllRegimes = createAsyncThunk(
  "regimes/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const response = await RegimeService.getAllRegime();
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getRegimeWithDay = createAsyncThunk(
  "getoneregime/fetch",
  async function ({ id }: { id: number }, { rejectWithValue }) {
    try {
      const response = RegimeService.getOneRegimeWithDay(id);
      const data = await response;
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const changeRegime = createAsyncThunk(
  "changeRegime/fetch",
  async function (
    {
      id,
      dataTime,
      description,
      isActive,
      nutrition,
    }: {
      id: number;
      dataTime: string;
      description: string;
      isActive: boolean;
      nutrition: string;
    },
    { rejectWithValue }
  ) {
    try {
      const response = await RegimeService.changeRegime(
        id,
        dataTime,
        description,
        isActive,
        nutrition
      );
      getAllRegimes();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const regimeSlice = createSlice({
  name: "regimes",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllRegimes.pending, (state) => {
        state.isLoadingR = true;
        state.error = "";
      })
      .addCase(getAllRegimes.fulfilled, (state, action) => {
        state.isLoadingR = false;
        state.error = "";
        state.regimes = action.payload;
      })
      .addCase(getAllRegimes.rejected, (state, action) => {
        state.isLoadingR = false;
        state.error = action.payload;
      })
      .addCase(getRegimeWithDay.pending, (state) => {
        state.isLoadingR = true;
        state.error = "";
      })
      .addCase(getRegimeWithDay.fulfilled, (state, action) => {
        state.isLoadingR = false;
        state.error = "";
        state.regimeWithDay = action.payload;
      })
      .addCase(getRegimeWithDay.rejected, (state, action) => {
        state.isLoadingR = false;
        state.error = action.payload;
      })
      .addCase(changeRegime.pending, (state) => {
        state.isLoadingR = true;
        state.error = "";
      })
      .addCase(changeRegime.fulfilled, (state, action) => {
        state.isLoadingR = false;
        state.error = "";
      })
      .addCase(changeRegime.rejected, (state, action) => {
        state.isLoadingR = false;
        state.error = action.payload;
      }),
});

export default regimeSlice.reducer;
