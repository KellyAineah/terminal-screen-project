class screen{
    constructor(){
        //ensures screen is initialized before other commands are send
        this.isSetup= false;

        //width and height represent the screens's dimensions, set to 0 as default to show that the screen has not been configured
        this.screenWidth = 0;
        this.screenHeight =0;

        //grid stores the screen's content, initialized to 0 as screen has not been setup yet
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
}

