//todo
	//use jquery + html/css for visualization of tree
	//find way to alter _height of tree efficiently when removin a node





var binaryTreeConstructor = {
	"createTreeWithArrayInput": function(arr) {
		var dataStore = {
			"name": "binaryTree",
			"dataContainer": {},
			"_height": 0,
			"_totalItemsAddedCount": 0
		};
		var arrStore = arr;

		//sort array --> this is for initialization so this brute force method won't have to be applied again after this

		var isSorted = false; //variable checking if array is sorted

		while (!isSorted) {

			var arrStoreLen = arrStore.length; //store so we don't have to recompute for every iteration of the for loop below

			for (var i = 1; i < arrStoreLen; i++) { //go from top to bottom - start at one so variable 'b' below can look at the item before item at index i (variable 'a')

				var a = arrStore[i]; //get the identifier of item at index i

				var b = arrStore[i - 1]; //get identifier of item before variable 'a'

				var c  = a.ID - b.ID; //compare the two

				if (c<0) { // if the item before is larger than the current item...
					// ...swap positions
					arrStore[i] = b;
					arrStore[i - 1] = a;
					isSorted = isSorted? false: isSorted; //and set isSorted to false if it has been set to true - [**1**]
				}
				else if(i == 1) { //if the second item is larger than the first item in the entire array...
					isSorted = true; // ...set isSorted to 'true'. isSorted will remain true while the for loop iterated through all the items in the array
																							// **it will only remain true if while looping all the items are sorted,
																							// otherwise the operation at [**1**] will set the isSorted variable to false and this will cause the while loop to run again and again until the array is sorted
				};
			};
		};
		var initNode = Math.floor(arrStore.length * 0.5); //get the index of the middle node in the array
		var zeroVar = String('0'); // variable set to string 0
		dataStore.dataContainer[zeroVar] = {}; //initialize the first object in the binary dataStore
		dataStore.dataContainer[zeroVar].dataValue = arrStore[initNode].ID; //add the middle node's ID from the array into the value container
		dataStore.dataContainer[zeroVar]._source = arrStore[initNode]; //add the full object into the _source field
		dataStore.dataContainer[zeroVar].leftHand = null; //assign left and right hand pointers to null
		dataStore.dataContainer[zeroVar].rightHand = null;
		arrStore.splice(initNode, 1); //remove the middle node from the array as it has been added to the binary tree
		dataStore._totalItemsAddedCount += 1; //increment the total items added count of the tree
		dataStore._height += 1; //increment the height count of the tree
		for (var i = 0; i < arrStore.length; i++) { //loop through every node to insert into the truee
			var isMatch = false;
			var $this = arrStore[i]; //get the node to be insertied
			var dataStoreTraversingIndex = 0; //index to use for insertions
			var depthTraversed = 1;  //have a variable checking how deep the tree has been traversed
			while(!isMatch) { //loop until item has been inserted
				var toBeScrutinized = dataStore.dataContainer[dataStoreTraversingIndex.toString()]; // get current node
				if ($this.ID <= toBeScrutinized.dataValue) { // compare the values --> if node to be inserted is less than or equal to retrieved node in tree...
					if (toBeScrutinized.leftHand) { // if the node retrieved from tree has a left hand node...
						dataStoreTraversingIndex = toBeScrutinized.leftHand; // ...change item to be retrievd from tree to be that left node
					}
					else { // otherwise if there is nothing to the left hand assign node to be inserted into the left hand
						var insertIndex = dataStore._totalItemsAddedCount;
						dataStore.dataContainer[dataStoreTraversingIndex.toString()].leftHand = insertIndex;
						dataStore.dataContainer[insertIndex.toString()] = {};
						dataStore.dataContainer[insertIndex.toString()].dataValue = $this.ID;
						dataStore.dataContainer[insertIndex.toString()]._source = $this;
						dataStore.dataContainer[insertIndex.toString()].leftHand = null;
						dataStore.dataContainer[insertIndex.toString()].rightHand = null;
						dataStore._totalItemsAddedCount +=1;
						dataStore._height = dataStore._height > depthTraversed? dataStore._height: depthTraversed;
						isMatch = true; //end while loop and go onto next item to be inserted
						break;
					};
				}
				else { // if node to be inserted is greater than the retrieved node in tree follow similar steps as left hand, except with right hand assignments
					if (toBeScrutinized.rightHand) {
						dataStoreTraversingIndex = toBeScrutinized.rightHand;
					}
					else {
						var insertIndex = dataStore._totalItemsAddedCount;
						dataStore.dataContainer[dataStoreTraversingIndex.toString()].rightHand = insertIndex;
						dataStore.dataContainer[insertIndex.toString()] = {};
						dataStore.dataContainer[insertIndex.toString()].dataValue = $this.ID;
						dataStore.dataContainer[insertIndex.toString()]._source = $this;
						dataStore.dataContainer[insertIndex.toString()].leftHand = null;
						dataStore.dataContainer[insertIndex.toString()].rightHand = null;
						dataStore._totalItemsAddedCount +=1;
						dataStore._height = dataStore._height > depthTraversed? dataStore._height: depthTraversed;
						isMatch = true;
						break;
					};
				};
				depthTraversed += 1; // if item hasn't been inserted (the retrireved item from the tree has left or right hand assignments to move to), increment depth by one and go down one point
			};
		};
		return dataStore;
	},
	"searchTree": function(treeObject, matchValue) { //match value is the identifier value of the item to retrieve
		var dataStore = treeObject; //tree to search through --> probably set this globaly for actual implementation
		var result; //preset result variable
		var dataStoreTraversingIndex = 0; //item index in array of tree 
		while(!result) { //loop until result found
			var underScrutiny = dataStore.dataContainer[dataStoreTraversingIndex.toString()]; //retrieve top item in tree
			if (matchValue == underScrutiny.dataValue) { //if matches return obj
				result = {
					"index": dataStoreTraversingIndex,
					"obj": underScrutiny
				};
				break;
			}
			else if(matchValue < underScrutiny.dataValue) { //otherwise if is less than...
				if (underScrutiny.leftHand) { // ...and there is a node on the left
					dataStoreTraversingIndex = underScrutiny.leftHand; // retrieve that left node and repeat the while loop
				}
				else { // or return null objs
					result = {
						"index": -1,
						"obj": {
							"value": null,
							"leftHand": null,
							"rightHand": null
						}
					};
					break;
				};
			}
			else { //do same if is greater than, but for right hand instead of left hand 
				if (underScrutiny.rightHand) {
					dataStoreTraversingIndex = underScrutiny.rightHand;
				}
				else {
					result = {
						"index": -1,
						"obj": {
							"value": null,
							"leftHand": null,
							"rightHand": null
						}
					};
					break;
				};
			};
		};
		return result;
	},
	"insertInTree": function(treeObject, objToInsert) {
		var dataStore = treeObject; // send over tree object
		var isMatch = false; //init match check
		var dataStoreTraversingIndex = 0; // init index of item in tree to retrieve
		var depthTraversed = 1; // get depth var 
		while(!isMatch) {
			var toBeScrutinized = dataStore.dataContainer[dataStoreTraversingIndex.toString()]; //retrieve node from tree with index
			if (objToInsert.ID <= toBeScrutinized.dataValue) { //compare to see if retrieved is less than obj to insert
				if (toBeScrutinized.leftHand) { //if retrieved has left hand, assign the index to left hand and rerun loop with the retrieval of the left hand object
					dataStoreTraversingIndex = toBeScrutinized.leftHand;
				}
				else { //otherwise assign this node to the left hand of the retrieved node and return the new tree
					var insertIndex = dataStore._totalItemsAddedCount;
					dataStore.dataContainer[dataStoreTraversingIndex.toString()].leftHand = insertIndex;
					dataStore.dataContainer[insertIndex.toString()] = {};
					dataStore.dataContainer[insertIndex.toString()].dataValue = objToInsert.ID;
					dataStore.dataContainer[insertIndex.toString()]._source = objToInsert;
					dataStore.dataContainer[insertIndex.toString()].leftHand = null;
					dataStore.dataContainer[insertIndex.toString()].rightHand = null;
					dataStore._totalItemsAddedCount +=1;
					dataStore._height = dataStore._height > depthTraversed? dataStore._height: depthTraversed;
					isMatch = true;
					break;
				};
			}
			else { //if nodeid is greater than retrieved item id, do same as left hand except for right hand
				if (toBeScrutinized.rightHand) {
					dataStoreTraversingIndex = toBeScrutinized.rightHand;
				}
				else {
					var insertIndex = dataStore._totalItemsAddedCount;
					dataStore.dataContainer[dataStoreTraversingIndex.toString()].rightHand = insertIndex;
					dataStore.dataContainer[insertIndex.toString()] = {};
					dataStore.dataContainer[insertIndex.toString()].dataValue = objToInsert.ID;
					dataStore.dataContainer[insertIndex.toString()]._source = objToInsert;
					dataStore.dataContainer[insertIndex.toString()].leftHand = null;
					dataStore.dataContainer[insertIndex.toString()].rightHand = null;
					dataStore._totalItemsAddedCount +=1;
					dataStore._height = dataStore._height > depthTraversed? dataStore._height: depthTraversed;
					isMatch = true;
					break;
				};
			};
			depthTraversed += 1;
		};
		return dataStore;
	},
	"removeFromTree": function(treeObject, objToRemove) {/*, numberOfInstancesOfValueToRemove) {*/
		//*removed* var repeatLoopFor = numberOfInstancesOfValueToRemove; //how many instances of this id exist and are to be removed
		//*this will just remove all instances of the obj*
		var dataStore = treeObject;
		var endHitWithNoMatch = false; //init var that checks if the loop has run through and hit the end of a tree without an matches are left/ever existed
		var noMachEverExisted = true; //errchecking
		while(!endHitWithNoMatch) { //loop until all instances of objToRemove node are gone
			var dataStoreTraversingIndex = 0; // index to count traversing point
			var dataStoreTraversingIndex2 = -1; // index to count point before last tranversing point for removing left or right hand assignments and pointing them to next item
			var lastDirection = null; //true is right, false is left
			var depthTraversed = 1; //see how deep it has went
			var isMatch = false; //keep going until match found
			while(!isMatch) { // ^
				var toBeScrutinized = dataStore.dataContainer[dataStoreTraversingIndex.toString()];
				if (!toBeScrutinized) {
					endHitWithNoMatch = true;
					break;
				};
				if (objToRemove.ID == toBeScrutinized.dataValue) { //see if this node is the object that needs to be removed
					noMachEverExisted = false;//errchecking
					if (toBeScrutinized.leftHand) { // if there is a left hand of this node
						if (dataStoreTraversingIndex2 > -1) { //if this isn't the top node of the tree
							if (lastDirection == true) { //if the last direction the tree went to is the rightHand
								dataStore.dataContainer[dataStoreTraversingIndex2.toString()].rightHand = toBeScrutinized.leftHand; //assign the right hand of the parent node to the left hand of this node
							}
							else{ //if the last direction the tree went to is leftHand
								dataStore.dataContainer[dataStoreTraversingIndex2.toString()].leftHand = toBeScrutinized.leftHand; //assign the right hand of the parent node to the left hand of this node
							};
						};

						if(toBeScrutinized.rightHand) { //if this node has a right hand
							var findEndOfLeftHandSubTreeOfNodeToBeRemoved = false; //value for while loop going through to end of right hand sub tree
							dataStoreTraversingIndex3 = toBeScrutinized.leftHand; //set the traversing index for node retrieval to the left hand of the item under scrutiny
							while (!findEndOfLeftHandSubTreeOfNodeToBeRemoved) { //loop until the bottom of the left hand sub tree is reached
								var toBeScrutinized3 = dataStore.dataContainer[dataStoreTraversingIndex3.toString()];
								if (toBeScrutinized3.rightHand) { //if this has a right hand
									dataStoreTraversingIndex3 = toBeScrutinized3.rightHand; //go down the right hand of the sub tree form this node point this loops until bottom of rightmost node is hit
								}
								else { //if rightmost node on tree is hit (highest value of lefthand sub tree), point righthand of this to the right hand of the node to be removed
									dataStore.dataContainer[dataStoreTraversingIndex3.toString()].rightHand = toBeScrutinized.rightHand;
									findEndOfLeftHandSubTreeOfNodeToBeRemoved = true;
									break;
								};
							};
						};
					}
					else if(toBeScrutinized.rightHand) { //if there is no left hand of this node but there is a right hand
						if (dataStoreTraversingIndex2 > -1) { // if this is not the top node
							if (lastDirection == true) { //if last direction turned was right
								dataStore.dataContainer[dataStoreTraversingIndex2.toString()].rightHand = toBeScrutinized.rightHand; // point right hand of this node to the right hand of the parent node
							}
							else{ //if last direction turned was left
								dataStore.dataContainer[dataStoreTraversingIndex2.toString()].leftHand = toBeScrutinized.rightHand;// point left hand of this node to the right hand of the parent node
							};
						};
						//no effective way of reducing height yet
						// else{
						// 	dataStore._height -= 1;
						// };

					};

					delete dataStore.dataContainer[dataStoreTraversingIndex.toString()];
					isMatch = true;
					break;
				}
				else if(objToRemove.ID < toBeScrutinized.dataValue) {//if obj to remove is to the left of this item
					dataStoreTraversingIndex2 = dataStoreTraversingIndex; //point to left and rerun while loop
					dataStoreTraversingIndex = toBeScrutinized.leftHand;
					lastDirection = false;
					if (!dataStoreTraversingIndex) {//if tree has been traversed and no match
						isMatch = true;
						endHitWithNoMatch = true;
						break;
					};
				}
				else {//if obj to remove is to the right of this item
					dataStoreTraversingIndex2 = dataStoreTraversingIndex;//point to right and rerun while loop
					dataStoreTraversingIndex = toBeScrutinized.rightHand;
					lastDirection = true;
					if (!dataStoreTraversingIndex) {//if tree has been traversed and no match
						isMatch = true;
						endHitWithNoMatch = true;
						break;
					};
				};

			};
		};
		if (noMachEverExisted) {
			alert('No matches');
		};
		return dataStore;
	}
};


var initDataValues = [
	{
		"ID": 2, //the identifier key that will be used to retrieve data --> make sure this is comparable with other keys using <. > and ==
		"otherData": "swag" //any other sort of data you wish to store in each node
	},
	{
		"ID": 4,
		"otherData": "swag4"
	},
	{
		"ID": 5,
		"otherData": "swag5"
	},
	{
		"ID": 11,
		"otherData": "swag11"
	},
	{
		"ID": 4,
		"otherData": "swag4"
	},
	{
		"ID": 2457,
		"otherData": "swag2457"
	},
	{
		"ID": 42,
		"otherData": "swag42"
	},
	{
		"ID": 722,
		"otherData": "swag722"
	},
	{
		"ID": 97,
		"otherData": "swag97"
	},
	{
		"ID": 1248,
		"otherData": "swag1248"
	},
	{
		"ID": 85,
		"otherData": "swag85"
	},
	{
		"ID": 13,
		"otherData": "swag13"
	},
	{
		"ID": 52,
		"otherData": "swag52"
	},
	{
		"ID": 35,
		"otherData": "swag35"
	}
];


//going to implement visualization and control codes below.


function updateDisplayTree(thisDatr) {
	$('h2').data("treeInfo", thisDatr);
	var res1Len = thisDatr._totalItemsAddedCount;
	$('.nodeItem').remove();
	for (var i = 0; i < res1Len; i++) {
		var $this = thisDatr.dataContainer[i.toString()];
		if ($this) {
			if ($this.dataValue) {
				var htmlThing = '<div class="nodeItem" data-nodeIndex="'+ i +'" data-nodeIdentifier="'+ $this.dataValue +'" data-leftHand="'+$this.leftHand+'" data-rightHand="'+$this.rightHand+'" style="margin-left:'+Math.random()*700+'px"><span class="horPiece LH"></span><span class="verPiece LH"></span><span class="horPiece RH"></span><span class="verPiece RH"></span><p class="nodeIndexName">'+ i +'</p><div><p>ID: '+ $this.dataValue +'</p><span>otherData: '+ $this._source.otherData +'</span></div></div>';
				$('body').append(htmlThing);
			};
		};
	};
	$('.nodeItem').each(function() {
		var $thisInserted = $(this);
		var $thisLeftHandNode = $('.nodeItem[data-nodeIndex="' + $thisInserted.attr('data-leftHand') + '"]');
		var $thisRightHandNode = $('.nodeItem[data-nodeIndex="' + $thisInserted.attr('data-rightHand') + '"]');
		if ($thisLeftHandNode.length) {
			var horLH = $thisInserted.children('.horPiece.LH');
			horLH.css('top', $thisInserted.offset().top);
			horLH.width(Math.abs($thisLeftHandNode.offset().left - $thisInserted.offset().left));
			if (($thisInserted.offset().left - $thisLeftHandNode.offset().left)>0) {
				horLH.css({'left': $thisLeftHandNode.offset().left});
				$thisInserted.children('.verPiece.LH').css('left', $thisLeftHandNode.offset().left);
			}
			else{
				horLH.css({'left':  $thisInserted.offset().left});
				$thisInserted.children('.verPiece.LH').css('left', $thisInserted.offset().left + horLH.outerWidth());
			};
			$thisInserted.children('.verPiece.LH').height(Math.abs($thisLeftHandNode.offset().top - $thisInserted.offset().top));
			if (($thisLeftHandNode.offset().top - $thisInserted.offset().top)>0) {
				$thisInserted.children('.verPiece.LH').css('top', $thisInserted.offset().top);
			}
			else{
				$thisInserted.children('.verPiece.LH').css('top', $thisLeftHandNode.offset().top);
			};
		};
		if ($thisRightHandNode.length) {
			var horRH = $thisInserted.children('.horPiece.RH');
			horRH.css('top', $thisInserted.offset().top);
			horRH.width(Math.abs( ($thisRightHandNode.offset().left + $thisRightHandNode.outerWidth()) -  ($thisInserted.offset().left + $thisInserted.outerWidth()) ));
			if (  (($thisRightHandNode.offset().left + $thisRightHandNode.outerWidth()) -  ($thisInserted.offset().left + $thisInserted.outerWidth())) > 0 ) {
				horRH.css({'left': $thisInserted.outerWidth() + $thisInserted.offset().left});
				$thisInserted.children('.verPiece.RH').css('left', $thisInserted.outerWidth() + $thisInserted.offset().left + horRH.outerWidth());
			}
			else{
				horRH.css({'left': $thisRightHandNode.offset().left + $thisRightHandNode.outerWidth()});
				$thisInserted.children('.verPiece.RH').css('left', $thisRightHandNode.offset().left + $thisRightHandNode.outerWidth());
			};

			$thisInserted.children('.verPiece.RH').css({'height': Math.abs($thisRightHandNode.offset().top - $thisInserted.offset().top)	});
			if (($thisRightHandNode.offset().top - $thisInserted.offset().top)>0) {
				$thisInserted.children('.verPiece.RH').css('top', $thisInserted.offset().top);
			}
			else{
				$thisInserted.children('.verPiece.RH').css('top', $thisRightHandNode.offset().top);
			};
		};
		

	});	
};

updateDisplayTree(binaryTreeConstructor.createTreeWithArrayInput(initDataValues));

$('button[name="add"]').click(function() {
	var resToShowOnPage = $('h2').data('treeInfo');
	var ID = parseInt($('input[name="ID"]').val());
	if (!ID || ID == 'NaN') {return alert('Err. Invalid ID field')};
	var otherData = $('input[name="otherData"]').val();
	if (!otherData) {return alert('Err. No otherData field')};
	var resToShowOnPage = binaryTreeConstructor.insertInTree(resToShowOnPage, {"ID": ID, "otherData": otherData});
	if (!resToShowOnPage) {return alert('err')}
		else{
			updateDisplayTree(resToShowOnPage);
			$('input[name="ID"], input[name="otherData"]').val('');
		};
});
$('button[name="remove"]').click(function() {
	var resToShowOnPage = $('h2').data('treeInfo');
	var ID = parseInt($('input[name="IDremove"]').val());
	if (!ID || ID == 'NaN') {return alert('Err. Invalid ID field')};
	var resToShowOnPage = binaryTreeConstructor.removeFromTree(resToShowOnPage, {"ID": ID});
	if (!resToShowOnPage) {return alert('err')}
		else{
			updateDisplayTree(resToShowOnPage);
			$('input[name="IDremove"]').val('');
		};
});
// var b = binaryTreeConstructor.searchTree(a, 11);
// console.log(b)



//** ignore below **//

		//recursive split creation in tree creation
			// var treeHeightShouldBe = arrStore.length;
			// var splitInteger = 2;
			// while (treeHeightShouldBe !== dataStore._totalItemsAddedCount) {
			// 	var currentSplitInteger = splitInteger;
			// 	splitInteger = splitInteger*2;
			// 	var currentIndexMultiple = (arrStore.length/currentSplitInteger);
			// 	currentIndexMultiple = currentIndexMultiple%2 == 0? currentIndexMultiple: Math.floor(currentIndexMultiple);
			// 	if (currentSplitInteger == 2) {
			// 			var a = arrStore(currentIndexMultiple);
			// 			dataStore.dataContainer.currentIndexMultiple.value = a;

			// 	}
			// 	else {

			// 	};
			// }
