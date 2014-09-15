var domify = require('domify')
var create = require('./dom-editor')
var domready = require('domready')
var Timeline = require('./keytime-css')
var animate = require('./animate')
var classes = require('dom-classes')

var css = require('fs').readFileSync(__dirname+'/dom.css', 'utf8')
require('insert-css')(css)


// var animations = require('../data/group-empty.js')
var animations = require('../data/group-data.js')




domready(function() {
	var editor = create(update)
	// could clamp it like so
	editor.constraint('size', { min: 0, max: 100, step: 1, decimals: 1 })
	editor.constraint('z-index', { decimals: 0, max: 1000 })
	
	window.editor = editor //for console debugging
	var container = domify('<div class="main">')
	document.body.appendChild(container)

	var flip = domify('<div class="flip">')
	container.appendChild(flip)

	var widgets = []
	animations.forEach(function(a) {
		var t = Timeline(a.timeline)
		
		var element 

		if (a.name === 'flip') {
			element = flip
		} else {
			element = domify('<div class="widget">')

			if (a.name.indexOf('text')===0) { //should find a better way than this
				element.innerHTML = 'hello'
				classes.add(element, 'text')
			}
			flip.appendChild(element)
		}

		

		widgets.push({
			name: a.name,
			element: element,
			timeline: t
		})
		var e = editor.add(t, a.name)
		e.open = false
	})	

	editor.appendTo(document.body)
	editor.run()



	function update(time) {
		widgets.forEach(function(w) {
			animate(w.element, w.timeline, time, overrides)
		})
	}
})


var overrides = {
	position: function(value) {
		return { left: value[0]+'%', top: value[1]+'%' }
	},
	size: function(value) {
		return { width: value[0]+'%', height: value[1]+'%' }
	},
}