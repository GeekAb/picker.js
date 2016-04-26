# picker.js
A picker for dates, date ranges, (and hopefully times) for multiple frameworks including Bootstrap 3, Bootstrap 4, and Material Design for Bootstrap 4

**Work in progress**

## Goal 

1. An ES2015 base classes for use in multiple renderings 
2. Variations of `datepicker`:
    - Bootstrap 3 (ported code)
    - Bootstrap 4
    - [bootstrap-material-design](https://github.com/FezVrasta/bootstrap-material-design/tree/v4-dev) 4 picker that meets the [Material Design specification](https://www.google.com/design/spec/components/pickers.html#)
3. (future) add time pickers - starting with material design    

## Why?
The bootsrap-datepicker project had 415 open issue and 64 open pull requests.  One reason for this is it bit off a big chunk, including all date functionality and rendering/placement functionality.

Maintaining that project may be too much, and we want to _expand_ it!  

## Strategy/Tactics
- [x] Port the bootstrap-datepicker code to ES2015 classes
- [x] Remove all date parsing code/locales and substitute [moment.js](http://momentjs.com/)
- [x] Remove all the UI placement code, and substitute with [popper.js](http://popper.js.org/)
- [x] Refactor large codebase into maintainable/encapsulated classes
- [x] Port the tests
- [ ] Create `presets` for rendering on different frameworks       
  

## Developing

### Basics
1. Install Gulp 4 - `npm install -g gulpjs/gulp-cli#4.0`
1. Install dependencies - `npm install`
1. Full build - `gulp`

### Typical

I usually have two terminals open, just to speed up everything during development builds:

1. `gulp js:watch`
1. `gulp css:watch`

Open the `sandbox/index.html` or the `sandbox/test.html` in a browser and you should be good to go.


## Credits
> If I have seen further, it is by standing on the shoulders of giants. - Sir Isaac Newton

- [bootstrap-datepicker](https://github.com/eternicode/bootstrap-datepicker) - [Andrew Rowls](https://github.com/eternicode) and [contributors](https://github.com/eternicode/bootstrap-datepicker/graphs/contributors)
- [bootstrap-datepicker original code](http://www.eyecon.ro/bootstrap-datepicker/) - Stefan Petre

See [LICENSE](LICENSE.md)
