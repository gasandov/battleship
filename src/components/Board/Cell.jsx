import "./styles.css";

export default function Cell({ onCellClicked, cell }) {
  const { label, isSelected, isShip } = cell;

  const classnames =
    isShip && isSelected ? "ship" : isSelected ? "selected" : "";

  return (
    <div className={`cell ${classnames}`} onClick={() => onCellClicked(cell)}>
      {label}
    </div>
  );
}
