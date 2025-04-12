var http = require('http');

const port = 8080;

var dt = require('./date.js');
var temp = require('./temperature.js');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write("\nThe date tomorrow will be: " + dt.tomorrow());
    res.write("\nThe temperature in Fahrenheit is: " + temp.convertToFahrenheit(20));
    res.write("\nThe temperature in Celsius is: " + temp.convertToCelsius(68));
    res.end('\nHello World Again!');
}).listen(port, function() {
    console.log(`Server running at http://localhost:${port}`);
});