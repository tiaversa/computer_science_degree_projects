#include <string>
#include <vector>
#include <iostream>
#include <fstream>

std::vector<std::string> tokenise(std::string csvLine, char separator)
{
    std::vector<std::string> tokens;
    signed int start, end; //used to delineate the position of the tokens
    std::string token;
    start = csvLine.find_first_not_of(separator,0);
    do
    {
        end = csvLine.find_first_of(separator, start);
        if (start == csvLine.length() || start == end) break;
        if (end >= 0) token = csvLine.substr(start, end - start);
        else token = csvLine.substr(start, csvLine.length() - start);
        tokens.push_back(token);
        start = end + 1;
    } while (end != std::string::npos);
    return tokens;
}

int main()
{
    std::ifstream csvFile{"projectcsv.csv"};
    std::string line;
    std::vector<std::string> tokens;

    if (csvFile.is_open())
    {
        std::cout << "File open " << std::endl;
        while (std::getline(csvFile, line))
        {
            std::cout << "Read Line " << line << std::endl;
            tokens = tokenise(line, ',');
            if (tokens.size() != 5)
            {
                std::cout << "Bad line " << line << std::endl;
                continue;
            }
            double price = std::stod(tokens[3]);
            double amount = std::stod(tokens[4]);
            std::cout << price << ':' << amount << std::endl;
        }
        csvFile.close();
    }
    else
    {
        std::cout << "Could not open file " << std::endl;
    }

    return 0;
}