import Screen from "./screen.js";


const screen = new Screen();

// Test Case 1: Render after valid setup
console.log("Test Case 1: Render after valid setup");
screen.setup(5, 3);
//screen.render();

// Test Case 2: Render without setup
console.log("\nTest Case 2: Render without setup");
const uninitializedScreen = new Screen();
//uninitializedScreen.render();

// Test Case 3: Render with large dimensions
console.log("\nTest Case 3: Render with large dimensions");
screen.setup(10, 5);
//screen.render();
