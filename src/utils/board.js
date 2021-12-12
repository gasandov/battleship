const rowLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const directionsEnum = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

const getDefaultShipsLength = () => [
  { length: 4 },
  { length: 3 },
  { length: 3 },
  { length: 2 },
  { length: 2 },
  { length: 2 },
  { length: 1 },
  { length: 1 },
  { length: 1 },
  { length: 1 },
];

const getShipCellsCount = (ships) =>
  ships.reduce((acc, curr) => acc + curr.length, 0);

const initializeBoardGame = (size = 10) => {
  const board = [];
  const cell = {
    isSelected: false,
    isShip: false,
  };

  for (let x = 0; x < size; x++) {
    board.push([]);
    for (let y = 0; y < size; y++) {
      board[x].push({
        ...cell,
        coordinates: { x, y },
        label: `${rowLetters[x]}${y + 1}`,
      });
    }
  }

  return board;
};

const initializeShips = (defaultShips, board) => {
  for (let i = 0; i < defaultShips.length; i++) {
    buildShip(defaultShips[i], board);
  }

  return { defaultShips, board };
};

const buildShip = (defaultShip, board) => {
  const direction = getDirection();
  const shipCoordinates = [];

  const startPoint = {
    isRevealed: false,
    x: getRandomNumber(0, 9),
    y: getRandomNumber(0, 9),
  };

  let currentPoint;

  for (let i = 1; i <= defaultShip.length; i++) {
    const nextPoint =
      i === 1 ? startPoint : getNextPoint(currentPoint, direction);

    if (!isValidCell(board, nextPoint)) {
      buildShip(defaultShip, board);
      return;
    }

    setIsShip(board, nextPoint);
    currentPoint = nextPoint;
    shipCoordinates.push(currentPoint);
  }

  defaultShip["coordinates"] = shipCoordinates;
};

const getNextPoint = (current, direction) => {
  const nextPoint = { isRevealed: false, x: 0, y: 0 };

  switch (direction) {
    case directionsEnum.LEFT:
      nextPoint.x = current.x;
      nextPoint.y = current.y - 1;
      break;
    case directionsEnum.RIGHT:
      nextPoint.x = current.x;
      nextPoint.y = current.y + 1;
      break;
    case directionsEnum.UP:
      nextPoint.x = current.x - 1;
      nextPoint.y = current.y;
      break;
    case directionsEnum.DOWN:
      nextPoint.x = current.x + 1;
      nextPoint.y = current.y;
      break;
    default:
      break;
  }

  return nextPoint;
};

const isValidCell = (board, cell) => {
  if (!board[cell.x] || !board[cell.x][cell.y]) {
    return false;
  }

  if (board[cell.x][cell.y].isShip) {
    return false;
  }

  return true;
};

const setIsShip = (board, cell) => {
  let selectedCell = Object.assign({}, board[cell.x][cell.y]);
  selectedCell.isShip = true;
  board[cell.x][cell.y] = selectedCell;
};

const getDirection = () => {
  const directions = [
    directionsEnum.LEFT,
    directionsEnum.RIGHT,
    directionsEnum.UP,
    directionsEnum.DOWN,
  ];
  const directionIndex = getRandomNumber(0, 3);

  return directions[directionIndex];
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export {
  getNextPoint,
  getDirection,
  getRandomNumber,
  initializeShips,
  getShipCellsCount,
  initializeBoardGame,
  getDefaultShipsLength,
};
