var data = require('../data/canvas-1')
var rgba = require('color-style')

var timeline = require('../../')(data) //require('keytime')

require('canvas-testbed')(render)

var time = 0
var endDelay = 1
var dur = timeline.duration()

var widget = {}

function render(ctx, width, height, dt) {
	time += dt/1000
	if (time >= dur+endDelay)
		time = 0

	ctx.clearRect(0,0, width, height)

	//For each property in our timeline, store it in the widget object
	timeline.values(time, widget)

	//now draw stuff with our values
	ctx.fillStyle = rgba(widget.fill)
	ctx.globalAlpha = widget.alpha
	ctx.fillRect(widget.position[0], widget.position[1],
				widget.shape[0], widget.shape[1])
}