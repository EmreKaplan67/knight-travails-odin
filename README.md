# Knight's Travails

A JavaScript implementation that finds the shortest path for a knight to move between any two squares on a chessboard using Breadth-First Search (BFS).

## Overview

This project solves the classic knight's shortest path problem on a chessboard. Given starting and ending coordinates, it calculates the minimum number of moves required for a knight to reach the destination, along with the exact path taken.

## Features

- **Breadth-First Search**: Guarantees the shortest path
- **Configurable Board Size**: Works with any square board (default 8x8)
- **Path Reconstruction**: Returns the complete path, not just move count
- **Boundary Validation**: Prevents moves outside the board
- **Error Handling**: Validates input positions
- **Multiple Interfaces**: Both class-based and function-based usage

## File Structure

```
KnightTravails/
├── knightTravails.js    # Main implementation
├── test.js             # Comprehensive test suite
└── README.md           # This documentation
```

## How It Works

### Knight Movement
A knight moves in an "L" shape - 2 squares in one direction and 1 square perpendicular:
```
Possible moves from [x,y]:
[x+2, y+1]  [x+2, y-1]  [x-2, y+1]  [x-2, y-1]
[x+1, y+2]  [x+1, y-2]  [x-1, y+2]  [x-1, y-2]
```

### BFS Algorithm
1. **Start** at the initial position
2. **Explore** all valid knight moves from current position
3. **Track** visited positions to avoid cycles
4. **Queue** new paths for exploration
5. **Stop** when destination is reached
6. **Return** the complete path

BFS ensures the first time we reach the destination, we've found the shortest path.

## Usage

### Basic Function Usage

```javascript
import { knightMoves } from "./knightTravails.js";

// Find shortest path from [0,0] to [1,2]
const path = knightMoves([0,0], [1,2]);
console.log(path); // [[0,0], [1,2]]

// Find path for longer distance
const longPath = knightMoves([0,0], [7,7]);
console.log(longPath); // [[0,0], [2,1], [4,2], [6,3], [4,4], [6,5], [7,7]]
```

### Class Usage

```javascript
import KnightTravails from "./knightTravails.js";

const game = new KnightTravails();

// Get path with pretty printing
game.printPath([3,3], [4,3]);
// Output:
// > knightMoves([3,3], [4,3])
// => You made it in 3 moves!  Here's your path:
//   [3,3]
//   [5,4]
//   [3,5]
//   [4,3]

// Different board sizes
const smallBoard = new KnightTravails(7);
const path7x7 = smallBoard.findPath([0,0], [6,6]);
```

## Examples

### Direct Move
```javascript
knightMoves([0,0], [1,2]) 
// Returns: [[0,0], [1,2]]
```

### Multiple Shortest Paths
```javascript
knightMoves([0,0], [3,3]) 
// May return: [[0,0], [2,1], [3,3]]
// Or: [[0,0], [1,2], [3,3]]
```

### Long Path
```javascript
knightMoves([0,0], [7,7]) 
// Returns: [[0,0], [2,1], [4,2], [6,3], [4,4], [6,5], [7,7]]
```

## API Reference

### Functions

#### `knightMoves(start, end)`
- **Parameters**: 
  - `start`: `[number, number]` - Starting coordinates
  - `end`: `[number, number]` - Ending coordinates
- **Returns**: `Array<[number, number]>` - Array of coordinates representing the path
- **Throws**: Error if coordinates are invalid

### Class Methods

#### `constructor(boardSize = 8)`
- Creates a new KnightTravails instance
- `boardSize`: Size of the square board (default: 8)

#### `findPath(start, end)`
- Same functionality as `knightMoves()` but as a class method

#### `printPath(start, end)`
- Prints the path in a formatted way and returns it

#### `getPossibleMoves(position)`
- Returns all valid knight moves from a given position

#### `isInBounds(x, y)`
- Checks if coordinates are within the board

#### `isValidPosition(position)`
- Validates if a position is properly formatted and in bounds

## Running Tests

```bash
node test.js
```

The test suite includes:
- All examples from the requirements
- Edge cases (same position, invalid positions)
- Different board sizes
- Performance testing
- Error handling verification

## Complexity Analysis

- **Time Complexity**: O(N²) where N is the board size
  - Each position is visited at most once
  - Each position has at most 8 possible moves

- **Space Complexity**: O(N²) for the visited set and queue

## Why BFS?

Breadth-First Search is the ideal algorithm for this problem because:

1. **Guarantees Shortest Path**: BFS explores all paths of length k before paths of length k+1
2. **Avoids Infinite Loops**: Tracks visited positions
3. **Complete Solution**: Will always find a path if one exists
4. **Efficient**: No need for heuristics or complex calculations

Alternative approaches like DFS would not guarantee the shortest path and could explore much longer paths unnecessarily.

## Real-World Applications

This algorithm demonstrates fundamental concepts used in:
- **GPS Navigation**: Finding shortest routes
- **Network Routing**: Optimizing data packet paths
- **Game AI**: Pathfinding for game characters
- **Puzzle Solving**: Finding optimal solutions to move-based puzzles

## Learning Objectives

This project covers:
- **Graph Theory**: Chessboard as a graph, positions as nodes
- **Search Algorithms**: Breadth-First Search implementation
- **Path Reconstruction**: Building complete paths from BFS traversal
- **Data Structures**: Queues, sets, and coordinate systems
- **Algorithm Design**: Efficient problem-solving techniques
