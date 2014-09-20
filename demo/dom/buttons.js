var domify = require('domify')
var domready = require('domready')
var animate = require('../util/animate-query')
var create = require('../util/dom-editor')
var Timeline = require('../../')
var events = require('dom-events')

var fs = require('fs')

var content = fs.readFileSync(__dirname+'/buttons.html', 'utf8')
var css = fs.readFileSync(__dirname+'/buttons.css', 'utf8')
require('insert-css')(css)

// var animations = require('../data/buttons-default.js')
var animations = require('../data/buttons-1.json')

domready(function() {
	var editor = create(update)

	var container = domify(content)
	document.body.appendChild(container)

	//from the JSON data we need to build keytime objects
	animations.forEach(function(a) {
		var timeline = Timeline(a.timeline)
		editor.add(timeline, a.name)
		a.timeline = timeline
	})

	editor.appendTo(document.body)
	editor.run()

	events.on(container, 'click', editor.restart.bind(editor))

	function update(time) {
		animate(time, container, animations)
	}

})