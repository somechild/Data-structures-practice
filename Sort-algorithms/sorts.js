
var arr = [23,234,2,23,6,34724,513,451,34,134,132535,3,453,45,34,53,456,3,234];

function quickSort(arr) {

	if (arr.length <= 1) {
		return arr;
	};

	var pivot = arr.length - 1;
	var pivotVal = arr[pivot];

	var arrCopy = [arr[pivot]], pivotIndexInArr = 0;
	for (var i = 0; i < pivot; i++) {
		if (arr[i] <= pivotVal) {
			arrCopy.unshift(arr[i]);
			pivotIndexInArr ++;
		} else {
			arrCopy.push(arr[i]);
		};
	};
	var rightArr = arrCopy.slice(pivotIndexInArr + 1);
	var leftArr = arrCopy.slice(0, pivotIndexInArr);
	return quickSort(leftArr).concat([pivotVal]).concat(quickSort(rightArr));
};

console.time('quicksort');
console.log(quickSort(arr), 'hit');
console.timeEnd('quicksort');

function mergeSort(arr) {
	var splitList = arr.map(function(g) {return [g];});
	var sortedList = runThrough(splitList)[0];
	return sortedList;
}
function runThrough(array) {
	var newArray = [];
	for (var i = 0; i < array.length; i+=2) {
		if (array[i + 1]) {
			newArray.push(merge(array[i], array[i + 1]));
		} else {
			newArray.push(array[i]);
		};
	};
	if (newArray.length === 1) {
		return newArray;
	} else {
		return runThrough(newArray);
	};
}
function merge(array1, array2) {
	var i = 0, j = 0;
	var mergedArray = [];
	while(array1[i] || array2[j]) {
		var val1 = array1[i], val2 = array2[j];
		if (val1) {
			if (val1 <= val2) {
				mergedArray.push(val1);
				i ++;
			} else if(val2) {
				mergedArray.push(val2);
				j ++;
			} else {
				mergedArray.push(val1);
				i ++;
			};
		} else {
			mergedArray.push(val2);
			j ++;
		}
	}

	return mergedArray;
}

console.time('mergeSort');
console.log(mergeSort(arr), 'hit');
console.timeEnd('mergeSort');


function countingSort(arr) {
	var intermediateArray = [];

	var arrLength = arr.length;
	for (var i = 0; i < arrLength; i++) {
		if (typeof intermediateArray[arr[i]] === "number") {
			intermediateArray[arr[i]] ++;
		} else {
			intermediateArray[arr[i]] = 1;
		}
	};

	var intermediateArrayLength = intermediateArray.length;
	if (!intermediateArray[0]) {
		intermediateArray[0] = 0;
	}
	for (var i = 1; i < intermediateArrayLength; i++) {
		if (intermediateArray[i]) {
			intermediateArray[i] += intermediateArray[i - 1];
		} else {
			intermediateArray[i] = intermediateArray[i - 1];
		};
	};

	var sortedArray = [];
	for (var i = arrLength - 1; i >=0 ; i--) {
		var $thisVal = arr[i];
		var sortedIndex = intermediateArray[$thisVal];
		sortedArray[sortedIndex] = $thisVal;
		intermediateArray[$thisVal] --;
	};
	return sortedArray;
}



console.time('countingSort');
console.log(countingSort(arr), 'hit');
console.timeEnd('countingSort');

