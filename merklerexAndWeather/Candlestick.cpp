#include "Candlestick.h"

Candlestick::Candlestick( double _open,
                        double _high,
                        double _low,
                        double _close,
                        std::string _date,
                        std::string _country)
: open(_open),
high(_high),
low(_low),
close(_close),
date(_date),
country(_country)
{

}
