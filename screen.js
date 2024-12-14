class Screen {
    constructor() {
        //ensures that the screen on which the command interpreter operates is initialized before the other commands are sent.
        this.initializeScreen = false;

        // screenWidth and screenheight represent the screen's dimensions,default to 0 to show that the screen has not been set yet
        this.screenWidth = 0;
        this.screenHeight = 0;

        // grid initialized as an empty array because the screen hasn’t been set up yet.
        //grid stores content of the screen
        this.grid = [];

        // stores coordinates of the cursor, initialized at (0,0)
        this.cursor = { x: 0, y: 0 };

        // Set default color 
        this.colorMode = "blue";
    }

    // Screen setup method
    setup(screenWidth, screenHeight, colorMode = "blue") {
        // Validate screen dimensions
        if (screenWidth <= 0 || screenHeight <= 0) {
            console.log("Input should be a positive number");
            return;
        }
        if (isNaN(screenWidth) || isNaN(screenHeight)) {
            console.log("screen width and screen height must be numbers");
            return;
        }

        // Store inputs provided by the screen setup method
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.colorMode = colorMode;

        // Create a 2D array based on screenWidth and screenHeight and cells initialized as ""
        for(let i =0; i < screenHeight; i++){
           let row = [];
           for(let j=0; j< screenWidth; j++){
            row.push(' ')
           }
           this.grid.push(row);
        }

        // Set up screen
        this.initializeScreen = true;

        // feedback message
        console.log(
            `Screen initialized with dimensions: ${screenWidth}x${screenHeight}`
        );
    }

    // Draw character method
    draw(x, y, color = "red", char = "Z") {

        //validations 
        if (!this.initializeScreen) {
            console.log("Screen has not been initialized.");
            return;
        }

        if (x < 0 || x >= this.screenWidth || y < 0 || y >= this.screenHeight) {
            console.log("Coordinates out of bounds.");
            return;
        }

        if (!char || typeof char !== "string" || char.length !== 1) {
            console.log("Provide a valid character.");
            return;
        }

        this.grid[y][x] = { color, char };
        //feedback message
        console.log(`Drew character '${char}' at coordinates (${x}, ${y}).`);
    }

    // Draw line method
    drawLine(x1, y1, x2, y2, color = "white", char = "Z") {
        if (!this.initializeScreen) {
            console.log("Screen has not been initialized.");
            return;
        }
      //Bresnham's Algorithm to calculate points between(x1-x2, y1-y2)

        //determine vertical and horizontal distance between coordinates
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);

        //Determine the direction of line 
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.grid[y1][x1] = { color, char }; 

            if (x1 === x2 && y1 === y2) break;
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        console.log(`Drew line`)
    }

    // Render text method
    renderText(x, y, color = "white", text) {
        //validations
        if (!this.initializeScreen) {
            console.log("Screen has not been initialized.");
            return;
        }

        if (x < 0 || x >= this.screenWidth || y < 0 || y >= this.screenHeight) {
            console.log("Starting coordinates out of bounds.");
            return;
        }

        for (let i = 0; i < text.length; i++) {
            const positionOfX = x + i;
            if (positionOfX >= this.screenWidth) {
                console.log(`'${text}' exceeds screen width.`);
                break;
            }

            this.grid[y][positionOfX] = { color, char: text[i] };
        }

        console.log(`Rendered text '${text}' at (${x}, ${y}).`);
    }

    // Move cursor method
    moveCursor(x, y) {
        if (!this.initializeScreen) {
            console.log("Screen has not been initialized.");
            return;
        }

        if (x < 0 || x >= this.screenWidth || y < 0 || y >= this.screenHeight) {
            console.log("Provided position of the cursor is out of bounds");
            return;
        }

        this.cursor = { x, y };

        console.log(`Cursor moved to position (${x}, ${y}).`);
    }

    // Draw at cursor method
    drawAtCursor(char, color = "white") {
        if (!this.initializeScreen) {
            console.log("Screen has not been initialized.");
            return;
        }

        if (!char || char.length !== 1 || typeof char !== "string") {
            console.log("Invalid character input.");
            return;
        }

        const { x, y } = this.cursor;

        if (x < 0 || x >= this.screenWidth || y < 0 || y >= this.screenHeight) {
            console.log("Cursor is out of bounds");
            return;
        }

        this.grid[y][x] = { color, char };
    }

     // Clear method
     clear() {
        if (!this.initializeScreen) {
            console.log("Screen has not been initialized.");
            return;
        }

        // Reset the grid to its initial state with empty strings
        this.grid = [];
        for (let i = 0; i < this.screenHeight; i++) {
            let row = [];
            for (let j = 0; j < this.screenWidth; j++) {
                row.push(' '); 
            }
            this.grid.push(row);
        }

        //console.log("Screen cleared.");
    }
// Render method
render() {
    if (!this.initializeScreen) {
        console.log("Screen has not been initialized.");
        return;
    }

    console.clear();
    // Set color for borders
    const borderColor = "\x1b[34m";
    // Reset color for normal text
    const resetColor = "\x1b[0m";

    // ANSI color codes
    const colorCodes = {
        red: "\x1b[31m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        white: "\x1b[37m",
        cyan: "\x1b[36m",
        magenta: "\x1b[35m",
        green: "\x1b[32m"
    };

    // Print top row with column labels
    let columnLabels = "   ";
    for (let col = 0; col < this.screenWidth; col++) {
        columnLabels += ` ${col.toString().padStart(2)} `;
    }
    console.log(columnLabels);

    // Print top border
    console.log(borderColor + "   +" + "---+".repeat(this.screenWidth) + resetColor);

    // Print grid with row labels and borders
    for (let row = 0; row < this.screenHeight; row++) {
        let rowContent = `${row.toString().padStart(2)} |`;
        for (let col = 0; col < this.screenWidth; col++) {
            const cell = this.grid[row][col];
            // Safely handle cells
            if (cell && typeof cell === "object" && cell.color && cell.char) {
                const colorCode = colorCodes[cell.color.toLowerCase()] || resetColor;
                rowContent += ` ${colorCode}${cell.char}${resetColor} |`;
            } else {
                rowContent += "   |"; 
            }
        }
        console.log(rowContent);

        // Print row divider
        console.log(borderColor + "   +" + "---+".repeat(this.screenWidth) + resetColor);
    }
}
    

    // Parse Byte method
    parsedataStream(dataStream) {
        let i = 0;
        while (i < dataStream.length) {
            const command = dataStream[i++];
            const length = dataStream[i++];

            switch (command) {
                // Screen setup
                case 0x01: 
                    const width = dataStream[i++];
                    const height = dataStream[i++];
                    const colorMode = dataStream[i++];
                    const colorMap = { 0x00: "monochrome", 0x01: "16 colors", 0x02: "256 colors" };
                    this.setup(width, height, colorMap[colorMode] || "monochrome");
                    break;
                // Draw character
                case 0x02: 
                    const x = dataStream[i++];
                    const y = dataStream[i++];
                    const colorIndex = dataStream[i++];
                    const char = String.fromCharCode(dataStream[i++]);
                    this.draw(x, y, colorIndex, char);
                    break;
                // Draw line
                case 0x03: 
                    const x1 = dataStream[i++];
                    const y1 = dataStream[i++];
                    const x2 = dataStream[i++];
                    const y2 = dataStream[i++];
                    const lineColor = dataStream[i++];
                    const lineChar = String.fromCharCode(dataStream[i++]);
                    this.drawLine(x1, y1, x2, y2, lineColor, lineChar);
                    break;
                // Render text
                case 0x04: 
                    const textX = dataStream[i++];
                    const textY = dataStream[i++];
                    const textColor = dataStream[i++];
                    const textData = String.fromCharCode(...dataStream.slice(i, i + length - 3));
                    i += length - 3;
                    this.renderText(textX, textY, textColor, textData);
                    break;
                // Move cursor
                case 0x05: 
                    const cursorX = dataStream[i++];
                    const cursorY = dataStream[i++];
                    this.moveCursor(cursorX, cursorY);
                    break;

                // Draw at cursor
                case 0x06: 
                    const cursorChar = String.fromCharCode(dataStream[i++]);
                    const cursorColor = dataStream[i++];
                    this.drawAtCursor(cursorChar, cursorColor);
                    break;

                 // Clear screen   
                case 0x07: 
                    this.clear();
                    break;

                 // End of stream
                case 0xFF: 
                    console.log("End of byte stream.");
                    return;

                default:
                    console.log(`Unknown command: ${command}`);
                    return;
            }
        }
    }
}

export default Screen;
