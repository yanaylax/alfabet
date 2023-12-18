import { HexColorPicker } from "react-colorful";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { changeBackgroundColor } from "../../redux/nbaSlice";
import "./color-selector.css";

const ColorSelector = () => {
  const dispatch = useDispatch();
  const color = useSelector(
    (state: RootState) => state.nba.favoritePlayersBackgroundColor
  );

  const setColor = (newColor: string) => {
    dispatch(changeBackgroundColor(newColor));
  };

  return (
    <HexColorPicker
      className="color-picker"
      color={color}
      onChange={setColor}
    />
  );
};

export default ColorSelector;
