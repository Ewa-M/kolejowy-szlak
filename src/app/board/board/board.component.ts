import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Tile } from 'src/app/board/tile';
import { INTERSECTIONS } from '../INTERSECTIONS';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() toAdd: Tile[] = [];
  intersections: Tile[] = INTERSECTIONS;
  placed: Tile[] = [];
  freeSpace: Tile[][] = [];

  constructor() { }

  ngOnInit(): void {

    
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
        );
      }
    }

  }
  
  drop(event: CdkDragDrop<Tile[]>) {
    console.log(event.previousContainer.data[event.previousIndex])
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

    //////////////////////
  turn(tile:Tile) {
    console.log(tile)
    let index = this.toAdd.findIndex(e => e.id == tile.id)
    console.log(index)
    let tile2: Tile = this.toAdd[index];
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

}
