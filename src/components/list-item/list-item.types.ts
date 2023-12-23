import { Player } from "../../app.types";

export type ItemType = "player" | "favorite";

export interface ListItemProps extends Player {
  itemClickHandler: () => void;
  type?: ItemType;
  favoritePlayersBackgroundColor: string;
}
