import React from 'react';
import Square from './square';

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
export default Board;