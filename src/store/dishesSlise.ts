import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDish, fetchDishes, removeDish } from "./dishesThunk";
import { IDish } from "../types";

export interface DishesState {
  items: IDish[];
  isFetching: boolean;
  isCreating: boolean;
  deleteLoading: false | string;
  cartDishes: { dish: IDish; amount: number }[];
}

export const initialState: DishesState = {
  items: [],
  isFetching: false,
  isCreating: false,
  deleteLoading: false,
  cartDishes: [],
};

export const DishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<IDish>) => {
      const indexDish = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id
      );

      if (indexDish === -1) {
        state.cartDishes.push({ dish, amount: 1 });
      } else {
        state.cartDishes[indexDish].amount++;
      }
    },
  },
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

export const { addDish } = DishesSlice.actions;

export const dishesReducer = DishesSlice.reducer;

export const selectDishes = (state: { dishes: DishesState }) =>
  state.dishes.items;
export const selectFetchLoading = (state: { dishes: DishesState }) =>
  state.dishes.isFetching;
export const selectDeleteLoading = (state: { dishes: DishesState }) =>
  state.dishes.deleteLoading;
export const selectCart = (state: { dishes: DishesState }) =>
  state.dishes.cartDishes;
