var raw = require('./group')
var deepcopy = require('deepcopy')
var Timeline = require('../../')


//ensure we have at least these properties
var properties = [
	{ name: 'z-index', value: 0 },
	{ name: 'position', value: [0,0] },
	{ name: 'size', value: [100,100] },
	{ name: 'background-color', value: [0,0,0] }
]

var textProps = [
	{ name: 'z-index', value: 0 },
	{ name: 'position', value: [0,0] },
	{ name: 'font-size', value: 25 },
	{ name: 'color', value: [0,0,0] }
]

var flip = [
	{ name: 'border-color', value: [0,0,0] },
	// { name: 'border-radius', value: 0 },
	{ name: 'border-width', value: 0 },
	{ name: 'rotation', value: [0,0,0] },
]

// raw.push( { name: 'flip', timeline: Timeline(flip).export() } )

//fills any additional properties..
raw.forEach(function(entry) {
	var t = Timeline(entry.timeline)
	
	if (entry.name === 'flip') {
		flip.forEach(function(p) {
			if (!t.property(p.name)) {
				t.addProperty( deepcopy(p) )
			}
		})	
	}

	
	// entry.name = ''
	entry.timeline = t.export()
})

module.exports = raw