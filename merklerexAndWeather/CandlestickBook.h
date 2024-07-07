#ifndef CANDLESTICKBOOK_H
#define CANDLESTICKBOOK_H
#include "Candlestick.h"
#include "WeatherCSVReader.h"
#include "WeatherBook.h"
#include "WeatherEntry.h"
#include "SupportCode.h"
#include <vector>
#include <string>
#include <iostream>

enum class candlestickDataGranularityTime{yearly, monthly, daily};
enum class candlestickDataGranularityLocation{all, country};


class CandlestickBook
{
public:
    CandlestickBook();
    void plotCanglestick(std::vector<Candlestick> CandlestickVector, double dividor);
    void printCandlestickVector(std::vector<Candlestick> CandlestickVector);
    std::vector<Candlestick> getCandlestickData();
    void predictionCandlesticks();
    
    
private:
    WeatherBook weatherBook;
    SupportCode supportCode;
    Candlestick createCandlestickFromWeatherVector(std::string date, std::string country, std::vector<WeatherEntry> scopedWeatherVector, double previousAverage);
    void candlesticksByLocation(std::vector<std::string> uniqueDatesList, std::string country, std::string timeGranularity, std::string comparator_date);
    double getHighestTemperature(const std::vector<WeatherEntry>& scopedWeatherVector);
    double getLowestTemperature(const std::vector<WeatherEntry>& scopedWeatherVector);
    double calculateAverageTemperature(const std::vector<WeatherEntry>& scopedWeatherVector);
    Candlestick calculatePredictionCandlestick(std::vector<Candlestick> candlestickRange);
    std::vector<Candlestick>  predictionCandlestickVectors(std::vector<Candlestick> candlestickRange);
    std::string getMonthYear();
    std::vector<Candlestick> candlestickvector;
    std::vector<Candlestick> getCandlestickVector(std::string timeGranularity, std::string country, std::string comparator_date);
    std::string getYear();
    std::string getLocation();
    std::vector<std::string> getDataRange();
    void printCandlestick(Candlestick test);
};

#endif