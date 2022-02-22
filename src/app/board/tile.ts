export interface Tile {
    rail: boolean[],
    road: boolean[],
    //length = 4
    //0 = if up, rest clockwise
    id: string,
    x?: number,
    y?: number,
    isEmpty?: boolean
}

export function   connected(tile1: Tile, tile2: Tile): boolean {
  if(!(tile1.x && tile1.y && tile2.x && tile2.y)) return false;

  if (tile1.x == tile2.x) {
    if (tile1.y == tile2.y + 1 && ((tile1.road[0] && tile2.road[2]) || (tile1.rail[0] && tile2.rail[2]))) return true;
    if (tile1.y == tile2.y - 1 && ((tile1.road[2] && tile2.road[0]) || (tile1.rail[2] && tile2.rail[0]))) return true;
  }
  if (tile1.y == tile2.y) {
    if (tile1.x == tile2.x + 1 && ((tile1.road[1] && tile2.road[3]) || (tile1.rail[1] && tile2.rail[3]))) return true;
    if (tile1.x == tile2.x - 1 && ((tile1.road[3] && tile2.road[1]) || (tile1.rail[3] && tile2.rail[1]))) return true;
  }
  return false;
}


