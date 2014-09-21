var Timeline = require('./')
var test = require('tape').test

var data1 = [
	{ name: 'position', value: [20, 20] },
	{ name: 'fill', keyframes: [
		{ time: 0, value: [0, 0, 0] },
		{ time: 1, value: [255, 255, 255], ease: 'linear' }
	]},
	{ name: 'stroke', keyframes: [
		{ time: 0, value: [0, 0, 0] },
		{ time: 1, value: [255, 255, 255], ease: 'expoOut' },
		{ time: 10, value: [255, 255, 255] }
	]},
]


test('timeline should be correct', function(t) {
	var timeline = Timeline(data1)

	var timeline2 = Timeline()
	timeline2.load(data1)

	var fill = timeline.property('fill')
	var stroke = timeline.property('stroke')
	var position = timeline.property('position')

	t.deepEqual(timeline.properties, timeline2.properties, 'constructor and load have same effect')
	t.ok( fill, 'gets property')
	t.equal(timeline.property('fill'), timeline.property(1), 'property accepts index or name')


	t.deepEqual( timeline.valueOf(10, position), [20,20], 'retrieves value' )
	t.deepEqual( timeline.valueOf(0, fill), [0,0,0], 'retrieves keyframe' )
	t.deepEqual( timeline.valueOf(0.5, fill), [127.5,127.5,127.5], 'interpolates keyframes' )
	t.notDeepEqual( timeline.valueOf(0.5, stroke), [127.5,127.5,127.5], 'eases value' )
	t.equal( timeline.duration(), 10, 'duration is correct' )

	//add a property
	var borderData = { name: 'border-radius', value: 25, hidden: true }
	timeline.addProperty(borderData)
	t.equal( timeline.valueOf(0, timeline.property('border-radius')), 25, 'adds property' )

	var result = {
		position: [20,20],
		fill: [255,255,255],
		stroke: [255,255,255],
		'border-radius': 25
	}

	var values = timeline.values(1)
	t.deepEqual(values, result, 'values() gets correct object')

	var border = timeline.property('border-radius')
	t.equal(border.hidden, true, 'stores custom properties')

	//exported data always includes value and keyframes 
	borderData.keyframes = []
	t.deepEqual( border.export(), borderData, 'property.export() works' )	
	
	t.end()
})