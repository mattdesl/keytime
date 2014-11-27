[![img](http://i.imgur.com/2YkqCOS.png)](http://mattdesl.github.io/keytime/demo/dom/)  
<sup>[click to view demo](http://mattdesl.github.io/keytime/demo/dom/)</sup>

# keytime

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Modular keyframe-based animation tools. Currently at a work-in-progress/proof-of-concept stage. 

The idea is to break down animation data into a simple format that can easily be manipulated and used in real-time playback. Some novel goals of the project:

- modular; the tools can be used independently of render engine, and may be useful to non-JavaScript devs (for e.g. Java/C++/C# game devs)
- concise and standard animation format that is application agnostic
- no assumptions about what is being animated; could be numbers, 2D paths, vectors, quaternions, etc
- custom interpolators and easing functions are easy to add (e.g. interpolating CSS properties)
- easy to pipe into other tools, like a visual editor for designers
- using CommonJS and JSON to export animation data, so you can `require('mattdesl/my-fancy-timeline')` and build an ecosystem of timelines and animations

This does not implement its own loop or `play()`, `pause()` methods. It simply allows the developer to retrieve interpolated values at an arbitrary time stamp (which may be in seconds, milliseconds, centuries, or whatever).

## example

An example of how it might look within a render loop:

```js
var rgba = require('color-style')
var data = require('./anim-data.js')

var timeline = require('keytime')(data)

//our basic sprite object
var sprite = { 
	fillStyle: [255,255,255], 
	alpha: 1, 
	position: [0, 0] 
}

//draw the frame at the given frame time
function render(ctx, time) {
	//update the object with the animated properties
	timeline.values(time, sprite)

	//draw the sprite
	ctx.fillStyle = rgba(sprite.fillStyle)
	ctx.globalAlpha = sprite.alpha
	ctx.fillRect(sprite.position[0], sprite.position[1], 50, 50)
}
```

## demos

There are a couple examples in the [demo](demo/) folder. Some of them use the work in progress [keytime-editor](https://github.com/mattdesl/keytime-editor/). 

- [canvas/path animation](http://mattdesl.github.io/timeline-tests/demo1/index.html) - animates paths created with [path-illustrator](http://mattdesl.github.io/path-illustrator/demo/advanced.html)
- [CSS animations and editor](http://mattdesl.github.io/keytime/demo/dom/index.html)
- [CSS 3D transforms](http://mattdesl.github.io/keytime/demo/dom/index2.html)
- [button proof of concept](http://mattdesl.github.io/keytime/demo/dom/index3.html)


## wiki

- [keytime format](https://github.com/mattdesl/keytime/wiki/Format)
- [subclassing keytime](https://github.com/mattdesl/keytime/wiki/Subclassing)

## usage

[![NPM](https://nodei.co/npm/keytime.png)](https://nodei.co/npm/keytime/)

This module builds on [keyframes](https://github.com/mattdesl/keyframes) to interpolate between keyframe values. The core concepts are as follows:

#### `timeline`

A `keytime` instance (or timeline) provides a list of named `properties` that make up this keyframed timeline. It also handles easing and interpolation. The default timeline interpolates numbers and arrays of numbers; and supports a [set of common easing equations](https://github.com/mattdesl/eases).

```js
var timeline = require('keytime')(data)

//get all values at a time stamp
var values = timeline.values(3)

//the value of 'position' property at this time stamp
console.log( values.position )
```

#### `properties`

A property holds a set of [keyframes](https://github.com/mattdesl/keyframes), a unique `name` identifier and a default `value` (used when no keyframes are present).

#### `keyframes`

The keyframes hold a `time` stamp (no assumptions are made about unit of time), a `value` (can be array, number, object, etc). They can optionally include an `ease`. For a pair of keyframes, the second determines the easing function; so the ease of the first keyframe in a timeline is ignored.

## API

#### `var timeline = require('keytime')([data])`

Creates a new timeline with the optional data in the form of a JS object. The data is assumed to follow the [keytime format](https://github.com/mattdesl/keytime/wiki/Format).

#### `timeline.values(timeStamp[, out])`

A convenience method to grab all properties at the given time stamp. This returns an object with the property names and their associated value for that time. You can pass an `out` object to avoid creating a new one. So you can do this:

```js
var sprite = { alpha: 1, x: 0, y: 0, width: 0, height: 0 }

... in render loop ...
	//store new values in sprite
	timeline.values(time, sprite)
	
	//draw the sprite
	ctx.globalAlpha = sprite.alpha
	ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height)
```

#### `timeline.property(name)`

Searches the timeline and returns the first property by the given name, or index if a number was provided instead. If none is found, `undefined` is returned.

#### `timeline.duration()`

Determines the maximum time stamp for all keyframes in all of this timeline's properties.

#### `timeline.valueOf(timeStamp, property)`

For a given property, gets the interpolated value at that time stamp. 

#### `timeline.dispose()`

Disposes all keyframes and all properties.

#### `timeline.load(data)`

Loads new animation data to this timeline. 

**NOTE:** This disposes and overrides the current set of properties/keyframes.

#### `timeline.properties`

An array containing all of the properties in this timeline. Each property has:

- `name` the unique name
- `value` a value to use as a constant (or default) when no keyframes exist
- `keyframes` an instance of [keyframes](https://github.com/mattdesl/keyframes)

And has the methods:

- `property.dispose()` which clears its keyframes
- `property.load(data)` which disposes the keyframes, then loads new property data

## running/building demos

To run or build the demos, first install the necessary tools:

```npm install browserify beefy uglify-js -g```

Then, pick your poison:

```sh
# to run DOM demo
npm run dev-dom 

# to run canvas demo
npm run dev-canvas

# to build DOM demo
npm run build-dom
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/keytime/blob/master/LICENSE.md) for details.
