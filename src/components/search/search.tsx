import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSearch } from "../../redux/slices/nbaSlice";
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
      name="search"
      type="text"
      placeholder="Search for a player..."
      value={search}
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
