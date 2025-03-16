function ImageTool() {
    // Set an icon and a name for the object
    this.icon = "assets/image-tool.svg";
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
        createOptionsUI();
        setupEventListeners();
    };
    
    // Create the UI elements for the options panel
    function createOptionsUI() {
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
    }
    
    // Set up all event listeners for the UI elements
    function setupEventListeners() {
        setupImageUploadListener();
        setupWidthInputListener();
        setupHeightInputListener();
    }
    
    // Handle image upload events
    function setupImageUploadListener() {
        select("#imageUpload").changed(function() {
            let input = document.getElementById('imageUpload');
            if (input.files && input.files[0]) {
                let reader = new FileReader();
                
                reader.onload = function(e) {
                    handleImageLoad(e.target.result);
                };
                
                reader.readAsDataURL(input.files[0]);
            }
        });
    }
    
    // Process the loaded image
    function handleImageLoad(imageData) {
        // Create a new image object to get dimensions
        let img = new Image();
        img.onload = function() {
            loadedImage = loadImage(imageData, function(img) {
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
        img.src = imageData;
    }
    
    // Handle width input changes
    function setupWidthInputListener() {
        select("#imageWidth").input(function() {
            let width = parseInt(this.value());
            if (select("#maintainAspect").checked() && loadedImage) {
                let aspectRatio = loadedImage.height / loadedImage.width;
                select("#imageHeight").value(Math.round(width * aspectRatio));
            }
            imageWidth = width;
        });
    }
    
    // Handle height input changes
    function setupHeightInputListener() {
        select("#imageHeight").input(function() {
            let height = parseInt(this.value());
            if (select("#maintainAspect").checked() && loadedImage) {
                let aspectRatio = loadedImage.width / loadedImage.height;
                select("#imageWidth").value(Math.round(height * aspectRatio));
            }
            imageHeight = height;
        });
    }
    
    // Draw function
    this.draw = function() {
        if (loadedImage && placing) {
            if (mouseIsPressed) {
                handleMousePressed();
            } else {
                handleMouseReleased();
            }
        }
    };
    
    // Handle mouse pressed events during image placement
    function handleMousePressed() {
        if (startMouseX === -1 && startMouseY === -1) {
            initializeImagePlacement();
        } else if (dragging) {
            updateImageSizeAndPosition();
        }
    }
    
    // Initialize the starting position for image placement
    function initializeImagePlacement() {
        startMouseX = mouseX;
        startMouseY = mouseY;
        dragging = true;
        loadPixels();
    }
    
    // Update the image size and position based on mouse movement
    function updateImageSizeAndPosition() {
        updatePixels();
        let width = abs(mouseX - startMouseX);
        let height;
        
        if (select("#maintainAspect").checked()) {
            height = width * aspectRatio;
        } else {
            height = abs(mouseY - startMouseY);
        }
        
        let drawX = mouseX < startMouseX ? mouseX : startMouseX;
        let drawY = mouseY < startMouseY ? mouseY : startMouseY;
        
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
    
    // Handle mouse released events during image placement
    function handleMouseReleased() {
        if (dragging) {
            finalizeImagePlacement();
        }
    }
    
    // Finalize the image placement
    function finalizeImagePlacement() {
        if (abs(mouseX - startMouseX) > 5 || abs(mouseY - startMouseY) > 5) {
            // User dragged to create a custom-sized image
            loadPixels();
        } else {
            // User clicked without significant movement - place default sized image
            placeDefaultSizedImage();
        }
        
        resetPlacementState();
    }
    
    // Place an image with default size
    function placeDefaultSizedImage() {
        updatePixels();
        let defaultWidth = parseInt(select("#imageWidth").value()) || 200;
        let defaultHeight = parseInt(select("#imageHeight").value()) || defaultWidth * aspectRatio;
        image(loadedImage, startMouseX - defaultWidth/2, startMouseY - defaultHeight/2, 
              defaultWidth, defaultHeight);
        loadPixels();
    }
    
    // Reset the placement state variables
    function resetPlacementState() {
        dragging = false;
        placing = false;
        startMouseX = -1;
        startMouseY = -1;
    }
    
    // Clean up when tool is unselected
    this.unselectTool = function() {
        select(".options").html("");
        resetPlacementState();
    };
} 