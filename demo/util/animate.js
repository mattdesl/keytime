var mapStyle = require('./map-css')

module.exports = function(element, timeline, time, options) {
	//update all the named properties, mapping them to CSS values
	for (var i=0; i<timeline.properties.length; i++) {
		var prop = timeline.properties[i]
		var value = timeline.valueOf(time, prop)

		//map our timeline property to CSS values
		mapStyle(element, prop.name, value, options)
	}
}