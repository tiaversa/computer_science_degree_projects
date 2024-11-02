function RectangleTool(){
	this.icon = "assets/rectangle-tool.svg";
	this.name = "Rectangle Tool";

    var startMouseX = -1;
	var beginMouseY = -1;
	var drawing = false;

	this.draw = function(){
		if(mouseIsPressed){
            if((startMouseX == -1) && (beginMouseY == -1))
            {
                startMouseX = mouseX;
                beginMouseY = mouseY;
            }
            else
            {
                rect(startMouseX, beginMouseY, mouseX - startMouseX , mouseY - beginMouseY);
            }
        }
		else
        {
            drawing = false;
            console.log(drawing);
			startMouseX = -1;
			beginMouseY = -1;
		}
	}
}