function Clock(x, y, radius, options) {
    // Creates a clock object and draws it using two.js

    var options = typeof options !== 'undefined' ? options : {};

    var defaults = {
        'hourLength': radius * 0.6,
        'minuteLength': radius * 0.9
    };

    for (var key in defaults) {
        if (defaults.hasOwnProperty(key)) {
            options[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
        }
    }

    var clockShape = drawClock(x, y, radius, options.hourLength, options.minuteLength);

    this.minuteAngle = 0;
    this.hourAngle = 0;
    this.minuteGroup = clockShape.minuteGroup;
    this.hourGroup = clockShape.hourGroup;

	two.update();
}

function drawClock(x, y, radius, hourLength, minuteLength) {

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

    return {
        minuteGroup: minuteGroup,
        hourGroup: hourGroup
    };
}

Clock.prototype.incrementTime = function(dhA, dmA) {
    this.updateTime(this.hourAngle + dhA, this.minuteAngle + dmA)
}

Clock.prototype.updateTime = function(hA, mA) {

    this.hourAngle = hA
    this.minuteAngle = mA

    this.hourGroup.rotation = dtr(this.hourAngle)
    this.minuteGroup.rotation = dtr(this.minuteAngle)

    two.update()
}

Clock.prototype.getHourAngle = function() {
    return this.hourAngle
}

Clock.prototype.getMinuteAngle = function() {
    return this.minuteAngle
}

function dtr(deg) {
    // Return the conversion of deg (degrees) to radians
    return deg / 180 * Math.PI
}