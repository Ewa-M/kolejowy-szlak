import { Tile } from "../board/tile";

export function board2d(board: Tile[]) {
    let board2: Tile[][] = [];
    let emptyTile: Tile = {
      road: [false, false, false, false],
      rail: [false, false, false, false],
      id: "",
      x: -1,
      y: -1,
      isEmpty: true
    }
  
    for (let i = 0; i< 49; i++) {
      board2.push([]);
      for (let j = 0; j< 49; j++) board2[i].push(emptyTile);
    }
    for(let t of board) {
      if (t.x && t.y) board2[t.x][t.y] = t;
     }
  }

  