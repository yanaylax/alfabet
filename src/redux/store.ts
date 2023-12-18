import { configureStore } from "@reduxjs/toolkit";
import nbaReducer from "./nbaSlice";

export const store = configureStore({
  reducer: {
    nba: nbaReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "favoritePlayers",
    JSON.stringify(store.getState().nba.favoritePlayers)
  );
  localStorage.setItem(
    "favoritePlayersBackgroundColor",
    JSON.stringify(store.getState().nba.favoritePlayersBackgroundColor)
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
