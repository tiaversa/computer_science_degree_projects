#ifndef WEATHERENTRY_H
#define WEATHERENTRY_H
#include <string>

#pragma once

class WeatherEntry
{
public:
    WeatherEntry(std::string _timestamp, double _temperature, std::string _location);
    
    static std::string countryMapping(int i);

    static bool compareByTimestamp(WeatherEntry& e1, WeatherEntry& e2)
    {
        return e1.timestamp < e2.timestamp;
    }  
    double temperature;
    std::string location;
    std::string timestamp;

private:

};

#endif