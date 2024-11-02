function ElipseTool(){
	this.icon = "assets/circle-tool.svg";
	this.name = "Elipse";

	var startMouseX = -1;
	var beginMouseY = -1;

	this.draw = function(){
		if(mouseIsPressed){
            if((startMouseX == -1) && (beginMouseY == -1))
            {
                startMouseX = mouseX;
                beginMouseY = mouseY;
            }
            else
            {
                ellipse(startMouseX, beginMouseY, mouseX - startMouseX, mouseX - startMouseX);
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