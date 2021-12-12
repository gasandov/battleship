import React, { useEffect, useState, useContext } from "react";
import { GameContext } from "../../context/GameContext";
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

  const { difficulty } = useContext(GameContext);
  const [turns, setTurns] = difficulty;

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
    setTurns((currentTurns) => currentTurns - 1);
  };

  return (
    <div className="board">
      <div>Turns remaining: {isFinite(turns) ? turns : "Infinity"}</div>
      {turns > 0 ? (
        boardGame.map((row, xIndex) => (
          <div key={`row-${xIndex}`}>
            {row.map((cell, yIndex) => (
              <Cell
                key={`cell-${xIndex}-${yIndex}`}
                onCellClicked={handleCellClicked}
                cell={cell}
              />
            ))}
          </div>
        ))
      ) : (
        <p>Game Over</p>
      )}
    </div>
  );
}
