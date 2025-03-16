//Displays and handles the colour palette.
function ColourPalette() {
	//set properties for the colour palette
	this.transparency = 255;
	//a list of web colour strings
	this.colours = ["black", "silver", "gray", "white", "maroon", "red", "purple", 
		"orange", "plum", "IndianRed", "pink", "fuchsia", "green", "lime", "olive",
		"yellow", "navy", "blue", "teal", "aqua", "orchid", "Aquamarine","linen",
		"random"  // Add random option to the colors array
	];
	//make the start colour be black
	this.selectedColour = "black";

	//creates and populates the options panel with controls for line size and transparency
	this.populateOptions = function() {
		// Add transparency control to options
        select(".colourPaletteConfig").html(
            "<label>Line Size:</label>" +
            "<input type='number' id='textSize' value='2' min='8' max='72'>" +
			"<div class='transparency-control'>" +
			"<label>Transparency:</label>" +
			"<input type='range' id='transparencyInput' min='0' max='255' value='255'>" +
			"</div>"
        );
    };

	var self = this;

	// retrieves the current transparency value from the slider input
	this.getTransparency = function() {
		return parseInt(select('#transparencyInput').value()) || 255;
	}

	// retrieves the current line size value from the number input
	this.getLineSize = function() {
		return parseInt(select('#textSize').value()) || 2;
	}

	// updates the current drawing color with the selected color and transparency
	this.updateCurrentColor = function() {
		var transparency = this.getTransparency();
		var lineSize = this.getLineSize();
		
		// Convert color name to RGB values using p5.js color()
		let col = color(this.selectedColour);
		let r = red(col);
		let g = green(col);
		let b = blue(col);
		
		fill(r, g, b, transparency); 
		stroke(r, g, b, transparency);
		strokeWeight(lineSize);
	}

	//event handler for when a colour swatch is clicked
	var colourClick = function() {
		var current;
		if (self.selectedColour.startsWith('rgb')) {
			current = select("#randomSwatch");
		} else {
			current = select("#" + self.selectedColour + "Swatch");
		}
		current.style("border", "0");
		
		var c = this.id().split("Swatch")[0];
		
		// Generate a random color when the random swatch is clicked
		if (c === "random") {
			// Generate random RGB values
			let r = floor(random(256));
			let g = floor(random(256));
			let b = floor(random(256));
			self.selectedColour = `rgb(${r},${g},${b})`;
		} else {
			self.selectedColour = c;
		}
		
		self.updateCurrentColor();
		
		this.style("border", "2px solid blue");
	}

	//creates the colour swatches and adds them to the palette
	this.loadColours = function() {
		this.populateOptions();
		fill(this.colours[0]);
		stroke(this.colours[0]);
		strokeWeight(this.getLineSize());
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";
			var colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			if (this.colours[i] === "random") {
				select("#" + colourID).style("background", "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)");
			} else {
			select("#" + colourID).style("background-color", this.colours[i]);
			}
			
			colourSwatch.mouseClicked(colourClick)
		}

		select(".colourSwatches").style("border", "2px solid blue");
	};
	
	//initialize the colour palette
	this.loadColours();
	
	//add event listeners for the line size and transparency controls
	select('#textSize').input(function() {
		strokeWeight(self.getLineSize());
	});
	
	select('#transparencyInput').input(function() {
		self.updateCurrentColor();
	});
}