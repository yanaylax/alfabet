import { Player } from "../../App.types";

export type ItemType = "player" | "favorite";

export interface ListItemProps extends Player {
  itemClickHandler: () => void;
  type?: ItemType;
}
