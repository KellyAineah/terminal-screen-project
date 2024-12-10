class screen{
    constructor(){
        //ensures screen is initialized before other commands are send
        this.isSetup= false;

        //width and height represent the screens's dimensions, set to 0 as default to show that the screen has not been configured
        this.width = 0;
        this.height =0;

        //grid stores the screen's content, initialized to 0 as screen has not been setup yet
        this.grid = [];

        //Tracks the position of the cursor,initialized at (0,0)
        this.cursor={x:0, y:0};

        //set default color mode 
        this.color = 0x00;
    }
}