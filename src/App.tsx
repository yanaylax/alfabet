import List from "./components/list/list";
import SearchInput from "./components/search/search";
import useNba from "./hooks/useNba";
import "./App.css";

function App() {
  const {
    players,
    favoritePlayers,
    isLoading,
    handleAddPlayerToFavorites,
    handleRemovePlayerFromFavorites,
  } = useNba();

  return (
    <main className="app-container">
      <SearchInput />
      <div className="lists-container">
        {isLoading ? (
          <p>Loading...</p>
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
