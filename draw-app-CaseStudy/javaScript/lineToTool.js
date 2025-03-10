
function LineToTool(){
	//set an icon and a name for the object
	this.icon = "assets/ruler-and-pencil.svg";
	this.name = "LineTo";

	//to create a line from the start mouse location
	//to the current mouse location. The following values store
	//the locations from the start frame. They are -1 to start with because
	//we haven't started drawing yet.
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}
			//if we already have values for startMouseX and Y we can draw a line from 
			//there to the current mouse location
			else{
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
