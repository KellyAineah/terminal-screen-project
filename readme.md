# Terminal Screen Renderer

## Overview
This project simulates a terminal screen rendering system that allows users to draw characters, lines, text, move a cursor, and clear the screen. The program receives commands via a binary data stream, parses them, and renders them inside a terminal window.

## Problem Statement
Imagine a stream of bytes supplied to a program to render them on a screen inside a terminal. The byte stream includes commands like screen setup, drawing characters, rendering text, and more. The solution interprets and renders these commands on a terminal screen.

## Features
- **Screen Setup**: Set up the screen with width, height, and color mode.
- **Drawing Characters**: Draw individual characters at specific coordinates.
- **Drawing Lines**: Draw a line from one coordinate to another.
- **Rendering Text**: Render text starting from specific coordinates.
- **Cursor Movement**: Move the cursor to a specific location.
- **Clearing the Screen**: Clear all elements from the screen.
- **Byte Stream Parsing**: Parse and execute predefined byte streams.

## Thought Process
This solution involves simulating a terminal screen where a byte stream is parsed to perform screen-related operations. The structure includes:
1. **Byte Stream Parsing**: A method that processes the binary data and executes the corresponding commands.
2. **Rendering**: The grid representing the screen is rendered to the terminal with proper character and color mappings.
3. **Cursor Management**: The cursor is moved based on user commands, and characters are drawn at the cursor's location.

The solution focuses on clear, intuitive commands that can be executed within the terminal window.

## How to Set Up and Run the Application

### Prerequisites:
Ensure you have the following installed on your machine:
- **Node.js** (v14 or above)
- **npm** (Node Package Manager)

# Clone the Repository:
How to Run the Application
Follow these steps to run the application locally:

### Clone the repository
First, clone the repository to your local machine using the following command:

git clone https://github.com/yourusername/terminal-screen.git

### Install Dependencies
Navigate to the project directory and install the necessary dependencies:

cd terminal-screen
npm install

### Run the Application
After the dependencies are installed, you can start the application by running:

node index.js
This will launch the terminal-based interface where you can interact with the screen renderer by typing commands.

## Available Commands
Here’s a list of the available commands:

setup <width> <height> <color>: Setup the screen with specified width, height, and color mode (e.g., setup 40 20 16).
draw <x> <y> <char> [color]: Draw a character at the given coordinates. Optionally, specify the color (e.g., draw 10 5 X red).
line <x1> <y1> <x2> <y2> <char> [color]: Draw a line between two points (e.g., line 0 0 10 10 X blue).
text <x> <y> <text> [color]: Render a string of text at the specified coordinates (e.g., text 5 5 Hello World red).
render: Display the screen with all drawn content.
clear: Clear the screen.
moveCursor <x> <y>: Move the cursor to the specified position (e.g., moveCursor 5 5).
drawAtCursor <char> [color]: Draw a character at the current cursor position (e.g., drawAtCursor O green).
parse <byteStream>: Parse a predefined byte stream for testing (e.g., parse 01 03 20 20 02 03).
exit: Quit the application.


### Example Usage

setup 40 20 16
draw 5 5 X red
line 0 0 10 10 X blue
text 5 5 Hello World green
render
clear
moveCursor 10 10
drawAtCursor O yellow
render

### Example Data for Parsing
Command: parse 01 03 20 20 02 03

