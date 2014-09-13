var eases = require('eases')
var inherits = require('inherits')
var Base = require('./base')

function BasicTimeline(data) {
	if (!(this instanceof BasicTimeline))
		return new BasicTimeline(data)
	Base.call(this, data)
}

inherits(BasicTimeline, Base)

BasicTimeline.prototype.ease = function(name, t) {
	return eases[name](t)
}

module.exports = BasicTimeline