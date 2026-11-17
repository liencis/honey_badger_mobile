import { memo, useState, type Dispatch, type SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import uuid from "react-native-uuid";
import type { CellInfo } from "../setup/grid";
import Cell from "./Cell";

interface CellsGridProps {
  cells: Map<number, CellInfo>;
  row: number;
  col: number;
  setCell: Dispatch<SetStateAction<Map<number, CellInfo>>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  setGameWon: Dispatch<SetStateAction<boolean>>;
  setNumBees: Dispatch<SetStateAction<number>>;
  setShowWarning: Dispatch<SetStateAction<boolean>>;
}

function CellsGrid({
  cells,
  row,
  col,
  setCell,
  setGameOver,
  setGameWon,
  setNumBees,
  setShowWarning,
}: CellsGridProps) {
  const rowArray = Array.from({ length: row }, (_, i) => i); // Array.from({length: row}, (_, i) => i + 1)
  const colArray = Array.from({ length: col }, (_, i) => i);
  let numCellsPlaced = 0;

  const [visible, setVisible] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [cellNumber, setCellNumber] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredUnmark, setIsHoveredUnmark] = useState(false);
  const CellInfoDefault: CellInfo = {
    number: 0,
    value: 0,
    bee: false,
    open: false,
    beeMarked: false,
    neighbors: [],
  };

  const cellSetup = (className: string) => {
    return colArray.map((c) => {
      if (className === "evenRow") {
        if (Number(c) % 2 === 0) {
          return (
            <View className="cellLi" key={uuid.v4()} style={styles.cellLi} />
          );
        } else {
          numCellsPlaced += 1;
          return (
            <View
              key={numCellsPlaced}
              className="cellLi"
              id={`${numCellsPlaced}`}
              style={styles.cellLi}
            >
              <Cell
                cellInfo={cells.get(numCellsPlaced) || CellInfoDefault}
                setCell={setCell}
                setGameOver={setGameOver}
                setGameWon={setGameWon}
              />
            </View>
          );
        }
      } else {
        if (Number(c) % 2 === 0) {
          numCellsPlaced += 1;
          return (
            <View
              key={numCellsPlaced}
              className="cellLi"
              id={`${numCellsPlaced}`}
              style={styles.cellLi}
            >
              <Cell
                cellInfo={cells.get(numCellsPlaced) || CellInfoDefault}
                setCell={setCell}
                setGameOver={setGameOver}
                setGameWon={setGameWon}
              />
            </View>
          );
        } else {
          return (
            <View className="cellLi" key={uuid.v4()} style={styles.cellLi} />
          );
        }
      }
    });
  };

  return (
    <View className="cellContainer" style={styles.cellContainer}>
      <>
        {rowArray.map((r) => {
          const className = Number(r) % 2 === 0 ? "evenRow" : "oddRow";
          return (
            <View
              key={Number(r)}
              className={className}
              style={className === "evenRow" ? styles.evenRow : styles.oddRow}
            >
              <>{cellSetup(className)}</>
            </View>
          );
        })}
      </>
    </View>
  );
}

export default memo(CellsGrid);

const styles = StyleSheet.create({
  cellContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  evenRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 0,
    marginEnd: 2,
    marginBottom: -29, // Adjust vertical spacing between cell rows
    marginStart: 2,
  },
  oddRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 0,
    marginEnd: 2,
    marginBottom: -29, // Adjust vertical spacing between cell rows
    marginStart: 2,
  },
  cellLi: {
    display: "flex",
    width: 54, // Adjust horizontal spacing between cells
  },
});
