var Queue = function() {
	this.dataSet = [];
	this.get = function() {
		return this.dataSet.shift();
	}
	this.add = function(item) {
		this.dataSet.push(item);
	}
	this.length = function() {
		return this.dataSet.length;
	}
};

var Stack = function() {
	this.dataSet = [];
	this.get = function() {
		return this.dataSet[this.dataSet.length - 1];
	}
	this.pop = function() {
		return this.dataSet.pop();
	}
	this.add = function(item) {
		this.dataSet.push(item);
	}
	this.length = function() {
		return this.dataSet.length;
	}
};



var sampleGraph = {
	nodes: {
		a: {
			value: 3,
			pointsTo: ["b", "c", "d", "f"],
		},
		b: {
			value: 5,
			pointsTo: ["c", "e", "a"],
		},
		c: {
			value: 131,
			pointsTo: ["b", "a"],
		},
		d: {
			value: 12,
			pointsTo: ["a", "e"],
		},
		e: {
			value: 123,
			pointsTo: ["b", "g", "d", "f"],
		},
		f: {
			value: 1255,
			pointsTo: ["e", "g", "a"],
		},
		g: {
			value: 23,
			pointsTo: ["f", "e", "h"],
		},
		h: {
			value: -1,
			pointsTo: ["g"],
		}
	}
};


function bfs(graph, destinationValue) {
	var queue = new Queue();
	var firstItemName = Object.keys(graph.nodes)[0];
		queue.add(firstItemName);

	var visited = { };

	while(queue.length()) {
		var currentItemName = queue.get();
		var currentItem = graph.nodes[currentItemName];
		visited[currentItemName] = true;

		if (currentItem.value === destinationValue) {
			return currentItem;
		} else {
			var pointsTo = currentItem.pointsTo;
			for (var i = 0; i < pointsTo.length; i++) {
				if (!(pointsTo[i] in visited)) {
					queue.add(pointsTo[i]);
				};
			};
		};
	}
}

console.time('bfs');
console.log(bfs(sampleGraph, -1))
console.timeEnd('bfs');


function dfs(graph, destinationValue) {
	var stack = new Stack();
	var firstItemName = Object.keys(graph.nodes)[0];
		stack.add(firstItemName);

	var visited = { };

	while(stack.length()) {
		var currentItemName = stack.get();
		console.log(currentItemName)
		var currentItem = graph.nodes[currentItemName];
		visited[currentItemName] = true;

		if (currentItem.value === destinationValue) {
			return currentItem;
		} else {
			var pointsTo = currentItem.pointsTo.sort();
			for (var i = 0; i < pointsTo.length; i++) {
				if (!(pointsTo[i] in visited)) {
					stack.add(pointsTo[i]);
					break;
				} else if(i === pointsTo.length - 1) {
					stack.pop();
				};
			};
		};
	}
}
console.time('dfs');
console.log(dfs(sampleGraph, -1))
console.timeEnd('dfs');
