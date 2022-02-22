import { Tile } from "./tile";

export const INTERSECTIONS: Tile[] = [
    {road: [true, true, false, true], rail: [false, false, true, false], id: 'intersection1'},
    {road: [false, false, true, false], rail: [true, true, false, true], id: 'intersection2'},
    {road: [true, true, true, true], rail: [false, false, false, false], id: 'intersection3'},
    {road: [false, false, false, false], rail: [true, true, true, true], id: 'intersection4'},
    {road: [true, false, false, true], rail: [false, true, true, false], id: 'intersection5'},
    {road: [true, false, true, false], rail: [false, true, false, true], id: 'intersection6'},

]