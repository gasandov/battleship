import React, { useEffect, useState, useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Cell from "./Cell";
import Info from "./Info";
import {
  initializeShips,
  getShipCellsCount,
  initializeBoardGame,
  getDefaultShipsLength,
} from "../../utils/board";

export default function Board() {
  const boardSize = 10;

  const { difficulty } = useContext(GameContext);
  const [turns] = difficulty;

  const [gameState, setGameState] = useState({
    gameOver: false,
    revealedShips: 0,
    shipCells: 0,
    turnsRemaining: turns,
  });
  const [boardGame, setBoardGame] = useState([]);
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
    setGameState((prevGameState) => ({
      ...prevGameState,
      shipCells: initShipCells,
    }));
  }, []);

  const handleCellClicked = (cell) => {
    const currentTurns = gameState.turnsRemaining - 1;
    const revealed = gameState.revealedShips + 1;

    setGameState((prevState) => ({
      ...prevState,
      turnsRemaining: currentTurns,
    }));

    if (cell.isSelected) {
      return;
    }

    const boardCopy = JSON.parse(JSON.stringify(boardGame));
    const shipsCopy = ships.slice();

    boardCopy[cell.coordinates.x][cell.coordinates.y].isSelected = true;

    if (cell.isShip) {
      for (let x = 0; x < shipsCopy.length; x++) {
        const { coordinates } = shipsCopy[x];
        for (let y = 0; y < coordinates.length; y++) {
          const shipCell = coordinates[y];

          if (
            shipCell.x === cell.coordinates.x &&
            shipCell.y === cell.coordinates.y
          ) {
            shipsCopy[x].coordinates[y].isRevealed = true;

            setGameState((prevState) => ({
              ...prevState,
              revealedShips: revealed,
            }));

            break;
          }
        }
      }
    }

    setBoardGame(boardCopy);
    setShips(shipsCopy);

    if (currentTurns === 0 || revealed === gameState.shipCells) {
      setGameState((prevState) => ({
        ...prevState,
        gameOver: true,
      }));
    }
  };

  return (
    <div className="board">
      {gameState.gameOver && <p>Game Over</p>}
      {!gameState.gameOver && (
        <>
          <div>
            <div>
              Turns remaining:{" "}
              {isFinite(gameState.turnsRemaining)
                ? gameState.turnsRemaining
                : "Infinity"}
            </div>
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
          <Info ships={ships} />
        </>
      )}
    </div>
  );
}
