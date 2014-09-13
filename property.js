//a "Property" maintains a set of tweenable values
//for e.g.:
//  position [x, y]
//  color [r, g, b, a]
//  alpha [a]

var keyframes = require('keyframes')
var DEFAULT_TYPE = 'array'

function Property(data) {
	if (!(this instanceof Property)) 
		return new Property(data)

	this.keyframes = keyframes()
	this.value = null
	this.type = DEFAULT_TYPE
	this.name = ''
	if (data)
		this.load(data)
}

Property.prototype.dispose = function() {
	this.keyframes.clear()
}

Property.prototype.load = function(data) {
	this.dispose()

	if (!data)
		return
	
	this.name = data.name
	this.type = typeof data.type === 'string' ? data.type : DEFAULT_TYPE
	this.value = data.value
	if (data.keyframes)
		this.keyframes.frames = data.keyframes
}

module.exports = Property