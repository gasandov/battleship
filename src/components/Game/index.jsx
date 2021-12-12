import Board from "../Board";
import "./styles.css";

export default function Game() {
  return (
    <div className="game">
      <div className="heading">
        <h1>Battleship</h1>
      </div>
      <Board />
    </div>
  );
}
