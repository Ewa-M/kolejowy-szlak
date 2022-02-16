import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './board/tile/tile.component';
import { BoardComponent } from './board/board/board.component';
import { FlattenPipe } from './pipes/flatten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    BoardComponent,
    FlattenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
