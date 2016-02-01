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


long partitionStep(std::vector<int>&, long, long);

void recur(std::vector<int>&, long, long);


void printVector(std::vector<int>&);


int main() {
    
    srand(time(0));
    
    std::vector<int> structToSort {43,43,43453,-673474,352528,393,79,36,134,16,62,255,-3452,-51};
    
    recur(structToSort, 0, structToSort.size()-1);
    
    
    
    printVector(structToSort);
    
    
    
    
    
    
    return 0;
    
}


//the partition step
long partitionStep(std::vector<int>& a, long s, long e) {
    unsigned int pivotI = (rand()%(e - s)) + s, l(s), r(e);
    std::cout << pivotI << "piv " << a.at(pivotI) << ", s-" << s << ", e-" << e << std::endl;
    int pivotVal = a.at(pivotI);
    
    
    while(l <= r) {
        bool lismet, rismet; lismet = rismet = false;
        while (!lismet) {
            if (a[l] >= pivotVal)
                lismet = true;
            else
                l++;
        };
        std::cout << l << "-l-" << a[l] << std::endl;
        while (!rismet) {
            if (a[r] <= pivotVal)
                rismet = true;
            else
                r--;
        };
        std::cout << r << "-r-" << a[r] << std::endl;
        
        if (a[l] == a[r])
            l++;
        else{
            //switch the two
            int tempLHolder = a.at(l);
            a[l] = a[r];
            a[r] = tempLHolder;
        };
        
    };
    
    
    printVector(a);
    
    
    return l;
};

//the recursive quicksort call
void recur(std::vector<int>& a, long s, long e) {
    if (s < e) {
        long pIndex = partitionStep(a, s, e);
        recur(a, s, pIndex-1);
        recur(a, pIndex+1, e);
    };
};



void printVector(std::vector<int>& v) {
    std::cout << "-----------------------------------------\n";
    for (long i = v.size(); i > 0; i--) {
        std::cout << v[i-1] << ", ";
    }
    std::cout << "Done\n-----------------------------------------\n";
};