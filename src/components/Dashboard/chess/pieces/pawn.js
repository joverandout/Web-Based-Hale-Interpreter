import Piece from './piece.js';
import { isSameDiagonal } from '../helpers'

import useUserNameCurr from '../../../../useUserNameCurr.js';

export default class Pawn extends Piece { 
  constructor(player) {
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    this.initialPositions = {
      1: [48, 49, 50, 51, 52, 53, 54, 55],
      2: [8, 9, 10, 11, 12, 13, 14, 15]
    }
  }

  async movepawn(srcc, username) {
    console.log("start");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, src: srcc })
    }
    const response = await fetch('/task1', requestOptions)
    const data = await response.json();
    // console.log(useUserNameCurr());
    return data.srcminuseight;
  }

  async isMovePossible(src, dest, isDestEnemyOccupied, username) {
    let srcc = await this.movepawn(src, username);
    console.log(srcc)
    if (this.player === 1) {
      if ((dest === src - 8 && !isDestEnemyOccupied) || (dest === src - 16 && !isDestEnemyOccupied && this.initialPositions[1].indexOf(src) !== -1)) {
        return true;
      }
      else if (isDestEnemyOccupied && isSameDiagonal(src, dest) && (dest === src - 9 || dest === src - 7)) {
        return true;
      }
    }
    else if (this.player === 2) {
      if ((dest === srcc && !isDestEnemyOccupied) || (dest === src + 16 && !isDestEnemyOccupied && this.initialPositions[2].indexOf(src) !== -1)) {
        return true;
      }
      else if (isDestEnemyOccupied && isSameDiagonal(src, dest) && (dest === src + 9 || dest === src + 7)) {
        return true;
      }
    }
    return false;
  }

  /**
   * returns array of one if pawn moves two steps, else returns empty array  
   * @param  {[type]} src  [description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  getSrcToDestPath(src, dest) {
    if (dest === src - 16) {
      return [src - 8];
    }
    else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  }
}
