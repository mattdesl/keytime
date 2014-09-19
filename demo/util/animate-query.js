//takes in an array of { selector, timeline } objects that map to querySelector
/*

animateElements(container, [
	{ selector: '.foo > .bar', timeline: [...] },
	{ selector: '#another', timeline: [...] }
])
 */

var animate = require('./animate')
var select = require('dom-select')

module.exports = function(time, element, animations, overrides) {
	animations.forEach(function(g) {
		var element = select(g.name)
		if (element) {
			animate(element, g.timeline, time, overrides)
		}
	})
}