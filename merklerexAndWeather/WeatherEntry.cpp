#include "WeatherEntry.h"

WeatherEntry::WeatherEntry( std::string _timestamp, 
                            double _temperature,
                            std::string _location)
: timestamp(_timestamp), 
  temperature(_temperature), 
  location(_location)
{

}

//utc_timestamp,AT_temperature,BE_temperature,BG_temperature,CH_temperature,CZ_temperature,DE_temperature,DK_temperature,EE_temperature,ES_temperature,FI_temperature,FR_temperature,GB_temperature,GR_temperature,HR_temperature,HU_temperature,IE_temperature,IT_temperature,LT_temperature,LU_temperature,LV_temperature,NL_temperature,NO_temperature,PL_temperature,PT_temperature,RO_temperature,SE_temperature,SI_temperature,SK_temperature
std::string WeatherEntry::countryMapping(int i)
{
    if (i == 1)
    {
        return "AT";
    } 
    else if (i == 2)
    {
        return "BE";
    } 
    else if (i == 3)
    {
        return "BG";
    } 
    else if (i == 4)
    {
        return "CH";
    } 
    else if (i == 5)
    {
        return "CZ";
    } 
    else if (i == 6)
    {
        return "DE";
    } 
    else if (i == 7)
    {
        return "DK";
    } 
    else if (i == 8)
    {
        return "EE";
    } 
    else if (i == 9)
    {
        return "ES";
    } 
    else if (i == 10)
    {
        return "FI";
    } 
    else if (i == 11)
    {
        return "FR";
    } 
    else if (i == 12)
    {
        return "GB";
    } 
    else if (i == 13)
    {
        return "GR";
    } 
    else if (i == 14)
    {
        return "HR";
    } 
    else if (i == 15)
    {
        return "HU";
    } 
    else if (i == 16)
    {
        return "IE";
    } 
    else if (i == 17)
    {
        return "IT";
    } 
    else if (i == 18)
    {
        return "LT";
    } 
    else if (i == 19)
    {
        return "LU";
    } 
    else if (i == 20)
    {
        return "LV";
    } 
    else if (i == 21)
    {
        return "NL";
    } 
    else if (i == 22)
    {
        return "NO";
    } 
    else if (i == 23)
    {
        return "PL";
    } 
    else if (i == 24)
    {
        return "PT";
    } 
    else if (i == 25)
    {
        return "RO";
    } 
    else if (i == 26)
    {
        return "SE";
    } 
    else if (i == 27)
    {
        return "SI";
    } 
    else if (i == 28)
    {
        return "SK";
    } 
    return "ALL";
}
