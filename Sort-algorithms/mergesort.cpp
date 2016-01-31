//
//  mergesort.cpp
//  DataStructs_Practice
//
//  Created by Jay Patel on 2016-01-30.
//  Copyright © 2016 jay. All rights reserved.
//

#include <iostream>
#include <vector>
#include <cmath>


std::vector<int> mergeArrays(std::vector<int>&, std::vector<int>&);

int main() {
    
    std::vector<int> structToSort {43,43,43453,-673474,352528,393,79,36,134,16,62,255,-3452,-51};
    
    
    
    
    
    
    std::vector<std:: vector<int>> cont1, cont2;
    bool toggler(false), toggler1(false);
    int l(0);
    
    structToSort.size()%2 == 0? l = structToSort.size(): (l = structToSort.size()-1) && (toggler = true);
    
    
    for (int i(1); i < l; i+=2) {
        
        std::vector<int> tempVect {structToSort.at(i)};
        std::vector<int> tempVect1 {structToSort.at(i-1)};
        if (toggler && i == (l-1))
            tempVect1.push_back(structToSort.at(i+1));
        
        
        cont1.push_back(mergeArrays(tempVect, tempVect1));
    };
    structToSort.clear();
    
    
    while (structToSort.empty()) {
        std::vector<std:: vector<int>>& contn = !toggler1? cont1: cont2;
        std::vector<std:: vector<int>>& contno = !toggler1? cont2: cont1;
        
        contn.size()%2 == 0? (l = contn.size()) && (toggler = false): (l = contn.size()-1) && (toggler = true);
        for (int i; i < l; i+=2) {
            if (toggler && i == (l-1))
                contno.push_back(contn.at(i+1));
            
            contno.push_back(mergeArrays(contn.at(i), contn.at(i-1)));
        }
        
        if (contno.size() == 1) {
            structToSort = contno.at(0);
            break;
        };
        
        toggler1 = !toggler1;
    };
    
    
    
    
    
    
    
    
    
    
    return 0;
    
}


//the merge step
std::vector<int> mergeArrays(std::vector<int>& v1, std::vector<int>& v2) {
    std::vector<int> mergedArray;
    
    
    
    return mergedArray;
};