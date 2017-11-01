// ^----^----^^^----^----^
// ^+0*-^----^^^----^----^
// ^1--2^----^^^----^----^
// ^*--*^----^^^----^----^
// ^-3*-^----^^^----^----^
// ^4--5^----^^^----^----^
// ^*--*^----^^^----^----^
// ^-6*-^----^^^----^----^
// ^----^----^^^----^----^

//21x9

var twoDiv = document.getElementById('two');

//radius of 10, 
//times 24


var radius = 15;
var minuteLength = 13;
var hourLength = 10;
var minuteColor = "#000000"
var hourColor = "#FF0000"
var radiusPadding = 2;

var xRatio = 23;
var yRatio = 9;

var neutral = [45, 135]
var verticalLine = [0, 180]
var horizontalLine = [90, 270]
var topLeft = [90, 180]
var topRight = [180, 270]
var bottomLeft = [0, 90]
var bottomRight = [0, 270]

var startingPoints = [
	[1, 1],
	[6, 1],
	[13, 1],
	[18, 1]
]

var segmentLocations = [//relative to starting point
	[
		[1, 0],
		[2, 0]
	],
	[
		[0, 1],
		[0, 2]
	],
	[
		[3, 1],
		[3, 2]
	],
	[
		[1, 3],
		[2, 3]
	],
	[
		[0, 4],
		[0, 5]
	],
	[
		[3, 4],
		[3, 5]
	],
	[
		[1, 6],
		[2, 6]
	],
]

var numberSegments = [
	[0, 1, 2, 4, 5, 6],
	[2, 5],
	[0, 2, 3, 4, 6],
	[0, 2, 3, 5, 6],
	[1, 2, 3, 5],
	[0, 1, 3, 5, 6],
	[0, 1, 3, 4, 5, 6],
	[0, 2, 5],
	[0, 1, 2, 3, 4, 5, 6],
	[0, 1, 2, 3, 5, 6]

]

function getClocks(place, number){
	var startingPoint = startingPoints[place]
	var numberSegmentSet = numberSegments[number]
	var locations = [];
	for(var i = 0; i < numberSegmentSet.length; i++)
		locations = locations.concat(segmentLocations[numberSegmentSet[i]])
	
	locations = locations.map(function(e){
		e[0] += startingPoint[0]
		e[1] += startingPoint[1]

		var index = getIndex(e[0], e[1])

		return clocks[index]
	})

	// console.log(locations)
	return locations


}

var params = { width: xRatio * (radius * 2 + 3 * radiusPadding) + 2 * radius, height: yRatio * (radius * 2 + 3 * radiusPadding) + 2 * radius };

var two = new Two(params).appendTo(twoDiv);

function getIndex(y, x){
	// return yRatio * y + x
	return yRatio * y + x
}

var clocks = []

for (var x = 0; x < xRatio; x++) {
    for (var y = 0; y < yRatio; y++) {
        var cx = radius * x * 2.5 + radiusPadding + radius;
        var cy = radius * y * 2.5 + radiusPadding + radius;
        var clock = new Clock(cx, cy, radius, {hourLength: radius * 0.66});
        clocks.push(clock);
    }
}

// clock(radius + radiusPadding,radius + radiusPadding)

