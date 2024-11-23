import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { ApiDish, ApiDishes, IDish } from "../types";

export const createDish = createAsyncThunk<void, ApiDish>(
  "dishes/create",
  async (apiDish) => {
    await axiosApi.post("/dishes.json", apiDish);
  }
);

export const updateDish = createAsyncThunk<void, IDish>(
  "dishes/update",
  async (dish) => {
    const { id, ...updatedDishData } = dish;
    await axiosApi.put(`/dishes/${id}.json`, updatedDishData);
  }
);

export const fetchDishes = createAsyncThunk<IDish[]>(
  "dishes/fetch",
  async () => {
    const { data: dishes } = await axiosApi.get<ApiDishes | null>(
      "/dishes.json"
    );
    if (dishes === null) return [];
    return Object.keys(dishes).map((id) => ({
      ...dishes[id],
      id,
    }));
  }
);

export const removeDish = createAsyncThunk<void, string>(
  "dishes/delete",
  async (dishId) => {
    await axiosApi.delete(`/dishes/${dishId}.json`);
  }
);
