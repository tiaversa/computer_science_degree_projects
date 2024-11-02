function SprayCanTool(){
	//set an icon and a name for the object
	this.icon = "assets/spray-can.svg";
	this.name = "SprayCan";
    //density of the spay
    this.points = 13;
    //distance spread
    this.spread = 10;

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed){
            for(var i = 0; i < this.points; i++){
                point(random(mouseX-this.spread, mouseX + this.spread), 
                    random(mouseY-this.spread, mouseY+this.spread));
            }
        }
    }
}