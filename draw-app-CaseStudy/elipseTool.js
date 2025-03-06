function ElipseTool(){
	this.icon = "assets/circle-tool.svg";
	this.name = "Elipse";

	var startMouseX = -1;
	var beginMouseY = -1;
    var width = 0;
    var height = 0;

	this.draw = function(){
		if(mouseIsPressed){
            if((startMouseX == -1) && (beginMouseY == -1))
            {
                startMouseX = mouseX;
                beginMouseY = mouseY;
            }
            else
            {
                width = mouseX - startMouseX;
                height = mouseX - startMouseX;
                ellipse(startMouseX, beginMouseY, width, height);
                
            }
        }
		else
        {
            drawing = false;
			startMouseX = -1;
			beginMouseY = -1;
		}
	}
}