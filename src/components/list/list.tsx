import React from "react";
import { ListProps } from "./list.types";
import ListItem from "../list-item/list-item";
import styles from "./list.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import ColorSelector from "../color-selector/color-selector";
import Spinner from "../spinner/spinner";

const List: React.FC<ListProps> = ({
  items,
  itemClickHandler,
  type,
  isLoading,
}) => {
  const favoritePlayersBackgroundColor = useSelector(
    (state: RootState) => state.nba.favoritePlayersBackgroundColor
  );
  return (
    <div className={styles.list_container}>
      {type === "favorite" && <ColorSelector />}
      {isLoading ? (
        <Spinner size={50} />
      ) : items.length > 0 ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <ListItem
              {...item}
              favoritePlayersBackgroundColor={favoritePlayersBackgroundColor}
              itemClickHandler={() => itemClickHandler(item.id)}
              type={type}
              key={item.id}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default List;
