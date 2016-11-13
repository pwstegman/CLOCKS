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

function dtr(deg){//degrees to radians
	return deg / 180 * Math.PI
}

function clock(x, y){

	var hourAngle = -90;
	var minuteAngle = -90;

	var circle = two.makeCircle(x, y, radius);
	circle.linewidth = radiusPadding;

	var minuteGroup = two.makeGroup()
	minuteGroup.translation.set(x, y)

	var minuteHand = two.makeLine(0, 0, minuteLength * Math.cos(dtr(minuteAngle)), minuteLength * Math.sin(dtr(minuteAngle)))
	minuteHand.stroke = "#ff0000"
	minuteHand.linewidth = 2

	minuteGroup.add(minuteHand)

	var hourGroup = two.makeGroup()
	hourGroup.translation.set(x, y)

	var hourHand = two.makeLine(0, 0, hourLength * Math.cos(dtr(hourAngle)), hourLength * Math.sin(dtr(hourAngle)))
	hourHand.linewidth = 3

	hourGroup.add(hourHand)

	hourAngle = 0;
	minuteAngle = 0;

	function incrementTime(dhA, dmA){
		updateTime(hourAngle + dhA, minuteAngle + dmA)
	}

	function updateTime(hA, mA){

		hourAngle = hA
		minuteAngle = mA

		hourGroup.rotation = dtr(hourAngle)
		minuteGroup.rotation = dtr(minuteAngle)

		two.update()
	}

	function getHourAngle(){
		return hourAngle
	}

	function getMinuteAngle(){
		return minuteAngle
	}
	
	// updateLine(180, 145)


	two.update();

	return {
		updateTime: updateTime,
		incrementTime: incrementTime,
		getHourAngle: getHourAngle,
		getMinuteAngle: getMinuteAngle
	}
}

function getIndex(y, x){
	// return yRatio * y + x
	return yRatio * y + x
}

var clocks = []

for(var x = 0; x < xRatio; x++)
	for(var y = 0; y < yRatio; y++)
		clocks.push(clock(radius * x * 2.5 + radiusPadding + radius, radius * y * 2.5 + radiusPadding + radius))

// clock(radius + radiusPadding,radius + radiusPadding)

