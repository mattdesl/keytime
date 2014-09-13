//An example of dom styling

var loop = require('frame-loop')
var domready = require('domready')
var domify = require('domify')

var css = require('fs').readFileSync(__dirname+'/dom.css', 'utf8')
require('insert-css')(css)

var mapStyle = require('./map-css')
var events = require('dom-events')
var Timeline = require('./timeline-css')

var anim1 = Timeline( require('./data/dom-1') )
var anim2 = Timeline( require('./data/dom-2') )
var curTimeline = anim1

function Widget(animation) {
	this.element = domify('<div class="box"><span>button</span></div>')
}

Widget.prototype.update = function(timeline, time) {
	//update all the named properties, mapping them to CSS values
	for (var i=0; i<timeline.properties.length; i++) {
		var prop = timeline.properties[i]
		var value = timeline.value(time, prop)

		//map our timeline property to CSS values
		mapStyle(this.element, prop.name, value)
	}
}

function start() {
	var time = 0

	var widget = new Widget()
	document.body.appendChild(widget.element)

	var duration = curTimeline.duration() 

	//render timeline
	loop(function(dt) {
		time += Math.max(30, dt) / 1000
		if (time <= (duration + 1)) {
			widget.update(curTimeline, time)
		}
	}).run()

	//toggle new timeline
	function click(ev) {
		ev.preventDefault()
		time = 0
		curTimeline = curTimeline === anim1 ? anim2 : anim1
		duration = curTimeline.duration()

		//clear style
		widget.element.style.cssText = ''
	}
	events.on(widget.element, 'click', click)
	events.on(widget.element, 'touchstart', click)


	var txt = '<p>click button to change timelines</p>'
			+ '<p>animation data <a href="https://github.com/mattdesl/timeline-tests/tree/master/demo2/data">here</a></p>'
	document.body.appendChild(domify('<div class="info">'+txt+'</div>'))
}

domready(start)