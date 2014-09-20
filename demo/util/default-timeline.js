var Timeline = require('../../')

function indexOfName(list, name) {
	for (var i=0; i<list.length; i++)
		if (list[i].name === name)
			return i
	return -1
}

//make sure the defaults make it into the full timeline.
module.exports = function(defaults, data) {
	//go through each default, make sure that layer exists
	//and also make sure the properties in that layer exist
	defaults.forEach(function(g) {
		//check if layer exists already
		var defIdx = indexOfName(data, g.name)
		if (defIdx === -1) 
			data.push(g)
		
		var layer = defIdx===-1 ? g : 


	})
}