//
//  quicksort.cpp
//  DataStructs_Practice
//
//  Created by Jay Patel on 2016-01-30.
//  Copyright © 2016 jay. All rights reserved.
//

#include <iostream>
#include <vector>
#include <stdlib.h>




void printVector(std::vector<int>&);


int main() {
    
    srand(time(0));
    
    
    
    
    
    return 0;
    
}




void printVector(std::vector<int>& v) {
    std::cout << "-----------------------------------------\n";
    for (long i = v.size(); i > 0; i--) {
        std::cout << v[i-1] << ", ";
    }
    std::cout << "Done\n-----------------------------------------\n";
};