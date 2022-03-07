import Piece from './piece.js';
import { isSameRow, isSameColumn, isSameDiagonal, isPathClean } from '../helpers'

export default class Queen extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"));
  }

  async isMovePossible(src, dest, squares, username) {
    let path = await this.getSrcToDestPath(src, dest, username);
    return isPathClean(path, squares) && (isSameDiagonal(src, dest) || isSameRow(src, dest) || isSameColumn(src, dest));
  }

  async moveQueen(start, stop, increment, username) {
    console.log("start");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, start:start, stop:stop, inc:increment})
    }
    const response = await fetch('/task3', requestOptions)
    const data = await response.json();
    console.log(data);
    return data.queenlist;
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src  
   * @param  {num} dest 
   * @return {[array]}      
   */
  async getSrcToDestPath(src, dest, username) {
    let path = [], pathStart, pathEnd, incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    }
    else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    }
    else if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    }
    else if (Math.abs(src - dest) % 7 === 0) {
      incrementBy = 7;
      pathStart += 7;
    }
    else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    
    let srcc = await this.moveQueen(pathStart, pathEnd, incrementBy, username);
    console.log(srcc)
    console.log(path)

    return srcc;
  }
}