import { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../context/GameContext";

const defaultTurns = [
  { label: "easy", turns: Infinity, style: "btn-success-outline" },
  { label: "medium", turns: 100, style: "btn-warning-outline" },
  { label: "hard", turns: 50, style: "btn-danger-outline" },
];

export default function Home() {
  const { difficulty: stateDifficulty } = useContext(GameContext);
  const [difficulty, setDifficulty] = stateDifficulty;

  return (
    <div>
      <p>difficulty level</p>
      <div className="row flex-center">
        <input
          id="turns"
          type={"number"}
          name="turns"
          value={difficulty}
          placeholder="Turns number"
          onChange={(evt) => setDifficulty(evt.target.value)}
        />
        {defaultTurns.map(({ label, turns, style }) => (
          <button
            key={label}
            className={style}
            id={label}
            onClick={() => setDifficulty(turns)}
          >
            {label}
          </button>
        ))}
      </div>
      <Link to={"/game"}>
        <button className="btn-secondary-outline">Start</button>
      </Link>
      <Link to={"/history"}>
        <button className="btn-primary-outline">History</button>
      </Link>
    </div>
  );
}
