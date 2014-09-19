var lerp = require('lerp')

var tmpA = [0, '']
var tmpB = [0, '']
var unit = require('./get-css-unit')

function lerpCSS(value1, value2, t) {
	var v1 = unit(value1, tmpA)
	var v2 = unit(value2, tmpB)

	var noStr = v1[1].length === 0 || v2[1].length === 0
	if (noStr || v1[1] === v2[1]) {
		var ret = lerp(v1[0], v2[0], t)
		return noStr ? ret : (ret + v1[1])
	} else
		throw 'units do not match'
}
module.exports.lerp = lerpCSS

//assume we have an array of CSS units
module.exports = function(value1, value2, t, out) {
	if (Array.isArray(value1)) {
		out = out||new Array(value1.length)
        for (var i=0; i<value1.length; i++) 
            out[i] = lerpCSS(value1[i], value2[i], t)
        return out
	} else
		return lerpCSS(value1, value2, t)
}