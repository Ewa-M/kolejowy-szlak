import { trigger } from '@angular/animations';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { connected, fitsOnBoard, fitsWithEntry, Intersections, sides, Tile, turn, validateBoard } from 'src/app/board/tile';
import { DiceService } from 'src/app/services/dice.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  dice: Tile[] = [];
  intersections: Tile[] = Intersections;
  placed: Tile[] = [];
  freeSpace: Tile[][] = [];
  round: number = 1;
  diceSubscription: Subscription;

  constructor(private diceService: DiceService) { 
    this.diceSubscription = this.diceService.makeBoard().subscribe(value => this.placed = value);
    this.dice = this.diceService.throwDice();
  }

  ngOnInit(): void {

    this.placed = []; 

    for(let i=0; i<7; i++) {
      for(let j=0; j<7; j++) {
        this.freeSpace.push(
          [{
            road: [false, false, false, false],
            rail: [false, false, false, false],
            id: i +""+ j,
            x: i,
            y: j,
            isEmpty: true
          }]
        );}}
  }


  drop(event: CdkDragDrop<Tile[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.previousContainer.data[event.previousIndex].x = event.container.data[event.currentIndex].x
      event.previousContainer.data[event.previousIndex].y = event.container.data[event.currentIndex].y
      event.container.data.unshift(event.previousContainer.data[event.previousIndex])
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  
  boardPredicate(drag: CdkDrag<Tile>, drop: CdkDropList<Tile[]>) {
    return drop.data[0].isEmpty == true
  }

  dicePredicate(drag: CdkDrag<Tile>, drop: CdkDropList<Tile[]>) {
    return !/intersection/.test(drag.data.id)
  }

  intersectionsPredicate(drag: CdkDrag<any>, drop: CdkDropList<Tile[]>) {
    return /intersection/.test(drag.data.id)
  }
    //////////////////////



  turnDice(tile:Tile) {
    let index = this.dice.findIndex(e => e.id == tile.id)
    let tile2: Tile = this.dice[index];
    if (tile2) {
      tile2 = turn(tile2);
    }
  }

  sidesDice(tile:Tile) {
    let index = this.dice.findIndex(e => e.id == tile.id)
    let tile2: Tile = this.dice[index];
    if (tile2) {
      tile2 = sides(tile2);
    }
  }

  turnBoard(tile:Tile) {
    let index = this.freeSpace.findIndex(e => e[0].id == tile.id)
    let tile2: Tile = this.freeSpace[index][0];
    if (tile2) {
      tile2 = turn(tile2);
    }
  }

  sidesBoard(tile:Tile) {
    let index = this.freeSpace.findIndex(e => e[0].id == tile.id)
    let tile2: Tile = this.freeSpace[index][0];
    if (tile2) {
      tile2 = sides(tile2);
    }
  }

  turnIntersection(tile:Tile) {
    let index = this.intersections.findIndex(e => e.id == tile.id)
    let tile2: Tile = this.intersections[index];
    if (tile2) {
      tile2 = turn(tile2);
    }
  }

  sidesIntersection(tile:Tile) {
    let index = this.intersections.findIndex(e => e.id == tile.id)
    let tile2: Tile = this.intersections[index];
    if (tile2) {
      tile2 = sides(tile2);
    }
  }

  validOnBoard(toCheck: Tile[]): Tile[] {
    let valid : Tile[] = [];
    let invalid: Tile[] = [];

      for(let tile of toCheck){
        if (fitsWithEntry(tile) || fitsOnBoard(tile, this.placed)) valid.push(tile)
        else invalid.push(tile)
      }

      return valid.concat(validateBoard(invalid, valid)); 
    }

  validCheck(toCheck: Tile[]): boolean {

      const newInterections = toCheck.filter(x => /intersection/.test(x.id))
      if (newInterections.length > 1) {

        for (let x of this.freeSpace) {
          if (/intersection/.test(x[0].id)) x.shift(); 
        }
        console.log(this.freeSpace)
        this.intersections.push(...newInterections)
        return false;
      }

      const valid = this.validOnBoard(toCheck);
      
      if  (toCheck.length == valid.length) {
        return true;
      } else {
        const invalid = toCheck.filter(x => !valid.includes(x))
        for (let t of this.freeSpace) {
          if (invalid.includes(t[0])) {
            this.dice.push(t[0])
            t.shift()
          }
        }
        return false;
      }
  }

  newRound() {
    let toCheck =  this.freeSpace
      .filter(x => x.length == 2)
      .map(x => x[0])
      .filter(x => !x.isEmpty);

    if (this.dice.length == 0 && this.validCheck(toCheck)) {
      this.freeSpace = this.freeSpace.filter(x => x.length == 1)
      this.dice = this.diceService.throwDice();
      this.diceService.finishRound(toCheck);
      this.round++;
    }
  }

}
