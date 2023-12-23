import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  addPlayerToFavorites,
  removePlayerFromFavorites,
  synchronizeFavorites,
} from "../redux/slices/nbaSlice";
import { debounce } from "../utils/debounce";
import { fetchPlayers } from "../redux/actions/nbaActions";

const useNba = () => {
  const dispatch = useDispatch<AppDispatch>();
  const players = useSelector((state: RootState) => state.nba.players);
  const favoritePlayers = useSelector(
    (state: RootState) => state.nba.favoritePlayers
  );
  const search = useSelector((state: RootState) => state.nba.search);
  const isLoading = useSelector((state: RootState) => state.nba.loading);

  const debouncedFetchPlayers = useCallback(
    debounce((searchTerm: string) => {
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
