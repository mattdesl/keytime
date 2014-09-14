//An example of dom styling

var loop = require('frame-loop')
var domready = require('domready')
var domify = require('domify')

var css = require('fs').readFileSync(__dirname+'/dom.css', 'utf8')
require('insert-css')(css)

var mapStyle = require('./map-css')
var events = require('dom-events')
var keycode = require('keycode')

var Timeline = require('./keytime-css')
var anim1 = Timeline( require('../data/dom-1') )
var anim2 = Timeline( require('../data/dom-2') )
var curTimeline = anim1

var createEditor = require('keytime-editor')

function Widget(animation) {
	this.element = domify('<div class="box"><span>button</span></div>')
}

Widget.prototype.update = function(timeline, time) {
	//update all the named properties, mapping them to CSS values
	for (var i=0; i<timeline.properties.length; i++) {
		var prop = timeline.properties[i]
		var value = timeline.valueOf(time, prop)

		//map our timeline property to CSS values
		mapStyle(this.element, prop.name, value)
	}
}

function start() {
	var editor = createEditor()

	var autoPlay = true
	var autoTime = 0

	var widget = new Widget()
	document.body.appendChild(widget.element)

	var duration = curTimeline.duration() 

	//render timeline
	loop(function(dt) {
		if (autoPlay) {
			autoTime += Math.max(30, dt) / 1000
			editor.playhead(autoTime)
		}

		var time = editor.playhead()
		if (time <= (duration + 1)) {
			widget.update(curTimeline, time)
		} else {
			autoPlay = false
			autoTime = 0
		}
	}).run()

	//toggle new timeline
	function toggle(ev) {
		if (ev)
			ev.preventDefault()
		
		autoTime = 0
		autoPlay = true
		curTimeline = curTimeline === anim1 ? anim2 : anim1
		duration = curTimeline.duration()

		//clear style
		widget.element.style.cssText = ''

		editor.show(curTimeline === anim1 ? 0 : 1)
		editor.hide(curTimeline === anim1 ? 1 : 0)
	}
	events.on(widget.element, 'click', toggle)
	events.on(widget.element, 'touchstart', toggle)

	var txt = '<p>click button to change timelines</p>'
			+ '<p>animation data <a href="https://github.com/mattdesl/keytime/tree/master/demo/data">here</a></p>'
	document.body.appendChild(domify('<div class="info">'+txt+'</div>'))

	editor.add(anim1, 'button1')
	editor.add(anim2, 'button2')
	editor.appendTo(document.body)
	editor.open(0)
	editor.open(1)
	editor.hide(1)

	editor.on('playhead', function(t) {
		autoTime = t
	})

	function stopAuto() {
		autoPlay = false
	}

	events.on(editor.element, 'touchdown', stopAuto)
	events.on(editor.element, 'mousedown', stopAuto)
	events.on(window, 'keydown', function(ev) {
		if (keycode(ev) === 'space') {
			ev.preventDefault()
			autoPlay = !autoPlay
		}
	})
}

domready(start)