#include "SupportCode.h"
// Code from Chat GPT
#include <sstream>
#include <iomanip>

SupportCode::SupportCode()
{

}

SupportCode::~SupportCode()
{

}

std::string SupportCode::formatWithLeadingZeros(double number) {
    int width = 2;
    std::ostringstream oss;
    oss << std::setfill('0') << std::setw(width) << number;
    return oss.str();
}
// End of code from Chat GPT