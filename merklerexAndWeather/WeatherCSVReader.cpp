#include "WeatherCSVReader.h"
#include <iostream>
#include <fstream>
#include <string>

WeatherCSVReader::WeatherCSVReader()
{

}

WeatherCSVReader::~WeatherCSVReader()
{

}

std::vector<WeatherEntry> WeatherCSVReader::readCSV(std::string csvFilename)
{
    std::ifstream csvFile{csvFilename};
    std::string line;
    if (csvFile.is_open())
    {
        while(std::getline(csvFile, line))
        {
            try {
                createObjectsFromLine(line);
                
            }catch(const std::exception& e)
            {
                std::cout << "CSVReader::readCSV bad data " << std::endl;
            }
        }
        return entries;
    }
    return entries;
}
// Deal with each line
void WeatherCSVReader::createObjectsFromLine(std::string line)
{
    std::vector<std::string> obe = tokenise(line, ',');
    std::string timestamp;
    double temperature = 0;

    for (std::size_t i = 0; i != obe.size(); ++i) {
        if (i == 0)
        {
            timestamp = obe[i];
        }
        else
        {
            std::string country = WeatherEntry::countryMapping(i);
            try {
                temperature = std::stod(obe[i]);
                WeatherEntry we{timestamp, temperature, country};
                entries.push_back(we);
            }catch(const std::exception& e){
                // std::cout << "CSVReader::readCSV bad data on line: " << line << std::endl;   Come back to fix files  
            }
        }
    }
}

std::vector<std::string> WeatherCSVReader::tokenise(std::string csvLine, char separator)
{
   std::vector<std::string> tokens;
   signed int start, end;
   std::string token;
    start = csvLine.find_first_not_of(separator, 0);
    do{
        end = csvLine.find_first_of(separator, start);
        if (start == csvLine.length() || start == end) break;
        if (end >= 0) token = csvLine.substr(start, end - start);
        else token = csvLine.substr(start, csvLine.length() - start);
        tokens.push_back(token);
    start = end + 1;
    }while(end > 0);

   return tokens; 
}