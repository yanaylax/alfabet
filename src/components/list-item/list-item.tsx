import React from "react";
import styles from "./list-item.module.css";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Trash } from "../../assets/trash.svg";
import { ListItemProps } from "./list-item.types";

const ListItem: React.FC<ListItemProps> = ({
  first_name,
  last_name,
  team,
  type,
  favorite,
  itemClickHandler,
}) => {
  return (
    <li className={styles.list_item}>
      <h3>
        {first_name} {last_name} <span>{team.abbreviation}</span>
      </h3>
      <button onClick={itemClickHandler} className={styles.icon_container}>
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
