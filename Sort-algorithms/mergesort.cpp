//
//  mergesort.cpp
//  DataStructs_Practice
//
//  Created by Jay Patel on 2016-01-30.
//  Copyright © 2016 jay. All rights reserved.
//

#include <iostream>
#include <vector>


std::vector<int> mergeArrays(std::vector<int>&, std::vector<int>&);

void printVector(std::vector<int>&);


int main() {
    
    std::vector<int> structToSort {43,43,43453,-673474,352528,393,79,36,134,16,62,255,-3452,-51};
    
    
    
    
    
    
    std::vector<std:: vector<int>> cont1, cont2;
    bool toggler(false), toggler1(false);
    unsigned long l(0);
    
    if(structToSort.size()%2 == 0)
        l = structToSort.size();
    else{
        l = structToSort.size()-1;
        toggler = true;
    };
    
    
    for (unsigned long i(1); i < l; i+=2) {
        
        std::vector<int> tempVect {structToSort.at(i)};
        std::vector<int> tempVect1 {structToSort.at(i-1)};
        if (toggler && i == (l-1))
            tempVect1.push_back(structToSort.at(i+1));
        
        
        cont1.push_back(mergeArrays(tempVect, tempVect1));
    };
    
    structToSort.clear();
    
    bool structToSortIsUpdated = false;
    
    while (!structToSortIsUpdated) {
        std::vector<std:: vector<int>>& contn = !toggler1? cont1: cont2;
        std::vector<std:: vector<int>>& contno = !toggler1? cont2: cont1;
        
        if(contn.size()%2 == 0){
            l = contn.size();
            toggler = false;
        }
        else{
            l = contn.size()-1;
            toggler = true;
        };
        
        
        for (unsigned long i = 1; i < l; i+=2) {
            if (toggler && (i == (l-1))) {
                contno.push_back(contn.at(i+1));
            };
            
            contno.push_back(mergeArrays(contn.at(i), contn.at(i-1)));
        };
        
        
        if (contno.size() == 1) {
            structToSortIsUpdated = true;
            structToSort = contno.at(0);
            break;
        };
        
        
        contn.clear();
        toggler1 = !toggler1;
    };
    
    printVector(structToSort);
    
    
    
    
    
    
    return 0;
    
}


//the merge step
std::vector<int> mergeArrays(std::vector<int>& l, std::vector<int>& r) {
    std::vector<int> mergedArray;
    unsigned long lc(0), rc(0), lsz = l.size(), rsz = r.size();
    
    while(lc < lsz || rc < rsz) {
        if ((lc < lsz) && ( (l[lc] <= r[rc]) || (rc >= rsz) )){
            mergedArray.push_back(l[lc]);
            lc++;
        }
        else if(rc < rsz){
            mergedArray.push_back(r[rc]);
            rc++;
        };
    };
    
    return mergedArray;
};



void printVector(std::vector<int>& v) {
    std::cout << "-----------------------------------------\n";
    for (unsigned long i = v.size(); i > 0; i--) {
        std::cout << v[i-1] << ", ";
    }
    std::cout << "Done\n-----------------------------------------\n";
};