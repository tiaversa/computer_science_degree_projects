//Displays and handles the colour palette.
function ColourPalette() {
	this.transparency = 255;
	//a list of web colour strings
	this.colours = ["black", "silver", "gray", "white", "maroon", "red", "purple", 
		"orange", "plum", "IndianRed", "pink", "fuchsia", "green", "lime", "olive",
		"yellow", "navy", "blue", "teal", "aqua", "orchid", "Aquamarine","linen",
		"random"  // Add random option to the colors array
	];
	//make the start colour be black
	this.selectedColour = "black";

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

	// Add helper function to get transparency value
	this.getTransparency = function() {
		return parseInt(select('#transparencyInput').value()) || 255;
	}

	// Add helper function to get line size value
	this.getLineSize = function() {
		return parseInt(select('#textSize').value()) || 2;
	}

	// Add function to update the current color with transparency
	this.updateCurrentColor = function() {
		var transparency = this.getTransparency();
		var lineSize = this.getLineSize();
		
		// Convert color name to RGB values using p5.js color()
		let col = color(this.selectedColour);
		let r = red(col);
		let g = green(col);
		let b = blue(col);
		
		// Apply RGB values with transparency
		fill(r, g, b, transparency); 
		stroke(r, g, b, transparency);
		strokeWeight(lineSize);
	}

	var colourClick = function() {
		//remove the old border
		var current;
		if (self.selectedColour.startsWith('rgb')) {
			// If it's a random color, remove border from random swatch
			current = select("#randomSwatch");
		} else {
			current = select("#" + self.selectedColour + "Swatch");
		}
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];
		
		//set the selected colour and fill and stroke with transparency
		self.selectedColour = c;
		self.updateCurrentColor(); // Use the new function to update color with transparency
		
		//add a new border to the selected colour
		this.style("border", "2px solid blue");
	}

	//load in the colours
	this.loadColours = function() {
		this.populateOptions();
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);
		strokeWeight(this.getLineSize()); // Set initial strokeWeight based on input value
		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			//using p5.dom add the swatch to the palette and set its background colour
			//to be the colour value.
			var colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			
			// Create rainbow gradient background for random swatch
			if (this.colours[i] === "random") {
				select("#" + colourID).style("background", "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)");
			} else {
			select("#" + colourID).style("background-color", this.colours[i]);
			}
			
			colourSwatch.mouseClicked(colourClick)
		}

		select(".colourSwatches").style("border", "2px solid blue");
	};
	//call the loadColours function now it is declared
	this.loadColours();
	
	// Add event listener for line size changes
	select('#textSize').input(function() {
		strokeWeight(self.getLineSize());
	});
	
	// Add event listener for transparency changes
	select('#transparencyInput').input(function() {
		self.updateCurrentColor();
	});
}