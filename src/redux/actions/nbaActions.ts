import { createAsyncThunk } from "@reduxjs/toolkit";
import { Player } from "../../app.types";

export const fetchPlayers = createAsyncThunk<Player[], string>(
  "nba/fetchPlayers",
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data as Player[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
