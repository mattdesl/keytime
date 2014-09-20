//some of the features here may end up in keytime-editor or another module
var loop = require('frame-loop')

var mapStyle = require('./map-css')
var events = require('dom-events')
var keycode = require('keycode')

var Timeline = require('./keytime-css')
var createEditor = require('keytime-editor')

function create(update) {
	var editor = createEditor()
	
	//setup editor before loading in our timeline
	var colors = ['background-color', 'border-color', 'color']
	editor.constraint(colors, { min: 0, max: 255, step: 1, decimals: 0 })

	var normalized = ['opacity']
	editor.constraint(normalized, { min: 0, max: 1, step: 0.05, decimals: 2 })

	editor.constraint('border-radius', { min: 0 })
	editor.constraint('scale', { step: 0.05, decimals: 2 })

	editor.shy(['font-family', 'font-variant', 'font-weight'])

	//ignore a few things that might be better suited with their own editors
	var noop = function() {}
	editor.valueEditor('box-shadow', noop)

	var autoPlay = true
	var autoTime = 0

	editor.duration = 5

	var lastTime = -1
	var fin = false

	//render timeline
	var engine = loop(function(dt) {
		if (autoPlay) {
			autoTime += Math.max(30, dt) / 1000
			editor.playhead(autoTime)
		}

		var time = editor.playhead()
		if (time === lastTime)
			return

		if (time <= (editor.duration + 1)) {
			update(time)
			fin = false
		} else {
			fin = true
			autoPlay = false
			autoTime = 0
		}
		lastTime = time
	})

	editor.on('playhead', function(t) {
		autoTime = t
	})
	editor.on('update', function() {
		if (engine.running)
			update(editor.playhead())
	})

	function stopAuto() {
		autoPlay = false
	}

	events.on(editor.element, 'touchdown', stopAuto)
	events.on(editor.element, 'mousedown', stopAuto)
	events.on(window, 'keydown', function(ev) {
		var key = keycode(ev)
		if (key === 'space') {
			ev.preventDefault()
			autoPlay = !autoPlay

			if (fin || ev.shiftKey) {
				autoPlay = true
				autoTime = 0
			}
		} else if (key === 'j') {
			ev.preventDefault()
			var pretty = ev.shiftKey ? 2 : undefined
			console.log( JSON.stringify( editor.timelines(), undefined, pretty ) )
		}
	})
	editor.run = engine.run.bind(engine)
	editor.restart = function() {
		autoTime = 0
		autoPlay = true
	}

	//this is just for our little demo, to edit in dev tool console
	window.editor = editor 

	// editor.stop = engine.stop.bind(engine)
	return editor
}
module.exports = create