import chalk from "chalk";

class Screen{
    constructor(){
        //ensures screen is initialized before other commands are send
        this.isSetup= false;

        //width and height represent the screens's dimensions, set to 0 as default to show that the screen has not been configured
        this.screenWidth = 0;
        this.screenHeight =0;

        //grid stores the screen's content, initialized to empty array as screen has not been setup yet
        this.grid = [];

        //Tracks the position of the cursor,initialized at (0,0)
        this.cursor={x:0, y:0};

        //set default color mode to monochrome
        this.colorMode = 0x00;
    }

    //screen setup method 

    setup(screenWidth, screenHeight, colorMode=0x00){

        //validation of screen dimensions 
        if(screenWidth < 0 || screenHeight < 0){
            console.log("Input can not be a negative integer")
            return;
        }
        if(isNaN(screenWidth) || isNaN(screenHeight)){
            console.log("width and height must be numbers")
            return;
        }

        //store inputs provided by the screen setup method

        this.screenWidth = screenWidth;
        this.screenHeight= screenHeight;
        this.colorMode = colorMode;

        //create a 2D array basing on screenWidth and screenHeight

        this.grid = Array.from({ length: screenWidth }, () =>
            Array.from({ length: screenHeight }, () => " ")
          );


          //set up screen

          this.isSetup = true;

          //output message

          console.log(
            `Screen has successfully been initialized with dimensions ${screenWidth}x${screenHeight} and color ${colorMode} `
          )
          
        
    }
    
    //draw character method

    draw(x, y, color, char = 'green'){
         //ensure screen has been setup 
        if(!this.isSetup){
            console.log('screen has not been setup!')
            return;
        }

        //validate coordinates to ensure they dont go out of bounds in relation to the setup screen
        if(x < 0 || x > this.screenWidth){
            console.log('Width coordinate is out of bounds!')
            return;
        }
        if(y < 0 || y > this.screenHeight){
            console.log('Height coordinate is out of bounds!')
            return;
        }

        //validation of the character
        if(char !== 1 || !char || typeof char !== 'string'){
            console.log('Invalid character, provide a single string character');
            return;
        }
        
        //select color from chalk library. Apply default color green if no color is selected or invalid color
        const characterColor= chalk[color] || chalk.green;

        //apply the selected color to the char and store it in a grid
        this.grid[x][y] = characterColor(color);
    
      //feedback message 

      console.log(`Drew character ${char} at coordinates ${x}x${y}`)
    
   }

     //draw Line method
     draw(x1, y1, x2, y2, color, char){
        //ensures screen has been setup
        if(!this.isSetup){
            console.log('screen has not been setup');
            return;
        }
        //validation of the coordinates 
        if(x1 <0 || x1 < this.screenWidth || x2< 0|| x2 < this.screenWidth){
            console.log('Width coordinates is out of bounds');
            return;
        }
        if(y1 <0 || y1 < this.screenHeight || y2< 0|| y2 < this.screenHeight){
            console.log('height coordinates is out of bounds');
            return;
        }

        //validation of the character
        if(char !== 1 || !char || typeof char !== 'string'){
            console.log('Invalid character, provide a single string character');
            return;
        }
        //Bresnhams Algorithm for drawing lines on a grid 
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2-y1);
        const sx = x1 > x2 ? -1  : 1;
        const sy = y1 > y2 ? -1  : 1;
        let err = dx - dy

        while(true){
            this.draw(x1, y1, char, color);

            if (x1=== x2 && y1 === y2) break;

            const e2 = 2 * err;

            if(e2 > -dy){
                err -= dy;
                x1 += sx;
            }
            if(e2  < dx){
                err += dx;
                y1 += sy;
            }
        }

     }

     // render text method 
     renderText(x, y , color= 'green', chars){

        //ensure screen is setup
        if(!this.isSetup){
            console.log('screen is not setup!');
            return;
        }
        //validate coordinates

        if (x < 0 || x > this.screenWidth || y< 0 || y > this.screenHeight){
            console.log('Provided starting coordinates are out of bounds');
            return;
        }

        //validate characters
        for(const char of chars){
            if (char.charCodeAt(0) > 127){
                console.log('Invalid text');
                return;
            }
        }

        //Render text horizontally
        //loop through the text
        for (let i=0; i< chars.length; i++){
            const positionOfX = x + i;

            //if chars exceeds the grid stop rendering

            if(positionOfX >= this.screenWidth) break;

            //access starting grid cell at y and currentX and start rendering the text

            this.grid[y][positionOfX]= chalk[color] ? chalk[color](chars[i]) : chalk.green(text[i]);

            //feedback message 

            console.log(`Rendered text data '${chars}' at ${x} x ${y}` )
        }
     }
    
     //move cursor method
     moveCursor(x, y){
        //ensure screen is setup
        if(!this.isSetup){
            console.log('screen is not setup!');
            return;
        }
        //validate the inputs
        if(x<0 || x > this.screenWidth || y < 0 || y > this.screenHeight){
            console.log('Provided position of the cursor is out of bounds')
            return;
        }
          
        //change the position of the cursor
        this.screenHeight = y;
        this.screenWidth = x;

        //feedback message
        console.log(
            `Cursor moved to position ${x}x${y}`
        )
        
     }
}

export default Screen;