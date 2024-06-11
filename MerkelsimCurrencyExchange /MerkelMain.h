#ifndef MERKELMAIN_H
#define MERKELMAIN_H
#include <vector>
#include "OrderBookEntry.h"
#pragma once

class MerkelMain
{
public:
    MerkelMain();
    /** Call this to start the sim */
    void init();
    
private:
    void loadOrderBook();
    void printMenu();
    int getUserOption();
    void printHelp();
    void printMarketStats();
    void enteroffer();
    void enterBid();
    void printWallet();
    void goToNextTimeFrame();
    void processUserOption(int userOption);

    std::vector<OrderBookEntry> orders;
    
};

#endif