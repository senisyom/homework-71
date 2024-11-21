import { createSlice } from "@reduxjs/toolkit";
import { createDish, fetchDishes, removeDish } from "./dishesThunk";
import { IDish } from "./types";

export interface DishesState {
  items: IDish[];
  isFetching: boolean;
  isCreating: boolean;
  deleteLoading: false | string;
}

export const initialState: DishesState = {
  items: [],
  isCreating: false,
  isFetching: false,
  deleteLoading: false,
};

export const DishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDish.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createDish.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.items = payload;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(removeDish.pending, (state, { meta: { arg: dishId } }) => {
        state.deleteLoading = dishId;
      })
      .addCase(removeDish.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(removeDish.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const dishesReducer = DishesSlice.reducer;

export const selectDishes = (state: { dishes: DishesState }) =>
  state.dishes.items;
export const selectFetchLoading = (state: { dishes: DishesState }) =>
  state.dishes.isFetching;
export const selectDeleteLoading = (state: { dishes: DishesState }) =>
  state.dishes.deleteLoading;
