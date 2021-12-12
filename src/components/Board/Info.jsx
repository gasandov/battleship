import "./styles.css";

export default function Info({ ships }) {
  return (
    <div className="game-info">
      <p>Sink all ships by clicking on the grid</p>
      <div className="ship-info">
        {ships.map((ship) => (
          <div className="ship-item">
            {ship.coordinates.map((cell) => (
              <div
                className={`ship-block${cell.isRevealed ? "revealed" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
