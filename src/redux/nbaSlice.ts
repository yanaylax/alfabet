import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Player } from "../App.types";

export const fetchPlayers = createAsyncThunk<Player[], string>(
  "nba/fetchPlayers",
  async (searchQuery: string) => {
    const response = await axios.get(
      `https://www.balldontlie.io/api/v1/players?search=${searchQuery}`
    );
    return response.data.data;
  }
);

interface NbaState {
  players: Player[];
  favoritePlayers: Player[];
  search: string;
  favoritePlayersBackgroundColor: string;
  loading?: boolean;
}

const initialState: NbaState = {
  players: [],
  favoritePlayers: JSON.parse(localStorage.getItem("favoritePlayers") || "[]"),
  search: "",
  favoritePlayersBackgroundColor: JSON.parse(
    localStorage.getItem("favoritePlayersBackgroundColor") || '"#ffffff"'
  ),
  loading: false,
};

const nbaSlice = createSlice({
  name: "nba",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    changeBackgroundColor: (state, action: PayloadAction<string>) => {
      state.favoritePlayersBackgroundColor = action.payload;
    },
    addPlayerToFavorites: (state, action: PayloadAction<number>) => {
      const player = state.players.find((p) => p.id === action.payload);
      if (player) {
        if (!state.favoritePlayers.some((p) => p.id === player.id)) {
          state.favoritePlayers.push(player);
        }
        player.favorite = true;
      }
    },
    removePlayerFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoritePlayers = state.favoritePlayers.filter(
        (p) => p.id !== action.payload
      );
      const player = state.players.find((p) => p.id === action.payload);
      if (player) {
        player.favorite = false;
      }
    },
    synchronizeFavorites: (state) => {
      state.players.forEach((player) => {
        player.favorite = state.favoritePlayers.some(
          (fav) => fav.id === player.id
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true; // Indicate loading at the start of the request
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<Player[]>) => {
          state.players = action.payload.map((player) => ({
            ...player,
            favorite: state.favoritePlayers.some((fav) => fav.id === player.id),
          }));
          state.loading = false; // Set loading to false when the request is successful
        }
      )
      .addCase(fetchPlayers.rejected, (state) => {
        state.loading = false; // Set loading to false if the request fails
      });
  },
});

export const {
  setSearch,
  addPlayerToFavorites,
  removePlayerFromFavorites,
  changeBackgroundColor,
  synchronizeFavorites,
} = nbaSlice.actions;

export default nbaSlice.reducer;
