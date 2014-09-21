//a "Property" maintains a set of tweenable values
//for e.g.:
//  position [x, y]
//  color [r, g, b, a]
//  alpha [a]

//It will also store application-level flags like
//whether or not your data is hidden, or what type
//of property you might be dealing with

var keyframes = require('keyframes')
var xtend = require('xtend')

function Property(data) {
	if (!(this instanceof Property)) 
		return new Property(data)

	this.keyframes = keyframes()
	this.value = null
	this.name = ''
	if (data)
		this.load(data)
}

Property.prototype.dispose = function() {
	this.keyframes.clear()
}

Property.prototype.export = function() {
	return xtend(this, {
		keyframes: this.keyframes.frames
	})
}

Property.prototype.load = function(data) {
	this.dispose()

	if (!data)
		return
	
	for (var k in data) {
		if (!data.hasOwnProperty(k))
			continue
		if (k === 'keyframes')
			this.keyframes.frames = data.keyframes
		else
			this[k] = data[k]
	}
}

module.exports = Property