function TextTool() {
    this.icon = "assets/text-tool.jpg";  // You'll need to create this icon
    this.name = "Text Tool";
    
    var startMouseX = -1;
    var beginMouseY = -1;
    var width = 0;
    var height = 0;
    var currentShape = "Rectangle";
    var textInput; // Add this variable to store the input element

    this.populateOptions = function() {
        select(".options").html(
            "<label>Text Size:</label>" +
            "<input type='number' id='textSize' value='16' min='8' max='72'>"
        );

        // Create floating text input
        textInput = createInput('Type your text');
        textInput.style('position', 'absolute');
        textInput.hide(); // Hide initially

        // Add event listener for text size changes
        select("#textSize").input(function() {
            let size = parseInt(this.value());
            textSize(size);
        });
    };

    this.draw = function() {
        if (mouseIsPressed) {
            if ((startMouseX == -1) && (beginMouseY == -1)) {
                startMouseX = mouseX;
                beginMouseY = mouseY;
                // Adjust input position to account for text size
                let size = select("#textSize").value();
                textInput.position(startMouseX, beginMouseY - size); // Offset by text size
                textInput.show();
                textInput.elt.focus();
                loadPixels();
            }
        }

        // Add keyPressed event handler
        textInput.elt.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.drawText(startMouseX, beginMouseY);
                // Reset the starting coordinates
                startMouseX = -1;
                beginMouseY = -1;
            }
        });
    };

    this.drawText = function(startMouseX, beginMouseY) {
        // Get the current text size from the input
        let size = select("#textSize").value();
        textSize(size);
        
        // Get the text from the floating input field
        let inputText = textInput.value();
        text(inputText, startMouseX, beginMouseY);
        textInput.hide(); // Hide the input after drawing
        textInput.value('Type your text'); // Reset the input text
    }
} 