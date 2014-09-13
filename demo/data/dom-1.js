module.exports = [
	{ name: 'position', keyframes: [
		{ time: 0, value: [10, 5] },
		{ time: 2, value: [0, 0], ease: 'expoOut' },
	] },
	{ name: 'font-family', value: "'Open Sans Condensed', 'Geneva', sans-serif" },
	{ name: 'font-weight', value: 300 },
	// { name: 'text-decoration', value: 'underline' },
	{ name: 'font-variant', value: 'small-caps' },
	{ name: 'color', value: [100, 100, 100] },
	{ name: 'background-color', keyframes: [
		{ time: 0, value: [180, 255, 190] },
		{ time: 2, value: [255, 189, 120], ease: 'expoOut' },
	] },
	{ name: 'font-size', keyframes: [
		{ time: 0, value: 16 },
		{ time: 2, value: 28, ease: 'expoOut' },
	] },
	{ name: 'size', keyframes: [
		{ time: 0, value: [50, '20px'] },
		{ time: 3, value: [100, 40], ease: 'expoOut' },
	] },
	//there are other ways of vertical centering that don't involve more properties/keyframes
	{ name: 'line-height', keyframes: [
		{ time: 0, value: 13 },
		{ time: 3, value: 33, ease: 'expoOut' },
	] },
	//there are other ways of vertical centering that don't involve more properties/keyframes
	{ name: 'letter-spacing', keyframes: [
		{ time: 0, value: 10 },
		{ time: 2, value: 0, ease: 'quartOut' },
	] },
	{ name: 'rotation', keyframes: [
		{ time: 0, value: [0,0,20] },
		{ time: 3, value: [0,0,0], ease: 'elasticOut' },
	] },
	{ name: 'border-width', keyframes: [
		{ time: 0, value: 10 },
		{ time: 2, value: 2, ease: 'quartOut' },
	] },
	{ name: 'border-radius', keyframes: [
		{ time: 0, value: 10 },
		{ time: 3, value: 3, ease: 'expoOut' },
	] },
	{ name: 'border-color', keyframes: [
		{ time: 0, value: [100, 100, 100] },
		{ time: 1, value: [200, 200, 200], ease: 'quadOut' },
	] },
]