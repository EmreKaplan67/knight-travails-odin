# Knight's Travails

A JavaScript implementation that finds the shortest path for a knight on a chessboard using Breadth-First Search (BFS), with an interactive web visualization.
https://knighttravails2.netlify.app/

## Overview

This project solves the classic knight's shortest path problem. Given starting and ending coordinates, it calculates the minimum number of moves required for a knight to reach the destination, along with the exact path taken.

## Features

- **BFS Algorithm**: Guarantees the shortest path
- **Interactive Visualization**: Web-based chessboard with path animation
- **Configurable Board Size**: Works with any square board (default 8x8)
- **Path Reconstruction**: Returns the complete path
- **Animated Knight Movement**: Watch the knight traverse the calculated path
- **Responsive Design**: Works on desktop and mobile devices

## File Structure

```
KnightTravails/
├── knightTravails.js    # Main implementation
├── visualization.js     # Interactive web visualization
├── index.html          # Web interface
├── styles.css          # CSS styling
├── test.js             # Test suite
└── README.md           # Documentation
```

## Snapshot

![Knight Travails Visualization](./KnightTravails.png)

*Interactive chessboard showing the knight's shortest path from start (green) to end (red) position with intermediate moves highlighted in blue.*

## Usage

### JavaScript API

```javascript
import { knightMoves } from "./knightTravails.js";

// Find shortest path from [0,0] to [1,2]
const path = knightMoves([0,0], [1,2]);
console.log(path); // [[0,0], [1,2]]

// Longer path example
const longPath = knightMoves([0,0], [7,7]);
console.log(longPath); // [[0,0], [2,1], [4,2], [6,3], [4,4], [6,5], [7,7]]
```

### Web Visualization

1. Open `index.html` in a web browser
2. Click squares to select start (green) and end (red) positions
3. Click "Find Path" to see the shortest route highlighted in blue
4. Click "Animate Path" to watch the knight move along the path
5. Use "Clear Board" to reset and try new positions

**Visual Indicators:**
- 🟢 Green: Start position
- 🔴 Red: End position  
- 🔵 Blue: Path positions
- ♞ Knight: Shows current position

## How It Works

The chessboard is treated as a graph where each square is a node connected to its valid knight moves. BFS explores all positions level by level, guaranteeing the first time we reach the destination is via the shortest path.

### Knight Movement
A knight moves in an "L" shape: 2 squares in one direction and 1 square perpendicular.

## API Reference

### `knightMoves(start, end)`
- **Parameters**: `start` and `end` as `[x, y]` coordinates
- **Returns**: Array of coordinates representing the shortest path
- **Throws**: Error if coordinates are invalid

### Class Methods
- `constructor(boardSize = 8)`: Create instance with custom board size
- `findPath(start, end)`: Find shortest path
- `printPath(start, end)`: Print formatted path and return it

## Running Tests

```bash
node test.js
```

## Complexity

- **Time**: O(N²) where N is the board size
- **Space**: O(N²) for visited positions and queue

## Learning Objectives

- Graph theory and BFS implementation
- Path reconstruction algorithms
- ES6 modules and modern JavaScript
- DOM manipulation and event handling
- CSS animations and responsive design
- Interactive web development
