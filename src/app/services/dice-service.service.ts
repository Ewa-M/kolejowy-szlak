import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tile } from '../board/tile';

@Injectable({
  providedIn: 'root'
})
export class DiceServiceService {
  private placed: Tile[] = [];
  private subject = new Subject<any>();


  constructor() { }

  updatePlaced(tiles: Tile[]) {
    this.placed = this.placed.concat(tiles);
    this.subject.next(this.placed);
  }

  throwDice(): Tile[] {
    return [
      {
        road: [false, true, true, false],
        rail: [false, false, false, false],
        id: "a"
      },
      {
        road: [false, false, true, false],
        rail: [false, true, false, false],
        id: "b"
      },
      {
        road: [true, true, false, true],
        rail: [false, false, false, false],
        id: "c"
      },
      {
        road: [true, true, false, false],
        rail: [false, false, true, false],
        id: "d"
      }
    ]
  }

}
