#ifndef WEATHERCSVREADER_H
#define WEATHERCSVREADER_H
#include "WeatherEntry.h"
#include <string>

#pragma once

class WeatherCSVReader
{
public:
    WeatherCSVReader();
    ~WeatherCSVReader();
    std::vector<WeatherEntry> readCSV(std::string csvFilename);
private:
    void createObjectsFromLine(std::string line);
    static std::vector<std::string> tokenise(std::string csvLine, char separator);
    std::vector<WeatherEntry> entries;
};

#endif