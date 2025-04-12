function TextTool() {
    this.icon = "assets/text-tool.svg";
    this.name = "Text Tool";
    
    //variables to store mouse position when text input starts
    var startMouseX = -1;
    var beginMouseY = -1;
    var width = 0;
    var height = 0;
    var textInput;

    this.populateOptions = function() {
        select(".options").html(
            "<label>Text Size:</label>" +
            "<input type='number' id='textSizeText' value='50' min='8' max='72'>"
        );

        // Create floating text input that follows the cursor
        textInput = createInput('Type your text');
        textInput.style('position', 'absolute');
        textInput.hide();
        textSize(this.getTextSize());
    };

    //helper function to get the current text size from the options panel
    this.getTextSize = function() {
        console.log(parseInt(select('#textSizeText').value()));
        return parseInt(select('#textSizeText').value()) || 50;
    }

    this.draw = function() {
        if (mouseIsPressed) {
            //if this is the first frame of the mouse press, record the position
            //and show the text input at that location
            if ((startMouseX == -1) && (beginMouseY == -1)) {
                startMouseX = mouseX;
                beginMouseY = mouseY;
                let size = this.getTextSize();
                textInput.position(startMouseX, beginMouseY - size);
                textInput.show();
                loadPixels();
            }
        }

        //add event listener for Enter key to confirm text placement
        textInput.elt.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.drawText(startMouseX, beginMouseY);
                //reset the starting position for next text
                startMouseX = -1;
                beginMouseY = -1;
            }
        });
    };

    /*
     * Draws the text onto the canvas at the specified position
     * @param startMouseX number: x-coordinate where text should be placed
     * @param beginMouseY number: y-coordinate where text should be placed
     */
    this.drawText = function(startMouseX, beginMouseY) {
        let inputText = textInput.value();
        //save drawing state before changing text properties
        push();
        textSize(this.getTextSize());
        text(inputText, startMouseX, beginMouseY);
        //restore drawing state
        pop();
        
        //hide the input and reset its value for next use
        textInput.hide();
        textInput.value('Type your text');
    };
} 