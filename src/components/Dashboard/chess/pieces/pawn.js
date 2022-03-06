import Piece from './piece.js';
import { isSameDiagonal } from '../helpers'

import useUserNameCurr from '../../../../useUserNameCurr.js';
import { useState } from 'react';

var num = 0;

async function loginUser(credentials) {
  try{
    const responsey = await axios({
      method: "POST",
      url:"/hostlogin",
      data:{
        email: credentials.username,
        password: credentials.password
      }
    }
    ).then((response)=>{
      return response
      // axios returns API response body in .data
    })
    return([{
        token: responsey.data.token,
      }, null]);
  }
  catch (error){
    return([{
      token: '',
    }, error.response.data]);
  }
}

class Pawn extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    this.initialPositions = {
      1: [48, 49, 50, 51, 52, 53, 54, 55],
      2: [8, 9, 10, 11, 12, 13, 14, 15]
    }
  }

  async buttonpress(srcc){
    // const { UserNameCurr, setUserNameCurr } = useUserNameCurr();
  
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'joverandout@gmail.com',  src: srcc })
    }
  
    let datum = await fetch('/task1', requestOptions)
    .then((data) => data.json());
    console.log(datum);
    return datum;
  }
  
  
  isMovePossible(src, dest, isDestEnemyOccupied) {
    var val;
    (async () => {
      const users = (await this.buttonpress(src));
    })()
    console.log(token);

    if (this.player === 1) {
      if ((dest === src - 8 && !isDestEnemyOccupied) || (dest === src - 16 && !isDestEnemyOccupied && this.initialPositions[1].indexOf(src) !== -1)) {
        return true;
      }
      else if (isDestEnemyOccupied && isSameDiagonal(src, dest) && (dest === src - 9 || dest === src - 7)) {
        return true;
      }
    }
    else if (this.player === 2) {

      if ((dest === src + 8 && !isDestEnemyOccupied) || (dest === src + 16 && !isDestEnemyOccupied && this.initialPositions[2].indexOf(src) !== -1)) {
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

export default Pawn
