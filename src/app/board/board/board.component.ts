import { Component, OnInit } from '@angular/core';
import { Tile } from 'src/app/board/tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  tile: Tile = {
    road: [true, true, false, false],
    rail: [false, false, true, false]
  };
  board: Tile[][] = [];
  constructor() { }

  ngOnInit(): void {
    const emptyTile: Tile = {
      road: [false, false, false, false],
      rail: [false, false, false, false]
    };

    for(let i=0; i<7; i++) {
      this.board.push([])
      for(let j=0; j<7; j++) {
        this.board[i].push(emptyTile);
      }
    }

  }

  turn(tile:Tile) {
    let firstroad = tile.road[3]
    let firstrail = tile.rail[3]
    for(let i = 2; i>=0; i--) {
      tile.road[i+1] = tile.road[i];
      tile.rail[i+1] = tile.rail[i];
    }
    tile.road[0] = firstroad;
    tile.rail[0] = firstrail;
  }

}
