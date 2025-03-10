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
		
		fill(r, g, b, transparency); 
		stroke(r, g, b, transparency);
		strokeWeight(lineSize);
	}

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
	this.loadColours();
	
	select('#textSize').input(function() {
		strokeWeight(self.getLineSize());
	});
	
	select('#transparencyInput').input(function() {
		self.updateCurrentColor();
	});
}