function set(out, a, b) {
	out[0] = a
	out[1] = b
	return out
}

function chr(code) {
	return code >= 97 && code <= 122
}

//sets a px, em, pt, %, pc, ex, mm, cm, in, %
//TODO: deg, rad, and more
function unit(val, out) {
	if (!out)
		out = [ 0, '' ]

	if (typeof val === 'number')
		return set(out, val, '')
	var e0 = val.length-2,
		e1 = val.length-1
	var num = parseFloat(val, 10)

	var code1 = val.charCodeAt(e1)
	if (code1 === 37)
		return set(out, num, val.charAt(e1))
	else {
		var code2 = val.charCodeAt(e1)
		if (chr(code1) && chr(code2))
			return set(out, num, val.substring(e0))
		return set(out, num, '')
	}
}

module.exports = unit