# picker.js
A picker for dates, date ranges, (and hopefully times) for multiple frameworks including Bootstrap 3, Bootstrap 4, and Material Design for Bootstrap 4

## Usage

## Bootstrap 3

See [test-bs3.html](blob/master/sandbox/test-bs3.html) for a sample.
```javascript
$('input').datepicker({preset: 'bs3'})
```
## Bootstrap 4

See [test-bs4.html](blob/master/sandbox/test-bs4.html) for a sample.
```javascript
$('input').datepicker({preset: 'bs4'})
```
## Bootstrap Material Design 4

See [test-bmd4.html](blob/master/sandbox/test-bmd4.html) for a sample.
```javascript
$('input').datepicker({preset: 'bmd4'})
```  
## Options
The datepicker is _very_ configurable, including buttons, disabled dates or days of week, and much much more.  Framework templates may override the `Default` configuration to achieve specific behaviors, for example the [BMD4Template](blob/master/js/templates/bmd4Template.js#L5) uses `CANCEL | OK` buttons, disables/skips the months view, and disables keyboard navigation so that all keypresses go directly to the input field.

With all of the options available, it's best to look [directly at the `Default` configuration](blob/master/js/datepicker.js#L19) for notes on how it works. You can also take a look at any of the [tests in the `config` directory](tree/master/test/datepicker/config).

### Date formats/parsing
_Every single bit of date functionality_ is handled by the fantastic [moment.js](http://momentjs.com/).  See the [moment.js documentation on formats](http://momentjs.com/docs/#/displaying/format/) for more information. A simple way to change the format is to pass in `{format: 'valid momentjs format'}` to the constructor.  See the [format test](blob/master/test/datepicker/config/format.js) for more.

### Popper placement
_Every single bit of UI placement functionality_ is handled by the fantastic [popper.js](http://popper.js.org/).  See the [popper.js documentation](http://popper.js.org/documentation.html)   

## Goal 

1. An ES2015 base classes for use in multiple renderings for different frameworks 
2. Variations of `datepicker`:
    - Bootstrap 3 - completed
    - Bootstrap 4 - works but could use some styling help
    - [bootstrap-material-design](https://github.com/FezVrasta/bootstrap-material-design/tree/v4-dev) 4 picker that meets the [Material Design specification](https://www.google.com/design/spec/components/pickers.html#) - works - needs help on the animated reveal/hide
3. (future) add time pickers - starting with material design    

## Why?
The bootsrap-datepicker project had 415 open issue and 64 open pull requests.  One reason for this is it bit off a big chunk, including all date functionality and rendering/placement functionality.

Maintaining that project may be too much, and we want to _expand_ it!  

## How?
- Use ES2015 classes (available as es, iife or umd)
- Use SCSS for full variable based customization/inclusion
- Use [moment.js](http://momentjs.com/)
- Use [popper.js](http://popper.js.org/)
- Created `presets` for rendering on different frameworks (BS3, BS4, BMD4)       

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
