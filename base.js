var lerp = require('lerp-array')
var Property = require('./property')

function indexOfName(list, name) {
	for (var i=0; i<list.length; i++)
		if (list[i].name === name)
			return i
	return -1
}

function TimelineBase(data) {
	if (!(this instanceof TimelineBase))
		return new TimelineBase(data)
	
	this.properties = []

	if (data)
		this.load(data)
}

TimelineBase.prototype.dispose = function() {
	this.properties.forEach(function(p) {
		p.dispose()
	})
	this.properties.length = 0 
}

TimelineBase.prototype.addProperty = function(propData) {
	this.properties.push(new Property(propData))
}

//Finds the max duration of all properties
TimelineBase.prototype.duration = function() {
	var maxTime = 0
	for (var j=0; j<this.properties.length; j++) {
		var prop = this.properties[j]
		var frames = prop.keyframes.frames
		for (var i=0; i<frames.length; i++) 
			maxTime = Math.max(frames[i].time, maxTime)
	}
	return maxTime
}

//Returns the first control by the specified name or index
TimelineBase.prototype.property = function(prop) {
	var idx = typeof prop === 'number' ? prop : indexOfName(this.properties, prop)
	return idx<0 ? undefined : this.properties[idx]
}

//Loads timeline animation data
TimelineBase.prototype.load = function(data) {
	this.dispose()

	if (!data)
		return

	this.properties = data.map(function(d) {
		return new Property(d)
	})
}

TimelineBase.prototype.export = function() {
	return this.properties.map(function(p) {
		return p.export()
	})
}

//Eases the time; by default only linear ease is supported (entry point exposes others)
TimelineBase.prototype.ease = function(name, t) {
	return t
}

//Interpolate between two frames; subclasses can override to provide custom 
//interpolators (e.g. quaternions, paths, etc)
TimelineBase.prototype.interpolate = function(property, frame1, frame2, t) {
	return lerp(frame1.value, frame2.value, t)
}

//Determine the value at the given time stamp of the specified property
TimelineBase.prototype.valueOf = function(time, property) {
	var keys = property.keyframes,
		v = keys.interpolation(time),
		v0 = v[0],
		v1 = v[1],
		t = v[2]

	//return default value of property
	if (v0 === -1 || v1 === -1)
		return property.value

	var start = keys.frames[v0],
		end = keys.frames[v1]

	//frames match, return the first
	if (v0 === v1)
		return start.value

	//ease and interpolate frames
	else {
		var easeName = end.ease
		if (easeName) //remap time with easing equation
			t = this.ease(easeName, t)
		return this.interpolate(property, start, end, t)
	}
}

//Convenience to get the values of all properties at a given time stamp
TimelineBase.prototype.values = function(time, out) {
	if (!out)
		out = {}
	for (var i=0; i<this.properties.length; i++) {
		var prop = this.properties[i]
		out[prop.name] = this.valueOf(time, prop)
	}
	return out
}

module.exports = TimelineBase