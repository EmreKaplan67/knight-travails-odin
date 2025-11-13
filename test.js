import knightTravails, { knightMoves, KnightTravails } from "./knightTravails.js";

console.log("=== Knight's Travails Test Suite ===\n");

// Test the examples from the requirements
console.log("1. Basic test - [0,0] to [1,2] (should be direct):");
knightTravails.printPath([0,0], [1,2]);

console.log("\n" + "=".repeat(50) + "\n");

console.log("2. Multiple shortest paths test - [0,0] to [3,3]:");
knightTravails.printPath([0,0], [3,3]);

console.log("\n" + "=".repeat(50) + "\n");

console.log("3. Reverse path test - [3,3] to [0,0]:");
knightTravails.printPath([3,3], [0,0]);

console.log("\n" + "=".repeat(50) + "\n");

console.log("4. Long path test - [0,0] to [7,7]:");
knightTravails.printPath([0,0], [7,7]);

console.log("\n" + "=".repeat(50) + "\n");

console.log("5. Example from requirements - [3,3] to [4,3]:");
knightTravails.printPath([3,3], [4,3]);

console.log("\n" + "=".repeat(50) + "\n");

// Additional test cases
console.log("6. Same position test - [2,2] to [2,2]:");
knightTravails.printPath([2,2], [2,2]);

console.log("\n" + "=".repeat(50) + "\n");

console.log("7. Edge case - corner to corner:");
knightTravails.printPath([0,0], [7,0]);

console.log("\n" + "=".repeat(50) + "\n");

console.log("8. Medium distance - [1,1] to [6,6]:");
knightTravails.printPath([1,1], [6,6]);

console.log("\n" + "=".repeat(50) + "\n");

// Test the convenience function
console.log("9. Testing convenience function:");
const path = knightMoves([0,0], [3,3]);
console.log("Direct function result:", path);

console.log("\n" + "=".repeat(50) + "\n");

// Test error handling
console.log("10. Testing error handling:");
try {
    knightTravails.printPath([0,0], [8,8]); // Invalid position
} catch (error) {
    console.log("Caught expected error:", error.message);
}

console.log("\n" + "=".repeat(50) + "\n");

// Test 7x7 board (as mentioned in requirements)
console.log("11. Testing 7x7 board:");
const smallBoard = new KnightTravails(7);
const path7x7 = smallBoard.findPath([0,0], [6,6]);
console.log("7x7 board path from [0,0] to [6,6]:");
console.log("Number of moves:", path7x7.length - 1);
for (const position of path7x7) {
    console.log(`  [${position}]`);
}

console.log("\n" + "=".repeat(50) + "\n");

