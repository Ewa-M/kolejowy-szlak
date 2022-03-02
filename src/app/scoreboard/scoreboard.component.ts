import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tile } from '../board/tile';
import { DiceService } from '../services/dice.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  boardSubscription: Subscription;
  board: Tile[] = [];
  square: number = 0;
  road: number = 0;
  rail: number = 0;
  entries: number = 0;
  mistakes: number = 0;

  constructor(private boardService: DiceService) { 
    this.boardSubscription = this.boardService.makeBoard().subscribe(value => {
      this.board = value;
      console.log(value)
       this.square = this.squarePoints(value);
       this.road = this.roadPoints(value);
    });
  }

  ngOnInit(): void {
  }

  squarePoints(board: Tile[]) :number {
    let points = 0;
    for (let t of board) { 
      if (t.x && t.x > 2 && t.x < 6 && t.y && t.y >2 && t.y < 6) points++;
    } 
    return points;
  }

  roadPoints(board: Tile[]):number  {
    //console.log(roadsGraph(board))
    return 0;
  }
  railPoints(board: Tile[]):number  {
    return 0;
  }
  entriesPoints(board: Tile[]):number  {
    return 0;
  }
  mistakesPoints(board: Tile[]):number  {
    return 0;
  }

}
