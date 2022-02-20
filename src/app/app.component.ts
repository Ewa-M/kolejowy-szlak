import { Component } from '@angular/core';
import { Tile } from './board/tile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kolejowy-szlak';
  toAdd = [
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
