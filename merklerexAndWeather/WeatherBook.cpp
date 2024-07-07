#include "WeatherBook.h"
#include <iostream>

WeatherBook::WeatherBook()
{
    WeatherCSVReader weather;
    weatherVector = weather.readCSV("weather_data_EU_1980-2019_temp_only.csv");
}

std::vector<WeatherEntry> WeatherBook::weatherByLocation(const std::string& location, const std::vector<WeatherEntry>& locationWeather)
{
    std::vector<WeatherEntry> locationWeatherIn;
    for (const WeatherEntry& i : locationWeather)
    {
        if (i.location == location)
        {
            locationWeatherIn.push_back(i);
        }
    }
    return locationWeatherIn;
}

std::vector<WeatherEntry> WeatherBook::yearLocationInfoObj(const std::string& time, const std::string& location, const std::vector<WeatherEntry>& weatherVectorReceived)
{
    std::vector<WeatherEntry> newLocationWeather = weatherByLocation(location, weatherVectorReceived);
    std::vector<WeatherEntry> yearLocationWeather = weatherByTime(time, time.size(), newLocationWeather);
    return yearLocationWeather;
}

std::vector<WeatherEntry> WeatherBook::weatherByTime(const std::string& time, double substringTestSize, const std::vector<WeatherEntry>& yearWeather)
{
    std::vector<WeatherEntry> yearWeatherVector;
    for (const WeatherEntry& i : yearWeather)
    {
        if (time == i.timestamp.substr(0, substringTestSize))
        {
            yearWeatherVector.push_back(i);
        }
    }
    return yearWeatherVector;
}

void WeatherBook::printVectorItems(const std::vector<WeatherEntry>& weatherVector)
{
    for (const WeatherEntry& i : weatherVector)
    {
        std::cout << i.timestamp << ", " << i.location << ", " << i.temperature << std::endl;
    }
}

std::string WeatherBook::countryNameTest(std::string locationName)
{
    if ((locationName == "AT") or (locationName == "BE") or (locationName == "BG") or (locationName == "CH") or (locationName == "CZ") or 
        (locationName == "DE") or (locationName == "DK") or (locationName == "EE") or (locationName == "ES") or (locationName == "FI") or 
        (locationName == "FR") or (locationName == "GB") or (locationName == "GR") or (locationName == "HR") or (locationName == "HU") or 
        (locationName == "IE") or (locationName == "IT") or (locationName == "LT") or (locationName == "LU") or (locationName == "LV") or 
        (locationName == "NL") or (locationName == "NO") or (locationName == "PL") or (locationName == "PT") or (locationName == "RO") or 
        (locationName == "SE") or (locationName == "SI") or (locationName == "SK"))
    {
        return locationName;
    }
    return "ALL";
}

std::vector<std::string> WeatherBook::getUniqueDates(std::string type, std::string comparator_date)
{
    std::vector<std::string> finalVector;
    std::string test;
    double substringSize;
    if(type == "month")
    {
        std::string test = "1980-01";
        substringSize = 7;
    }
    else if(type == "day")
    {
        std::string test = "1980-01-01";
        substringSize = 10;
    }
    else
    {
        std::string test = "1980";
        substringSize = 4;
    }
    for (const WeatherEntry& i: weatherVector)
    {
        if (test != i.timestamp.substr(0, substringSize) and ((comparator_date == "none") or (comparator_date == i.timestamp.substr(0, comparator_date.size()))))
        {
            test = i.timestamp.substr(0, substringSize);
            finalVector.push_back(i.timestamp.substr(0, substringSize));
        }
    }
    return finalVector;
}