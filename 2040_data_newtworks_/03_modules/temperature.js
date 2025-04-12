exports.convertToFahrenheit = function (celsius) {
    return (celsius * 9/5) + 32;
};

exports.convertToCelsius = function (fahrenheit) {
    return (fahrenheit - 32) * 5/9;
};