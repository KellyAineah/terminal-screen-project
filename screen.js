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
        const characterColor= chalk[color] || chalk.green

        //apply the selected color to the char and store it in a grid
        this.grid[x][y] = characterColor(color)
    
      //feedback message 

      console.log(`Drew character ${char} at coordinates ${x}x${y}`)
    
   }
}

export default Screen;