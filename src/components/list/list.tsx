import React from "react";
import { ListProps } from "./list.types";
import ListItem from "../list-item/list-item";
import styles from "./list.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import ColorSelector from "../color-selector/color-selector";

const List: React.FC<ListProps> = ({ items, itemClickHandler, type }) => {
  const favoritePlayersBackgroundColor = useSelector(
    (state: RootState) => state.nba.favoritePlayersBackgroundColor
  );
  return (
    <div className={styles.list_container}>
      {type === "favorite" && <ColorSelector />}

      {items.length > 0 && (
        <ul
          className={styles.list}
          style={{
            backgroundColor:
              type === "favorite" ? favoritePlayersBackgroundColor : "#fff",
          }}
        >
          {items.map((item) => (
            <ListItem
              {...item}
              itemClickHandler={() => itemClickHandler(item.id)}
              type={type}
              key={item.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
