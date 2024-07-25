import { Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Playing({ level }: { level: number }) {
  const maxTime = level * 60 * 60;
  const [answer, setAnswer] = useState<sudokuGrid | []>([]);
  const [sudokuGrid, setSudokuGrid] = useState<sudokuGrid | []>([]);

  const redirect = useNavigate();
  function enterNumber(i: number, j: number, value: string) {
    setSudokuGrid((vs: unknown) => {
      const newAr: sudokuGrid = JSON.parse(JSON.stringify(vs));
      newAr[i][j] = parseInt(value.slice(0, 1));
      return newAr;
    });
  }

  useEffect(() => {
    const puzzle = generateSudoku(level);
    setSudokuGrid(puzzle.grid);
    console.log(puzzle.answer);
    setAnswer(puzzle.answer);
  }, []);

  function submitPuzzle() {
    if (JSON.stringify(answer) == JSON.stringify(sudokuGrid)) {
      alert("Yeahh. You did well");
    } else {
      alert("its not right");
      redirect("/play", { replace: true });
    }
  }

  return (
    <div>
      <Box className="!mt-10 border border-solid border-gray-300 rounded-lg  max-w-2xl mx-auto p-10">
        <div className="border border-solid border-gray-400 max-w-min mx-auto mb-20">
          {sudokuGrid.map((row, i) => (
            <div className="flex" key={i}>
              {row.map((col, j) => (
                <div
                  key={j}
                  className="w-10 h-10 border border-solid border-gray-400 "
                >
                  <input
                    value={col || ""}
                    className="w-full h-full block text-center"
                    onChange={(e) => {
                      enterNumber(i, j, e?.target?.value);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="">
          <div className="w-20 h-20 flex mx-auto items-center justify-center flex-col rounded-full border border-solid border-gray-500">
            <p>Time</p>
            <Timer maxTime={maxTime} />
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup size="large" aria-label="Small button group">
              <Link to="/">
                <Button key="one" color="error">
                  Cancel
                </Button>
              </Link>
              <Button key="one" color="success" onClick={submitPuzzle}>
                Submit
              </Button>
            </ButtonGroup>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default Playing;

type sudokuGrid = [
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number]
];

const grid: sudokuGrid = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

function generateSudoku(level: number): {
  answer: sudokuGrid;
  grid: sudokuGrid;
} {
  shuffleRows(grid);
  transpose(grid);
  shuffleRows(grid);
  transpose(grid);

  const numToRemove = level * 10;

  const answer: sudokuGrid = JSON.parse(JSON.stringify(grid));

  removeCells(grid, numToRemove);

  return { answer: answer, grid };
}

function shuffleRows(grid: sudokuGrid) {
  for (let box = 0; box < 9; box += 3) {
    for (let i = 0; i < 3; i++) {
      const rowA = box + i;
      const rowB = box + Math.floor(Math.random() * 3);
      if (rowA !== rowB) {
        const temp = grid[rowA];
        grid[rowA] = grid[rowB];
        grid[rowB] = temp;
      }
    }
  }
}

function transpose(grid: sudokuGrid) {
  for (let i = 0; i < 9; i++) {
    for (let j = i + 1; j < 9; j++) {
      const temp = grid[i][j];
      grid[i][j] = grid[j][i];
      grid[j][i] = temp;
    }
  }
}

function removeCells(grid: sudokuGrid, numToRemove: number) {
  const cellsToRemove = new Set<string>();
  while (cellsToRemove.size < numToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    cellsToRemove.add(`${row},${col}`);
  }
  cellsToRemove.forEach((cell) => {
    const [row, col] = cell.split(",").map(Number);
    grid[row][col] = 0;
  });
}
