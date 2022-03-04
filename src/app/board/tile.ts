export interface Tile {
    rail: boolean[],
    road: boolean[],
    //length = 4
    //0 = up, rest clockwise
    id: string,
    x: number,
    y: number,
    isEmpty?: boolean
    middle?: string
}

export const normalDie : Tile[] = [
  {road: [true, false, true, false], rail: [false, false, false, false], id: 'nd1', x: -1, y:-1, middle: 'vroad'},
  {road: [false, true, true, false], rail: [false, false, false, false], id: 'nd2', x: -1, y:-1},
  {road: [true, true, true, false], rail: [false, false, false, false], id: 'nd3', x: -1, y:-1},
  {rail: [true, false, true, false], road: [false, false, false, false], id: 'nd4', x: -1, y:-1, middle: 'vrail'},
  {rail: [false, true, true, false], road: [false, false, false, false], id: 'nd5', x: -1, y:-1},
  {rail: [true, true, true, false], road: [false, false, false, false], id: 'nd6', x: -1, y:-1},
]

export const specialDie: Tile[] = [
  {road: [true, false, false, false], rail: [false, true, false, false], id: 'sd1', x: -1, y:-1},
  {road: [true, false, false, false], rail: [false, false, true, false], id: 'sd2', x: -1, y:-1},
  {road: [true, false, true, false], rail: [false, true, false, true], id: 'sd3', middle: 'vroad', x: -1, y:-1},
]

export const Intersections: Tile[] = [
  {road: [true, true, false, true], rail: [false, false, true, false], id: 'intersection1', x: -1, y:-1},
  {road: [false, false, true, false], rail: [true, true, false, true], id: 'intersection2', x: -1, y:-1},
  {road: [true, true, true, true], rail: [false, false, false, false], id: 'intersection3', x: -1, y:-1},
  {road: [false, false, false, false], rail: [true, true, true, true], id: 'intersection4', x: -1, y:-1},
  {road: [true, false, false, true], rail: [false, true, true, false], id: 'intersection5', x: -1, y:-1},
  {road: [true, false, true, false], rail: [false, true, false, true], id: 'intersection6', x: -1, y:-1},

]

export function turn(tile: Tile) {
  let firstroad = tile.road[3]
      let firstrail = tile.rail[3]
      for(let i = 2; i>=0; i--) {
        tile.road[i+1] = tile.road[i];
        tile.rail[i+1] = tile.rail[i];
      }
      tile.road[0] = firstroad;
      tile.rail[0] = firstrail;
    if (tile.middle) {
      if (tile.middle[0] == 'h') tile.middle = tile.middle.replace(/h/, 'v')
      else tile.middle = tile.middle.replace(/v/, 'h')
    }
    return tile;
}

export function sides(tile: Tile) {
  let x = tile.road[1];
  tile.road[1] = tile.road[3];
  tile.road[3] = x;
  x = tile.rail[1];
  tile.rail[1] = tile.rail[3];
  tile.rail[3] = x;
  return tile;
}

export function connected(tile1: Tile, tile2: Tile): boolean {
  return connectedRail(tile1, tile2) || connectedRoad(tile1, tile2);
}

export function connectedRoad(tile1: Tile, tile2: Tile): boolean {
  if(tile1.isEmpty==true || tile2.isEmpty==true) return false;

  if (tile1.x == tile2.x) {
    if (tile1.y == tile2.y + 1 && tile1.road[0] && tile2.road[2]) return true;
    if (tile1.y == tile2.y - 1 && tile1.road[2] && tile2.road[0]) return true;
  }
  if (tile1.y == tile2.y) {
    if (tile1.x == tile2.x - 1 && tile1.road[1] && tile2.road[3]) return true;
    if (tile1.x == tile2.x + 1 && tile1.road[3] && tile2.road[1]) return true;
  }
  return false;
}

export function connectedRail(tile1: Tile, tile2: Tile): boolean {
  if(tile1.isEmpty==true || tile2.isEmpty==true) return false;


  if (tile1.x == tile2.x) {
    if (tile1.y == tile2.y + 1 && tile1.rail[0] && tile2.rail[2]) return true;
    if (tile1.y == tile2.y - 1 && tile1.rail[2] && tile2.rail[0]) return true;
  }
  if (tile1.y == tile2.y) {
    if (tile1.x == tile2.x - 1 && tile1.rail[1] && tile2.rail[3]) return true;
    if (tile1.x == tile2.x + 1 && tile1.rail[3] && tile2.rail[1]) return true;
  }
  return false;  
}



export function fitsOnBoard(tile: Tile, board: Tile[]): boolean {
  for (const b of board) {
    if (connected(tile, b)) return true;
  }
  return false;
}

export function fitsWithEntry(tile: Tile) {
  if (tile.x == 1 || tile.x == 5) {
    if(tile.y==0 && tile.road[0]) return true;
    if(tile.y==6 && tile.road[2]) return true;
  }

  if (tile.x == 3) {
    if(tile.y==0 && tile.rail[0]) return true;
    if(tile.y==6 && tile.rail[2]) return true;
  }

  if(tile.y == 1 || tile.y == 5) {
    if(tile.x==0 && tile.rail[3]) return true;
    if(tile.x==6 && tile.rail[1]) return true;
  }

  if(tile.y == 3) {
    if(tile.x==0 && tile.road[3]) return true;
    if(tile.x==6 && tile.road[1]) return true;
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
