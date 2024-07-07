#ifndef CANDLESTICK_H
#define CANDLESTICK_H
#include <string>

#pragma once

class Candlestick
{
public:
    Candlestick( double _open, double _high, double _low, double _close, std::string _date, std::string _country);
    double open;
    double high;
    double low;
    double close;
    std::string country;
    std::string date;
    
private:

};

#endif