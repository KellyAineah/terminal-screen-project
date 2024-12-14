import readline from "readline";
import Screen from "./screen.js";

const screen = new Screen();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the Screen Renderer");
console.log(`Commands:
  setup <width> <height> <color> - Setup screen dimensions and color mode.
  draw <x> <y> <char> [color] - Draw a character.
  line <x1> <y1> <x2> <y2> <char> [color] - Draw a line.
  text <x> <y> <text> [color] - Render text.
  render - Display the screen.
  clear - Clear the screen.
  moveCursor <x> <y> - Move the cursor to specified coordinates.
  drawAtCursor <char> [color] - Draw a character at the current cursor position.
  parse - Parse a predefined byte stream for testing.
  exit - Quit the application.
`);

rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  try {
    switch (command.toLowerCase()) {
      case "setup": {
        const [width, height, color] = args;
        if (!width || !height || !color || isNaN(width) || isNaN(height)) {
          console.log("Invalid setup arguments. Usage: setup <width> <height> <color>");
        } else {
          screen.setup(Number(width), Number(height), color);
        }
        break;
      }
      case "draw": {
        const [x, y, char, color = "white"] = args;
        if (isNaN(x) || isNaN(y) || !char) {
          console.log("Invalid draw arguments. Usage: draw <x> <y> <char> [color]");
        } else {
          screen.draw(Number(x), Number(y), color, char);
        }
        break;
      }
      case "line": {
        const [x1, y1, x2, y2, char = "Z", color = "white"] = args;
        if ([x1, y1, x2, y2].some((coord) => isNaN(Number(coord))) || !char) {
          console.log("Invalid line arguments. Usage: line <x1> <y1> <x2> <y2> <char> [color]");
        } else {
          screen.drawLine(Number(x1), Number(y1), Number(x2), Number(y2), color, char);
        }
        break;
      }
      case "text": {
        const [x, y, ...rest] = args;
        const color = rest[rest.length - 1]?.match(/^#[0-9A-F]{6}$/i) || rest[rest.length - 1]?.match(/^[a-z]+$/i)
          ? rest.pop()
          : "white";
        const text = rest.join(" ");
        if (isNaN(x) || isNaN(y) || !text) {
          console.log("Invalid text arguments. Usage: text <x> <y> <text> [color]");
        } else {
          screen.renderText(Number(x), Number(y), color, text);
        }
        break;
      }
      case "render":
        screen.render();
        console.log("Screen rendered.");
        break;
      case "clear":
        screen.clear();
        console.log("Screen cleared.");
        break;
      case "movecursor": {
        const [x, y] = args;
        if (isNaN(x) || isNaN(y)) {
          console.log("Invalid moveCursor arguments. Usage: moveCursor <x> <y>");
        } else {
          screen.moveCursor(Number(x), Number(y));
        }
        break;
      }
      case "drawatcursor": {
        const [char, color = "white"] = args;
        if (!char) {
          console.log("Invalid drawAtCursor arguments. Usage: drawAtCursor <char> [color]");
        } else {
          screen.drawAtCursor(char, color);
        }
        break;
      }
      case "parse": {
        console.log("Parsing predefined byte stream...");
        const dataStream = [
          // Setup 16x16 screen, 16-color mode
            0x01, 0x03, 0x10, 0x10, 0x01, 
            // Draw character 'A' at (3,5) with color index 7
            0x02, 0x05, 0x03, 0x05, 0x07, 0x41, 
            // Draw line (6,2) to (8,8) with color 5 and character 'B'
            0x03, 0x06, 0x02, 0x08, 0x08, 0x05, 0x42, 
            // Render text "CDE" starting at (7,2) with color 6
            0x04, 0x07, 0x02, 0x06, 0x43, 0x44, 0x45, 
            // Clear screen
            0x07, 0x00, 
            //End of stream
            0xFF, 0x00 
        ];
        screen.parsedataStream(dataStream);
        console.log("Byte stream parsed and executed.");
        break;
      }
      case "exit":
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Unknown command!.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

rl.on("close", () => {
  console.log("Application terminated.");
});
