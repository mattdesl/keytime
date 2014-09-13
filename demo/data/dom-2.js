module.exports = [
	{ name: 'background-color', keyframes: [
		{ time: 0, value: [180, 180, 180] },
		// { time: 2, value: [255, 189, 120], ease: 'expoOut' },
	] },
	{ name: 'font-size', keyframes: [
		{ time: 0, value: 12 },
		{ time: 2, value: 16, ease: 'quartOut' },
	] },
	{ name: 'color', value: [250, 250, 250] },
	{ name: 'font-weight', value: 'bold' },
	{ name: 'size', keyframes: [
		{ time: 0, value: [50, 30] },
		{ time: 2, value: [75, 30], ease: 'quartOut' },
	] },
	//there are other ways of vertical centering that don't involve more properties/keyframes
	{ name: 'line-height', keyframes: [
		{ time: 0, value: 30 },
		{ time: 2, value: 30, ease: 'quartOut' },
	] },
	{ name: 'border-width', keyframes: [
		{ time: 0, value: 2 },
		{ time: 2, value: 2, ease: 'expoOut' },
	] },
	{ name: 'border-radius', keyframes: [
		{ time: 1.0, value: 0 },
		{ time: 2.5, value: 5, ease: 'expoOut' },
	] },
	{ name: 'border-color', keyframes: [
		{ time: 0, value: [100, 100, 100] },
		{ time: 1, value: [170, 170, 170], ease: 'quadOut' },
	] },
	{ name: 'box-shadow', keyframes: [
		{ time: 1.0, value: [0, 0, 0, 40, 40, 40, 0.15] },
		{ time: 2.5, value: [6, 6, 0, 40, 40, 40, 0.15], ease: 'bounceOut' },
	] }
]