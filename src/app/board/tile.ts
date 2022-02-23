export interface Tile {
    rail: boolean[],
    road: boolean[],
    //length = 4
    //0 = if up, rest clockwise
    id: string,
    x?: number,
    y?: number,
    isEmpty?: boolean
    middle?: string
}

export const normalDie : Tile[] = [
  {road: [true, false, true, false], rail: [false, false, false, false], id: 'nd1'},
  {road: [false, true, true, false], rail: [false, false, false, false], id: 'nd2'},
  {road: [true, true, true, false], rail: [false, false, false, false], id: 'nd3'},
  {rail: [true, false, true, false], road: [false, false, false, false], id: 'nd4'},
  {rail: [false, true, true, false], road: [false, false, false, false], id: 'nd5'},
  {rail: [true, true, true, false], road: [false, false, false, false], id: 'nd6'},
]

export const specialDie: Tile[] = [
  {road: [true, false, false, false], rail: [false, true, false, false], id: 'sd1'},
  {road: [true, false, false, false], rail: [false, false, true, false], id: 'sd2'},
  {road: [true, false, true, false], rail: [false, true, false, true], id: 'sd3', middle: 'vroad'},
]

export const Intersections: Tile[] = [
  {road: [true, true, false, true], rail: [false, false, true, false], id: 'intersection1'},
  {road: [false, false, true, false], rail: [true, true, false, true], id: 'intersection2'},
  {road: [true, true, true, true], rail: [false, false, false, false], id: 'intersection3'},
  {road: [false, false, false, false], rail: [true, true, true, true], id: 'intersection4'},
  {road: [true, false, false, true], rail: [false, true, true, false], id: 'intersection5'},
  {road: [true, false, true, false], rail: [false, true, false, true], id: 'intersection6'},

]

export function connected(tile1: Tile, tile2: Tile): boolean {
  if(!(tile1.x && tile1.y && tile2.x && tile2.y)) return false;

  if (tile1.x == tile2.x) {
    if (tile1.y == tile2.y + 1 && ((tile1.road[0] && tile2.road[2]) || (tile1.rail[0] && tile2.rail[2]))) return true;
    if (tile1.y == tile2.y - 1 && ((tile1.road[2] && tile2.road[0]) || (tile1.rail[2] && tile2.rail[0]))) return true;
  }
  if (tile1.y == tile2.y) {
    if (tile1.x == tile2.x - 1 && ((tile1.road[1] && tile2.road[3]) || (tile1.rail[1] && tile2.rail[3]))) return true;
    if (tile1.x == tile2.x + 1 && ((tile1.road[3] && tile2.road[1]) || (tile1.rail[3] && tile2.rail[1]))) return true;
  }
  return false;
}

export function turn(tile: Tile) {
  let firstroad = tile.road[3]
      let firstrail = tile.rail[3]
      for(let i = 2; i>=0; i--) {
        tile.road[i+1] = tile.road[i];
        tile.rail[i+1] = tile.rail[i];
      }
      tile.road[0] = firstroad;
      tile.rail[0] = firstrail;
    return tile;
}

export function fitsOnBoard(tile: Tile, board: Tile[]): boolean {
  for (const b of board) {
    if (connected(tile, b)) return true;
  }
  return false;
}

export function fitsWithEntry(tile: Tile) {
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

export function validateBoard(tiles: Tile[], board: Tile[]): Tile[] {
  let valid : Tile[] = [];
  let invalid : Tile[] = [];
  
  for( let tile of tiles) {
    if (fitsOnBoard(tile, board)) valid.push(tile);
    else invalid.push(tile);
  }
  if (valid.length==0) return [];
  return valid.concat(validateBoard(invalid, valid));

}


