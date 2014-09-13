var Base = require('../')
var inherits = require('inherits')
var lerp = require('./lerp-css')

function TimelineCSS(data) {
	if (!(this instanceof TimelineCSS))
		return new TimelineCSS(data)
	Base.call(this, data)
}

inherits(TimelineCSS, Base)

TimelineCSS.prototype.interpolate = function(type, frame1, frame2, t) {
	return lerp(frame1.value, frame2.value, t)
}

module.exports = TimelineCSS