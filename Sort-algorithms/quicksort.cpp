//
//  quicksort.cpp
//  DataStructs_Practice
//
//  Created by Jay Patel on 2016-01-30.
//  Copyright © 2016 jay. All rights reserved.
//

#include <iostream>
#include <vector>


void partitionStep(std::vector<int>&, unsigned int, unsigned int);

void printVector(std::vector<int>&);


int main() {
    
    std::vector<int> structToSort {43,43,43453,-673474,352528,393,79,36,134,16,62,255,-3452,-51};
    
    
    
    
    
    printVector(structToSort);
    
    
    
    
    
    
    return 0;
    
}


//the partition step
void partitionStep(std::vector<int>& a, unsigned int s, unsigned int e) {
    
};



void printVector(std::vector<int>& v) {
    std::cout << "-----------------------------------------\n";
    for (unsigned long i = v.size(); i > 0; i--) {
        std::cout << v[i-1] << ", ";
    }
    std::cout << "Done\n-----------------------------------------\n";
};