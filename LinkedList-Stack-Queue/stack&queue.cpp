//
//  stack&queue.cpp
//  DataStructs_Practice
//
//  Created by Jay Patel on 2016-01-30.
//  Copyright © 2016 jay. All rights reserved.
//

#include <iostream>
#include <vector>




void printVector(std::vector<int>&);


int main() {
    
    std::vector<int> vectorToUse = {3, 23, 2424, 13991, 2};
    
    
    // for either stack or queue you can use a vector ^
    
    
    
    
    //**** STACK ******//
    // to add items to stack ( ex. int(3) ) ->
    
    vectorToUse.push_back(3);
    
    
    // to retrieve & remove items from stack ->
    
    int retrievedItem = vectorToUse.back();
    vectorToUse.pop_back();
    
    
    
    //**** QUEUE ******//
    // to add items to the queue ( ex. int(3) ) ->
    vectorToUse.push_back(3);
    
    
    // to retrieve & remove items from queue ->
    
    retrievedItem = vectorToUse.at(0);
    vectorToUse.erase(vectorToUse.begin());
    
    
    
    
    
    printVector(vectorToUse);
    
    
    
    return 0;
    
}




void printVector(std::vector<int>& v) {
    std::cout << "-----------------------------------------\n";
    for (long i = v.size(); i > 0; i--) {
        std::cout << v[i-1] << ", ";
    }
    std::cout << "Done\n-----------------------------------------\n";
};