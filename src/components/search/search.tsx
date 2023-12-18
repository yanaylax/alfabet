import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust the path as needed
import { setSearch } from "../../redux/nbaSlice"; // Adjust the path as needed
import styles from "./search.module.css";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.nba.search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <input
      className={styles.search_input}
      type="text"
      placeholder="Search for a player..."
      value={search}
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
