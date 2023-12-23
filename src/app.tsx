import List from "./components/list/list";
import SearchInput from "./components/search/search";
import useNba from "./hooks/useNba";
import styles from "./styles/app.module.css";

function App() {
  const {
    players,
    favoritePlayers,
    isLoading,
    handleAddPlayerToFavorites,
    handleRemovePlayerFromFavorites,
  } = useNba();

  return (
    <main className={styles.app_container}>
      <SearchInput />
      <List
        isLoading={isLoading}
        type="player"
        itemClickHandler={handleAddPlayerToFavorites}
        items={players}
      />
      <List
        type="favorite"
        itemClickHandler={handleRemovePlayerFromFavorites}
        items={favoritePlayers}
      />
    </main>
  );
}

export default App;
