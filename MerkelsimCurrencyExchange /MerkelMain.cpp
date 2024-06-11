#include "MerkelMain.h"
#include <iostream>
#include <vector>
#include "OrderBookEntry.h"

// constructor
MerkelMain::MerkelMain()
{

}

void MerkelMain::init()
{
    int input;
    loadOrderBook();
    while (true)
    {
        printMenu();
        input = getUserOption();
        processUserOption(input);
    }

}

void MerkelMain::loadOrderBook()
{
    orders.push_back(OrderBookEntry{5319.450228,
                                    5319.450228,
                                    "2020/03/17 17:01:24.884492",
                                    "ETH/BTC",
                                    OrderBookType::bid
                                    }
                    );
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
    std::cout << "Order Book Contains: " << orders.size() << " entries" << std::endl;
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
