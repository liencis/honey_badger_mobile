export type CellInfo = {
  number: number;
  value: number;
  neighbors: number[];
  open: boolean;
  bee: boolean;
  beeMarked: boolean;
};

export const Level = {
  easy: 8,
  normal: 6,
  hard: 5,
  bad: 4,
} as const;

function createGrid(rows: number, cols: number): [number[][], number] {
  let grid: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0),
  );
  let num: number = 1;

  grid = grid.map((row, i) => {
    return row.map((cell, j) => {
      if (i % 2 === 0) {
        if (j % 2 !== 0) {
          return num++;
        }
      } else {
        if (j % 2 === 0) {
          return num++;
        }
      }
      return cell;
    });
  });

  return [grid, num - 1];
}

function getEdges(grid: number[][]): Map<number, CellInfo> {
  const edges = new Map<number, CellInfo>();

  for (let r_idx = 0; r_idx < grid.length; r_idx++) {
    let idx = r_idx % 2 === 0 ? 1 : 0; // Start from 1 for even rows, 0 for odd rows
    for (let c_idx = idx; c_idx < grid[r_idx].length; c_idx += 2) {
      if (grid[r_idx][c_idx] !== 0) {
        const neighbors: number[] = [];
        const neighborIdxs = [
          [r_idx - 2, c_idx], // Up
          [r_idx + 2, c_idx], // Down
          [r_idx - 1, c_idx - 1], // Left Diagonal Up
          [r_idx - 1, c_idx + 1], // Right Diagonal Up
          [r_idx + 1, c_idx - 1], // Left Diagonal Down
          [r_idx + 1, c_idx + 1], // Right Diagonal Down
        ];

        for (const [nr, nc] of neighborIdxs) {
          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[nr].length) {
            neighbors.push(grid[nr][nc]);
          }
        }

        edges.set(grid[r_idx][c_idx], {
          number: grid[r_idx][c_idx],
          value: 0,
          neighbors,
          open: false,
          bee: false,
          beeMarked: false,
        });
      }
    }
  }

  return edges;
}

function asignBees(
  edges: Map<number, CellInfo>,
  numberOfCells: number,
  level: (typeof Level)[keyof typeof Level] = Level.easy,
): number[] {
  // to prevent infinite loop we calculate number of bees to avaid bad(to big) number pased.
  let numBees = Math.ceil(edges.size / level);
  let beesList: number[] = [];
  while (numBees > 0) {
    let randomCellNumber = Math.floor(Math.random() * numberOfCells) + 1;
    const cellInfo = edges.get(randomCellNumber);
    if (cellInfo && !cellInfo.bee) {
      cellInfo.bee = true;
      beesList.push(randomCellNumber);
      numBees--;
    }
  }
  return beesList;
}

function asignCellValue(
  edges: Map<number, CellInfo>,
  beePlacement: number[],
): void {
  for (const cellNumber of beePlacement) {
    const cellInfo = edges.get(cellNumber);
    if (cellInfo) {
      for (const neighbor of cellInfo.neighbors) {
        const neighborInfo = edges.get(neighbor);
        if (neighborInfo && !neighborInfo.bee) {
          neighborInfo.value += 1;
        }
      }
    }
  }
}

export function openCell(
  cellNumber: number,
  edges: Map<number, CellInfo>,
): Map<number, CellInfo> {
  const cellInfo = edges.get(cellNumber);
  if (cellInfo) {
    cellInfo.open = true; /// ? this might need to be set at jsx level instead of here, but for now we can set it here
    if (cellInfo.value === 0 && !cellInfo.bee) {
      for (const neighbor of cellInfo.neighbors) {
        const neighborInfo = edges.get(neighbor);
        if (neighborInfo && !neighborInfo.open) {
          openCell(neighbor, edges);
        }
      }
    }
  }
  return edges;
}

export function openAllCells(
  edges: Map<number, CellInfo>,
): Map<number, CellInfo> {
  for (const cellInfo of edges.values()) {
    cellInfo.open = true;
  }
  return edges;
}

export function gameSetup(
  row: number,
  col: number,
  level: (typeof Level)[keyof typeof Level],
): [Map<number, CellInfo>, number[]] {
  const [grid, numberOfCells] = createGrid(row, col);
  const edges = getEdges(grid);
  const beePlacement = asignBees(edges, numberOfCells, level);
  asignCellValue(edges, beePlacement);

  return [edges, beePlacement];
}

export function checkWin(edges: Map<number, CellInfo>): boolean {
  for (const cellInfo of edges.values()) {
    if (!cellInfo.bee && !cellInfo.open) {
      return false; // If there's a non-bee cell that is not open, the game is not won
    }
  }
  return true; // All non-bee cells are open, the game is won
}
