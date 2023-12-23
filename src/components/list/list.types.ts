import { Player } from "../../app.types";
import { ItemType } from "../list-item/list-item.types";

export interface ListProps {
  items: Player[];
  itemClickHandler: (playerId: number) => void;
  type: ItemType;
  isLoading?: boolean;
}
