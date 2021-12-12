import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import {
  initializeShips,
  getShipCellsCount,
  initializeBoardGame,
  getDefaultShipsLength,
} from "../../utils/board";

export default function Board() {
  const boardSize = 10;

  const [boardGame, setBoardGame] = useState([]);
  const [shipCells, setShipCells] = useState(0);
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const initBoard = initializeBoardGame(boardSize);
    const initDefaultShips = getDefaultShipsLength();
    const initShipCells = getShipCellsCount(initDefaultShips);
    const { defaultShips, board } = initializeShips(
      initDefaultShips,
      initBoard
    );

    setBoardGame(board);
    setShips(defaultShips);
    setShipCells(initShipCells);
  }, []);

  const handleCellClicked = (cell) => {
    if (cell.isSelected) {
      return;
    }

    const board = JSON.parse(JSON.stringify(boardGame));

    board[cell.coordinates.x][cell.coordinates.y].isSelected = true;

    setBoardGame(board);
  };

  return (
    <div className="board">
      {boardGame.map((row, xIndex) => (
        <div key={`row-${xIndex}`}>
          {row.map((cell, yIndex) => (
            <Cell
              key={`cell-${xIndex}-${yIndex}`}
              onCellClicked={handleCellClicked}
              cell={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
