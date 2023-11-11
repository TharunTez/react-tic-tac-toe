import { useState } from "react";

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    console.log(nextSquares);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // setHistory([...history, nextSquares]);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  };

  console.log(currentMove, history);

  const jumpTo = (move) => {
    setCurrentMove(move);
    // setXIsNext(move % 2 === 0);
    // if (move === 0) {
    //   const newHistoryArray = [Array(9).fill(null)];
    //   setHistory(newHistoryArray);
    //   setXIsNext(true);
    // } else {
    //   const newArray = history.slice(0, move + 1);
    //   setHistory(newArray);
    //   setXIsNext(!(move % 2));
    // }
  };

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = `Go to move ${move}`;
    } else {
      description = `Go to game start`;
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          handlePlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, handlePlay }) {
  const winner = calculateWinner(squares);
  let status = "";
  status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    handlePlay(nextSquares);
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  return (
    <>
      <p>{status}</p>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
