
function indexOfName(list, name) {
	for (var i=0; i<list.length; i++)
		if (list[i].name === name)
			return i
	return -1
}

//make sure the defaults make it into the full timeline.
module.exports = function(defaults, data) {
	defaults.forEach(function(g) {
		//put in each default if it doesn't exist in data
		var defIdx = indexOfName(data, g.name)
		if (defIdx !== -1) {
			data.push(g)
		}
	})
}