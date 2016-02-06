//
//  linkedlist.cpp
//  DataStructs_Practice
//
//  Created by Jay Patel on 2016-01-30.
//  Copyright © 2016 jay. All rights reserved.
//

#include <iostream>




class lItem {
    
public:
    int value;
    lItem** link;
};

int main() {
    
    
    //array to init values with
    int init[] = {1, 3, 24, 530, -3};
    
    
    // create root item
    lItem *root, *traverser;
    root = new lItem; root -> value = init[0]; root -> link = 0;
    
    
    
    
    // populate list on top of root item
    traverser = root;
    
    
    for (int i(1); i < 5; i++) {
        lItem *newItem; newItem = new lItem; newItem -> value = init[i]; newItem -> link = 0;
        traverser -> link = &newItem;
        traverser = newItem;
    };
    
    
    
    
    return 0;
    
}
