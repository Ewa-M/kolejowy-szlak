import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs';
import { Tile } from '../tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
@Input() tile: Tile = {rail: [], road: []};
@Output() turnTile: EventEmitter<Tile> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
  }

  turn(){
    this.turnTile.emit(this.tile)
  }
}
