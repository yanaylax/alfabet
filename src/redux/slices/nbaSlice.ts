import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../app.types";
import { fetchPlayers } from "../actions/nbaActions";
import { NbaState } from "../types/NbaState";

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
      if (player && !state.favoritePlayers.some((p) => p.id === player.id)) {
        state.favoritePlayers.push(player);
      }
      state.players = state.players.map((p) =>
        p.id === action.payload ? { ...p, favorite: true } : p
      );
    },
    removePlayerFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoritePlayers = state.favoritePlayers.filter(
        (p) => p.id !== action.payload
      );
      state.players = state.players.map((p) =>
        p.id === action.payload ? { ...p, favorite: false } : p
      );
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
        state.loading = true;
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<Player[]>) => {
          state.players = action.payload.map((player) => ({
            ...player,
            favorite: state.favoritePlayers.some((fav) => fav.id === player.id),
          }));
          state.loading = false;
        }
      )
      .addCase(fetchPlayers.rejected, (state) => {
        state.loading = false;
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
