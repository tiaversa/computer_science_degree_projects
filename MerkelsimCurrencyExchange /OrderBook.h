#ifndef ORDERBOOK_H
#define ORDERBOOK_H
#include "OrderBookEntry.h"
#include "CSVReader.h"
#include <string>
#include <vector>

#pragma once

class OrderBook
{
    public:
        /** Construct, reading a csv data file */
        OrderBook(std::string filename);
        /** return vector of all know products in the dataset */
        std::vector<std::string> getKnowProducts();
        /** resturn vector of Orders according to the sent filters */
        std::vector<OrderBookEntry> getOrders(OrderBookType type,
                                                std::string product,
                                                std::string timestamp);
        std::string getEarliestTime();
        std::string getNextTime(std::string timestamp);
        static double getHighPrice(std::vector<OrderBookEntry>& orders);
        static double getLowPrice(std::vector<OrderBookEntry>& orders);
    private:
        std::vector<OrderBookEntry> orders;
};

#endif