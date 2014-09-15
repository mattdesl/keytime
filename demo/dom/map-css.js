//This is fairly application specific. Maybe 'position' isn't absolute, etc.

//It would be more robust to use jQuery or TweenLite to handle things like prefixing,
//browser bugs, etc.

var rgba = require('color-style')
var style = require('dom-style')

//numbers are assumed to be in pixel values.
function px(value) {
	return typeof value === 'number' ? (value+'px') : value
}

//some special ones like colors or groups of properties (position, size)
var css = {
	position: function(value) {
		return { left: px(value[0]), top: px(value[1]) }
	},
	size: function(value) {
		return { width: px(value[0]), height: px(value[1]) }
	},
	rotation: function(value) {
		var str = 'rotateX('+value[0]+'deg) rotateY('+value[1]+'deg) rotateZ('+value[2]+'deg)'
		return {
			'-o-transform': str,
			'-moz-transform': str,
			'-ms-transform': str,
			'-webkit-transform': str,
			'transform': str,
		}
	},
	'box-shadow': function(value) {
		var shadow = value.slice(0,3).map(px).join(' ') + ' ' + rgba(value.slice(3))
		return {
			'box-shadow': shadow
		}
	},
	'background-color': rgba,
	'border-color': rgba,
	'z-index': String,
	color: rgba
}

function map(name, value, overrides) {
	var cssMap = css
	if (overrides && typeof overrides[name] !== 'undefined')
		cssMap = overrides
	if (typeof cssMap[name] !== 'function')
		return px(value)
	return cssMap[name](value)
}

module.exports = function(element, name, value, overrides) {
	var animStyle = map(name, value, overrides)
	if (typeof animStyle === 'string' || typeof animStyle === 'number')
		style(element, name, animStyle)
	else
		style(element, animStyle)
}

module.exports.map = map	