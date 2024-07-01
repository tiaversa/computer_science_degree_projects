#include "MerkelMain.h"
#include <iostream>
#include <vector>
#include "OrderBookEntry.h"
#include "CSVReader.h"

// constructor
MerkelMain::MerkelMain()
{

}

void MerkelMain::init()
{
    int input;
    currentTime = OrderBook.getEarliestTime();
    while (true)
    {
        printMenu();
        input = getUserOption();
        processUserOption(input);
    }

}

void MerkelMain::printMenu()
{
    // 1 print help
    std::cout << "1: Print help" << std::endl;
    // 2 print exchange stats
    std::cout << "2: Print exchange stats" << std::endl;
    // 3 make an offer
    std::cout << "3: Make an offer" << std::endl;
    // 4 make a bid
    std::cout << "4: Make a bid" << std::endl;
    // 5 print wallet
    std::cout << "5: Print wallet" << std::endl;
    // 6 continue
    std::cout << "6: Continue" << std::endl;

    std::cout << "====================" << std::endl;

    std::cout << "Current time is: " << currentTime << std::endl;
}

int MerkelMain::getUserOption()
{
    int userOption;
    std::cout << "Type in 1-6: " << std::endl;
    std::cin >> userOption;
    std::cout << "You chose option: " << userOption << std::endl;
    return userOption;
}

void MerkelMain::printHelp()
{
    std::cout << "Your aim is to make money. Analyse the market and make bids and offers." << std::endl;
}

void MerkelMain::printMarketStats()
{
    for (std::string const p : OrderBook.getKnowProducts())
    {
        std::cout << "Product: " << p << std::endl;
        std::vector<OrderBookEntry> entries = OrderBook.getOrders(OrderBookType::ask, p, currentTime);
        std::cout << "ASKS seen: "<< entries.size() << std::endl;
        std::cout << "Max ask: "<< OrderBook::getHighPrice(entries) << std::endl;
        std::cout << "Min ask: "<< OrderBook::getLowPrice(entries) << std::endl;
    }
}

void MerkelMain::enteroffer()
{
    std::cout << "Make an offer - enter the amount: " << std::endl;
}

void MerkelMain::enterBid()
{
    std::cout << "Make a bid - enter the amount: " << std::endl;
}

void MerkelMain::printWallet()
{
    std::cout << "Your wallet is empty." << std::endl;
}

void MerkelMain::goToNextTimeFrame()
{
    std::cout << "Go to next time frame..." << std::endl;
    currentTime = OrderBook.getNextTime(currentTime);
}
/** like this */
void MerkelMain::processUserOption(int userOption)
{
    std::string response;
    switch (userOption)
    { 
        case 1:
            printHelp();
            break;
        case 2:
            printMarketStats();
            break;
        case 3:
            enteroffer();
            break;
        case 4:
            enterBid();
            break;
        case 5:
            printWallet();
            break;
        case 6:
            goToNextTimeFrame();
            break;
        default:
            std::cout << "Invalid choice. Choose 1-6." << std::endl;
            break;
    }
}
