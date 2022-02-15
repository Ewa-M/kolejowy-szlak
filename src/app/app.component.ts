import { Component } from '@angular/core';
import { Tile } from './tile/tile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kolejowy-szlak';
  tile: Tile = {
    road: [true, true, true, true],
    rail: [false, false, false, false]
  };
}
