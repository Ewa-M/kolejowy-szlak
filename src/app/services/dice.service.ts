import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { normalDie, specialDie, Tile } from '../board/tile';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  private placed: Tile[] = [];
  private round: number = 0;
  private subject = new Subject<any>();

  constructor() { }

  finishRound(tiles: Tile[]) {
    this.placed = this.placed.concat(tiles);
    this.subject.next(this.placed);
    this.round++;
    if (this.round >6) {alert("game finished"); return [];}
    return this.throwDice();  
  }

  makeBoard(): Observable<any> {
    return this.subject.asObservable();
  }

  throwDice(): Tile[] {
    let dice: Tile[] = []
    for (let i=0; i< 3; i++) {
     let tile = JSON.parse(JSON.stringify(normalDie[Math.floor(Math.random() * 6)]));
     tile.id = tile.id + this.round + i;
     dice.push(tile);
    }
    let tile = JSON.parse(JSON.stringify(specialDie[Math.floor(Math.random() * 3)]));
    tile.id = tile.id + this.round;
    dice.push(tile);
    return dice;
  }


}
