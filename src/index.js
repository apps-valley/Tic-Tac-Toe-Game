import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={(e) => this.props.onClick(i, e)}
      />
    );
  }
  createBoard = () => {
    let board = []

    for (let i = 0; i < 3; i++) {
      let boardRow = []
      for (var j = 0; j < 3; j++) {
        if (i < 1) {
          boardRow.push(<span row={i} col={j} key={j}>{this.renderSquare(j)}</span>)
        } else {
          boardRow.push(<span row={i} col={j} key={j}>{this.renderSquare(j + 3 * i)}</span>)
        }
      }
      board.push(
        <div className="board-row" key={i}>{boardRow}</div>
      );
    }
    return board;
  }
  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      movesDetails: Array(9).fill([
        [null, null]
      ]),      
      stepNumber: 0,
      xIsNext: true,
    };
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const movesDetails = this.state.movesDetails;

    const moves = history.map((step, move) => {

      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
          <div className="move-details">
            row & column: {movesDetails[move]}
          </div>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="heading">
          <h1>TIC TAC TOE</h1>
          <p>powered by React</p>
        </div>
        <div className="game">
          <div className="game-status">
            <strong>{status}</strong>
          </div>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i, e) => this.handleClick(i, this.state.stepNumber, e)}
            />
          </div>
          <div className="game-info">
            <h4>Game map</h4>
            <ul className="game-details">
              {moves}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  handleClick(i, stepNumber, e) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const movesDetails = this.state.movesDetails.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    movesDetails.splice(stepNumber + 1, 1, [
      e.target.parentNode.getAttribute('row'),
      e.target.parentNode.getAttribute('col')
    ]);

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      movesDetails: movesDetails,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

