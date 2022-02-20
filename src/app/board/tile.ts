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
