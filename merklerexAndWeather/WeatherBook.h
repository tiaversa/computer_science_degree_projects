#ifndef WEATHERBOOK_H
#define WEATHERBOOK_H
#include "WeatherCSVReader.h"
#include "WeatherEntry.h"
#include <vector>
#include <string>

class WeatherBook
{
public:
    WeatherBook();
    std::vector<WeatherEntry> weatherByLocation(const std::string& location, const std::vector<WeatherEntry>& locationWeather);
    std::vector<WeatherEntry> yearLocationInfoObj(const std::string& year, const std::string& location, const std::vector<WeatherEntry>& yearWeather);
    std::vector<WeatherEntry> weatherByTime(const std::string& time, double substringTestSize, const std::vector<WeatherEntry>& yearWeather);
    void printVectorItems(const std::vector<WeatherEntry>& weatherVector);
    std::vector<WeatherEntry> weatherVector;
    std::string countryNameTest(std::string locationName);
    std::vector<std::string> getUniqueDates(std::string type, std::string comparator_date);
};

#endif