import { Player } from "../../app.types";

export interface NbaState {
  players: Player[];
  favoritePlayers: Player[];
  search: string;
  favoritePlayersBackgroundColor: string;
  loading?: boolean;
}
