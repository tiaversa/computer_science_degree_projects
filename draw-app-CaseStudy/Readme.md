# Draw Application Case Study

## Introduction
This Draw Application is my final project for the Interactive Web Development course. It's a browser-based drawing application built using the p5.js library that allows users to create digital artwork with various tools and customization options. The application features multiple drawing tools, color selection, and image manipulation capabilities, providing a comprehensive digital canvas experience.

## How to Run the Application
1. Open the project folder in your preferred code editor
2. Launch the application using a local server:
   - If you have Visual Studio Code, you can use the Live Server extension (already configured to run on port 5501)
   - Alternatively, you can use any other local server solution
3. Open your browser and navigate to the local server address (typically http://localhost:5501)
OR
Open index.html directly in Chrome browser


## Available Tools
The application includes a variety of drawing and editing tools:

1. **Freehand Tool**: Draw freely on the canvas, similar to a pencil
2. **Line Tool**: Create straight lines between two points
3. **Rectangle Tool**: Draw rectangular shapes
4. **Circle Tool**: Create circular shapes
5. **Shape Tool**: Draw various predefined shapes
6. **Spray Can Tool**: Create spray paint effects
7. **Text Tool**: Add text to your drawings
8. **Image Tool**: Import and place images on the canvas
9. **Mirror Draw Tool**: Draw with a mirrored effect

## Color, Line Size, and Transparency Implementation

### Color Selection
I implemented a color palette system that allows users to:
- Choose from a predefined set of colors displayed as swatches
- Select a "random" option that generates random RGB values
- The selected color is highlighted with a blue border
- The current color is applied to both fill and stroke properties

### Line Size Control
The line size (stroke weight) is controlled through:
- A numeric input field in the color palette configuration section
- Users can specify values to control the thickness of lines
- The stroke weight is updated in real-time as the user changes the value

### Transparency
Transparency is implemented using:
- A slider control that adjusts the alpha channel of colors
- Values range from 0 (completely transparent) to 255 (fully opaque)
- The transparency setting affects both fill and stroke properties
- When a color is selected, its RGB values are combined with the current transparency value

All these features work together to provide a flexible and intuitive drawing experience. The color, line size, and transparency settings are managed by the ColourPalette class, which handles the UI elements and updates the drawing properties accordingly.

## Future Improvements
For future versions, I plan to add:
- Layers support for more complex compositions
- Undo/redo functionality
- More shape options and brushes
- Export to different file formats
- Custom color picker with RGB/HSL controls

This project demonstrates my understanding of JavaScript, DOM manipulation, event handling, and interactive web application development using the p5.js library.

