import { trigger } from '@angular/animations';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { connected, Tile } from 'src/app/board/tile';
import { INTERSECTIONS } from '../INTERSECTIONS';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() dice: Tile[] = [];
  intersections: Tile[] = INTERSECTIONS;
  placed: Tile[] = [];
  freeSpace: Tile[][] = [];

  constructor() { }

  ngOnInit(): void {

    this.placed = [];

    for(let i=0; i<7; i++) {
      for(let j=0; j<7; j++) {
        this.freeSpace.push(
          [{
            road: [false, false, false, false],
            rail: [false, false, false, false],
            id: i +""+ j,
            x: i+1,
            y: j+1,
            isEmpty: true
          }]
        );}}
  }


  drop(event: CdkDragDrop<Tile[]>) {
    console.log(event.container.data[event.currentIndex])
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.previousContainer.data[event.previousIndex].x = event.container.data[event.currentIndex].x
      event.previousContainer.data[event.previousIndex].y = event.container.data[event.currentIndex].y
      event.container.data.unshift(event.previousContainer.data[event.previousIndex])
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  fitsOnBoard(tile: Tile) {
    for (const t of this.placed) {
      if (connected(t, tile)) return true;
    }

    for (let t of this.freeSpace) {
      if (!t[0].isEmpty && connected(t[0], tile)) return true;
    }

    if (tile.x == 2 || tile.x == 6) {
      if(tile.y==1 && tile.road[0]) return true;
      if(tile.y==7 && tile.road[2]) return true;
    }

    if (tile.x == 4) {
      if(tile.y==1 && tile.rail[0]) return true;
      if(tile.y==7 && tile.rail[2]) return true;
    }

    if(tile.y == 2 || tile.y == 6) {
      if(tile.x==1 && tile.rail[3]) return true;
      if(tile.x==7 && tile.rail[1]) return true;
    }

    if(tile.y == 4) {
      if(tile.x==1 && tile.road[3]) return true;
      if(tile.x==7 && tile.road[1]) return true;
    }

   return false; 
  }

  
  boardPredicate(drag: CdkDrag<Tile>, drop: CdkDropList<Tile[]>) {
    return drop.data.length == 1
  }

  dicePredicate(drag: CdkDrag<Tile>, drop: CdkDropList<Tile[]>) {
    return !/intersection/.test(drag.data.id)
  }

  intersectionsPredicate(drag: CdkDrag<any>, drop: CdkDropList<Tile[]>) {
    return /intersection/.test(drag.data.id)
  }
    //////////////////////
  turn(tile:Tile) {
    console.log(tile)
    let index = this.dice.findIndex(e => e.id == tile.id)
    console.log(index)
    let tile2: Tile = this.dice[index];
    if (tile2) {
      let firstroad = tile2.road[3]
      let firstrail = tile2.rail[3]
      for(let i = 2; i>=0; i--) {
        tile2.road[i+1] = tile2.road[i];
        tile2.rail[i+1] = tile2.rail[i];
      }
      tile2.road[0] = firstroad;
      tile2.rail[0] = firstrail;
    }
  }

  newRound() {
    
  }

}
