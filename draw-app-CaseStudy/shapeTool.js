function ShapeTool() {
    this.icon = "assets/shapes.png";  // You'll need to create this icon
    this.name = "Shape Tool";
    
    var startMouseX = -1;
    var beginMouseY = -1;
    var width = 0;
    var height = 0;
    var currentShape = "Rectangle";

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

    this.draw = function() {
        if (mouseIsPressed) {
            if ((startMouseX == -1) && (beginMouseY == -1)) {
                startMouseX = mouseX;
                beginMouseY = mouseY;
                loadPixels();
            } else {
                updatePixels();
                
                let bounds = this.calculateDrawingBounds();

                push(); // Save the current transformation state
                
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
            startMouseX = -1;
            beginMouseY = -1;
            loadPixels();
        }
    };

    this.drawRectangle = function(startMouseX, beginMouseY, width, height) {
        rect(startMouseX, beginMouseY, width, height);
    }
    this.drawEllipse = function(x, y, w, h) {
        ellipse(x, y, w, h);
    }
    //https://archive.p5js.org/examples/form-star.html
    this.drawStar = function(x, y, w, h) {
        let outerRadius = min(w, h) / 2;
        let innerRadius = outerRadius * 0.4;
        let centerX = x + w/2;
        let centerY = y + h/2;
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

    this.drawTriangle = function(x, y, w, h) {
        // Draw triangle with the top point centered above the base
        triangle(
            x + w/2, y,           // Top point
            x, y + h,             // Bottom left point
            x + w, y + h          // Bottom right point
        );
    };

    this.drawHalfCircle = function(x, y, w, h) {
        arc(x + w/2, y + h/2, w, h, PI, 0, CHORD);
    };
} 