import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './board/tile/tile.component';
import { BoardComponent } from './board/board/board.component';
import { FlattenPipe } from './pipes/flatten.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    BoardComponent,
    FlattenPipe,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
