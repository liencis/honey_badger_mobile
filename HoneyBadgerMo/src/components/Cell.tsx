import { useState, type Dispatch, type SetStateAction } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import type { CellInfo } from "../setup/grid";
import { checkWin, openAllCells, openCell } from "../setup/grid";

interface CellProps {
  cellInfo: CellInfo;
  setCell: Dispatch<SetStateAction<Map<number, CellInfo>>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  setGameWon: Dispatch<SetStateAction<boolean>>;
}

function Cell({ cellInfo, setCell, setGameOver, setGameWon }: CellProps) {
  const [buttonStyle, setButtonStyle] = useState(styles.cell);

  const handleMouseEnter = () => {
    setButtonStyle(styles.cellHover);
  };

  const handleMouseLeave = () => {
    setButtonStyle(styles.cell);
  };

  const handleClick = () => {
    if (cellInfo.open === false) {
      if (cellInfo.bee) {
        setCell((prevCells) => {
          const allOpenCells = openAllCells(prevCells);
          return new Map(allOpenCells);
        });
        setGameOver(true);
      } else if (cellInfo.value === 0) {
        setCell((prevCells) => {
          const newCells = new Map(prevCells);
          openCell(Number(cellInfo.number), newCells);
          checkWin(newCells) && setGameWon(true);
          return newCells;
        });
      } else {
        setCell((prevCells) => {
          const newCells = new Map(prevCells);
          newCells.set(Number(cellInfo.number), { ...cellInfo, open: true });
          checkWin(newCells) && setGameWon(true);
          return newCells;
        });
      }
    }
  };

  const handleLongPress = () => {
    setCell((prevCells) => {
      const newCells = new Map(prevCells);
      const currentCell = newCells.get(Number(cellInfo.number));
      if (currentCell) {
        newCells.set(Number(cellInfo.number), {
          ...currentCell,
          beeMarked: !currentCell.beeMarked,
        });
      }
      return newCells;
    });
  };

  return (
    <Pressable
      className="cell"
      id={`${cellInfo.number}`}
      onPress={handleClick}
      onLongPress={handleLongPress}
      onHoverIn={() => handleMouseEnter()}
      onHoverOut={() => handleMouseLeave()}
      style={buttonStyle}
    >
      {cellInfo.open ? (
        cellInfo.bee ? (
          <Image
            source={require("../../assets/images/cell_states/hexaBee.png")}
            id={`${cellInfo.number}`}
            className="hexaBee"
            alt="One honey Bee open"
            style={styles.img}
          />
        ) : cellInfo.value === 0 ? (
          <Image
            source={require("../../assets/images/cell_states/hexaHoney.png")}
            id={`${cellInfo.number}`}
            className="hexaHoney"
            alt="One honey cell open"
            style={styles.img}
          />
        ) : cellInfo.value === 1 ? (
          <Image
            source={require("../../assets/images/cell_states/hexa1.png")}
            id={`${cellInfo.number}`}
            className="hexa1"
            alt="One honey cell open"
            style={styles.img}
          />
        ) : cellInfo.value === 2 ? (
          <Image
            source={require("../../assets/images/cell_states/hexa2.png")}
            id={`${cellInfo.number}`}
            className="hexa2"
            alt="One honey cell open"
            style={styles.img}
          />
        ) : cellInfo.value === 3 ? (
          <Image
            source={require("../../assets/images/cell_states/hexa3.png")}
            id={`${cellInfo.number}`}
            className="hexa3"
            alt="One honey cell open"
            style={styles.img}
          />
        ) : cellInfo.value === 4 ? (
          <Image
            source={require("../../assets/images/cell_states/hexa4.png")}
            id={`${cellInfo.number}`}
            className="hexa4"
            alt="One honey cell open"
            style={styles.img}
          />
        ) : cellInfo.value === 5 ? (
          <Image
            source={require("../../assets/images/cell_states/hexa5.png")}
            id={`${cellInfo.number}`}
            className="hexa5"
            alt="One honey cell open"
            style={styles.img}
          />
        ) : cellInfo.value === 6 ? (
          <Image
            source={require("../../assets/images/cell_states/hexa6.png")}
            id={`${cellInfo.number}`}
            className="hexa6"
            alt="One honey cell open"
            style={styles.img}
          />
        ) : (
          <Image
            source={require("../../assets/images/cell_states/hexa.png")}
            id={`${cellInfo.number}`}
            className="hexa"
            alt="One honey cell closed"
            style={styles.img}
          />
        )
      ) : (
        // Not open cell
        <Image
          source={
            cellInfo.beeMarked
              ? require("../../assets/images/cell_states/beeMarked.png")
              : require("../../assets/images/cell_states/hexa.png")
          }
          id={`${cellInfo.number}`}
          className="hexa"
          alt="One honey cell closed"
          style={styles.img}
        />
      )}
    </Pressable>
  );
}

export default Cell;

const styles = StyleSheet.create({
  img: {
    width: 70,
    height: 60,
  },
  cell: {
    transitionDuration: "0.3s",
    transitionProperty: "transform",
    transform: [{ scale: 1.0 }],
    opacity: 1,
  },
  cellHover: {
    transitionDuration: "0.3s",
    transitionProperty: "transform",
    transform: [{ scale: 1.1 }],
    opacity: 1,
  },
});
