class KnightTravails {
    constructor(boardSize = 8) {
        this.boardSize = boardSize;
        this.knightMoves = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
    }

    findPath(start, end) {
        // Validate input positions
        if (!this.isValidPosition(start) || !this.isValidPosition(end)) {
            throw new Error("Invalid start or end position");
        }

        // If start equals end, return just the start position
        if (start[0] === end[0] && start[1] === end[1]) {
            return [start];
        }

        // BFS to find shortest path
        const path = this.bfs(start, end);
        return path;
    }

    bfs(start, end) {
        const queue = [[start]];
        const visited = new Set();
        visited.add(start.toString());

        while (queue.length > 0) {
            const currentPath = queue.shift();
            const currentPosition = currentPath[currentPath.length - 1];

            // Generate all possible knight moves from current position
            const possibleMoves = this.getPossibleMoves(currentPosition);

            for (const move of possibleMoves) {
                if (move[0] === end[0] && move[1] === end[1]) {
                    // Found the destination, return the complete path
                    return [...currentPath, move];
                }

                const moveKey = move.toString();
                if (!visited.has(moveKey)) {
                    visited.add(moveKey);
                    queue.push([...currentPath, move]);
                }
            }
        }

        // Should never reach here for a valid chessboard
        return [];
    }

    getPossibleMoves(position) {
        const moves = [];
        const [x, y] = position;

        for (const [dx, dy] of this.knightMoves) {
            const newX = x + dx;
            const newY = y + dy;

            if (this.isInBounds(newX, newY)) {
                moves.push([newX, newY]);
            }
        }

        return moves;
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
    }

    isValidPosition(position) {
        return Array.isArray(position) && 
               position.length === 2 && 
               typeof position[0] === 'number' && 
               typeof position[1] === 'number' &&
               this.isInBounds(position[0], position[1]);
    }

    printPath(start, end) {
        const path = this.findPath(start, end);
        const moves = path.length - 1;

        console.log(`> knightMoves([${start}], [${end}])`);
        console.log(`=> You made it in ${moves} move${moves !== 1 ? 's' : ''}!  Here's your path:`);
        
        for (const position of path) {
            console.log(`  [${position}]`);
        }

        return path;
    }
}

// Create a default instance and export the function
const knightTravails = new KnightTravails();

// Export both the class and a convenience function
export default knightTravails;
export { KnightTravails };

// Convenience function that matches the required interface
export function knightMoves(start, end) {
    return knightTravails.findPath(start, end);
}
