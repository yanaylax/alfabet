import { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  addPlayerToFavorites,
  removePlayerFromFavorites,
  fetchPlayers,
  synchronizeFavorites,
} from "../redux/nbaSlice";

const useNba = () => {
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

  useEffect(() => {
    dispatch(synchronizeFavorites());
  }, [players, favoritePlayers, dispatch]);

  const handleAddPlayerToFavorites = (playerId: number) => {
    dispatch(addPlayerToFavorites(playerId));
  };

  const handleRemovePlayerFromFavorites = (playerId: number) => {
    dispatch(removePlayerFromFavorites(playerId));
  };

  return {
    players,
    favoritePlayers,
    isLoading,
    handleAddPlayerToFavorites,
    handleRemovePlayerFromFavorites,
  };
};

export default useNba;
