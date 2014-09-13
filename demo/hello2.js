var data = require('./data/simple')
var timeline = require('../timeline')(data)

require('canvas-testbed')(render)

var time = 0
var dur = timeline.duration()

var widget = { position: [0, 0], alpha: [1], shape: [50, 50] }

function render(ctx, width, height, dt) {
	time += dt/1000
	if (time >= dur+1)
		time = 0
	ctx.clearRect(0,0, width, height)

	timeline.properties.forEach(function(prop) {
		widget[prop.name] = timeline.value(prop, time)
	})

	ctx.globalAlpha = widget.alpha
	ctx.fillRect(widget.position[0], widget.position[1],
				widget.shape[0], widget.shape[1])
}