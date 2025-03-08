function ImageTool() {
    // Set an icon and a name for the object
    this.icon = "assets/image-tool.jpg";
    this.name = "Image";
    
    // Variables to store the loaded image and placement information
    var loadedImage = null;
    var startMouseX = -1;
    var startMouseY = -1;
    var placing = false;
    var imageWidth = 0;
    var imageHeight = 0;
    var aspectRatio = 1;
    var dragging = false;
    
    // Add options to the options panel
    this.populateOptions = function() {
        select(".options").html(
            "<label>Upload Image:</label>" +
            "<input type='file' id='imageUpload' accept='image/*'>" +
            "<div class='image-size-controls'>" +
            "<label>Width:</label>" +
            "<input type='number' id='imageWidth' min='10' max='1000'>" +
            "<label>Height:</label>" +
            "<input type='number' id='imageHeight' min='10' max='1000'>" +
            "<label>Maintain Aspect Ratio:</label>" +
            "<input type='checkbox' id='maintainAspect' checked>" +
            "</div>"
        );
        
        // Add event listener for file upload
        select("#imageUpload").changed(function() {
            let input = document.getElementById('imageUpload');
            if (input.files && input.files[0]) {
                let reader = new FileReader();
                
                reader.onload = function(e) {
                    // Create a new image object to get dimensions
                    let img = new Image();
                    img.onload = function() {
                        loadedImage = loadImage(e.target.result, function(img) {
                            // Set default dimensions based on the loaded image
                            imageWidth = img.width;
                            imageHeight = img.height;
                            aspectRatio = imageHeight / imageWidth;
                            
                            // Update the input fields
                            select("#imageWidth").value(imageWidth);
                            select("#imageHeight").value(imageHeight);
                            
                            // Start placing the image
                            placing = true;
                        });
                    };
                    img.src = e.target.result;
                };
                
                reader.readAsDataURL(input.files[0]);
            }
        });
        
        // Add event listeners for width/height inputs
        select("#imageWidth").input(function() {
            let width = parseInt(this.value());
            if (select("#maintainAspect").checked() && loadedImage) {
                let aspectRatio = loadedImage.height / loadedImage.width;
                select("#imageHeight").value(Math.round(width * aspectRatio));
            }
            imageWidth = width;
        });
        
        select("#imageHeight").input(function() {
            let height = parseInt(this.value());
            if (select("#maintainAspect").checked() && loadedImage) {
                let aspectRatio = loadedImage.width / loadedImage.height;
                select("#imageWidth").value(Math.round(height * aspectRatio));
            }
            imageHeight = height;
        });
    };
    
    // Draw function
    this.draw = function() {
        // If we have an image and we're in placing mode
        if (loadedImage && placing) {
            // Only show the image when the mouse is moving
            if (pmouseX !== mouseX || pmouseY !== mouseY) {
                updatePixels();
                
                // Default size if no dragging occurs
                let defaultWidth = parseInt(select("#imageWidth").value()) || 200;
                let defaultHeight = parseInt(select("#imageHeight").value()) || defaultWidth * aspectRatio;
                
                // Draw the image centered on the cursor
                image(loadedImage, mouseX - defaultWidth/2, mouseY - defaultHeight/2, 
                      defaultWidth, defaultHeight);
            }
            
            if (mouseIsPressed) {
                if (startMouseX === -1 && startMouseY === -1) {
                    // First click - set the starting position
                    startMouseX = mouseX;
                    startMouseY = mouseY;
                    dragging = true;
                    loadPixels();
                } else if (dragging) {
                    // Dragging - update the size based on mouse movement
                    updatePixels();
                    
                    // Calculate width and height based on mouse position
                    let width = abs(mouseX - startMouseX);
                    let height;
                    
                    if (select("#maintainAspect").checked()) {
                        height = width * aspectRatio;
                    } else {
                        height = abs(mouseY - startMouseY);
                    }
                    
                    // Determine drawing position
                    let drawX = mouseX < startMouseX ? mouseX : startMouseX;
                    let drawY = mouseY < startMouseY ? mouseY : startMouseY;
                    
                    // If maintaining aspect ratio, adjust Y position
                    if (select("#maintainAspect").checked()) {
                        if (mouseY < startMouseY) {
                            drawY = startMouseY - height;
                        }
                    }
                    
                    // Draw the image
                    image(loadedImage, drawX, drawY, width, height);
                    
                    // Update the input fields
                    select("#imageWidth").value(width);
                    select("#imageHeight").value(height);
                    
                    // Store current dimensions
                    imageWidth = width;
                    imageHeight = height;
                }
            } else {
                // Mouse released
                if (dragging) {
                    // Finalize the image placement
                    // Check if there was actual movement
                    if (abs(mouseX - startMouseX) > 5 || abs(mouseY - startMouseY) > 5) {
                        // User dragged to create a custom-sized image
                        loadPixels();
                    } else {
                        // User clicked without significant movement - place default sized image
                        updatePixels();
                        
                        // Default size if no dragging occurs
                        let defaultWidth = parseInt(select("#imageWidth").value()) || 200;
                        let defaultHeight = parseInt(select("#imageHeight").value()) || defaultWidth * aspectRatio;
                        
                        // Draw the image centered on the cursor
                        image(loadedImage, startMouseX - defaultWidth/2, startMouseY - defaultHeight/2, 
                              defaultWidth, defaultHeight);
                        loadPixels();
                    }
                    
                    dragging = false;
                    placing = false;
                    startMouseX = -1;
                    startMouseY = -1;
                }
            }
        }
    };
    
    // When the tool is deselected
    this.unselectTool = function() {
        // Clear options
        select(".options").html("");
        // Reset variables
        startMouseX = -1;
        startMouseY = -1;
        dragging = false;
    };
} 