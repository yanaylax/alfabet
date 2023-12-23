import React from "react";
import classNames from "classnames/bind";

import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Trash } from "../../assets/trash.svg";
import { ListItemProps } from "./list-item.types";
import styles from "./list-item.module.css";

const cx = classNames.bind(styles);

const ListItem: React.FC<ListItemProps> = ({
  first_name,
  last_name,
  team,
  type,
  favorite,
  itemClickHandler,
  favoritePlayersBackgroundColor,
}) => {
  let className = cx({
    list_item: true,
    favorite: type === "favorite",
    favorite_player: favorite && type === "player",
  });

  return (
    <li
      style={{
        backgroundColor:
          type === "favorite" ? favoritePlayersBackgroundColor : "white",
      }}
      className={className}
    >
      <h3>
        {first_name} {last_name} <span>{team.abbreviation}</span>
      </h3>
      <button
        aria-label={
          type === "favorite" ? "remove from favorites" : "add to favorites"
        }
        onClick={itemClickHandler}
        className={styles.icon_container}
      >
        {type === "favorite" ? (
          <Trash className={styles.icon} />
        ) : (
          <Star className={`${styles.icon} ${favorite ? styles.fav : ""}`} />
        )}
      </button>
    </li>
  );
};

export default ListItem;
