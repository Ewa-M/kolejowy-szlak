import { connected, connectedRail, connectedRoad, Tile } from "../board/tile";

interface Graph {
  edges: number[][],
  cycle?: boolean,
  distance?: number[],
  parent?: number[],
  visited?: boolean[]
}

export function board2d(board: Tile[]) : Tile[][] {
    let board2: Tile[][] = [];
    let emptyTile: Tile = {
      road: [false, false, false, false],
      rail: [false, false, false, false],
      id: "",
      x: -1,
      y: -1,
      isEmpty: true
    }
  
    for (let i = 0; i< 7; i++) {
      board2.push([]);
      for (let j = 0; j< 7; j++) board2[i].push(emptyTile);
    }

    for(let t of board) {
      if (t.x && t.y) board2[t.x][t.y] = t;
     }

    return board2;
  }

export function insideSquare(board: Tile[][]) {
  let points = 0;
    for(let x = 2; x < 5; x++) {
      for(let y = 2; y < 5; y++) {
          if(!board[x][y].isEmpty == true) points++;
      }
    }
    return points;
  }

function roadGraph(board: Tile[][]) : Graph { //przyjmuje board2d, zwraca graf
  let graph: Graph = {
    edges: [],
    cycle: false,
    distance: [],
    parent: [],
    visited: []
  };

  for (let i= 0; i< 49; i++) {
    graph.edges.push([]);
    graph.distance?.push(-1);
    graph.parent?.push(-1);
    graph.visited?.push(false);
    for (let j= 0; j< 49; j++) {
      graph.edges[i].push(0);
    }}

  for(let t of board.flat().filter(x => !(x.isEmpty == true))) {
    if (t.x > 0 && connectedRoad(t, board[t.x-1][t.y])) {
      console.log(t.x, t.y);
      graph.edges[t.x*7+t.y][t.x*7+t.y-7] = 1;
      graph.edges[t.x*7+t.y-7][t.x*7+t.y] = 1;
    }    
    if (t.x < 6 && connectedRoad(t, board[t.x+1][t.y])) {
      console.log(t.x, t.y);

      graph.edges[t.x*7+t.y][t.x*7+t.y+7] = 1;
      graph.edges[t.x*7+t.y+7][t.x*7+t.y] = 1;
    }
    if (t.y > 0 && connectedRoad(t, board[t.x][t.y-1])) {
      console.log(t.x, t.y);
      graph.edges[t.x*7+t.y][t.x*7+t.y-1] = 1;
      graph.edges[t.x*7+t.y-1][t.x*7+t.y] = 1;
    }    
    if (t.y < 6 && connectedRoad(t, board[t.x][t.y+1])) {
      console.log(t.x, t.y);
      graph.edges[t.x*7+t.y][t.x*7+t.y+1] = 1;
      graph.edges[t.x*7+t.y+1][t.x*7+t.y] = 1;
    }
  }

  return graph;
}

function railGraph(board: Tile[][]) : Graph { //przyjmuje board2d, zwraca graf
  let graph: Graph = {
    edges: [],
    cycle: false,
    distance: [],
    parent: [],
    visited: []
  };

  for (let i= 0; i< 49; i++) {
    graph.edges.push([]);
    graph.distance?.push(-1);
    graph.parent?.push(-1);
    graph.visited?.push(false);
    for (let j= 0; j< 49; j++) {
      graph.edges[i].push(0);
    }}

  for(let t of board.flat().filter(x => !(x.isEmpty == true))) {
    if (t.x > 0 && connectedRail(t, board[t.x-1][t.y])) {
      graph.edges[t.x*7+t.y][t.x*7+t.y-7] = 1;
      graph.edges[t.x*7+t.y-7][t.x*7+t.y] = 1;
    }    
    if (t.x < 6 && connectedRail(t, board[t.x+1][t.y])) {
      graph.edges[t.x*7+t.y][t.x*7+t.y+7] = 1;
      graph.edges[t.x*7+t.y+7][t.x*7+t.y] = 1;
    }
    if (t.y > 0 && connectedRail(t, board[t.x][t.y-1])) {
      graph.edges[t.x*7+t.y][t.x*7+t.y-1] = 1;
      graph.edges[t.x*7+t.y-1][t.x*7+t.y] = 1;
    }    
    if (t.y < 6 && connectedRail(t, board[t.x][t.y+1])) {
      graph.edges[t.x*7+t.y][t.x*7+t.y+1] = 1;
      graph.edges[t.x*7+t.y+1][t.x*7+t.y] = 1;
    }
  }

  return graph;
}

function BFS(G: Graph, s: number) {
  if (G.distance) G.distance[s] = 0;
  if (G.visited) G.visited[s] = true;
  let queue : number [] = [];
  queue.push(s);

  while (queue.length > 0) {
    let u = queue.shift();
    if (u == undefined) u = 0;
    for (let v = 0; v < 49; v++) {
        if (G.edges[u][v] > 0) {
          if (G.visited != undefined && G.visited[v] == false) {
              G.visited[v] = true;
              if (G.distance) G.distance[v] =  G.distance[u] + 1;
              if (G.parent) G.parent[v] = u;
              queue.push(v);
          } else {
            if (G.parent && G.parent[u] != v) G.cycle = true;
          }}}}
  return G;
}

export function longestRoad(board: Tile[][]) {
  let graph: Graph = roadGraph(board);
  let longest: number = 0;
  for (let i= 0; i< 49; i++) {
    graph = BFS(graph, i);
    if (graph.distance && Math.max(...graph.distance) > longest) longest =  Math.max(...graph.distance);
    graph.distance?.fill(-1);
    graph.parent?.fill(-1);
    graph.visited?.fill(false);
  }
  return longest +1;
}

export function longestRail(board: Tile[][]) {
  let graph: Graph = railGraph(board);
  let longest: number = 0;
  for (let i= 0; i< 49; i++) {
    graph = BFS(graph, i);
    if (graph.distance && Math.max(...graph.distance) > longest) longest =  Math.max(...graph.distance);
    graph.distance?.fill(-1);
    graph.parent?.fill(-1);
    graph.visited?.fill(false);
  }
  return longest +1;
}

export function mistakes(board: Tile[][]) {
  let mistake = 0;
  for (let t of board.flat().filter(x => !(x.isEmpty == true))) {
    if ((t.road[0] || t.rail[0]) && t.y > 0 && !connected(t, board[t.x][t.y-1])) {mistake++; console.log(t.x, t.y, "side: 0")}
    if ((t.road[1] || t.rail[1]) && t.x < 6 && !connected(t, board[t.x+1][t.y])) {mistake++; console.log(t.x, t.y, "side: 1")}
    if ((t.road[2] || t.rail[2]) && t.y < 6 && !connected(t, board[t.x][t.y+1])) {mistake++; console.log(t.x, t.y, "side: 2")}
    if ((t.road[3] || t.rail[3]) && t.x > 0 && !connected(t, board[t.x-1][t.y])) {mistake++; console.log(t.x, t.y, "side: 3")}
  }
  return mistake;
}

export function entries(board: Tile[][]) {}

