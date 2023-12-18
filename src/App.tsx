import { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import List from "./components/list/list";
import SearchInput from "./components/search/search";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import {
  addPlayerToFavorites,
  removePlayerFromFavorites,
  fetchPlayers,
  synchronizeFavorites,
} from "./redux/nbaSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const players = useSelector((state: RootState) => state.nba.players);
  const favoritePlayers = useSelector(
    (state: RootState) => state.nba.favoritePlayers
  );
  const search = useSelector((state: RootState) => state.nba.search);
  const isLoading = useSelector((state: RootState) => state.nba.loading);

  const debouncedFetchPlayers = useCallback(
    debounce((searchTerm) => {
      dispatch(fetchPlayers(searchTerm));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetchPlayers(search);
  }, [search, debouncedFetchPlayers]);

  const handleAddPlayerToFavorites = (playerId: number) => {
    dispatch(addPlayerToFavorites(playerId));
  };

  const handleRemovePlayerFromFavorites = (playerId: number) => {
    dispatch(removePlayerFromFavorites(playerId));
  };

  useEffect(() => {
    dispatch(synchronizeFavorites());
  }, [players, favoritePlayers, dispatch]);

  return (
    <main className="app-container">
      <SearchInput />
      <div className="lists-container">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <List
            type="player"
            itemClickHandler={handleAddPlayerToFavorites}
            items={players}
          />
        )}
        <List
          type="favorite"
          itemClickHandler={handleRemovePlayerFromFavorites}
          items={favoritePlayers}
        />
      </div>
    </main>
  );
}

export default App;
