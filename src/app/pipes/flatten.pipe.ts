import { Pipe, PipeTransform } from '@angular/core';
import { Tile } from '../board/tile';

@Pipe({
  name: 'flatten'
})
export class FlattenPipe implements PipeTransform {

  transform(arr: Tile[][]): Tile[] {
    return arr.flat();
  }

}
