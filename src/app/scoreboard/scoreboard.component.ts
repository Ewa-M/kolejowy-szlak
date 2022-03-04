import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tile } from '../board/tile';
import { DiceService } from '../services/dice.service';
import { board2d, insideSquare, longestRail, longestRoad, mistakes } from './graph';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  boardSubscription: Subscription;
  board: Tile[][] = [[]];
  square: number = 0;
  road: number = 0;
  rail: number = 0;
  entries: number = 0;
  mistakes: number = 0;

  constructor(private boardService: DiceService) { 
    this.boardSubscription = this.boardService.makeBoard().subscribe(value => {
      this.board = board2d(value);
      this.square = insideSquare(this.board);
      this.road = longestRoad(this.board);
      this.rail = longestRail(this.board);
      this.mistakes = mistakes(this.board)
    });
  }

  ngOnInit(): void {
  }

}
