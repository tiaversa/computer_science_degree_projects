#include "CandlestickBook.h"
#include <iomanip>


CandlestickBook::CandlestickBook()
{
    WeatherBook weatherBook;
}

void CandlestickBook::predictionCandlesticks()
{
    std::cout << "We will perform predictions based on yearly data, each prediction will be based on the moving average of last 5 years." << std::endl;
    std::cout << "Firstly we will chose the location." << std::endl;
    std::string location = getLocation();
    std::vector<Candlestick> candleVector = getCandlestickVector("year", location, "none");
    std::vector<Candlestick> candlestickVector = predictionCandlestickVectors(candleVector);
    plotCanglestick(candlestickVector,1);
}

std::vector<Candlestick>  CandlestickBook::predictionCandlestickVectors(std::vector<Candlestick> candlestickRange)
{
    int amountyear = 8;
    std::vector<Candlestick> candleVectorProdiction;
    std::vector<Candlestick> candleVectorRunner;
    std::vector<Candlestick> candleVector;
    Candlestick latestPrediction (0, 0, 0, 0, "1980", "ALL");
    for (int i = 0; i < candlestickRange.size(); i++)
    {
        if(i < amountyear)
        {
            candleVector.push_back(candlestickRange[i]);
        }
        else
        {
            candleVectorRunner = candleVector;
            candleVector.clear();
            for (int j = 1; j < amountyear + 1; j++)
            {
                candleVector.push_back(candleVectorRunner[j]);
            }
            candleVector.push_back(candlestickRange[i]);
            latestPrediction = calculatePredictionCandlestick(candleVector);
            candleVectorProdiction.push_back(latestPrediction);
        }
    }
    for (int h = 0; h < amountyear; h++)
    {
        candleVectorRunner = candleVector;
        candleVector.clear();
            for (int j = 1; j < amountyear + 1; j++)
            {
                candleVector.push_back(candleVectorRunner[j]);
            }
            candleVector.push_back(latestPrediction);
            latestPrediction = calculatePredictionCandlestick(candleVector);
            candleVectorProdiction.push_back(latestPrediction);
    }
    return candleVectorProdiction;
}

Candlestick CandlestickBook::calculatePredictionCandlestick(std::vector<Candlestick> candlestickRange)
{
    double sum = 0;
    double count = candlestickRange.size();
    std::string date;
    std::string country;
    double sumHigh;
    double sumClose;
    double sumLow;
    double sumOpen;
    if (count == 0)
    {
        std::cout << "Problem calculating the average." << std::endl;
        throw;
    }
    for (const Candlestick& value: candlestickRange)
    {
        sumHigh += value.high;
        sumClose += value.close;
        sumLow += value.low;
        sumOpen += value.open;
        date = value.date;
        country = value.country;
    }
    int newDate = std::stoi(date) + 1;
    return Candlestick(sumOpen / count, sumHigh / count, sumLow / count, sumClose / count, std::to_string(newDate), country);
}


std::vector<Candlestick> CandlestickBook::getCandlestickData()
{
    std::cout << "First we will chose the date range." << std::endl;
    std::vector<std::string> time = getDataRange();
    std::cout << "Next, we will chose the location." << std::endl;
    std::string location = getLocation();
    std::vector<Candlestick> candleVector = getCandlestickVector(time[0], location, time[1]);
    return candleVector; 
}

std::vector<std::string> CandlestickBook::getDataRange()
{
    std::vector<std::string> results;
    std::string line;
    std::cout << "Possible date ranges are 1.year, 2.month and 3.day . With a default set for year." << std::endl;
    std::cout << "Select the date range desired: " << std::endl;
    std::getline(std::cin, line);
    std::string response;
    std::string time_response;
    try{
        double userOption = std::stoi(line);
        if(userOption == 1) { response = "year"; }
        else if(userOption == 2) { response = "month"; }
        else if(userOption == 3) { response = "day"; }
        else {response = "year";}
    }catch(const std::exception& e)
    {
        if((line == "month") or (line == "day") or (line == "year"))
        {
            response = line;
        }
        else {response = "year";}
    }
    std::cout << "You have selected: " << response << std::endl;
    if (response == "month")
    {
        time_response = getYear();
    }
    else if (response == "day")
    {
        time_response = getMonthYear();
    }
    else {time_response = "none";}
    results.push_back(response);
    results.push_back(time_response);
    return results;
}

std::string CandlestickBook::getLocation()
{
    std::string location;
    std::string line;
    std::cout << "Possible locations: " << std::endl;
    for (size_t i = 1; i < 28; i++)
    {
        std::cout << i << "." << WeatherEntry::countryMapping(i) << std:: endl;
    }
    std::cout << "Select the location desired: " << std::endl;
    std::getline(std::cin, line);
    try{
        double userOption = std::stoi(line);
        location = WeatherEntry::countryMapping(userOption);
    }catch(const std::exception& e)
    {
        location = weatherBook.countryNameTest(line);
    }
    std::cout << "You have selected: " << location << std::endl;
    return location;
}

std::string CandlestickBook::getYear()
{
    std::string line;
    int userOption = 0;
    std::cout << "Please request the expected year (default is 2000): " << std::endl;
    std::getline(std::cin, line);
    try{
        userOption = std::stoi(line);
        if ((userOption >= 1980) and (userOption <= 2019))
        {
            std::cout << "You have selected: " << userOption << std::endl;
            return std::to_string(userOption);
        }
    }catch(const std::exception& e)
    {
        
    }
    std::cout << "You have selected an unexpected input, set to defaul 2000. " << std::endl;
    return "2000";
}

std::string CandlestickBook::getMonthYear()
{
    std::string year = getYear();
    std::string line;
    int userOption = 0;
    std::cout << "Please request the expected month (default is 01st): " << std::endl;
    std::getline(std::cin, line);
    try{
        userOption = std::stoi(line);
        if ((userOption >= 1) and (userOption <= 12))
        {
            std::cout << "You have selected: " << year + "-" + supportCode.formatWithLeadingZeros(userOption) << std::endl;
            return year + "-" + supportCode.formatWithLeadingZeros(userOption);
        }
    }catch(const std::exception& e)
    {
        
    }
    std::cout << "You have selected an unexpected input, set to defaul: " + year + "-01" << std::endl;
    return year + "-01";
}

Candlestick CandlestickBook::createCandlestickFromWeatherVector(std::string date, std::string country, std::vector<WeatherEntry> scopedWeatherVector, double previousAverage)
{
    double open = previousAverage;
    double high = getHighestTemperature(scopedWeatherVector);
    double low = getLowestTemperature(scopedWeatherVector);
    double close = calculateAverageTemperature(scopedWeatherVector);
    return Candlestick(open, high, low, close, date, country);
}

std::vector<Candlestick> CandlestickBook::getCandlestickVector(std::string timeGranularity, std::string country, std::string comparator_date)
{
    std::vector<std::string> uniqueDatesList = weatherBook.getUniqueDates(timeGranularity,comparator_date);
    candlestickvector.clear();
    if (country != "ALL")
    {
        candlesticksByLocation(uniqueDatesList, country, timeGranularity, comparator_date);
    }
    else
    {
        for (double i = 1; i < 28; i++)
        {
            std::string country = WeatherEntry::countryMapping(i);
            candlesticksByLocation(uniqueDatesList, country, timeGranularity, comparator_date);
        }
        
    }
    return candlestickvector;
    
}

void CandlestickBook::candlesticksByLocation(std::vector<std::string> uniqueDatesList, std::string country, std::string timeGranularity, std::string comparator_date)
{
    double previousAverage = 0;
    for (std::string& date : uniqueDatesList)
    {
        std::vector<WeatherEntry> yearLocationWeather = weatherBook.yearLocationInfoObj(date, country, weatherBook.weatherVector);
        Candlestick test = createCandlestickFromWeatherVector(date, country, yearLocationWeather, previousAverage);
        previousAverage = test.close;
        candlestickvector.push_back(test);
    }
}

double CandlestickBook::getHighestTemperature(const std::vector<WeatherEntry>& scopedWeatherVector)
{
    double highestTemperature = -1000;
    for (const WeatherEntry& we : scopedWeatherVector)
    {
        if (we.temperature > highestTemperature)
        {
            highestTemperature = we.temperature;
        }
    }
    return highestTemperature;
}

double CandlestickBook::getLowestTemperature(const std::vector<WeatherEntry>& scopedWeatherVector)
{
    double lowestTemperature = 1000;
    for (const WeatherEntry& we : scopedWeatherVector)
    {
        if (we.temperature < lowestTemperature)
        {
            lowestTemperature = we.temperature;
        }
    }
    return lowestTemperature;
}

double CandlestickBook::calculateAverageTemperature(const std::vector<WeatherEntry>& scopedWeatherVector)
{
    double sum = 0;
    double count = scopedWeatherVector.size();
    if (count == 0)
    {
        return 0;
    }
    for (const WeatherEntry& value: scopedWeatherVector)
    {
        sum += value.temperature;
    }
    return sum / count;
}

void CandlestickBook::printCandlestick(Candlestick test)
{
    std::cout << "Date: " << test.date<< " Open: "  << test.open << " High: " << test.high << " Low: " << test.low << " Close: " << test.close << " Country: " << test.country << std::endl;
}

void CandlestickBook::plotCanglestick(std::vector<Candlestick> CandlestickVector, double dividor)
{
    double candleSpacing = 4;
    double lowestnumber = 1000;
    double highestnumber = -1000;
    for (Candlestick& i: CandlestickVector)
    {
        if(i.low < lowestnumber) { lowestnumber = i.low; }
        if(i.high > highestnumber) { highestnumber = i.high; }
    }
    for (double printingLine = std::round(highestnumber); printingLine >= std::round(lowestnumber); printingLine = printingLine - dividor)
    {
        std::cout << std::setw(candleSpacing) << std::right << printingLine;
        for (Candlestick& i: CandlestickVector)
        {
            double candleTop;
            double candleBottow;
            if(i.open >= i.close)
            {
                candleTop = std::round(i.open);
                candleBottow = std::round(i.close);
            }
            else
            {
                candleTop = std::round(i.close);
                candleBottow = std::round(i.open);
            }
            if((printingLine < candleTop + dividor) and (printingLine >= candleTop) or 
                (printingLine > candleBottow - dividor) and (printingLine <= candleBottow))
            {
                std::cout << std::setw(candleSpacing) << std::right << "- ";
            }
            else if((printingLine < candleTop) and (printingLine > candleBottow))
            {
                std::cout << std::setw(candleSpacing) << std::right << "|/|";
            }
            else if((printingLine <= i.high) and (printingLine >= i.low))
            {
                std::cout << std::setw(candleSpacing) << std::right << "| ";
            }
            else
            {
                std::cout << std::setw(candleSpacing) << std::right << " ";
            }

        }
        std::cout << " " << std::endl;
    }
    std::cout << std::setw(candleSpacing) << std::right << " ";
    for (Candlestick& i: CandlestickVector)
    {
        std::cout << std::setw(candleSpacing) << std::right << i.date;
    }
    std::cout << " " << std::endl;
    
}

void CandlestickBook::printCandlestickVector(std::vector<Candlestick> CandlestickVector)
{
    for (Candlestick& i : CandlestickVector)
    {
        printCandlestick(i);
    }
}
