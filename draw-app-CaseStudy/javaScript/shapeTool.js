function ShapeTool() {
    this.icon = "assets/shape-tool.svg";
    this.name = "Shape Tool";
    
    //store the starting mouse position when drawing shapes
    var startMouseX = -1;
    var beginMouseY = -1;
    var width = 0;
    var height = 0;
    //keeps track of which shape we're currently drawing
    var currentShape = "Rectangle";

    //adds the shape selection dropdown to the options area
    this.populateOptions = function() {
        select(".options").html(
            "<label>Shape:</label>" +
            "<select id='shapeSelect'>" +
            "<option value='Rectangle'>Rectangle</option>" +
            "<option value='Ellipse'>Ellipse</option>" +
            "<option value='Star'>Star</option>" +
            "<option value='Triangle'>Triangle</option>" +
            "<option value='HalfCircle'>Half Circle</option>" +
            "</select>" +
            "<div id='starOptions' style='display: none;'>" +
            "<label>Star Points:</label>" +
            "<input type='number' id='starPoints' value='5' min='3' max='40'>" +
            "</div>"
        );

        // Add event listener to the select element
        select("#shapeSelect").changed(function() {
            currentShape = this.value();
            // Show/hide star options
            let starOptions = select("#starOptions");
            starOptions.style('display', currentShape === 'Star' ? 'block' : 'none');
        });
    };

    //helper function to calculate the drawing area based on mouse positions
    this.calculateDrawingBounds = function() {
        // Calculate width and position for x-axis
        let drawX = mouseX < startMouseX ? mouseX : startMouseX;
        let width = abs(mouseX - startMouseX);
        
        // Calculate height and position for y-axis
        let drawY = mouseY < beginMouseY ? mouseY : beginMouseY;
        let height = abs(mouseY - beginMouseY);

        // Determine if shape should be reflected
        let reflectX = mouseX < startMouseX;
        let reflectY = mouseY < beginMouseY;

        return {
            drawX,
            drawY,
            width,
            height,
            reflectX,
            reflectY
        };
    };

    //handles the actual drawing of shapes
    this.draw = function() {
        //only draw when the mouse is pressed
        if (mouseIsPressed) {
            //if this is the first frame of drawing, record the starting position
            if ((startMouseX == -1) && (beginMouseY == -1)) {
                startMouseX = mouseX;
                beginMouseY = mouseY;
                //save the current canvas state so we can update it
                loadPixels();
            } else {
                //restore the previous canvas state before drawing the new shape
                updatePixels();
                
                let bounds = this.calculateDrawingBounds();

                push(); // Save the current transformation state
                
                //handle the case where the user drags up or left
                if (bounds.reflectX || bounds.reflectY) {
                    translate(bounds.drawX + (bounds.reflectX ? bounds.width : 0), 
                             bounds.drawY + (bounds.reflectY ? bounds.height : 0));
                    scale(bounds.reflectX ? -1 : 1, bounds.reflectY ? -1 : 1);
                    translate(-(bounds.drawX), -(bounds.drawY));
                }

                // Draw the selected shape using the new positions
                if (currentShape === "Rectangle") {
                    this.drawRectangle(bounds.drawX, bounds.drawY, bounds.width, bounds.height);
                } else if (currentShape === "Ellipse") {
                    this.drawEllipse(bounds.drawX, bounds.drawY, bounds.width, bounds.height);
                } else if (currentShape === "Star") {
                    this.drawStar(bounds.drawX, bounds.drawY, bounds.width, bounds.height);
                } else if (currentShape === "Triangle") {
                    this.drawTriangle(bounds.drawX, bounds.drawY, bounds.width, bounds.height);
                } else if (currentShape === "HalfCircle") {
                    this.drawHalfCircle(bounds.drawX, bounds.drawY, bounds.width, bounds.height);
                }

                pop(); // Restore the previous transformation state
            }
        } else {
            //reset the starting position when the mouse is released
            startMouseX = -1;
            beginMouseY = -1;
            loadPixels();
        }
    };

    //draws a rectangle at the specified position and size
    this.drawRectangle = function(startMouseX, beginMouseY, width, height) {
        rect(startMouseX, beginMouseY, width, height);
    }
    
    //draws an ellipse at the specified position and size
    this.drawEllipse = function(x, y, w, h) {
        ellipse(x, y, w, h);
    }
    
    //draws a star shape - adapted from p5js examples
    //https://archive.p5js.org/examples/form-star.html
    this.drawStar = function(x, y, w, h) {
        let outerRadius = min(w, h) / 2;
        let innerRadius = outerRadius * 0.4;
        let centerX = x + w/2;
        let centerY = y + h/2;
        //get the number of points from the input field
        let npoints = parseInt(select("#starPoints").value()) || 5;
        
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = centerX + cos(a) * outerRadius;
            let sy = centerY + sin(a) * outerRadius;
            vertex(sx, sy);
            sx = centerX + cos(a + halfAngle) * innerRadius;
            sy = centerY + sin(a + halfAngle) * innerRadius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    };

    //draws a triangle with the top point centered above the base
    this.drawTriangle = function(x, y, w, h) {
        triangle(
            x + w/2, y,           // Top point
            x, y + h,             // Bottom left point
            x + w, y + h          // Bottom right point
        );
    };

    //draws a half circle (semi-circle) shape
    this.drawHalfCircle = function(x, y, w, h) {
        arc(x + w/2, y + h/2, w, h, PI, 0, CHORD);
    };
} 