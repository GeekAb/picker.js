/*!
  * picker.js v0.1.1 (https://github.com/alienfast/picker.js#readme)
  * Copyright 2016 Kevin Ross <kevin.ross@alienfast.com> (https://github.com/rosskevin)
  * Licensed under MIT
  */
(function (exports) {
    'use strict';

    var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
    function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }


    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers.get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    };

    babelHelpers.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    babelHelpers.possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    babelHelpers.toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    babelHelpers;

    var index = __commonjs(function (module) {
    	'use strict';

    	var hasOwn = Object.prototype.hasOwnProperty;
    	var toStr = Object.prototype.toString;

    	var isArray = function isArray(arr) {
    		if (typeof Array.isArray === 'function') {
    			return Array.isArray(arr);
    		}

    		return toStr.call(arr) === '[object Array]';
    	};

    	var isPlainObject = function isPlainObject(obj) {
    		if (!obj || toStr.call(obj) !== '[object Object]') {
    			return false;
    		}

    		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
    		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    		// Not own constructor property must be Object
    		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    			return false;
    		}

    		// Own properties are enumerated firstly, so to speed up,
    		// if last one is own, then all properties are own.
    		var key;
    		for (key in obj) {/**/}

    		return typeof key === 'undefined' || hasOwn.call(obj, key);
    	};

    	module.exports = function extend() {
    		var options,
    		    name,
    		    src,
    		    copy,
    		    copyIsArray,
    		    clone,
    		    target = arguments[0],
    		    i = 1,
    		    length = arguments.length,
    		    deep = false;

    		// Handle a deep copy situation
    		if (typeof target === 'boolean') {
    			deep = target;
    			target = arguments[1] || {};
    			// skip the boolean and the target
    			i = 2;
    		} else if ((typeof target === 'undefined' ? 'undefined' : babelHelpers.typeof(target)) !== 'object' && typeof target !== 'function' || target == null) {
    			target = {};
    		}

    		for (; i < length; ++i) {
    			options = arguments[i];
    			// Only deal with non-null/undefined values
    			if (options != null) {
    				// Extend the base object
    				for (name in options) {
    					src = target[name];
    					copy = options[name];

    					// Prevent never-ending loop
    					if (target !== copy) {
    						// Recurse if we're merging plain objects or arrays
    						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
    							if (copyIsArray) {
    								copyIsArray = false;
    								clone = src && isArray(src) ? src : [];
    							} else {
    								clone = src && isPlainObject(src) ? src : {};
    							}

    							// Never move original objects, clone them
    							target[name] = extend(deep, clone, copy);

    							// Don't bring in undefined values
    						} else if (typeof copy !== 'undefined') {
    								target[name] = copy;
    							}
    					}
    				}
    			}
    		}

    		// Return the modified object
    		return target;
    	};
    });

    var extend = index && (typeof index === 'undefined' ? 'undefined' : babelHelpers.typeof(index)) === 'object' && 'default' in index ? index['default'] : index;

    var index$2 = __commonjs(function (module) {
    	'use strict';

    	var toString = Object.prototype.toString;

    	module.exports = function (x) {
    		var prototype;
    		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
    	};
    });

    var require$$0 = index$2 && (typeof index$2 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$2)) === 'object' && 'default' in index$2 ? index$2['default'] : index$2;

    var index$3 = __commonjs(function (module) {
    	'use strict';

    	module.exports = function (re) {
    		return Object.prototype.toString.call(re) === '[object RegExp]';
    	};
    });

    var require$$1 = index$3 && (typeof index$3 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$3)) === 'object' && 'default' in index$3 ? index$3['default'] : index$3;

    var index$1 = __commonjs(function (module) {
    	'use strict';

    	var isRegexp = require$$1;
    	var isPlainObj = require$$0;

    	module.exports = function (val, opts, pad) {
    		var seen = [];

    		return function stringify(val, opts, pad) {
    			opts = opts || {};
    			opts.indent = opts.indent || '\t';
    			pad = pad || '';

    			if (val === null || val === undefined || typeof val === 'number' || typeof val === 'boolean' || typeof val === 'function' || isRegexp(val)) {
    				return String(val);
    			}

    			if (val instanceof Date) {
    				return 'new Date(\'' + val.toISOString() + '\')';
    			}

    			if (Array.isArray(val)) {
    				if (val.length === 0) {
    					return '[]';
    				}

    				return '[\n' + val.map(function (el, i) {
    					var eol = val.length - 1 === i ? '\n' : ',\n';
    					return pad + opts.indent + stringify(el, opts, pad + opts.indent) + eol;
    				}).join('') + pad + ']';
    			}

    			if (isPlainObj(val)) {
    				if (seen.indexOf(val) !== -1) {
    					return '"[Circular]"';
    				}

    				var objKeys = Object.keys(val);

    				if (objKeys.length === 0) {
    					return '{}';
    				}

    				seen.push(val);

    				var ret = '{\n' + objKeys.map(function (el, i) {
    					if (opts.filter && !opts.filter(val, el)) {
    						return '';
    					}

    					var eol = objKeys.length - 1 === i ? '\n' : ',\n';
    					var key = /^[a-z$_][a-z$_0-9]*$/i.test(el) ? el : stringify(el, opts);
    					return pad + opts.indent + key + ': ' + stringify(val[el], opts, pad + opts.indent) + eol;
    				}).join('') + pad + '}';

    				seen.pop(val);

    				return ret;
    			}

    			val = String(val).replace(/[\r\n]/g, function (x) {
    				return x === '\n' ? '\\n' : '\\r';
    			});

    			if (opts.singleQuotes === false) {
    				return '"' + val.replace(/"/g, '\\\"') + '"';
    			}

    			return '\'' + val.replace(/'/g, '\\\'') + '\'';
    		}(val, opts, pad);
    	};
    });

    var stringify = index$1 && (typeof index$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$1)) === 'object' && 'default' in index$1 ? index$1['default'] : index$1;

    var Default = {
      debug: false
    };

    var Base = function () {
      function Base() {
        babelHelpers.classCallCheck(this, Base);

        for (var _len = arguments.length, configs = Array(_len), _key = 0; _key < _len; _key++) {
          configs[_key] = arguments[_key];
        }

        this.config = extend.apply(undefined, [true, {}, Default].concat(configs));
      }

      babelHelpers.createClass(Base, [{
        key: 'i18n',
        value: function i18n(key) {
          return this.config.i18n[this.config.lang][key] || '';
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

          if (dataKey) {
            this.$element.data(dataKey, null);
          }
          this.$element = null;
          this.config = null;
        }
      }, {
        key: 'required',
        value: function required(object, name) {
          if (!object) {
            this.error('this.' + name + ' was not provided in ' + this.constructor.name);
          }
        }

        //---------------------
        // logger shortcuts

        /* eslint-disable no-console */

      }, {
        key: 'debug',
        value: function debug() {
          if (this.config.debug) {
            var _console;

            (_console = console).debug.apply(_console, arguments);
          }
        }
      }, {
        key: 'info',
        value: function info() {
          var _console2;

          (_console2 = console).info.apply(_console2, arguments);
        }
      }, {
        key: 'warn',
        value: function warn() {
          var _console3;

          (_console3 = console).warn.apply(_console3, arguments);
        }
      }, {
        key: 'error',
        value: function error() {
          var _console4;

          (_console4 = console).error.apply(_console4, arguments);
        }

        /* eslint-enable no-console */

      }, {
        key: 'throwError',
        value: function throwError(msg) {
          throw new Error('[' + this.constructor.name + '] ' + msg);
        }
      }, {
        key: 'debugDump',
        value: function debugDump(msg, obj) {
          if (this.config.debug) {
            this.debug(msg + ':\n' + this.dump(obj));
          }
        }
      }, {
        key: 'dump',
        value: function dump(obj) {
          return stringify(obj);
        }
      }]);
      return Base;
    }();

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'datepicker';
    var Data = {
      KEY: '' + NAME,
      API_KEY: '.data-api',
      MOMENT: 'moment',
      PROVIDE: 'provide'
    };

    var JQUERY_NAME = NAME; // `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`

    var View = {
      DAYS: 0,
      MONTHS: 1,
      YEARS: 2,
      DECADES: 3,
      CENTURIES: 4
    };

    var Unit = {
      // units
      DAY: 'day',
      WEEK: 'week',
      MONTH: 'month',
      YEAR: 'year',
      DECADE: 'decade',
      CENTURY: 'century'
    };

    var EVENT_KEY = '.' + Data.KEY;
    var CHANGE_EVENT_KEY = '.change' + EVENT_KEY;

    var Event = {
      DATE_CHANGE: 'date' + CHANGE_EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      //  SHOWN          : `shown${EVENT_KEY}`,
      HIDE: 'hide' + EVENT_KEY,
      //  HIDDEN         : `hidden${EVENT_KEY}`,
      CLICK_DATA_API: 'click' + EVENT_KEY + Data.API_KEY,

      // units
      DAY_CHANGE: '' + Unit.DAY + CHANGE_EVENT_KEY,
      WEEK_CHANGE: '' + Unit.WEEK + CHANGE_EVENT_KEY,
      MONTH_CHANGE: '' + Unit.MONTH + CHANGE_EVENT_KEY,
      YEAR_CHANGE: '' + Unit.YEAR + CHANGE_EVENT_KEY,
      DECADE_CHANGE: '' + Unit.DECADE + CHANGE_EVENT_KEY,
      CENTURY_CHANGE: '' + Unit.CENTURY + CHANGE_EVENT_KEY
    };

    var ClassName = {
      NAME: NAME,
      PREV: 'prev',
      NEXT: 'next',
      DOW: 'dow',
      SELECTED: 'selected',
      HIGHLIGHTED: 'highlighted',
      DISABLED: 'disabled',
      ACTIVE: 'active',
      FOCUSED: 'focused',
      NEW: 'new',
      OLD: 'old',
      VIEW: 'view',

      // buttons
      TODAY: 'today',
      CLEAR: 'clear',
      CANCEL: 'cancel',
      OK: 'ok',

      // labels for replacement of text
      LABEL_YEAR: 'label-year',
      LABEL_DATE: 'label-date',
      LABEL_TITLE: 'title',

      POPPER: 'popper',

      SWITCH: 'switch',

      INLINE: 'inline',
      RTL: 'rtl',

      DAYS: 'days',
      MONTHS: 'months',
      YEARS: 'years',
      DECADES: 'decades',
      CENTURIES: 'centuries',

      // range
      RANGE: 'range',
      RANGE_START: 'range-start',
      RANGE_END: 'range-end'
    };

    var Selector = {
      DATA_PROVIDE: '[data-' + Data.PROVIDE + '="' + NAME + '"]',

      DATEPICKER: '.' + NAME,

      ACTIVE: '.' + ClassName.ACTIVE,
      FOCUSED: '.' + ClassName.FOCUSED,
      OLD: '.' + ClassName.OLD,
      NEW: '.' + ClassName.NEW,

      // buttons
      TODAY: '.' + ClassName.TODAY,
      CLEAR: '.' + ClassName.CLEAR,
      CANCEL: '.' + ClassName.CANCEL,
      OK: '.' + ClassName.OK,

      // labels for replacement of text
      LABEL_YEAR: '.' + ClassName.LABEL_YEAR,
      LABEL_DATE: '.' + ClassName.LABEL_DATE,
      LABEL_TITLE: '.' + ClassName.LABEL_TITLE,

      PREV: '.' + ClassName.PREV,
      NEXT: '.' + ClassName.NEXT,

      SWITCH: '.' + ClassName.SWITCH,
      POPPER: '.' + ClassName.POPPER,

      DAY: '.' + Unit.DAY,
      MONTH: '.' + Unit.MONTH,
      YEAR: '.' + Unit.YEAR,

      DAYS: '.' + ClassName.DAYS,
      MONTHS: '.' + ClassName.MONTHS,
      YEARS: '.' + ClassName.YEARS,
      DECADES: '.' + ClassName.DECADES,
      CENTURIES: '.' + ClassName.CENTURIES
    };

    var Visibility = {
      HIDDEN: { visibility: 'hidden' },
      VISIBLE: { visibility: 'visible' }
    };

    /**
     * This class registers overridable partials in the {Default} hash constant.  Subclasses can override this
     * {Default} config by passing in any keys as overrides.
     *
     * Interpolation is delayed until #createTemplate is called in order to allow Subclasses to make use of any
     * superclasses' partials.  Tokens are denoted by %% e.g. %header% will be replaced by config.header.
     *
     */
    var Default$3 = {};

    var BaseTemplate = function (_Base) {
      babelHelpers.inherits(BaseTemplate, _Base);

      function BaseTemplate() {
        var _Object$getPrototypeO;

        babelHelpers.classCallCheck(this, BaseTemplate);

        for (var _len = arguments.length, configs = Array(_len), _key = 0; _key < _len; _key++) {
          configs[_key] = arguments[_key];
        }

        return babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BaseTemplate)).call.apply(_Object$getPrototypeO, [this, Default$3].concat(configs)));
      }

      /**
       * Primarily here for override purposes
       * @returns non-interpolated template
       */


      babelHelpers.createClass(BaseTemplate, [{
        key: 'getTemplate',
        value: function getTemplate() {
          return '<div class="' + ClassName.NAME + '">\n      ' + this.generateView(ClassName.DAYS) + '\n      ' + this.generateView(ClassName.MONTHS) + '\n      ' + this.generateView(ClassName.YEARS) + '\n      ' + this.generateView(ClassName.DECADES) + '\n      ' + this.generateView(ClassName.CENTURIES) + '\n    </div>';
        }
      }, {
        key: 'generateView',
        value: function generateView(className) {
          // eslint-disable-line no-unused-vars
          throw new Error('subclass must implement or override #getTemplate so this is not called.');
        }
      }, {
        key: 'interpolate',
        value: function interpolate() {
          return this.getTemplate()
          // .replace(/%header%/g, this.config.header)
          // .replace(/%body%/g, this.config.body)
          // .replace(/%footer%/g, this.config.footer)
          .replace(/%arrow\.left%/g, this.config.markup.arrow.left || '').replace(/%arrow\.right%/g, this.config.markup.arrow.right || '');
        }
      }, {
        key: 'getDaySwitchFormat',
        value: function getDaySwitchFormat() {
          return 'ddd, MMM D'; // Thu, Apr 13
        }
      }, {
        key: 'getDayOfWeekFormat',
        value: function getDayOfWeekFormat() {
          return 'dd'; // Su Mo Tu We Th Fr Sa
        }
      }, {
        key: 'getLabelYearFormat',
        value: function getLabelYearFormat() {
          return 'YYYY';
        }
      }, {
        key: 'getLabelDateFormat',
        value: function getLabelDateFormat() {
          return 'ddd, MMM D'; // Thu, Apr 13
        }
      }, {
        key: 'formatDaySwitch',
        value: function formatDaySwitch(date) {
          return date.format(this.getDaySwitchFormat());
        }
      }, {
        key: 'formatDayOfWeek',
        value: function formatDayOfWeek(date) {
          return date.format(this.getDayOfWeekFormat());
        }
      }, {
        key: 'formatLabelYear',
        value: function formatLabelYear(date) {
          return date.format(this.getLabelYearFormat());
        }
      }, {
        key: 'formatLabelDate',
        value: function formatLabelDate(date) {
          return date.format(this.getLabelDateFormat());
        }

        /**
         *
         * @param date
         * @param classNames
         * @param tooltip
         * @returns {string}
         */

      }, {
        key: 'renderDay',
        value: function renderDay(date, classNames) {
          var tooltip = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

          return '<td class="' + classNames.join(' ') + '" ' + tooltip + ' data-' + Data.MOMENT + '="' + date + '">' + this.renderDayContent(date, classNames) + '</td>';
        }

        /**
         *
         * @param date
         * @param classNames - array - passed to be used as markers only, not to be rendered.  These are rendered in the container
         * @returns {string}
         */

      }, {
        key: 'renderDayContent',
        value: function renderDayContent(date, classNames) {
          // eslint-disable-line no-unused-vars
          return date.date();
        }

        /**
         *
         * @param date
         * @param classNames
         * @param tooltip
         * @returns {string}
         */

      }, {
        key: 'renderMonth',
        value: function renderMonth(date, classNames) {
          var tooltip = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

          return '<span class="' + classNames.join(' ') + '" ' + tooltip + ' data-' + Data.MOMENT + '="' + date + '">' + this.renderMonthContent(date, classNames) + '</span>';
        }

        /**
         *
         * @param date
         * @param classNames
         * @returns {*}
         */

      }, {
        key: 'renderMonthContent',
        value: function renderMonthContent(date, classNames) {
          // eslint-disable-line no-unused-vars
          return date.format('MMM'); // Jan
        }

        /**
         *
         * @param date
         * @param classNames - array - passed to be used as markers only, not to be rendered.  These are rendered in the container
         * @returns {string}
         */

      }, {
        key: 'renderYearContent',
        value: function renderYearContent(date, classNames) {
          // eslint-disable-line no-unused-vars
          return date.year();
        }

        /**
         *
         * @param date
         * @param classNames
         * @param tooltip
         * @returns {string}
         */

      }, {
        key: 'renderYear',
        value: function renderYear(date, classNames) {
          var tooltip = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

          return '<span class="' + classNames.join(' ') + '" ' + tooltip + ' data-' + Data.MOMENT + '="' + date + '">' + this.renderYearContent(date, classNames) + '</span>';
        }
      }]);
      return BaseTemplate;
    }(Base);

    /**
     * This class registers overridable partials in the {Default} hash constant.  Subclasses can override this
     * {Default} config by passing in any keys as overrides.
     *
     * Interpolation is delayed until #createTemplate is called in order to allow Subclasses to make use of any
     * superclasses' partials.  Tokens are denoted by %% e.g. %header% will be replaced by config.header.
     *
     */
    var Default$2 = {
      // keep templates under the markup key so they can be whacked and not included in the general config overrides
      markup: {
        arrow: {
          left: '&laquo;',
          right: '&raquo;'
        }
      }
    };

    var BS3Template = function (_BaseTemplate) {
      babelHelpers.inherits(BS3Template, _BaseTemplate);

      function BS3Template() {
        var _Object$getPrototypeO;

        babelHelpers.classCallCheck(this, BS3Template);

        for (var _len = arguments.length, configs = Array(_len), _key = 0; _key < _len; _key++) {
          configs[_key] = arguments[_key];
        }

        return babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BS3Template)).call.apply(_Object$getPrototypeO, [this, Default$2].concat(configs)));
      }

      babelHelpers.createClass(BS3Template, [{
        key: 'generateView',
        value: function generateView(className) {
          var html = '<div class="' + className + ' ' + ClassName.VIEW + '">\n    <table>\n      <thead>\n        <tr>\n          <th colspan="7" class="' + ClassName.LABEL_TITLE + '"></th>\n        </tr>\n        <tr>\n          <th class="' + ClassName.PREV + '">%arrow.left%</th>\n          <th colspan="5" class="' + ClassName.SWITCH + '"></th>\n          <th class="' + ClassName.NEXT + '">%arrow.right%</th>\n        </tr>\n      </thead>\n      <tbody>';

          if (className !== ClassName.DAYS) {
            html += '<tr>\n          <td colspan="7"></td>\n        </tr>';
          }

          html += '\n      </tbody>\n      <tfoot>\n        <tr>\n          <th colspan="7" class="' + ClassName.TODAY + '"></th>\n        </tr>\n        <tr>\n          <th colspan="7" class="' + ClassName.CLEAR + '"></th>\n        </tr>\n      </tfoot>\n    </table>\n  </div>';

          return html;
        }
      }]);
      return BS3Template;
    }(BaseTemplate);

    // import {ClassName} from './../constants'

    /**
     * Eventually we will probably be rendering different markup...
     *
     */
    var Default$1 = {};

    var BS4Template = function (_BS3Template) {
      babelHelpers.inherits(BS4Template, _BS3Template);

      function BS4Template() {
        var _Object$getPrototypeO;

        babelHelpers.classCallCheck(this, BS4Template);

        for (var _len = arguments.length, configs = Array(_len), _key = 0; _key < _len; _key++) {
          configs[_key] = arguments[_key];
        }

        return babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BS4Template)).call.apply(_Object$getPrototypeO, [this, Default$1].concat(configs)));
      }

      return BS4Template;
    }(BS3Template);

    var Default$4 = {
      // config overrides specific to this template
      button: {
        today: true,
        cancel: true,
        ok: true
      },
      view: {
        max: 'years', // Set a maximum limit for the view mode
        disabled: ['months'] // Skip the month view
      },
      keyboard: {
        navigation: false, // disable so that all keys work in the input i.e. back arrow so they can type in a date or use the mouse.
        touch: false // false will disable keyboard on mobile devices
      },
      // keep templates under the markup key so they can be whacked and not included in the general config overrides
      markup: {
        arrow: {
          left: '<i class="material-icons left-arrow">keyboard_arrow_left</i>',
          right: '<i class="material-icons right-arrow">keyboard_arrow_right</i>'
        }
      }
    };

    var BMD4Template = function (_BaseTemplate) {
      babelHelpers.inherits(BMD4Template, _BaseTemplate);

      function BMD4Template() {
        var _Object$getPrototypeO;

        babelHelpers.classCallCheck(this, BMD4Template);

        for (var _len = arguments.length, configs = Array(_len), _key = 0; _key < _len; _key++) {
          configs[_key] = arguments[_key];
        }

        return babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BMD4Template)).call.apply(_Object$getPrototypeO, [this, Default$4].concat(configs)));
      }

      babelHelpers.createClass(BMD4Template, [{
        key: 'getDaySwitchFormat',
        value: function getDaySwitchFormat() {
          return 'MMMM YYYY'; // April 2016
        }

        /**
         * Unfortunately moment doesn't have the format we want, so we have to hack it directly
         * @param date
         * @returns string
         */

      }, {
        key: 'formatDayOfWeek',
        value: function formatDayOfWeek(date) {
          return babelHelpers.get(Object.getPrototypeOf(BMD4Template.prototype), 'formatDayOfWeek', this).call(this, date)[0]; // S M T W T F S
        }
      }, {
        key: 'generateView',
        value: function generateView(className) {
          var html = '<div class="card ' + className + ' ' + ClassName.VIEW + '">\n      <div class="card-header">\n        <div class="card-text ' + ClassName.LABEL_YEAR + '"></div>\n        <h2 class="card-title ' + ClassName.LABEL_DATE + '"></h2>\n      </div>\n    \n      <div class="card-block">\n        <div class="card-title">\n          <button class="btn ' + ClassName.PREV + '">%arrow.left%</button>\n          <button class="btn ' + ClassName.SWITCH + '"></button>\n          <button class="btn ' + ClassName.NEXT + '">%arrow.right%</button>\n        </div>\n    \n    \n        <div class="card-text">\n          <!-- view here -->\n          <table>\n            <thead></thead>\n            <tbody>';
          if (className !== ClassName.DAYS) {
            html += '<tr>\n              <td colspan="7"></td>\n            </tr>';
          }
          html += '</tbody>\n          </table>\n        </div>\n    \n      </div>\n      <div class="card-footer">\n        <button class="btn btn-primary ' + ClassName.TODAY + '"></button>\n        <button class="btn btn-primary ' + ClassName.CLEAR + '"></button>\n        <button class="btn btn-primary ' + ClassName.CANCEL + '"></button>\n        <button class="btn btn-primary ' + ClassName.OK + '"></button>\n      </div>\n    </div>';

          return html;
        }

        /**
         *
         * @param date
         * @param classNames - array - passed to be used as markers only, not to be rendered.  These are rendered in the container
         * @returns {string}
         */

      }, {
        key: 'renderDayContent',
        value: function renderDayContent(date, classNames) {
          var classes = ['btn', 'bmd-btn-icon'];
          if (classNames.includes(ClassName.DISABLED)) {
            classes.push(ClassName.DISABLED);
          }
          return '<button class="' + classes.join(' ') + '">' + date.date() + '</button>';
        }
      }, {
        key: 'renderMonth',
        value: function renderMonth(date, classNames) {
          var tooltip = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

          return '<button class="btn ' + classNames.join(' ') + '" ' + tooltip + ' data-' + Data.MOMENT + '="' + date + '">' + this.renderMonthContent(date, classNames) + '</button>';
        }
      }, {
        key: 'renderYear',
        value: function renderYear(date, classNames) {
          var tooltip = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

          return '<button class="btn ' + classNames.join(' ') + '" ' + tooltip + ' data-' + Data.MOMENT + '="' + date + '">' + this.renderYearContent(date, classNames) + '</button>';
        }
      }]);
      return BMD4Template;
    }(BaseTemplate);

    /**
     * This class registers overridable partials in the {Default} hash constant.  Subclasses can override this
     * {Default} config by passing in any keys as overrides.
     *
     * Interpolation is delayed until #createTemplate is called in order to allow Subclasses to make use of any
     * superclasses' partials.  Tokens are denoted by %% e.g. %header% will be replaced by config.header.
     *
     */
    var Default$5 = {};

    var BS4Template$1 = function (_BaseTemplate) {
      babelHelpers.inherits(BS4Template, _BaseTemplate);

      function BS4Template(stringTemplate) {
        babelHelpers.classCallCheck(this, BS4Template);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BS4Template).call(this, Default$5));

        _this.stringTemplate = stringTemplate;
        return _this;
      }

      babelHelpers.createClass(BS4Template, [{
        key: 'getTemplate',
        value: function getTemplate() {
          return this.stringTemplate;
        }
      }]);
      return BS4Template;
    }(BaseTemplate);

    /**
     * A preset can override any {Default} from the {Datepicker}.  User configs are ultimately the winner if there
     * is any conflict in the deep merge.
     */
    var Preset = function () {
      function Preset() {
        babelHelpers.classCallCheck(this, Preset);
      }

      babelHelpers.createClass(Preset, null, [{
        key: 'resolveTemplateConfig',
        value: function resolveTemplateConfig(config) {
          var p = config.preset.toLowerCase();
          var value = void 0;
          switch (p) {
            case 'bs3':
              {
                value = {
                  template: new BS4Template()
                };
                break;
              }
            case 'bs4':
              {
                value = {
                  template: new BS4Template()
                };
                break;
              }
            case 'bmd4':
              {
                value = {
                  template: new BMD4Template()
                };
                break;
              }
            case 'custom':
              {
                // custom can pass a class or a string
                if (typeof config.template === 'string') {
                  value = {
                    template: new BS4Template$1(config.template)
                  };
                } else {
                  value = {}; // nothing, assume they passed a class (no change necessary) and know what they are doing
                }
                break;
              }
            default:
              throw new Error('Unknown \'preset\' \'' + config.preset + '\'. Try one of: bs3 | bs4 | bmd4 | custom');
          }
          return value;
        }

        /**
         * Helper to quickly resolve the config from preset based on the presetType
         *
         * @param preset
         * @param userConfigs - ordered set of overrides
         * @returns {source, watch, dest}
         */

      }, {
        key: 'resolve',
        value: function resolve() {
          for (var _len = arguments.length, userConfigs = Array(_len), _key = 0; _key < _len; _key++) {
            userConfigs[_key] = arguments[_key];
          }

          // default preset is bs4
          var userConfig = extend.apply(undefined, [true, { preset: 'bs4' }].concat(userConfigs));

          var templateConfig = this.resolveTemplateConfig(userConfig);
          var template = templateConfig.template;

          // get a copy of the template config
          var templateOverrides = extend(true, {}, template.config);
          // whack the markup key so that we don't include giant templates in our config
          templateOverrides.markup = undefined;

          // Template (object) config overrides userConfig - it converts config to a Template class.
          // We also gather any Template config and add it, but any userConfig can override it.
          var resolved = extend(true, {}, templateOverrides, userConfig, templateConfig);

          if (!resolved.template) {
            throw new Error('\'template\' must be either a Template class or a String');
          }

          //console.log(`resolved config with preset: \n${stringify(resolved)}`)
          return resolved;
        }
      }]);
      return Preset;
    }();

    var Renderer = function (_Base) {
      babelHelpers.inherits(Renderer, _Base);

      function Renderer(datepicker) {
        babelHelpers.classCallCheck(this, Renderer);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Renderer).call(this));

        _this.dp = datepicker;
        _this.config = _this.dp.config; // shortcut reference to same config
        _this.$picker = $(_this.config.template.interpolate());

        if (_this.dp.isInline) {
          _this.$picker.addClass(ClassName.INLINE).appendTo(_this.dp.$element);
        }

        if (_this.config.rtl) {
          _this.$picker.addClass(ClassName.RTL);
        }

        _this.renderDaysViewDOW();
        _this.renderButtons();
        return _this;
      }

      babelHelpers.createClass(Renderer, [{
        key: 'dispose',
        value: function dispose() {
          this.$picker.remove();
          this.$picker = undefined;
          this.dp = undefined;
          babelHelpers.get(Object.getPrototypeOf(Renderer.prototype), 'dispose', this).call(this);
        }

        /**
         * Show a specific view by id.
         * @param viewId
         */

      }, {
        key: 'showView',
        value: function showView(viewId) {
          this.$picker.children('div').hide().filter('.' + this.config.view.modes[viewId].cssClass) // days|months|years|decades|centuries
          .show();
          this.updateNavArrows();
        }
      }, {
        key: 'render',
        value: function render() {
          var viewDate = this.dp.viewDate.clone().local();
          // title text
          this.$picker.find('' + Selector.LABEL_TITLE).text(this.config.title).toggle(this.config.label.title !== undefined);
          this.$picker.find('' + Selector.LABEL_YEAR).text(this.config.template.formatLabelYear(viewDate));
          this.$picker.find('' + Selector.LABEL_DATE).text(this.config.template.formatLabelDate(viewDate));

          this.updateNavArrows(viewDate);
          this.renderMonthsView(viewDate);
          this.renderDaysView(viewDate);

          // Generate the years/decades/centuries
          var year = viewDate.year();
          var startYear = this.config.date.start.year();
          var endYear = this.config.date.end.year();

          // Generating years picker
          this.renderYearsView(Selector.YEARS, Unit.YEAR, 10, 1, year, startYear, endYear, this.config.beforeShowYear);

          // Generating decades picker
          this.renderYearsView(Selector.DECADES, Unit.DECADE, 100, 10, year, startYear, endYear, this.config.beforeShowDecade);

          // Generating centuries picker
          this.renderYearsView(Selector.CENTURIES, Unit.CENTURY, 1000, 100, year, startYear, endYear, this.config.beforeShowCentury);
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: 'updateNavArrows',
        value: function updateNavArrows(viewDate) {
          if (!this.allowUpdate) return;

          var year = viewDate.year();
          var month = viewDate.month();
          var $prev = this.$picker.find(Selector.PREV);
          var $next = this.$picker.find(Selector.NEXT);

          switch (this.dp.viewMode) {
            case View.DAYS:
              if (year <= this.config.date.start.year() && month <= this.config.date.start.month()) {
                $prev.css(Visibility.HIDDEN);
              } else {
                $prev.css(Visibility.VISIBLE);
              }
              if (year >= this.config.date.end.year() && month >= this.config.date.end.month()) {
                $next.css(Visibility.HIDDEN);
              } else {
                $next.css(Visibility.VISIBLE);
              }
              break;
            case View.MONTHS:
            case View.YEARS:
            case View.DECADES:
            case View.CENTURIES:
              if (year <= this.config.date.start.year() || this.config.view.max < View.YEARS) {
                $prev.css(Visibility.HIDDEN);
              } else {
                $prev.css(Visibility.VISIBLE);
              }
              if (year >= this.config.date.end.year() || this.config.view.max < View.YEARS) {
                $next.css(Visibility.HIDDEN);
              } else {
                $next.css(Visibility.VISIBLE);
              }
              break;
          }
        }
      }, {
        key: 'renderDaysViewDOW',
        value: function renderDaysViewDOW() {
          var dowCnt = this.config.week.start;
          var html = '<tr>';
          while (dowCnt < this.config.week.start + 7) {
            var disabledClass = $.inArray(dowCnt, this.config.daysOfWeek.disabled) > -1 ? ClassName.DISABLED : '';
            var date = this.dp.newMoment().day(dowCnt++ % 7);
            html += '<th class="' + ClassName.DOW + ' ' + disabledClass + '">' + this.config.template.formatDayOfWeek(date) + '</th>';
          }
          html += '</tr>';
          this.$picker.find(Selector.DAYS + ' thead').append(html);
        }
      }, {
        key: 'renderButtons',
        value: function renderButtons() {
          // today button text
          this.$picker.find(Selector.TODAY).text(this.i18n('today')).toggle(this.config.button.today !== false);
          // clear button text
          this.$picker.find(Selector.CLEAR).text(this.i18n('clear')).toggle(this.config.button.clear !== false);
          // cancel button
          this.$picker.find(Selector.CANCEL).text(this.i18n('cancel')).toggle(this.config.button.cancel !== false);
          // ok button
          this.$picker.find(Selector.OK).text(this.i18n('ok')).toggle(this.config.button.ok !== false);
        }
      }, {
        key: 'renderDaysView',
        value: function renderDaysView(viewDate) {
          // get prevMonth moment set to same day of the week
          var prevMonth = viewDate.clone().startOf(Unit.MONTH).subtract(1, 'day'); // end of last month
          prevMonth.day(prevMonth.day() - (prevMonth.day() - this.config.week.start + 7) % 7); // set day of week

          // TODO: not sure why 42 days is added (yet)...
          var nextMonth = prevMonth.clone().add(42, 'days');

          var html = [];
          while (prevMonth.isBefore(nextMonth)) {
            this.renderDay(viewDate, prevMonth, html);
            prevMonth.add(1, 'days');
          }

          var $view = this.$picker.find('' + Selector.DAYS);

          // attach new days content
          $view.find('tbody').empty().append(html.join(''));

          // render switch text e.g. Thu, Apr 13
          $view.find('' + Selector.SWITCH).text(this.config.template.formatDaySwitch(viewDate));
        }
      }, {
        key: 'renderDay',
        value: function renderDay(viewDate, date, html) {
          var before = null;
          var tooltip = '';
          if (date.day() === this.config.week.start) {
            html.push('<tr>');
          }
          var classNames = this.getDayClassNames(viewDate, date);
          classNames.push(Unit.DAY);
          // this.config.template.addDayClasses(date, classNames)

          /*
           A function that takes a date as a parameter and returns one of the following values:
            - undefined to have no effect
           - An object with the following properties:
           disabled: A Boolean, indicating whether or not this date is disabled
           classes: A String representing additional CSS classes to apply to the date’s cell
           tooltip: A tooltip to apply to this date, via the title HTML attribute
           */
          if (this.config.beforeShowDay !== undefined) {
            before = this.config.beforeShowDay(date);
            if (before === undefined) {
              before = {};
            }
            if (before.disabled === true) {
              classNames.push(ClassName.DISABLED);
            }
            if (before.classes) {
              classNames = classNames.concat(before.classes.split(/\s+/));
            }
            if (before.tooltip) {
              tooltip = before.tooltip ? ' title="' + before.tooltip + '"' : '';
            }
          }

          classNames = $.unique(classNames);
          html.push(this.config.template.renderDay(date, classNames, tooltip));
          if (date.day() === this.config.week.end) {
            html.push('</tr>');
          }
        }
      }, {
        key: 'renderMonthsView',
        value: function renderMonthsView(viewDate) {
          var $view = this.$picker.find(Selector.MONTHS);
          var year = viewDate.year();
          var startYear = this.config.date.start.year();
          var startMonth = this.config.date.start.month();
          var endYear = this.config.date.end.year();
          var endMonth = this.config.date.end.month();
          var html = '';

          for (var i = 0; i < 12; i++) {
            // 0..11
            var classNames = [Unit.MONTH];
            if (viewDate && viewDate.month() === i) classNames.push(ClassName.FOCUSED);

            var date = this.dp.newMoment().month(i).startOf('month');
            html += this.config.template.renderMonth(date, classNames);
          }

          $view.find('td').html(html);
          $view.find(Selector.SWITCH).text(year);
          var $months = $view.find(Selector.MONTH);

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.dp.dates.array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var d = _step.value;

              if (d.year() === year) {
                $months.eq(d.month()).addClass(ClassName.ACTIVE);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (year < startYear || year > endYear) {
            $months.addClass(ClassName.DISABLED);
          }
          if (year === startYear) {
            $months.slice(0, startMonth).addClass(ClassName.DISABLED);
          }
          if (year === endYear) {
            $months.slice(endMonth + 1).addClass(ClassName.DISABLED);
          }

          /*
           A function that takes a date as a parameter and returns one of the following values:
            - undefined to have no effect
           - An object with the following properties:
           disabled: A Boolean, indicating whether or not this date is disabled
           classes: A String representing additional CSS classes to apply to the date’s cell
           tooltip: A tooltip to apply to this date, via the title HTML attribute
           */
          if (this.config.beforeShowMonth !== undefined) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = $months[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var month = _step2.value;

                var $month = $(month);
                var m = this.dp.newMoment($month.data(Data.MOMENT));
                var before = this.config.beforeShowMonth(m);
                if (before === undefined) {
                  before = {};
                }
                if (before.disabled === true) {
                  $month.addClass(ClassName.DISABLED);
                }
                if (before.classes) {
                  $month.addClass(before.classes);
                }
                if (before.tooltip) {
                  $month.prop('title', before.tooltip);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        }
      }, {
        key: 'renderYearsView',
        value: function renderYearsView(selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
          var html = '';
          var $view = this.$picker.find(selector);
          var currentYearFactored = parseInt(currentYear / factor, 10) * factor;
          var startStep = parseInt(startYear / step, 10) * step;
          var endStep = parseInt(endYear / step, 10) * step;
          var steps = $.map(this.dp.dates.array, function (d) {
            return parseInt(d.year() / step, 10) * step;
          });

          $view.find(Selector.SWITCH).text(currentYearFactored + '-' + (currentYearFactored + step * 9));

          var year = currentYearFactored - step;
          for (var i = -1; i < 11; i += 1) {
            var classNames = [cssClass];

            if (i === -1) {
              classNames.push(ClassName.OLD);
            } else if (i === 10) {
              classNames.push(ClassName.NEW);
            }
            if ($.inArray(year, steps) !== -1) {
              classNames.push(ClassName.ACTIVE);
            }
            if (year < startStep || year > endStep) {
              classNames.push(ClassName.DISABLED);
            }
            if (year === this.dp.viewDate.year()) {
              classNames.push(ClassName.FOCUSED);
            }

            /*
             A function that takes a date as a parameter and returns one of the following values:
              - undefined to have no effect
             - An object with the following properties:
             disabled: A Boolean, indicating whether or not this date is disabled
             classes: A String representing additional CSS classes to apply to the date’s cell
             tooltip: A tooltip to apply to this date, via the title HTML attribute
             */
            var tooltip = '';
            var m = this.dp.newMoment().year(year).startOf(Unit.YEAR);
            if (callback !== undefined) {
              var before = callback(m);

              if (before === undefined) {
                before = {};
              }
              if (before.disabled === true) {
                classNames.push(ClassName.DISABLED);
              }
              if (before.classes) {
                classNames = classNames.concat(before.classes.split(/\s+/));
              }
              if (before.tooltip) {
                tooltip = before.tooltip ? 'title="' + before.tooltip + '"' : '';
              }
            }

            html += this.config.template.renderYear(m, classNames, tooltip);
            year += step;
          }
          $view.find('td').html(html);
        }
      }, {
        key: 'getDayClassNames',
        value: function getDayClassNames(viewDate, date) {
          var classes = [];
          var viewYear = viewDate.year();
          var viewMonth = viewDate.month();
          var year = date.year();
          var month = date.month();
          var today = this.dp.newMoment().local();

          if (year < viewYear || year === viewYear && month < viewMonth) {
            classes.push(ClassName.OLD);
          } else if (year > viewYear || year === viewYear && month > viewMonth) {
            classes.push(ClassName.NEW);
          }
          if (this.dp.viewDate && date.isSame(this.dp.viewDate, 'day')) {
            classes.push(ClassName.FOCUSED);
          }
          // Compare internal UTC date with local today, not UTC today
          if (date.isSame(today, 'date')) {
            classes.push(ClassName.TODAY);
          }
          if (this.dp.dates.contains(date) !== -1) {
            classes.push(ClassName.ACTIVE);
          }
          if (!this.dp.boundedDate(date) || this.dp.dateIsDisabled(date)) {
            classes.push(ClassName.DISABLED);
          }
          if (this.dp.shouldBeHighlighted(date)) {
            classes.push(ClassName.HIGHLIGHTED);
          }

          // uses moment-range
          var range = this.dp.range;
          if (range) {
            if (range.contains(date)) {
              classes.push(ClassName.RANGE);
            }
            if (range.start.isSame(date) || range.end.isSame(date)) {
              classes.push(ClassName.SELECTED);
            }
            if (range.start.isSame(date)) {
              classes.push(ClassName.RANGE_START);
            }
            if (range.end.isSame(date)) {
              classes.push(ClassName.RANGE_END);
            }
          }
          return classes;
        }
      }]);
      return Renderer;
    }(Base);

    var Keycodes = {
      WIN_KEY_FF_LINUX: 0,
      MAC_ENTER: 3,
      BACKSPACE: 8,
      TAB: 9,
      NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAUSE: 19,
      CAPS_LOCK: 20,
      ESC: 27,
      SPACE: 32,
      PAGE_UP: 33, // also NUM_NORTH_EAST
      PAGE_DOWN: 34, // also NUM_SOUTH_EAST
      END: 35, // also NUM_SOUTH_WEST
      HOME: 36, // also NUM_NORTH_WEST
      LEFT: 37, // also NUM_WEST
      UP: 38, // also NUM_NORTH
      RIGHT: 39, // also NUM_EAST
      DOWN: 40, // also NUM_SOUTH
      PRINT_SCREEN: 44,
      INSERT: 45, // also NUM_INSERT
      DELETE: 46, // also NUM_DELETE
      ZERO: 48,
      ONE: 49,
      TWO: 50,
      THREE: 51,
      FOUR: 52,
      FIVE: 53,
      SIX: 54,
      SEVEN: 55,
      EIGHT: 56,
      NINE: 57,
      FF_SEMICOLON: 59, // Firefox (Gecko) fires this for semicolon instead of 186
      FF_EQUALS: 61, // Firefox (Gecko) fires this for equals instead of 187
      FF_DASH: 173, // Firefox (Gecko) fires this for dash instead of 189
      QUESTION_MARK: 63, // needs localization
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      META: 91, // WIN_KEY_LEFT
      WIN_KEY_RIGHT: 92,
      CONTEXT_MENU: 93,
      NUM_ZERO: 96,
      NUM_ONE: 97,
      NUM_TWO: 98,
      NUM_THREE: 99,
      NUM_FOUR: 100,
      NUM_FIVE: 101,
      NUM_SIX: 102,
      NUM_SEVEN: 103,
      NUM_EIGHT: 104,
      NUM_NINE: 105,
      NUM_MULTIPLY: 106,
      NUM_PLUS: 107,
      NUM_MINUS: 109,
      NUM_PERIOD: 110,
      NUM_DIVISION: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      NUMLOCK: 144,
      SCROLL_LOCK: 145,

      // OS-specific media keys like volume controls and browser controls.
      FIRST_MEDIA_KEY: 166,
      LAST_MEDIA_KEY: 183,

      SEMICOLON: 186, // needs localization
      DASH: 189, // needs localization
      EQUALS: 187, // needs localization
      COMMA: 188, // needs localization
      PERIOD: 190, // needs localization
      SLASH: 191, // needs localization
      APOSTROPHE: 192, // needs localization
      TILDE: 192, // needs localization
      SINGLE_QUOTE: 222, // needs localization
      OPEN_SQUARE_BRACKET: 219, // needs localization
      BACKSLASH: 220, // needs localization
      CLOSE_SQUARE_BRACKET: 221, // needs localization
      WIN_KEY: 224,
      MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
      MAC_WK_CMD_LEFT: 91, // WebKit Left Command key fired, same as META
      MAC_WK_CMD_RIGHT: 93, // WebKit Right Command key fired, different from META
      WIN_IME: 229
    };

    var Key = function (_Base) {
      babelHelpers.inherits(Key, _Base);

      function Key() {
        babelHelpers.classCallCheck(this, Key);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Key).call(this));
      }

      /**
       *
       * @param ev
       * @param codes - one to many Keycodes
       * @returns {boolean} - true if any of the given codes
       */


      babelHelpers.createClass(Key, null, [{
        key: 'is',
        value: function is(ev) {
          for (var _len = arguments.length, codes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            codes[_key - 1] = arguments[_key];
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = codes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var code = _step.value;

              if (this.toCode(ev) === code) {
                return true;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return false;
        }

        /**
         *
         * @param ev
         * @param codes - one to many Keycodes
         * @returns {boolean} - true if _none_ of the codes
         */

      }, {
        key: 'isNot',
        value: function isNot(ev) {
          for (var _len2 = arguments.length, codes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            codes[_key2 - 1] = arguments[_key2];
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = codes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var code = _step2.value;

              if (this.toCode(ev) === code) {
                return false;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return true;
        }
      }, {
        key: 'toCode',
        value: function toCode(ev) {
          return ev.keyCode || ev.which;
        }
      }]);
      return Key;
    }(Base);

    var EventManager = function (_Base) {
      babelHelpers.inherits(EventManager, _Base);

      function EventManager(datepicker) {
        babelHelpers.classCallCheck(this, EventManager);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EventManager).call(this));

        _this.dp = datepicker;
        _this.renderer = _this.dp.renderer;
        _this.config = _this.dp.config; // shortcut reference to same config
        _this.$document = $(document);

        // Element events
        _this.elementEvents = {
          keyup: function keyup(ev) {
            return _this.onKeyup(ev);
          },
          keydown: function keydown(ev) {
            return _this.onKeydown(ev);
          },
          paste: function paste(ev) {
            return _this.onPaste(ev);
          },
          click: function click() {
            return _this.dp.show();
          }
        };

        // on element focus show
        if (_this.config.showOnFocus === true) {
          _this.elementEvents.focus = function () {
            return _this.dp.show();
          };
        }

        // Picker events
        _this.pickerEvents = {
          // FIXME: these need to be added for keyboard nav after initial click (initial attempt didn't work - needs debugging).  It seems like these need to be on the document to catch the event such as esc after a mouse click
          //keyup: (ev) => this.onKeyup(ev),
          //keydown: (ev) => this.onKeydown(ev),
          click: function click(ev) {
            return _this.onPickerClick(ev);
          }
        };

        _this.pickerDocumntEvents = {
          mousedown: function mousedown(ev) {
            return _this.onMousedown(ev);
          }
        };

        // Initial attachment of events on element (input) - only removed on dispose
        _this.attachElementEvents();
        return _this;
      }

      babelHelpers.createClass(EventManager, [{
        key: 'dispose',
        value: function dispose() {
          this.detachElementEvents();
          this.detachPickerEvents();
          this.dp = undefined;
          this.renderer = undefined;
          this.elementEvents = undefined;
          this.pickerEvents = undefined;
          this.$document = undefined;
          babelHelpers.get(Object.getPrototypeOf(EventManager.prototype), 'dispose', this).call(this);
        }
      }, {
        key: 'attachElementEvents',
        value: function attachElementEvents() {
          this.attachEvents(this.dp.$input, this.elementEvents); // FIXME: should be $element?
        }
      }, {
        key: 'detachElementEvents',
        value: function detachElementEvents() {
          this.detachEvents(this.dp.$input, this.elementEvents);
        }
      }, {
        key: 'attachPickerEvents',
        value: function attachPickerEvents() {
          this.attachEvents(this.renderer.$picker, this.pickerEvents);
          this.attachEvents(this.$document, this.pickerDocumntEvents);
        }
      }, {
        key: 'detachPickerEvents',
        value: function detachPickerEvents() {
          this.detachEvents(this.renderer.$picker, this.pickerEvents);
          this.detachEvents(this.$document, this.pickerDocumntEvents);
        }
      }, {
        key: 'onShown',
        value: function onShown() {
          this.attachPickerEvents();
          this.trigger(Event.SHOW);
          if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && !this.config.keyboard.touch) {
            this.dp.$element.blur();
          }
        }
      }, {
        key: 'onHidden',
        value: function onHidden() {
          this.lastKeyboardFocusDate = null;
          this.detachPickerEvents();
          this.trigger(Event.HIDE);
        }
      }, {
        key: 'onMousedown',
        value: function onMousedown(ev) {
          // if clicked outside the datepicker, hide it
          if (!(this.dp.$element.is(ev.target) || this.dp.$element.find(ev.target).length || this.renderer.$picker.is(ev.target) || this.renderer.$picker.find(ev.target).length || this.renderer.$picker.hasClass(ClassName.INLINE))) {
            this.dp.hide();
          }
        }
      }, {
        key: 'popView',
        value: function popView(ev) {
          this.dp.changeView(-1);
          ev.preventDefault();
          ev.stopPropagation();
        }
      }, {
        key: 'onPickerClick',
        value: function onPickerClick(ev) {
          ev.preventDefault();
          ev.stopPropagation();

          // if mouse is used - clear out any old state from keyboard navigation
          this.lastKeyboardFocusDate = null;

          var $target = $(ev.target);
          var $navArrow = $target.closest(Selector.PREV + ', ' + Selector.NEXT);

          // --------------------------
          // Clicked on the switch
          if ($target.hasClass(ClassName.SWITCH)) {
            this.dp.changeView(1);
          }
          // --------------------------
          // Clicked on the cancel
          else if ($target.hasClass(ClassName.CANCEL)) {
              this.popView(ev);
            }
            // --------------------------
            // Clicked on the ok
            else if ($target.hasClass(ClassName.OK)) {
                this.acceptDate(ev);
                this.dp.hide();
              }
              // --------------------------
              // Clicked on prev or next
              else if ($navArrow.length > 0) {
                  var direction = this.config.view.modes[this.dp.view].navStep * ($navArrow.hasClass(ClassName.PREV) ? -1 : 1);
                  var unit = void 0;
                  if (this.dp.view === View.DAYS) {
                    unit = Unit.MONTH;
                  } else {
                    unit = Unit.YEAR;
                  }

                  this.dp.viewDate.add(direction, unit);
                  this.trigger(Event[unit.toUpperCase() + '_CHANGE']);

                  // set view date but don't select it using one of the #update methods
                  this.renderer.render();
                }
                // --------------------------
                // Clicked on today button
                else if ($target.hasClass(ClassName.TODAY)) {
                    this.dp.showView(View.DAYS);
                    this.dp.update(this.dp.newMoment());
                  }
                  // --------------------------
                  // Clicked on clear button
                  else if ($target.hasClass(ClassName.CLEAR)) {
                      this.dp.clearDates();
                    } else {
                      // Getting here means it was not a button

                      // Target may be markup inside the td, find the one with the data-moment
                      while ($target != null && $target[0].localName != 'body' && !$target.data(Data.MOMENT)) {
                        $target = $target.parent();
                      }

                      if (!$target.hasClass(ClassName.DISABLED)) {

                        // --------------------------
                        // Clicked on a day
                        if ($target.hasClass(Unit.DAY)) {
                          var origViewDate = this.dp.viewDate.clone();
                          var m = this.dp.newMoment($target.data(Data.MOMENT));
                          this.dp.updateMultidateOrToggle(m);
                          if (origViewDate.year() != m.year()) {
                            this.trigger(Event.YEAR_CHANGE, m);
                          }
                          if (origViewDate.month() != m.month()) {
                            this.trigger(Event.MONTH_CHANGE, m);
                          }
                        }
                        // --------------------------
                        // Clicked on a month
                        if ($target.hasClass(Unit.MONTH)) {
                          var month = $target.parent().find('span').index($target);
                          this.dp.updateMultidateOrToggle(this.dp.viewDate.clone().month(month));
                          this.trigger(Event.MONTH_CHANGE);
                          if (this.config.view.min === View.MONTHS) {
                            this.dp.showView();
                          } else {
                            this.dp.showView(View.DAYS);
                          }
                        }
                        // --------------------------
                        // Clicked on a year|decade|century
                        if ($target.hasClass(Unit.YEAR) || $target.hasClass(Unit.DECADE) || $target.hasClass(Unit.CENTURY)) {

                          var year = parseInt($target.text(), 10) || 0;
                          var _unit = void 0;
                          if ($target.hasClass(Unit.YEAR)) {
                            _unit = Unit.YEAR;
                          }
                          if ($target.hasClass(Unit.DECADE)) {
                            _unit = Unit.DECADE;
                          }
                          if ($target.hasClass(Unit.CENTURY)) {
                            _unit = Unit.CENTURY;
                          }

                          this.dp.updateMultidateOrToggle(this.dp.viewDate.clone().year(year));
                          if (_unit) {
                            this.trigger(Event[_unit.toUpperCase() + '_CHANGE']);
                          }
                          this.dp.changeView(-1);
                        }
                      }
                    }
        }
      }, {
        key: 'onKeyup',
        value: function onKeyup(ev) {
          if (Key.isNot(ev, Keycodes.ESC, Keycodes.LEFT, Keycodes.RIGHT, Keycodes.UP, Keycodes.DOWN, Keycodes.SPACE, Keycodes.ENTER, Keycodes.TAB))

            // This is called when someone is typing into the field, therefore try to send the value to update
            //  but do so without erroring in case parse is bad.
            try {
              this.dp.update();
            } catch (error) {// eslint-disable-line no-empty
            }
        }
      }, {
        key: 'onKeydown',
        value: function onKeydown(ev) {
          if (!this.dp.isShowing()) {
            if (Key.is(ev, Keycodes.DOWN, Keycodes.ESC)) {
              // allow down to re-show picker
              this.dp.show();
              ev.stopPropagation();
            }
            return;
          }

          switch (ev.keyCode) {
            case Keycodes.ESC:
              this.popView(ev);
              break;
            case Keycodes.ENTER:
            case Keycodes.TAB:
              this.acceptDate(ev);

              if (Key.is(ev, Keycodes.TAB)) {
                this.dp.hide();
              }
              break;
            case Keycodes.LEFT:
            case Keycodes.UP:
            case Keycodes.RIGHT:
            case Keycodes.DOWN:
              {
                var focusDate = this.lastKeyboardFocusDate || this.dp.dates.last() || this.dp.viewDate;
                if (!this.config.keyboard.navigation || this.config.daysOfWeek.disabled.length === 7) {
                  break;
                }
                var direction = Key.is(ev, Keycodes.LEFT, Keycodes.UP) ? -1 : 1;
                var unit = void 0;
                if (this.dp.view === View.DAYS) {
                  if (ev.ctrlKey) {
                    unit = Unit.YEAR;
                  } else if (ev.shiftKey) {
                    unit = Unit.MONTH;
                  } else if (Key.is(ev, Keycodes.LEFT, Keycodes.RIGHT)) {
                    unit = Unit.DAY;
                  } else if (!this.dp.weekOfDateIsDisabled(focusDate)) {
                    unit = Unit.WEEK;
                  }
                } else if (this.dp.view === View.MONTHS) {
                  if (Key.is(ev, Keycodes.UP, Keycodes.DOWN)) {
                    direction = direction * 4;
                  }
                  unit = Unit.MONTH;
                } else if (this.dp.view === View.YEARS) {
                  if (Key.is(ev, Keycodes.UP, Keycodes.DOWN)) {
                    direction = direction * 4;
                  }
                  unit = Unit.YEAR;
                }

                // now move the available date and render (highlight the moved date)
                if (unit) {
                  this.lastKeyboardFocusDate = this.dp.viewDate = this.dp.moveAvailableDate(focusDate, direction, unit);
                  this.renderer.render();

                  this.trigger(Event[unit.toUpperCase() + '_CHANGE']);
                  ev.preventDefault();
                }
                break;
              }
          }
        }
      }, {
        key: 'acceptDate',
        value: function acceptDate(ev) {
          this.dp.updateMultidateOrToggle(this.lastKeyboardFocusDate || this.dp.dates.last() || this.dp.viewDate);
          ev.preventDefault();
          ev.stopPropagation();
        }
      }, {
        key: 'onPaste',
        value: function onPaste(ev) {
          var dateString = null;
          if (ev.originalEvent.clipboardData && ev.originalEvent.clipboardData.types && $.inArray('text/plain', ev.originalEvent.clipboardData.types) !== -1) {
            dateString = ev.originalEvent.clipboardData.getData('text/plain');
          } else if (window.clipboardData) {
            dateString = window.clipboardData.getData('Text');
          } else {
            return;
          }
          this.dp.setDate(dateString);
          ev.preventDefault();
        }
      }, {
        key: 'trigger',
        value: function trigger(event) {
          //let date = this.dp.dates.last()
          //if (date) {
          //  //clone it if present
          //  date = date.clone()
          //}

          this.fire(event, {
            type: event,
            //date: date,
            datepicker: this.dp
          });
        }

        /**
         *
         * @param eventKey
         * @param object/hash - properties will be set on event
         * @returns {boolean} - if false, code should get out because handler prevented
         */

      }, {
        key: 'fire',
        value: function fire(eventKey) {
          var object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var event = $.Event(eventKey, object);
          this.debug('fire: ' + eventKey, object);
          this.dp.$element.trigger(event);
          if (event.isDefaultPrevented()) {
            this.debug('default prevented on ' + eventKey);
            return false;
          } else {
            return true;
          }
        }
      }, {
        key: 'attachEvents',
        value: function attachEvents(element, hash) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Object.keys(hash)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var key = _step.value;

              var value = hash[key];
              element.on(key, value);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }, {
        key: 'detachEvents',
        value: function detachEvents(element, hash) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Object.keys(hash)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;

              var value = hash[key];
              element.off(key, value);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }]);
      return EventManager;
    }(Base);

    /**
     * Helper converted from legacy code, not sure we need to keep it but for ease of conversion of the entire
     *  codebase, I've kept it.  TODO: Revisit this later to see if we actually need it.
     *  FIXME: if we keep this after refactoring, we _have_ to rename it.
     */
    var DateArray = function () {
      function DateArray() {
        babelHelpers.classCallCheck(this, DateArray);

        for (var _len = arguments.length, moments = Array(_len), _key = 0; _key < _len; _key++) {
          moments[_key] = arguments[_key];
        }

        this.array = [].concat(moments);
      }

      babelHelpers.createClass(DateArray, [{
        key: 'last',
        value: function last() {
          // return the last date in the array (go backwards 1 index)
          return this.get(-1);
        }
      }, {
        key: 'length',
        value: function length() {
          return this.array.length;
        }
      }, {
        key: 'push',
        value: function push(m) {
          this.array.push(m);
        }
      }, {
        key: 'get',
        value: function get(i) {
          return this.array.slice(i)[0];
        }

        /**
         * Compares at the granularity of
         * @param other
         * @param granularity - default 'date' (not specific to hours/minutes/seconds)
         * @returns {*}
         */

      }, {
        key: 'contains',
        value: function contains(other) {
          var granularity = arguments.length <= 1 || arguments[1] === undefined ? 'date' : arguments[1];

          for (var i in this.array) {
            var m = this.array[i];
            if (m.isSame(other, granularity)) {
              return i;
            }
          }

          return -1;
        }

        /**
         * Requires the same number and order of dates, then does a deep compare given the format
         * @param otherDateArray
         * @returns {boolean}
         */

      }, {
        key: 'isSame',
        value: function isSame(otherDateArray) {
          if (!otherDateArray) {
            return false;
          }

          if (this.length() !== otherDateArray.length()) {
            return false;
          }

          for (var i in this.array) {
            var a = this.array[i];
            var b = otherDateArray.array[i];

            if (!a.isSame(b)) {
              return false;
            }
          }

          return true;
        }
      }, {
        key: 'remove',
        value: function remove(i) {
          this.array.splice(i, 1);
        }
      }, {
        key: 'clear',
        value: function clear() {
          this.array = [];
        }
      }, {
        key: 'copy',
        value: function copy() {
          return new (Function.prototype.bind.apply(DateArray, [null].concat(babelHelpers.toConsumableArray(this.array))))();
        }
      }, {
        key: 'clonedArray',
        value: function clonedArray() {
          var clones = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var m = _step.value;

              clones.push(m.clone());
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return clones;
        }

        /**
         *
         * @param format - any momentjs format - default null will yield "2014-09-08T08:02:17-05:00" (ISO 8601)
         * @returns {Array}
         */

      }, {
        key: 'formattedArray',
        value: function formattedArray() {
          var format = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

          var formatted = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var m = _step2.value;

              formatted.push(m.local().format(format)); // needs to be local as it is displayed or put into the input
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return formatted;
        }
      }]);
      return DateArray;
    }();

    var moment$1=__commonjs(function(module,exports,global){ //! moment.js
    //! version : 2.13.0
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com
    ;(function(global,factory){(typeof exports==='undefined'?'undefined':babelHelpers.typeof(exports))==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):global.moment=factory();})(__commonjs_global,function(){'use strict';var hookCallback;function utils_hooks__hooks(){return hookCallback.apply(null,arguments);} // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback){hookCallback=callback;}function isArray(input){return input instanceof Array||Object.prototype.toString.call(input)==='[object Array]';}function isDate(input){return input instanceof Date||Object.prototype.toString.call(input)==='[object Date]';}function map(arr,fn){var res=[],i;for(i=0;i<arr.length;++i){res.push(fn(arr[i],i));}return res;}function hasOwnProp(a,b){return Object.prototype.hasOwnProperty.call(a,b);}function extend(a,b){for(var i in b){if(hasOwnProp(b,i)){a[i]=b[i];}}if(hasOwnProp(b,'toString')){a.toString=b.toString;}if(hasOwnProp(b,'valueOf')){a.valueOf=b.valueOf;}return a;}function create_utc__createUTC(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,true).utc();}function defaultParsingFlags(){ // We need to deep clone this object.
    return {empty:false,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:false,invalidMonth:null,invalidFormat:false,userInvalidated:false,iso:false,parsedDateParts:[],meridiem:null};}function getParsingFlags(m){if(m._pf==null){m._pf=defaultParsingFlags();}return m._pf;}var some;if(Array.prototype.some){some=Array.prototype.some;}else {some=function some(fun){var t=Object(this);var len=t.length>>>0;for(var i=0;i<len;i++){if(i in t&&fun.call(this,t[i],i,t)){return true;}}return false;};}function valid__isValid(m){if(m._isValid==null){var flags=getParsingFlags(m);var parsedParts=some.call(flags.parsedDateParts,function(i){return i!=null;});m._isValid=!isNaN(m._d.getTime())&&flags.overflow<0&&!flags.empty&&!flags.invalidMonth&&!flags.invalidWeekday&&!flags.nullInput&&!flags.invalidFormat&&!flags.userInvalidated&&(!flags.meridiem||flags.meridiem&&parsedParts);if(m._strict){m._isValid=m._isValid&&flags.charsLeftOver===0&&flags.unusedTokens.length===0&&flags.bigHour===undefined;}}return m._isValid;}function valid__createInvalid(flags){var m=create_utc__createUTC(NaN);if(flags!=null){extend(getParsingFlags(m),flags);}else {getParsingFlags(m).userInvalidated=true;}return m;}function isUndefined(input){return input===void 0;} // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties=utils_hooks__hooks.momentProperties=[];function copyConfig(to,from){var i,prop,val;if(!isUndefined(from._isAMomentObject)){to._isAMomentObject=from._isAMomentObject;}if(!isUndefined(from._i)){to._i=from._i;}if(!isUndefined(from._f)){to._f=from._f;}if(!isUndefined(from._l)){to._l=from._l;}if(!isUndefined(from._strict)){to._strict=from._strict;}if(!isUndefined(from._tzm)){to._tzm=from._tzm;}if(!isUndefined(from._isUTC)){to._isUTC=from._isUTC;}if(!isUndefined(from._offset)){to._offset=from._offset;}if(!isUndefined(from._pf)){to._pf=getParsingFlags(from);}if(!isUndefined(from._locale)){to._locale=from._locale;}if(momentProperties.length>0){for(i in momentProperties){prop=momentProperties[i];val=from[prop];if(!isUndefined(val)){to[prop]=val;}}}return to;}var updateInProgress=false; // Moment prototype object
    function Moment(config){copyConfig(this,config);this._d=new Date(config._d!=null?config._d.getTime():NaN); // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if(updateInProgress===false){updateInProgress=true;utils_hooks__hooks.updateOffset(this);updateInProgress=false;}}function isMoment(obj){return obj instanceof Moment||obj!=null&&obj._isAMomentObject!=null;}function absFloor(number){if(number<0){return Math.ceil(number);}else {return Math.floor(number);}}function toInt(argumentForCoercion){var coercedNumber=+argumentForCoercion,value=0;if(coercedNumber!==0&&isFinite(coercedNumber)){value=absFloor(coercedNumber);}return value;} // compare two arrays, return the number of differences
    function compareArrays(array1,array2,dontConvert){var len=Math.min(array1.length,array2.length),lengthDiff=Math.abs(array1.length-array2.length),diffs=0,i;for(i=0;i<len;i++){if(dontConvert&&array1[i]!==array2[i]||!dontConvert&&toInt(array1[i])!==toInt(array2[i])){diffs++;}}return diffs+lengthDiff;}function warn(msg){if(utils_hooks__hooks.suppressDeprecationWarnings===false&&typeof console!=='undefined'&&console.warn){console.warn('Deprecation warning: '+msg);}}function deprecate(msg,fn){var firstTime=true;return extend(function(){if(utils_hooks__hooks.deprecationHandler!=null){utils_hooks__hooks.deprecationHandler(null,msg);}if(firstTime){warn(msg+'\nArguments: '+Array.prototype.slice.call(arguments).join(', ')+'\n'+new Error().stack);firstTime=false;}return fn.apply(this,arguments);},fn);}var deprecations={};function deprecateSimple(name,msg){if(utils_hooks__hooks.deprecationHandler!=null){utils_hooks__hooks.deprecationHandler(name,msg);}if(!deprecations[name]){warn(msg);deprecations[name]=true;}}utils_hooks__hooks.suppressDeprecationWarnings=false;utils_hooks__hooks.deprecationHandler=null;function isFunction(input){return input instanceof Function||Object.prototype.toString.call(input)==='[object Function]';}function isObject(input){return Object.prototype.toString.call(input)==='[object Object]';}function locale_set__set(config){var prop,i;for(i in config){prop=config[i];if(isFunction(prop)){this[i]=prop;}else {this['_'+i]=prop;}}this._config=config; // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _ordinalParseLenient.
    this._ordinalParseLenient=new RegExp(this._ordinalParse.source+'|'+/\d{1,2}/.source);}function mergeConfigs(parentConfig,childConfig){var res=extend({},parentConfig),prop;for(prop in childConfig){if(hasOwnProp(childConfig,prop)){if(isObject(parentConfig[prop])&&isObject(childConfig[prop])){res[prop]={};extend(res[prop],parentConfig[prop]);extend(res[prop],childConfig[prop]);}else if(childConfig[prop]!=null){res[prop]=childConfig[prop];}else {delete res[prop];}}}return res;}function Locale(config){if(config!=null){this.set(config);}}var keys;if(Object.keys){keys=Object.keys;}else {keys=function keys(obj){var i,res=[];for(i in obj){if(hasOwnProp(obj,i)){res.push(i);}}return res;};} // internal storage for locale config files
    var locales={};var globalLocale;function normalizeLocale(key){return key?key.toLowerCase().replace('_','-'):key;} // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names){var i=0,j,next,locale,split;while(i<names.length){split=normalizeLocale(names[i]).split('-');j=split.length;next=normalizeLocale(names[i+1]);next=next?next.split('-'):null;while(j>0){locale=loadLocale(split.slice(0,j).join('-'));if(locale){return locale;}if(next&&next.length>=j&&compareArrays(split,next,true)>=j-1){ //the next array item is better than a shallower substring of this one
    break;}j--;}i++;}return null;}function loadLocale(name){var oldLocale=null; // TODO: Find a better way to register and load all the locales in Node
    if(!locales[name]&&typeof module!=='undefined'&&module&&module.exports){try{oldLocale=globalLocale._abbr;require('./locale/'+name); // because defineLocale currently also sets the global locale, we
    // want to undo that for lazy loaded locales
    locale_locales__getSetGlobalLocale(oldLocale);}catch(e){}}return locales[name];} // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale(key,values){var data;if(key){if(isUndefined(values)){data=locale_locales__getLocale(key);}else {data=defineLocale(key,values);}if(data){ // moment.duration._locale = moment._locale = data;
    globalLocale=data;}}return globalLocale._abbr;}function defineLocale(name,config){if(config!==null){config.abbr=name;if(locales[name]!=null){deprecateSimple('defineLocaleOverride','use moment.updateLocale(localeName, config) to change '+'an existing locale. moment.defineLocale(localeName, '+'config) should only be used for creating a new locale');config=mergeConfigs(locales[name]._config,config);}else if(config.parentLocale!=null){if(locales[config.parentLocale]!=null){config=mergeConfigs(locales[config.parentLocale]._config,config);}else { // treat as if there is no base config
    deprecateSimple('parentLocaleUndefined','specified parentLocale is not defined yet');}}locales[name]=new Locale(config); // backwards compat for now: also set the locale
    locale_locales__getSetGlobalLocale(name);return locales[name];}else { // useful for testing
    delete locales[name];return null;}}function updateLocale(name,config){if(config!=null){var locale;if(locales[name]!=null){config=mergeConfigs(locales[name]._config,config);}locale=new Locale(config);locale.parentLocale=locales[name];locales[name]=locale; // backwards compat for now: also set the locale
    locale_locales__getSetGlobalLocale(name);}else { // pass null for config to unupdate, useful for tests
    if(locales[name]!=null){if(locales[name].parentLocale!=null){locales[name]=locales[name].parentLocale;}else if(locales[name]!=null){delete locales[name];}}}return locales[name];} // returns locale data
    function locale_locales__getLocale(key){var locale;if(key&&key._locale&&key._locale._abbr){key=key._locale._abbr;}if(!key){return globalLocale;}if(!isArray(key)){ //short-circuit everything else
    locale=loadLocale(key);if(locale){return locale;}key=[key];}return chooseLocale(key);}function locale_locales__listLocales(){return keys(locales);}var aliases={};function addUnitAlias(unit,shorthand){var lowerCase=unit.toLowerCase();aliases[lowerCase]=aliases[lowerCase+'s']=aliases[shorthand]=unit;}function normalizeUnits(units){return typeof units==='string'?aliases[units]||aliases[units.toLowerCase()]:undefined;}function normalizeObjectUnits(inputObject){var normalizedInput={},normalizedProp,prop;for(prop in inputObject){if(hasOwnProp(inputObject,prop)){normalizedProp=normalizeUnits(prop);if(normalizedProp){normalizedInput[normalizedProp]=inputObject[prop];}}}return normalizedInput;}function makeGetSet(unit,keepTime){return function(value){if(value!=null){get_set__set(this,unit,value);utils_hooks__hooks.updateOffset(this,keepTime);return this;}else {return get_set__get(this,unit);}};}function get_set__get(mom,unit){return mom.isValid()?mom._d['get'+(mom._isUTC?'UTC':'')+unit]():NaN;}function get_set__set(mom,unit,value){if(mom.isValid()){mom._d['set'+(mom._isUTC?'UTC':'')+unit](value);}} // MOMENTS
    function getSet(units,value){var unit;if((typeof units==='undefined'?'undefined':babelHelpers.typeof(units))==='object'){for(unit in units){this.set(unit,units[unit]);}}else {units=normalizeUnits(units);if(isFunction(this[units])){return this[units](value);}}return this;}function zeroFill(number,targetLength,forceSign){var absNumber=''+Math.abs(number),zerosToFill=targetLength-absNumber.length,sign=number>=0;return (sign?forceSign?'+':'':'-')+Math.pow(10,Math.max(0,zerosToFill)).toString().substr(1)+absNumber;}var formattingTokens=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;var localFormattingTokens=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;var formatFunctions={};var formatTokenFunctions={}; // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token,padded,ordinal,callback){var func=callback;if(typeof callback==='string'){func=function func(){return this[callback]();};}if(token){formatTokenFunctions[token]=func;}if(padded){formatTokenFunctions[padded[0]]=function(){return zeroFill(func.apply(this,arguments),padded[1],padded[2]);};}if(ordinal){formatTokenFunctions[ordinal]=function(){return this.localeData().ordinal(func.apply(this,arguments),token);};}}function removeFormattingTokens(input){if(input.match(/\[[\s\S]/)){return input.replace(/^\[|\]$/g,'');}return input.replace(/\\/g,'');}function makeFormatFunction(format){var array=format.match(formattingTokens),i,length;for(i=0,length=array.length;i<length;i++){if(formatTokenFunctions[array[i]]){array[i]=formatTokenFunctions[array[i]];}else {array[i]=removeFormattingTokens(array[i]);}}return function(mom){var output='',i;for(i=0;i<length;i++){output+=array[i] instanceof Function?array[i].call(mom,format):array[i];}return output;};} // format date using native date object
    function formatMoment(m,format){if(!m.isValid()){return m.localeData().invalidDate();}format=expandFormat(format,m.localeData());formatFunctions[format]=formatFunctions[format]||makeFormatFunction(format);return formatFunctions[format](m);}function expandFormat(format,locale){var i=5;function replaceLongDateFormatTokens(input){return locale.longDateFormat(input)||input;}localFormattingTokens.lastIndex=0;while(i>=0&&localFormattingTokens.test(format)){format=format.replace(localFormattingTokens,replaceLongDateFormatTokens);localFormattingTokens.lastIndex=0;i-=1;}return format;}var match1=/\d/; //       0 - 9
    var match2=/\d\d/; //      00 - 99
    var match3=/\d{3}/; //     000 - 999
    var match4=/\d{4}/; //    0000 - 9999
    var match6=/[+-]?\d{6}/; // -999999 - 999999
    var match1to2=/\d\d?/; //       0 - 99
    var match3to4=/\d\d\d\d?/; //     999 - 9999
    var match5to6=/\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3=/\d{1,3}/; //       0 - 999
    var match1to4=/\d{1,4}/; //       0 - 9999
    var match1to6=/[+-]?\d{1,6}/; // -999999 - 999999
    var matchUnsigned=/\d+/; //       0 - inf
    var matchSigned=/[+-]?\d+/; //    -inf - inf
    var matchOffset=/Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset=/Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
    var matchTimestamp=/[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;var regexes={};function addRegexToken(token,regex,strictRegex){regexes[token]=isFunction(regex)?regex:function(isStrict,localeData){return isStrict&&strictRegex?strictRegex:regex;};}function getParseRegexForToken(token,config){if(!hasOwnProp(regexes,token)){return new RegExp(unescapeFormat(token));}return regexes[token](config._strict,config._locale);} // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s){return regexEscape(s.replace('\\','').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(matched,p1,p2,p3,p4){return p1||p2||p3||p4;}));}function regexEscape(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');}var tokens={};function addParseToken(token,callback){var i,func=callback;if(typeof token==='string'){token=[token];}if(typeof callback==='number'){func=function func(input,array){array[callback]=toInt(input);};}for(i=0;i<token.length;i++){tokens[token[i]]=func;}}function addWeekParseToken(token,callback){addParseToken(token,function(input,array,config,token){config._w=config._w||{};callback(input,config._w,config,token);});}function addTimeToArrayFromToken(token,input,config){if(input!=null&&hasOwnProp(tokens,token)){tokens[token](input,config._a,config,token);}}var YEAR=0;var MONTH=1;var DATE=2;var HOUR=3;var MINUTE=4;var SECOND=5;var MILLISECOND=6;var WEEK=7;var WEEKDAY=8;var indexOf;if(Array.prototype.indexOf){indexOf=Array.prototype.indexOf;}else {indexOf=function indexOf(o){ // I know
    var i;for(i=0;i<this.length;++i){if(this[i]===o){return i;}}return -1;};}function daysInMonth(year,month){return new Date(Date.UTC(year,month+1,0)).getUTCDate();} // FORMATTING
    addFormatToken('M',['MM',2],'Mo',function(){return this.month()+1;});addFormatToken('MMM',0,0,function(format){return this.localeData().monthsShort(this,format);});addFormatToken('MMMM',0,0,function(format){return this.localeData().months(this,format);}); // ALIASES
    addUnitAlias('month','M'); // PARSING
    addRegexToken('M',match1to2);addRegexToken('MM',match1to2,match2);addRegexToken('MMM',function(isStrict,locale){return locale.monthsShortRegex(isStrict);});addRegexToken('MMMM',function(isStrict,locale){return locale.monthsRegex(isStrict);});addParseToken(['M','MM'],function(input,array){array[MONTH]=toInt(input)-1;});addParseToken(['MMM','MMMM'],function(input,array,config,token){var month=config._locale.monthsParse(input,token,config._strict); // if we didn't find a month name, mark the date as invalid.
    if(month!=null){array[MONTH]=month;}else {getParsingFlags(config).invalidMonth=input;}}); // LOCALES
    var MONTHS_IN_FORMAT=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;var defaultLocaleMonths='January_February_March_April_May_June_July_August_September_October_November_December'.split('_');function localeMonths(m,format){return isArray(this._months)?this._months[m.month()]:this._months[MONTHS_IN_FORMAT.test(format)?'format':'standalone'][m.month()];}var defaultLocaleMonthsShort='Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');function localeMonthsShort(m,format){return isArray(this._monthsShort)?this._monthsShort[m.month()]:this._monthsShort[MONTHS_IN_FORMAT.test(format)?'format':'standalone'][m.month()];}function units_month__handleStrictParse(monthName,format,strict){var i,ii,mom,llc=monthName.toLocaleLowerCase();if(!this._monthsParse){ // this is not used
    this._monthsParse=[];this._longMonthsParse=[];this._shortMonthsParse=[];for(i=0;i<12;++i){mom=create_utc__createUTC([2000,i]);this._shortMonthsParse[i]=this.monthsShort(mom,'').toLocaleLowerCase();this._longMonthsParse[i]=this.months(mom,'').toLocaleLowerCase();}}if(strict){if(format==='MMM'){ii=indexOf.call(this._shortMonthsParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._longMonthsParse,llc);return ii!==-1?ii:null;}}else {if(format==='MMM'){ii=indexOf.call(this._shortMonthsParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._longMonthsParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._longMonthsParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._shortMonthsParse,llc);return ii!==-1?ii:null;}}}function localeMonthsParse(monthName,format,strict){var i,mom,regex;if(this._monthsParseExact){return units_month__handleStrictParse.call(this,monthName,format,strict);}if(!this._monthsParse){this._monthsParse=[];this._longMonthsParse=[];this._shortMonthsParse=[];} // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for(i=0;i<12;i++){ // make the regex if we don't have it already
    mom=create_utc__createUTC([2000,i]);if(strict&&!this._longMonthsParse[i]){this._longMonthsParse[i]=new RegExp('^'+this.months(mom,'').replace('.','')+'$','i');this._shortMonthsParse[i]=new RegExp('^'+this.monthsShort(mom,'').replace('.','')+'$','i');}if(!strict&&!this._monthsParse[i]){regex='^'+this.months(mom,'')+'|^'+this.monthsShort(mom,'');this._monthsParse[i]=new RegExp(regex.replace('.',''),'i');} // test the regex
    if(strict&&format==='MMMM'&&this._longMonthsParse[i].test(monthName)){return i;}else if(strict&&format==='MMM'&&this._shortMonthsParse[i].test(monthName)){return i;}else if(!strict&&this._monthsParse[i].test(monthName)){return i;}}} // MOMENTS
    function setMonth(mom,value){var dayOfMonth;if(!mom.isValid()){ // No op
    return mom;}if(typeof value==='string'){if(/^\d+$/.test(value)){value=toInt(value);}else {value=mom.localeData().monthsParse(value); // TODO: Another silent failure?
    if(typeof value!=='number'){return mom;}}}dayOfMonth=Math.min(mom.date(),daysInMonth(mom.year(),value));mom._d['set'+(mom._isUTC?'UTC':'')+'Month'](value,dayOfMonth);return mom;}function getSetMonth(value){if(value!=null){setMonth(this,value);utils_hooks__hooks.updateOffset(this,true);return this;}else {return get_set__get(this,'Month');}}function getDaysInMonth(){return daysInMonth(this.year(),this.month());}var defaultMonthsShortRegex=matchWord;function monthsShortRegex(isStrict){if(this._monthsParseExact){if(!hasOwnProp(this,'_monthsRegex')){computeMonthsParse.call(this);}if(isStrict){return this._monthsShortStrictRegex;}else {return this._monthsShortRegex;}}else {return this._monthsShortStrictRegex&&isStrict?this._monthsShortStrictRegex:this._monthsShortRegex;}}var defaultMonthsRegex=matchWord;function monthsRegex(isStrict){if(this._monthsParseExact){if(!hasOwnProp(this,'_monthsRegex')){computeMonthsParse.call(this);}if(isStrict){return this._monthsStrictRegex;}else {return this._monthsRegex;}}else {return this._monthsStrictRegex&&isStrict?this._monthsStrictRegex:this._monthsRegex;}}function computeMonthsParse(){function cmpLenRev(a,b){return b.length-a.length;}var shortPieces=[],longPieces=[],mixedPieces=[],i,mom;for(i=0;i<12;i++){ // make the regex if we don't have it already
    mom=create_utc__createUTC([2000,i]);shortPieces.push(this.monthsShort(mom,''));longPieces.push(this.months(mom,''));mixedPieces.push(this.months(mom,''));mixedPieces.push(this.monthsShort(mom,''));} // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);longPieces.sort(cmpLenRev);mixedPieces.sort(cmpLenRev);for(i=0;i<12;i++){shortPieces[i]=regexEscape(shortPieces[i]);longPieces[i]=regexEscape(longPieces[i]);mixedPieces[i]=regexEscape(mixedPieces[i]);}this._monthsRegex=new RegExp('^('+mixedPieces.join('|')+')','i');this._monthsShortRegex=this._monthsRegex;this._monthsStrictRegex=new RegExp('^('+longPieces.join('|')+')','i');this._monthsShortStrictRegex=new RegExp('^('+shortPieces.join('|')+')','i');}function checkOverflow(m){var overflow;var a=m._a;if(a&&getParsingFlags(m).overflow===-2){overflow=a[MONTH]<0||a[MONTH]>11?MONTH:a[DATE]<1||a[DATE]>daysInMonth(a[YEAR],a[MONTH])?DATE:a[HOUR]<0||a[HOUR]>24||a[HOUR]===24&&(a[MINUTE]!==0||a[SECOND]!==0||a[MILLISECOND]!==0)?HOUR:a[MINUTE]<0||a[MINUTE]>59?MINUTE:a[SECOND]<0||a[SECOND]>59?SECOND:a[MILLISECOND]<0||a[MILLISECOND]>999?MILLISECOND:-1;if(getParsingFlags(m)._overflowDayOfYear&&(overflow<YEAR||overflow>DATE)){overflow=DATE;}if(getParsingFlags(m)._overflowWeeks&&overflow===-1){overflow=WEEK;}if(getParsingFlags(m)._overflowWeekday&&overflow===-1){overflow=WEEKDAY;}getParsingFlags(m).overflow=overflow;}return m;} // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;var basicIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;var tzRegex=/Z|[+-]\d\d(?::?\d\d)?/;var isoDates=[['YYYYYY-MM-DD',/[+-]\d{6}-\d\d-\d\d/],['YYYY-MM-DD',/\d{4}-\d\d-\d\d/],['GGGG-[W]WW-E',/\d{4}-W\d\d-\d/],['GGGG-[W]WW',/\d{4}-W\d\d/,false],['YYYY-DDD',/\d{4}-\d{3}/],['YYYY-MM',/\d{4}-\d\d/,false],['YYYYYYMMDD',/[+-]\d{10}/],['YYYYMMDD',/\d{8}/], // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE',/\d{4}W\d{3}/],['GGGG[W]WW',/\d{4}W\d{2}/,false],['YYYYDDD',/\d{7}/]]; // iso time formats and regexes
    var isoTimes=[['HH:mm:ss.SSSS',/\d\d:\d\d:\d\d\.\d+/],['HH:mm:ss,SSSS',/\d\d:\d\d:\d\d,\d+/],['HH:mm:ss',/\d\d:\d\d:\d\d/],['HH:mm',/\d\d:\d\d/],['HHmmss.SSSS',/\d\d\d\d\d\d\.\d+/],['HHmmss,SSSS',/\d\d\d\d\d\d,\d+/],['HHmmss',/\d\d\d\d\d\d/],['HHmm',/\d\d\d\d/],['HH',/\d\d/]];var aspNetJsonRegex=/^\/?Date\((\-?\d+)/i; // date from iso format
    function configFromISO(config){var i,l,string=config._i,match=extendedIsoRegex.exec(string)||basicIsoRegex.exec(string),allowTime,dateFormat,timeFormat,tzFormat;if(match){getParsingFlags(config).iso=true;for(i=0,l=isoDates.length;i<l;i++){if(isoDates[i][1].exec(match[1])){dateFormat=isoDates[i][0];allowTime=isoDates[i][2]!==false;break;}}if(dateFormat==null){config._isValid=false;return;}if(match[3]){for(i=0,l=isoTimes.length;i<l;i++){if(isoTimes[i][1].exec(match[3])){ // match[2] should be 'T' or space
    timeFormat=(match[2]||' ')+isoTimes[i][0];break;}}if(timeFormat==null){config._isValid=false;return;}}if(!allowTime&&timeFormat!=null){config._isValid=false;return;}if(match[4]){if(tzRegex.exec(match[4])){tzFormat='Z';}else {config._isValid=false;return;}}config._f=dateFormat+(timeFormat||'')+(tzFormat||'');configFromStringAndFormat(config);}else {config._isValid=false;}} // date from iso format or fallback
    function configFromString(config){var matched=aspNetJsonRegex.exec(config._i);if(matched!==null){config._d=new Date(+matched[1]);return;}configFromISO(config);if(config._isValid===false){delete config._isValid;utils_hooks__hooks.createFromInputFallback(config);}}utils_hooks__hooks.createFromInputFallback=deprecate('moment construction falls back to js Date. This is '+'discouraged and will be removed in upcoming major '+'release. Please refer to '+'https://github.com/moment/moment/issues/1407 for more info.',function(config){config._d=new Date(config._i+(config._useUTC?' UTC':''));});function createDate(y,m,d,h,M,s,ms){ //can't just apply() to create a date:
    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
    var date=new Date(y,m,d,h,M,s,ms); //the date constructor remaps years 0-99 to 1900-1999
    if(y<100&&y>=0&&isFinite(date.getFullYear())){date.setFullYear(y);}return date;}function createUTCDate(y){var date=new Date(Date.UTC.apply(null,arguments)); //the Date.UTC function remaps years 0-99 to 1900-1999
    if(y<100&&y>=0&&isFinite(date.getUTCFullYear())){date.setUTCFullYear(y);}return date;} // FORMATTING
    addFormatToken('Y',0,0,function(){var y=this.year();return y<=9999?''+y:'+'+y;});addFormatToken(0,['YY',2],0,function(){return this.year()%100;});addFormatToken(0,['YYYY',4],0,'year');addFormatToken(0,['YYYYY',5],0,'year');addFormatToken(0,['YYYYYY',6,true],0,'year'); // ALIASES
    addUnitAlias('year','y'); // PARSING
    addRegexToken('Y',matchSigned);addRegexToken('YY',match1to2,match2);addRegexToken('YYYY',match1to4,match4);addRegexToken('YYYYY',match1to6,match6);addRegexToken('YYYYYY',match1to6,match6);addParseToken(['YYYYY','YYYYYY'],YEAR);addParseToken('YYYY',function(input,array){array[YEAR]=input.length===2?utils_hooks__hooks.parseTwoDigitYear(input):toInt(input);});addParseToken('YY',function(input,array){array[YEAR]=utils_hooks__hooks.parseTwoDigitYear(input);});addParseToken('Y',function(input,array){array[YEAR]=parseInt(input,10);}); // HELPERS
    function daysInYear(year){return isLeapYear(year)?366:365;}function isLeapYear(year){return year%4===0&&year%100!==0||year%400===0;} // HOOKS
    utils_hooks__hooks.parseTwoDigitYear=function(input){return toInt(input)+(toInt(input)>68?1900:2000);}; // MOMENTS
    var getSetYear=makeGetSet('FullYear',true);function getIsLeapYear(){return isLeapYear(this.year());} // start-of-first-week - start-of-year
    function firstWeekOffset(year,dow,doy){var  // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    fwd=7+dow-doy, // first-week day local weekday -- which local weekday is fwd
    fwdlw=(7+createUTCDate(year,0,fwd).getUTCDay()-dow)%7;return -fwdlw+fwd-1;} //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year,week,weekday,dow,doy){var localWeekday=(7+weekday-dow)%7,weekOffset=firstWeekOffset(year,dow,doy),dayOfYear=1+7*(week-1)+localWeekday+weekOffset,resYear,resDayOfYear;if(dayOfYear<=0){resYear=year-1;resDayOfYear=daysInYear(resYear)+dayOfYear;}else if(dayOfYear>daysInYear(year)){resYear=year+1;resDayOfYear=dayOfYear-daysInYear(year);}else {resYear=year;resDayOfYear=dayOfYear;}return {year:resYear,dayOfYear:resDayOfYear};}function weekOfYear(mom,dow,doy){var weekOffset=firstWeekOffset(mom.year(),dow,doy),week=Math.floor((mom.dayOfYear()-weekOffset-1)/7)+1,resWeek,resYear;if(week<1){resYear=mom.year()-1;resWeek=week+weeksInYear(resYear,dow,doy);}else if(week>weeksInYear(mom.year(),dow,doy)){resWeek=week-weeksInYear(mom.year(),dow,doy);resYear=mom.year()+1;}else {resYear=mom.year();resWeek=week;}return {week:resWeek,year:resYear};}function weeksInYear(year,dow,doy){var weekOffset=firstWeekOffset(year,dow,doy),weekOffsetNext=firstWeekOffset(year+1,dow,doy);return (daysInYear(year)-weekOffset+weekOffsetNext)/7;} // Pick the first defined of two or three arguments.
    function defaults(a,b,c){if(a!=null){return a;}if(b!=null){return b;}return c;}function currentDateArray(config){ // hooks is actually the exported moment object
    var nowValue=new Date(utils_hooks__hooks.now());if(config._useUTC){return [nowValue.getUTCFullYear(),nowValue.getUTCMonth(),nowValue.getUTCDate()];}return [nowValue.getFullYear(),nowValue.getMonth(),nowValue.getDate()];} // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config){var i,date,input=[],currentDate,yearToUse;if(config._d){return;}currentDate=currentDateArray(config); //compute day of the year from weeks and weekdays
    if(config._w&&config._a[DATE]==null&&config._a[MONTH]==null){dayOfYearFromWeekInfo(config);} //if the day of the year is set, figure out what it is
    if(config._dayOfYear){yearToUse=defaults(config._a[YEAR],currentDate[YEAR]);if(config._dayOfYear>daysInYear(yearToUse)){getParsingFlags(config)._overflowDayOfYear=true;}date=createUTCDate(yearToUse,0,config._dayOfYear);config._a[MONTH]=date.getUTCMonth();config._a[DATE]=date.getUTCDate();} // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for(i=0;i<3&&config._a[i]==null;++i){config._a[i]=input[i]=currentDate[i];} // Zero out whatever was not defaulted, including time
    for(;i<7;i++){config._a[i]=input[i]=config._a[i]==null?i===2?1:0:config._a[i];} // Check for 24:00:00.000
    if(config._a[HOUR]===24&&config._a[MINUTE]===0&&config._a[SECOND]===0&&config._a[MILLISECOND]===0){config._nextDay=true;config._a[HOUR]=0;}config._d=(config._useUTC?createUTCDate:createDate).apply(null,input); // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if(config._tzm!=null){config._d.setUTCMinutes(config._d.getUTCMinutes()-config._tzm);}if(config._nextDay){config._a[HOUR]=24;}}function dayOfYearFromWeekInfo(config){var w,weekYear,week,weekday,dow,doy,temp,weekdayOverflow;w=config._w;if(w.GG!=null||w.W!=null||w.E!=null){dow=1;doy=4; // TODO: We need to take the current isoWeekYear, but that depends on
    // how we interpret now (local, utc, fixed offset). So create
    // a now version of current config (take local/utc/offset flags, and
    // create now).
    weekYear=defaults(w.GG,config._a[YEAR],weekOfYear(local__createLocal(),1,4).year);week=defaults(w.W,1);weekday=defaults(w.E,1);if(weekday<1||weekday>7){weekdayOverflow=true;}}else {dow=config._locale._week.dow;doy=config._locale._week.doy;weekYear=defaults(w.gg,config._a[YEAR],weekOfYear(local__createLocal(),dow,doy).year);week=defaults(w.w,1);if(w.d!=null){ // weekday -- low day numbers are considered next week
    weekday=w.d;if(weekday<0||weekday>6){weekdayOverflow=true;}}else if(w.e!=null){ // local weekday -- counting starts from begining of week
    weekday=w.e+dow;if(w.e<0||w.e>6){weekdayOverflow=true;}}else { // default to begining of week
    weekday=dow;}}if(week<1||week>weeksInYear(weekYear,dow,doy)){getParsingFlags(config)._overflowWeeks=true;}else if(weekdayOverflow!=null){getParsingFlags(config)._overflowWeekday=true;}else {temp=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy);config._a[YEAR]=temp.year;config._dayOfYear=temp.dayOfYear;}} // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601=function(){}; // date from string and format string
    function configFromStringAndFormat(config){ // TODO: Move this to another part of the creation flow to prevent circular deps
    if(config._f===utils_hooks__hooks.ISO_8601){configFromISO(config);return;}config._a=[];getParsingFlags(config).empty=true; // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string=''+config._i,i,parsedInput,tokens,token,skipped,stringLength=string.length,totalParsedInputLength=0;tokens=expandFormat(config._f,config._locale).match(formattingTokens)||[];for(i=0;i<tokens.length;i++){token=tokens[i];parsedInput=(string.match(getParseRegexForToken(token,config))||[])[0]; // console.log('token', token, 'parsedInput', parsedInput,
    //         'regex', getParseRegexForToken(token, config));
    if(parsedInput){skipped=string.substr(0,string.indexOf(parsedInput));if(skipped.length>0){getParsingFlags(config).unusedInput.push(skipped);}string=string.slice(string.indexOf(parsedInput)+parsedInput.length);totalParsedInputLength+=parsedInput.length;} // don't parse if it's not a known token
    if(formatTokenFunctions[token]){if(parsedInput){getParsingFlags(config).empty=false;}else {getParsingFlags(config).unusedTokens.push(token);}addTimeToArrayFromToken(token,parsedInput,config);}else if(config._strict&&!parsedInput){getParsingFlags(config).unusedTokens.push(token);}} // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver=stringLength-totalParsedInputLength;if(string.length>0){getParsingFlags(config).unusedInput.push(string);} // clear _12h flag if hour is <= 12
    if(getParsingFlags(config).bigHour===true&&config._a[HOUR]<=12&&config._a[HOUR]>0){getParsingFlags(config).bigHour=undefined;}getParsingFlags(config).parsedDateParts=config._a.slice(0);getParsingFlags(config).meridiem=config._meridiem; // handle meridiem
    config._a[HOUR]=meridiemFixWrap(config._locale,config._a[HOUR],config._meridiem);configFromArray(config);checkOverflow(config);}function meridiemFixWrap(locale,hour,meridiem){var isPm;if(meridiem==null){ // nothing to do
    return hour;}if(locale.meridiemHour!=null){return locale.meridiemHour(hour,meridiem);}else if(locale.isPM!=null){ // Fallback
    isPm=locale.isPM(meridiem);if(isPm&&hour<12){hour+=12;}if(!isPm&&hour===12){hour=0;}return hour;}else { // this is not supposed to happen
    return hour;}} // date from string and array of format strings
    function configFromStringAndArray(config){var tempConfig,bestMoment,scoreToBeat,i,currentScore;if(config._f.length===0){getParsingFlags(config).invalidFormat=true;config._d=new Date(NaN);return;}for(i=0;i<config._f.length;i++){currentScore=0;tempConfig=copyConfig({},config);if(config._useUTC!=null){tempConfig._useUTC=config._useUTC;}tempConfig._f=config._f[i];configFromStringAndFormat(tempConfig);if(!valid__isValid(tempConfig)){continue;} // if there is any input that was not parsed add a penalty for that format
    currentScore+=getParsingFlags(tempConfig).charsLeftOver; //or tokens
    currentScore+=getParsingFlags(tempConfig).unusedTokens.length*10;getParsingFlags(tempConfig).score=currentScore;if(scoreToBeat==null||currentScore<scoreToBeat){scoreToBeat=currentScore;bestMoment=tempConfig;}}extend(config,bestMoment||tempConfig);}function configFromObject(config){if(config._d){return;}var i=normalizeObjectUnits(config._i);config._a=map([i.year,i.month,i.day||i.date,i.hour,i.minute,i.second,i.millisecond],function(obj){return obj&&parseInt(obj,10);});configFromArray(config);}function createFromConfig(config){var res=new Moment(checkOverflow(prepareConfig(config)));if(res._nextDay){ // Adding is smart enough around DST
    res.add(1,'d');res._nextDay=undefined;}return res;}function prepareConfig(config){var input=config._i,format=config._f;config._locale=config._locale||locale_locales__getLocale(config._l);if(input===null||format===undefined&&input===''){return valid__createInvalid({nullInput:true});}if(typeof input==='string'){config._i=input=config._locale.preparse(input);}if(isMoment(input)){return new Moment(checkOverflow(input));}else if(isArray(format)){configFromStringAndArray(config);}else if(format){configFromStringAndFormat(config);}else if(isDate(input)){config._d=input;}else {configFromInput(config);}if(!valid__isValid(config)){config._d=null;}return config;}function configFromInput(config){var input=config._i;if(input===undefined){config._d=new Date(utils_hooks__hooks.now());}else if(isDate(input)){config._d=new Date(input.valueOf());}else if(typeof input==='string'){configFromString(config);}else if(isArray(input)){config._a=map(input.slice(0),function(obj){return parseInt(obj,10);});configFromArray(config);}else if((typeof input==='undefined'?'undefined':babelHelpers.typeof(input))==='object'){configFromObject(config);}else if(typeof input==='number'){ // from milliseconds
    config._d=new Date(input);}else {utils_hooks__hooks.createFromInputFallback(config);}}function createLocalOrUTC(input,format,locale,strict,isUTC){var c={};if(typeof locale==='boolean'){strict=locale;locale=undefined;} // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject=true;c._useUTC=c._isUTC=isUTC;c._l=locale;c._i=input;c._f=format;c._strict=strict;return createFromConfig(c);}function local__createLocal(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,false);}var prototypeMin=deprecate('moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',function(){var other=local__createLocal.apply(null,arguments);if(this.isValid()&&other.isValid()){return other<this?this:other;}else {return valid__createInvalid();}});var prototypeMax=deprecate('moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',function(){var other=local__createLocal.apply(null,arguments);if(this.isValid()&&other.isValid()){return other>this?this:other;}else {return valid__createInvalid();}}); // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn,moments){var res,i;if(moments.length===1&&isArray(moments[0])){moments=moments[0];}if(!moments.length){return local__createLocal();}res=moments[0];for(i=1;i<moments.length;++i){if(!moments[i].isValid()||moments[i][fn](res)){res=moments[i];}}return res;} // TODO: Use [].sort instead?
    function min(){var args=[].slice.call(arguments,0);return pickBy('isBefore',args);}function max(){var args=[].slice.call(arguments,0);return pickBy('isAfter',args);}var now=function now(){return Date.now?Date.now():+new Date();};function Duration(duration){var normalizedInput=normalizeObjectUnits(duration),years=normalizedInput.year||0,quarters=normalizedInput.quarter||0,months=normalizedInput.month||0,weeks=normalizedInput.week||0,days=normalizedInput.day||0,hours=normalizedInput.hour||0,minutes=normalizedInput.minute||0,seconds=normalizedInput.second||0,milliseconds=normalizedInput.millisecond||0; // representation for dateAddRemove
    this._milliseconds=+milliseconds+seconds*1e3+ // 1000
    minutes*6e4+ // 1000 * 60
    hours*1000*60*60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days=+days+weeks*7; // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months=+months+quarters*3+years*12;this._data={};this._locale=locale_locales__getLocale();this._bubble();}function isDuration(obj){return obj instanceof Duration;} // FORMATTING
    function offset(token,separator){addFormatToken(token,0,0,function(){var offset=this.utcOffset();var sign='+';if(offset<0){offset=-offset;sign='-';}return sign+zeroFill(~ ~(offset/60),2)+separator+zeroFill(~ ~offset%60,2);});}offset('Z',':');offset('ZZ',''); // PARSING
    addRegexToken('Z',matchShortOffset);addRegexToken('ZZ',matchShortOffset);addParseToken(['Z','ZZ'],function(input,array,config){config._useUTC=true;config._tzm=offsetFromString(matchShortOffset,input);}); // HELPERS
    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset=/([\+\-]|\d\d)/gi;function offsetFromString(matcher,string){var matches=(string||'').match(matcher)||[];var chunk=matches[matches.length-1]||[];var parts=(chunk+'').match(chunkOffset)||['-',0,0];var minutes=+(parts[1]*60)+toInt(parts[2]);return parts[0]==='+'?minutes:-minutes;} // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input,model){var res,diff;if(model._isUTC){res=model.clone();diff=(isMoment(input)||isDate(input)?input.valueOf():local__createLocal(input).valueOf())-res.valueOf(); // Use low-level api, because this fn is low-level api.
    res._d.setTime(res._d.valueOf()+diff);utils_hooks__hooks.updateOffset(res,false);return res;}else {return local__createLocal(input).local();}}function getDateOffset(m){ // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset()/15)*15;} // HOOKS
    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset=function(){}; // MOMENTS
    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input,keepLocalTime){var offset=this._offset||0,localAdjust;if(!this.isValid()){return input!=null?this:NaN;}if(input!=null){if(typeof input==='string'){input=offsetFromString(matchShortOffset,input);}else if(Math.abs(input)<16){input=input*60;}if(!this._isUTC&&keepLocalTime){localAdjust=getDateOffset(this);}this._offset=input;this._isUTC=true;if(localAdjust!=null){this.add(localAdjust,'m');}if(offset!==input){if(!keepLocalTime||this._changeInProgress){add_subtract__addSubtract(this,create__createDuration(input-offset,'m'),1,false);}else if(!this._changeInProgress){this._changeInProgress=true;utils_hooks__hooks.updateOffset(this,true);this._changeInProgress=null;}}return this;}else {return this._isUTC?offset:getDateOffset(this);}}function getSetZone(input,keepLocalTime){if(input!=null){if(typeof input!=='string'){input=-input;}this.utcOffset(input,keepLocalTime);return this;}else {return -this.utcOffset();}}function setOffsetToUTC(keepLocalTime){return this.utcOffset(0,keepLocalTime);}function setOffsetToLocal(keepLocalTime){if(this._isUTC){this.utcOffset(0,keepLocalTime);this._isUTC=false;if(keepLocalTime){this.subtract(getDateOffset(this),'m');}}return this;}function setOffsetToParsedOffset(){if(this._tzm){this.utcOffset(this._tzm);}else if(typeof this._i==='string'){this.utcOffset(offsetFromString(matchOffset,this._i));}return this;}function hasAlignedHourOffset(input){if(!this.isValid()){return false;}input=input?local__createLocal(input).utcOffset():0;return (this.utcOffset()-input)%60===0;}function isDaylightSavingTime(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset();}function isDaylightSavingTimeShifted(){if(!isUndefined(this._isDSTShifted)){return this._isDSTShifted;}var c={};copyConfig(c,this);c=prepareConfig(c);if(c._a){var other=c._isUTC?create_utc__createUTC(c._a):local__createLocal(c._a);this._isDSTShifted=this.isValid()&&compareArrays(c._a,other.toArray())>0;}else {this._isDSTShifted=false;}return this._isDSTShifted;}function isLocal(){return this.isValid()?!this._isUTC:false;}function isUtcOffset(){return this.isValid()?this._isUTC:false;}function isUtc(){return this.isValid()?this._isUTC&&this._offset===0:false;} // ASP.NET json date format regex
    var aspNetRegex=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/; // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;function create__createDuration(input,key){var duration=input, // matching against regexp is expensive, do it on demand
    match=null,sign,ret,diffRes;if(isDuration(input)){duration={ms:input._milliseconds,d:input._days,M:input._months};}else if(typeof input==='number'){duration={};if(key){duration[key]=input;}else {duration.milliseconds=input;}}else if(!!(match=aspNetRegex.exec(input))){sign=match[1]==='-'?-1:1;duration={y:0,d:toInt(match[DATE])*sign,h:toInt(match[HOUR])*sign,m:toInt(match[MINUTE])*sign,s:toInt(match[SECOND])*sign,ms:toInt(match[MILLISECOND])*sign};}else if(!!(match=isoRegex.exec(input))){sign=match[1]==='-'?-1:1;duration={y:parseIso(match[2],sign),M:parseIso(match[3],sign),w:parseIso(match[4],sign),d:parseIso(match[5],sign),h:parseIso(match[6],sign),m:parseIso(match[7],sign),s:parseIso(match[8],sign)};}else if(duration==null){ // checks for null or undefined
    duration={};}else if((typeof duration==='undefined'?'undefined':babelHelpers.typeof(duration))==='object'&&('from' in duration||'to' in duration)){diffRes=momentsDifference(local__createLocal(duration.from),local__createLocal(duration.to));duration={};duration.ms=diffRes.milliseconds;duration.M=diffRes.months;}ret=new Duration(duration);if(isDuration(input)&&hasOwnProp(input,'_locale')){ret._locale=input._locale;}return ret;}create__createDuration.fn=Duration.prototype;function parseIso(inp,sign){ // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res=inp&&parseFloat(inp.replace(',','.')); // apply sign while we're at it
    return (isNaN(res)?0:res)*sign;}function positiveMomentsDifference(base,other){var res={milliseconds:0,months:0};res.months=other.month()-base.month()+(other.year()-base.year())*12;if(base.clone().add(res.months,'M').isAfter(other)){--res.months;}res.milliseconds=+other-+base.clone().add(res.months,'M');return res;}function momentsDifference(base,other){var res;if(!(base.isValid()&&other.isValid())){return {milliseconds:0,months:0};}other=cloneWithOffset(other,base);if(base.isBefore(other)){res=positiveMomentsDifference(base,other);}else {res=positiveMomentsDifference(other,base);res.milliseconds=-res.milliseconds;res.months=-res.months;}return res;}function absRound(number){if(number<0){return Math.round(-1*number)*-1;}else {return Math.round(number);}} // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction,name){return function(val,period){var dur,tmp; //invert the arguments, but complain about it
    if(period!==null&&!isNaN(+period)){deprecateSimple(name,'moment().'+name+'(period, number) is deprecated. Please use moment().'+name+'(number, period).');tmp=val;val=period;period=tmp;}val=typeof val==='string'?+val:val;dur=create__createDuration(val,period);add_subtract__addSubtract(this,dur,direction);return this;};}function add_subtract__addSubtract(mom,duration,isAdding,updateOffset){var milliseconds=duration._milliseconds,days=absRound(duration._days),months=absRound(duration._months);if(!mom.isValid()){ // No op
    return;}updateOffset=updateOffset==null?true:updateOffset;if(milliseconds){mom._d.setTime(mom._d.valueOf()+milliseconds*isAdding);}if(days){get_set__set(mom,'Date',get_set__get(mom,'Date')+days*isAdding);}if(months){setMonth(mom,get_set__get(mom,'Month')+months*isAdding);}if(updateOffset){utils_hooks__hooks.updateOffset(mom,days||months);}}var add_subtract__add=createAdder(1,'add');var add_subtract__subtract=createAdder(-1,'subtract');function moment_calendar__calendar(time,formats){ // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now=time||local__createLocal(),sod=cloneWithOffset(now,this).startOf('day'),diff=this.diff(sod,'days',true),format=diff<-6?'sameElse':diff<-1?'lastWeek':diff<0?'lastDay':diff<1?'sameDay':diff<2?'nextDay':diff<7?'nextWeek':'sameElse';var output=formats&&(isFunction(formats[format])?formats[format]():formats[format]);return this.format(output||this.localeData().calendar(format,this,local__createLocal(now)));}function clone(){return new Moment(this);}function isAfter(input,units){var localInput=isMoment(input)?input:local__createLocal(input);if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(!isUndefined(units)?units:'millisecond');if(units==='millisecond'){return this.valueOf()>localInput.valueOf();}else {return localInput.valueOf()<this.clone().startOf(units).valueOf();}}function isBefore(input,units){var localInput=isMoment(input)?input:local__createLocal(input);if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(!isUndefined(units)?units:'millisecond');if(units==='millisecond'){return this.valueOf()<localInput.valueOf();}else {return this.clone().endOf(units).valueOf()<localInput.valueOf();}}function isBetween(from,to,units,inclusivity){inclusivity=inclusivity||'()';return (inclusivity[0]==='('?this.isAfter(from,units):!this.isBefore(from,units))&&(inclusivity[1]===')'?this.isBefore(to,units):!this.isAfter(to,units));}function isSame(input,units){var localInput=isMoment(input)?input:local__createLocal(input),inputMs;if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(units||'millisecond');if(units==='millisecond'){return this.valueOf()===localInput.valueOf();}else {inputMs=localInput.valueOf();return this.clone().startOf(units).valueOf()<=inputMs&&inputMs<=this.clone().endOf(units).valueOf();}}function isSameOrAfter(input,units){return this.isSame(input,units)||this.isAfter(input,units);}function isSameOrBefore(input,units){return this.isSame(input,units)||this.isBefore(input,units);}function diff(input,units,asFloat){var that,zoneDelta,delta,output;if(!this.isValid()){return NaN;}that=cloneWithOffset(input,this);if(!that.isValid()){return NaN;}zoneDelta=(that.utcOffset()-this.utcOffset())*6e4;units=normalizeUnits(units);if(units==='year'||units==='month'||units==='quarter'){output=monthDiff(this,that);if(units==='quarter'){output=output/3;}else if(units==='year'){output=output/12;}}else {delta=this-that;output=units==='second'?delta/1e3: // 1000
    units==='minute'?delta/6e4: // 1000 * 60
    units==='hour'?delta/36e5: // 1000 * 60 * 60
    units==='day'?(delta-zoneDelta)/864e5: // 1000 * 60 * 60 * 24, negate dst
    units==='week'?(delta-zoneDelta)/6048e5: // 1000 * 60 * 60 * 24 * 7, negate dst
    delta;}return asFloat?output:absFloor(output);}function monthDiff(a,b){ // difference in months
    var wholeMonthDiff=(b.year()-a.year())*12+(b.month()-a.month()), // b is in (anchor - 1 month, anchor + 1 month)
    anchor=a.clone().add(wholeMonthDiff,'months'),anchor2,adjust;if(b-anchor<0){anchor2=a.clone().add(wholeMonthDiff-1,'months'); // linear across the month
    adjust=(b-anchor)/(anchor-anchor2);}else {anchor2=a.clone().add(wholeMonthDiff+1,'months'); // linear across the month
    adjust=(b-anchor)/(anchor2-anchor);} //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff+adjust)||0;}utils_hooks__hooks.defaultFormat='YYYY-MM-DDTHH:mm:ssZ';utils_hooks__hooks.defaultFormatUtc='YYYY-MM-DDTHH:mm:ss[Z]';function toString(){return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');}function moment_format__toISOString(){var m=this.clone().utc();if(0<m.year()&&m.year()<=9999){if(isFunction(Date.prototype.toISOString)){ // native implementation is ~50x faster, use it when we can
    return this.toDate().toISOString();}else {return formatMoment(m,'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}}else {return formatMoment(m,'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}}function format(inputString){if(!inputString){inputString=this.isUtc()?utils_hooks__hooks.defaultFormatUtc:utils_hooks__hooks.defaultFormat;}var output=formatMoment(this,inputString);return this.localeData().postformat(output);}function from(time,withoutSuffix){if(this.isValid()&&(isMoment(time)&&time.isValid()||local__createLocal(time).isValid())){return create__createDuration({to:this,from:time}).locale(this.locale()).humanize(!withoutSuffix);}else {return this.localeData().invalidDate();}}function fromNow(withoutSuffix){return this.from(local__createLocal(),withoutSuffix);}function to(time,withoutSuffix){if(this.isValid()&&(isMoment(time)&&time.isValid()||local__createLocal(time).isValid())){return create__createDuration({from:this,to:time}).locale(this.locale()).humanize(!withoutSuffix);}else {return this.localeData().invalidDate();}}function toNow(withoutSuffix){return this.to(local__createLocal(),withoutSuffix);} // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key){var newLocaleData;if(key===undefined){return this._locale._abbr;}else {newLocaleData=locale_locales__getLocale(key);if(newLocaleData!=null){this._locale=newLocaleData;}return this;}}var lang=deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',function(key){if(key===undefined){return this.localeData();}else {return this.locale(key);}});function localeData(){return this._locale;}function startOf(units){units=normalizeUnits(units); // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch(units){case 'year':this.month(0); /* falls through */case 'quarter':case 'month':this.date(1); /* falls through */case 'week':case 'isoWeek':case 'day':case 'date':this.hours(0); /* falls through */case 'hour':this.minutes(0); /* falls through */case 'minute':this.seconds(0); /* falls through */case 'second':this.milliseconds(0);} // weeks are a special case
    if(units==='week'){this.weekday(0);}if(units==='isoWeek'){this.isoWeekday(1);} // quarters are also special
    if(units==='quarter'){this.month(Math.floor(this.month()/3)*3);}return this;}function endOf(units){units=normalizeUnits(units);if(units===undefined||units==='millisecond'){return this;} // 'date' is an alias for 'day', so it should be considered as such.
    if(units==='date'){units='day';}return this.startOf(units).add(1,units==='isoWeek'?'week':units).subtract(1,'ms');}function to_type__valueOf(){return this._d.valueOf()-(this._offset||0)*60000;}function unix(){return Math.floor(this.valueOf()/1000);}function toDate(){return this._offset?new Date(this.valueOf()):this._d;}function toArray(){var m=this;return [m.year(),m.month(),m.date(),m.hour(),m.minute(),m.second(),m.millisecond()];}function toObject(){var m=this;return {years:m.year(),months:m.month(),date:m.date(),hours:m.hours(),minutes:m.minutes(),seconds:m.seconds(),milliseconds:m.milliseconds()};}function toJSON(){ // new Date(NaN).toJSON() === null
    return this.isValid()?this.toISOString():null;}function moment_valid__isValid(){return valid__isValid(this);}function parsingFlags(){return extend({},getParsingFlags(this));}function invalidAt(){return getParsingFlags(this).overflow;}function creationData(){return {input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict};} // FORMATTING
    addFormatToken(0,['gg',2],0,function(){return this.weekYear()%100;});addFormatToken(0,['GG',2],0,function(){return this.isoWeekYear()%100;});function addWeekYearFormatToken(token,getter){addFormatToken(0,[token,token.length],0,getter);}addWeekYearFormatToken('gggg','weekYear');addWeekYearFormatToken('ggggg','weekYear');addWeekYearFormatToken('GGGG','isoWeekYear');addWeekYearFormatToken('GGGGG','isoWeekYear'); // ALIASES
    addUnitAlias('weekYear','gg');addUnitAlias('isoWeekYear','GG'); // PARSING
    addRegexToken('G',matchSigned);addRegexToken('g',matchSigned);addRegexToken('GG',match1to2,match2);addRegexToken('gg',match1to2,match2);addRegexToken('GGGG',match1to4,match4);addRegexToken('gggg',match1to4,match4);addRegexToken('GGGGG',match1to6,match6);addRegexToken('ggggg',match1to6,match6);addWeekParseToken(['gggg','ggggg','GGGG','GGGGG'],function(input,week,config,token){week[token.substr(0,2)]=toInt(input);});addWeekParseToken(['gg','GG'],function(input,week,config,token){week[token]=utils_hooks__hooks.parseTwoDigitYear(input);}); // MOMENTS
    function getSetWeekYear(input){return getSetWeekYearHelper.call(this,input,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy);}function getSetISOWeekYear(input){return getSetWeekYearHelper.call(this,input,this.isoWeek(),this.isoWeekday(),1,4);}function getISOWeeksInYear(){return weeksInYear(this.year(),1,4);}function getWeeksInYear(){var weekInfo=this.localeData()._week;return weeksInYear(this.year(),weekInfo.dow,weekInfo.doy);}function getSetWeekYearHelper(input,week,weekday,dow,doy){var weeksTarget;if(input==null){return weekOfYear(this,dow,doy).year;}else {weeksTarget=weeksInYear(input,dow,doy);if(week>weeksTarget){week=weeksTarget;}return setWeekAll.call(this,input,week,weekday,dow,doy);}}function setWeekAll(weekYear,week,weekday,dow,doy){var dayOfYearData=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy),date=createUTCDate(dayOfYearData.year,0,dayOfYearData.dayOfYear);this.year(date.getUTCFullYear());this.month(date.getUTCMonth());this.date(date.getUTCDate());return this;} // FORMATTING
    addFormatToken('Q',0,'Qo','quarter'); // ALIASES
    addUnitAlias('quarter','Q'); // PARSING
    addRegexToken('Q',match1);addParseToken('Q',function(input,array){array[MONTH]=(toInt(input)-1)*3;}); // MOMENTS
    function getSetQuarter(input){return input==null?Math.ceil((this.month()+1)/3):this.month((input-1)*3+this.month()%3);} // FORMATTING
    addFormatToken('w',['ww',2],'wo','week');addFormatToken('W',['WW',2],'Wo','isoWeek'); // ALIASES
    addUnitAlias('week','w');addUnitAlias('isoWeek','W'); // PARSING
    addRegexToken('w',match1to2);addRegexToken('ww',match1to2,match2);addRegexToken('W',match1to2);addRegexToken('WW',match1to2,match2);addWeekParseToken(['w','ww','W','WW'],function(input,week,config,token){week[token.substr(0,1)]=toInt(input);}); // HELPERS
    // LOCALES
    function localeWeek(mom){return weekOfYear(mom,this._week.dow,this._week.doy).week;}var defaultLocaleWeek={dow:0, // Sunday is the first day of the week.
    doy:6 // The week that contains Jan 1st is the first week of the year.
    };function localeFirstDayOfWeek(){return this._week.dow;}function localeFirstDayOfYear(){return this._week.doy;} // MOMENTS
    function getSetWeek(input){var week=this.localeData().week(this);return input==null?week:this.add((input-week)*7,'d');}function getSetISOWeek(input){var week=weekOfYear(this,1,4).week;return input==null?week:this.add((input-week)*7,'d');} // FORMATTING
    addFormatToken('D',['DD',2],'Do','date'); // ALIASES
    addUnitAlias('date','D'); // PARSING
    addRegexToken('D',match1to2);addRegexToken('DD',match1to2,match2);addRegexToken('Do',function(isStrict,locale){return isStrict?locale._ordinalParse:locale._ordinalParseLenient;});addParseToken(['D','DD'],DATE);addParseToken('Do',function(input,array){array[DATE]=toInt(input.match(match1to2)[0],10);}); // MOMENTS
    var getSetDayOfMonth=makeGetSet('Date',true); // FORMATTING
    addFormatToken('d',0,'do','day');addFormatToken('dd',0,0,function(format){return this.localeData().weekdaysMin(this,format);});addFormatToken('ddd',0,0,function(format){return this.localeData().weekdaysShort(this,format);});addFormatToken('dddd',0,0,function(format){return this.localeData().weekdays(this,format);});addFormatToken('e',0,0,'weekday');addFormatToken('E',0,0,'isoWeekday'); // ALIASES
    addUnitAlias('day','d');addUnitAlias('weekday','e');addUnitAlias('isoWeekday','E'); // PARSING
    addRegexToken('d',match1to2);addRegexToken('e',match1to2);addRegexToken('E',match1to2);addRegexToken('dd',function(isStrict,locale){return locale.weekdaysMinRegex(isStrict);});addRegexToken('ddd',function(isStrict,locale){return locale.weekdaysShortRegex(isStrict);});addRegexToken('dddd',function(isStrict,locale){return locale.weekdaysRegex(isStrict);});addWeekParseToken(['dd','ddd','dddd'],function(input,week,config,token){var weekday=config._locale.weekdaysParse(input,token,config._strict); // if we didn't get a weekday name, mark the date as invalid
    if(weekday!=null){week.d=weekday;}else {getParsingFlags(config).invalidWeekday=input;}});addWeekParseToken(['d','e','E'],function(input,week,config,token){week[token]=toInt(input);}); // HELPERS
    function parseWeekday(input,locale){if(typeof input!=='string'){return input;}if(!isNaN(input)){return parseInt(input,10);}input=locale.weekdaysParse(input);if(typeof input==='number'){return input;}return null;} // LOCALES
    var defaultLocaleWeekdays='Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');function localeWeekdays(m,format){return isArray(this._weekdays)?this._weekdays[m.day()]:this._weekdays[this._weekdays.isFormat.test(format)?'format':'standalone'][m.day()];}var defaultLocaleWeekdaysShort='Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');function localeWeekdaysShort(m){return this._weekdaysShort[m.day()];}var defaultLocaleWeekdaysMin='Su_Mo_Tu_We_Th_Fr_Sa'.split('_');function localeWeekdaysMin(m){return this._weekdaysMin[m.day()];}function day_of_week__handleStrictParse(weekdayName,format,strict){var i,ii,mom,llc=weekdayName.toLocaleLowerCase();if(!this._weekdaysParse){this._weekdaysParse=[];this._shortWeekdaysParse=[];this._minWeekdaysParse=[];for(i=0;i<7;++i){mom=create_utc__createUTC([2000,1]).day(i);this._minWeekdaysParse[i]=this.weekdaysMin(mom,'').toLocaleLowerCase();this._shortWeekdaysParse[i]=this.weekdaysShort(mom,'').toLocaleLowerCase();this._weekdaysParse[i]=this.weekdays(mom,'').toLocaleLowerCase();}}if(strict){if(format==='dddd'){ii=indexOf.call(this._weekdaysParse,llc);return ii!==-1?ii:null;}else if(format==='ddd'){ii=indexOf.call(this._shortWeekdaysParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}}else {if(format==='dddd'){ii=indexOf.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._shortWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}else if(format==='ddd'){ii=indexOf.call(this._shortWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._minWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._shortWeekdaysParse,llc);return ii!==-1?ii:null;}}}function localeWeekdaysParse(weekdayName,format,strict){var i,mom,regex;if(this._weekdaysParseExact){return day_of_week__handleStrictParse.call(this,weekdayName,format,strict);}if(!this._weekdaysParse){this._weekdaysParse=[];this._minWeekdaysParse=[];this._shortWeekdaysParse=[];this._fullWeekdaysParse=[];}for(i=0;i<7;i++){ // make the regex if we don't have it already
    mom=create_utc__createUTC([2000,1]).day(i);if(strict&&!this._fullWeekdaysParse[i]){this._fullWeekdaysParse[i]=new RegExp('^'+this.weekdays(mom,'').replace('.','\.?')+'$','i');this._shortWeekdaysParse[i]=new RegExp('^'+this.weekdaysShort(mom,'').replace('.','\.?')+'$','i');this._minWeekdaysParse[i]=new RegExp('^'+this.weekdaysMin(mom,'').replace('.','\.?')+'$','i');}if(!this._weekdaysParse[i]){regex='^'+this.weekdays(mom,'')+'|^'+this.weekdaysShort(mom,'')+'|^'+this.weekdaysMin(mom,'');this._weekdaysParse[i]=new RegExp(regex.replace('.',''),'i');} // test the regex
    if(strict&&format==='dddd'&&this._fullWeekdaysParse[i].test(weekdayName)){return i;}else if(strict&&format==='ddd'&&this._shortWeekdaysParse[i].test(weekdayName)){return i;}else if(strict&&format==='dd'&&this._minWeekdaysParse[i].test(weekdayName)){return i;}else if(!strict&&this._weekdaysParse[i].test(weekdayName)){return i;}}} // MOMENTS
    function getSetDayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;}var day=this._isUTC?this._d.getUTCDay():this._d.getDay();if(input!=null){input=parseWeekday(input,this.localeData());return this.add(input-day,'d');}else {return day;}}function getSetLocaleDayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;}var weekday=(this.day()+7-this.localeData()._week.dow)%7;return input==null?weekday:this.add(input-weekday,'d');}function getSetISODayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;} // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.
    return input==null?this.day()||7:this.day(this.day()%7?input:input-7);}var defaultWeekdaysRegex=matchWord;function weekdaysRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysStrictRegex;}else {return this._weekdaysRegex;}}else {return this._weekdaysStrictRegex&&isStrict?this._weekdaysStrictRegex:this._weekdaysRegex;}}var defaultWeekdaysShortRegex=matchWord;function weekdaysShortRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysShortStrictRegex;}else {return this._weekdaysShortRegex;}}else {return this._weekdaysShortStrictRegex&&isStrict?this._weekdaysShortStrictRegex:this._weekdaysShortRegex;}}var defaultWeekdaysMinRegex=matchWord;function weekdaysMinRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysMinStrictRegex;}else {return this._weekdaysMinRegex;}}else {return this._weekdaysMinStrictRegex&&isStrict?this._weekdaysMinStrictRegex:this._weekdaysMinRegex;}}function computeWeekdaysParse(){function cmpLenRev(a,b){return b.length-a.length;}var minPieces=[],shortPieces=[],longPieces=[],mixedPieces=[],i,mom,minp,shortp,longp;for(i=0;i<7;i++){ // make the regex if we don't have it already
    mom=create_utc__createUTC([2000,1]).day(i);minp=this.weekdaysMin(mom,'');shortp=this.weekdaysShort(mom,'');longp=this.weekdays(mom,'');minPieces.push(minp);shortPieces.push(shortp);longPieces.push(longp);mixedPieces.push(minp);mixedPieces.push(shortp);mixedPieces.push(longp);} // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);shortPieces.sort(cmpLenRev);longPieces.sort(cmpLenRev);mixedPieces.sort(cmpLenRev);for(i=0;i<7;i++){shortPieces[i]=regexEscape(shortPieces[i]);longPieces[i]=regexEscape(longPieces[i]);mixedPieces[i]=regexEscape(mixedPieces[i]);}this._weekdaysRegex=new RegExp('^('+mixedPieces.join('|')+')','i');this._weekdaysShortRegex=this._weekdaysRegex;this._weekdaysMinRegex=this._weekdaysRegex;this._weekdaysStrictRegex=new RegExp('^('+longPieces.join('|')+')','i');this._weekdaysShortStrictRegex=new RegExp('^('+shortPieces.join('|')+')','i');this._weekdaysMinStrictRegex=new RegExp('^('+minPieces.join('|')+')','i');} // FORMATTING
    addFormatToken('DDD',['DDDD',3],'DDDo','dayOfYear'); // ALIASES
    addUnitAlias('dayOfYear','DDD'); // PARSING
    addRegexToken('DDD',match1to3);addRegexToken('DDDD',match3);addParseToken(['DDD','DDDD'],function(input,array,config){config._dayOfYear=toInt(input);}); // HELPERS
    // MOMENTS
    function getSetDayOfYear(input){var dayOfYear=Math.round((this.clone().startOf('day')-this.clone().startOf('year'))/864e5)+1;return input==null?dayOfYear:this.add(input-dayOfYear,'d');} // FORMATTING
    function hFormat(){return this.hours()%12||12;}function kFormat(){return this.hours()||24;}addFormatToken('H',['HH',2],0,'hour');addFormatToken('h',['hh',2],0,hFormat);addFormatToken('k',['kk',2],0,kFormat);addFormatToken('hmm',0,0,function(){return ''+hFormat.apply(this)+zeroFill(this.minutes(),2);});addFormatToken('hmmss',0,0,function(){return ''+hFormat.apply(this)+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2);});addFormatToken('Hmm',0,0,function(){return ''+this.hours()+zeroFill(this.minutes(),2);});addFormatToken('Hmmss',0,0,function(){return ''+this.hours()+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2);});function meridiem(token,lowercase){addFormatToken(token,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),lowercase);});}meridiem('a',true);meridiem('A',false); // ALIASES
    addUnitAlias('hour','h'); // PARSING
    function matchMeridiem(isStrict,locale){return locale._meridiemParse;}addRegexToken('a',matchMeridiem);addRegexToken('A',matchMeridiem);addRegexToken('H',match1to2);addRegexToken('h',match1to2);addRegexToken('HH',match1to2,match2);addRegexToken('hh',match1to2,match2);addRegexToken('hmm',match3to4);addRegexToken('hmmss',match5to6);addRegexToken('Hmm',match3to4);addRegexToken('Hmmss',match5to6);addParseToken(['H','HH'],HOUR);addParseToken(['a','A'],function(input,array,config){config._isPm=config._locale.isPM(input);config._meridiem=input;});addParseToken(['h','hh'],function(input,array,config){array[HOUR]=toInt(input);getParsingFlags(config).bigHour=true;});addParseToken('hmm',function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos));array[MINUTE]=toInt(input.substr(pos));getParsingFlags(config).bigHour=true;});addParseToken('hmmss',function(input,array,config){var pos1=input.length-4;var pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1));array[MINUTE]=toInt(input.substr(pos1,2));array[SECOND]=toInt(input.substr(pos2));getParsingFlags(config).bigHour=true;});addParseToken('Hmm',function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos));array[MINUTE]=toInt(input.substr(pos));});addParseToken('Hmmss',function(input,array,config){var pos1=input.length-4;var pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1));array[MINUTE]=toInt(input.substr(pos1,2));array[SECOND]=toInt(input.substr(pos2));}); // LOCALES
    function localeIsPM(input){ // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input+'').toLowerCase().charAt(0)==='p';}var defaultLocaleMeridiemParse=/[ap]\.?m?\.?/i;function localeMeridiem(hours,minutes,isLower){if(hours>11){return isLower?'pm':'PM';}else {return isLower?'am':'AM';}} // MOMENTS
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour=makeGetSet('Hours',true); // FORMATTING
    addFormatToken('m',['mm',2],0,'minute'); // ALIASES
    addUnitAlias('minute','m'); // PARSING
    addRegexToken('m',match1to2);addRegexToken('mm',match1to2,match2);addParseToken(['m','mm'],MINUTE); // MOMENTS
    var getSetMinute=makeGetSet('Minutes',false); // FORMATTING
    addFormatToken('s',['ss',2],0,'second'); // ALIASES
    addUnitAlias('second','s'); // PARSING
    addRegexToken('s',match1to2);addRegexToken('ss',match1to2,match2);addParseToken(['s','ss'],SECOND); // MOMENTS
    var getSetSecond=makeGetSet('Seconds',false); // FORMATTING
    addFormatToken('S',0,0,function(){return ~ ~(this.millisecond()/100);});addFormatToken(0,['SS',2],0,function(){return ~ ~(this.millisecond()/10);});addFormatToken(0,['SSS',3],0,'millisecond');addFormatToken(0,['SSSS',4],0,function(){return this.millisecond()*10;});addFormatToken(0,['SSSSS',5],0,function(){return this.millisecond()*100;});addFormatToken(0,['SSSSSS',6],0,function(){return this.millisecond()*1000;});addFormatToken(0,['SSSSSSS',7],0,function(){return this.millisecond()*10000;});addFormatToken(0,['SSSSSSSS',8],0,function(){return this.millisecond()*100000;});addFormatToken(0,['SSSSSSSSS',9],0,function(){return this.millisecond()*1000000;}); // ALIASES
    addUnitAlias('millisecond','ms'); // PARSING
    addRegexToken('S',match1to3,match1);addRegexToken('SS',match1to3,match2);addRegexToken('SSS',match1to3,match3);var token;for(token='SSSS';token.length<=9;token+='S'){addRegexToken(token,matchUnsigned);}function parseMs(input,array){array[MILLISECOND]=toInt(('0.'+input)*1000);}for(token='S';token.length<=9;token+='S'){addParseToken(token,parseMs);} // MOMENTS
    var getSetMillisecond=makeGetSet('Milliseconds',false); // FORMATTING
    addFormatToken('z',0,0,'zoneAbbr');addFormatToken('zz',0,0,'zoneName'); // MOMENTS
    function getZoneAbbr(){return this._isUTC?'UTC':'';}function getZoneName(){return this._isUTC?'Coordinated Universal Time':'';}var momentPrototype__proto=Moment.prototype;momentPrototype__proto.add=add_subtract__add;momentPrototype__proto.calendar=moment_calendar__calendar;momentPrototype__proto.clone=clone;momentPrototype__proto.diff=diff;momentPrototype__proto.endOf=endOf;momentPrototype__proto.format=format;momentPrototype__proto.from=from;momentPrototype__proto.fromNow=fromNow;momentPrototype__proto.to=to;momentPrototype__proto.toNow=toNow;momentPrototype__proto.get=getSet;momentPrototype__proto.invalidAt=invalidAt;momentPrototype__proto.isAfter=isAfter;momentPrototype__proto.isBefore=isBefore;momentPrototype__proto.isBetween=isBetween;momentPrototype__proto.isSame=isSame;momentPrototype__proto.isSameOrAfter=isSameOrAfter;momentPrototype__proto.isSameOrBefore=isSameOrBefore;momentPrototype__proto.isValid=moment_valid__isValid;momentPrototype__proto.lang=lang;momentPrototype__proto.locale=locale;momentPrototype__proto.localeData=localeData;momentPrototype__proto.max=prototypeMax;momentPrototype__proto.min=prototypeMin;momentPrototype__proto.parsingFlags=parsingFlags;momentPrototype__proto.set=getSet;momentPrototype__proto.startOf=startOf;momentPrototype__proto.subtract=add_subtract__subtract;momentPrototype__proto.toArray=toArray;momentPrototype__proto.toObject=toObject;momentPrototype__proto.toDate=toDate;momentPrototype__proto.toISOString=moment_format__toISOString;momentPrototype__proto.toJSON=toJSON;momentPrototype__proto.toString=toString;momentPrototype__proto.unix=unix;momentPrototype__proto.valueOf=to_type__valueOf;momentPrototype__proto.creationData=creationData; // Year
    momentPrototype__proto.year=getSetYear;momentPrototype__proto.isLeapYear=getIsLeapYear; // Week Year
    momentPrototype__proto.weekYear=getSetWeekYear;momentPrototype__proto.isoWeekYear=getSetISOWeekYear; // Quarter
    momentPrototype__proto.quarter=momentPrototype__proto.quarters=getSetQuarter; // Month
    momentPrototype__proto.month=getSetMonth;momentPrototype__proto.daysInMonth=getDaysInMonth; // Week
    momentPrototype__proto.week=momentPrototype__proto.weeks=getSetWeek;momentPrototype__proto.isoWeek=momentPrototype__proto.isoWeeks=getSetISOWeek;momentPrototype__proto.weeksInYear=getWeeksInYear;momentPrototype__proto.isoWeeksInYear=getISOWeeksInYear; // Day
    momentPrototype__proto.date=getSetDayOfMonth;momentPrototype__proto.day=momentPrototype__proto.days=getSetDayOfWeek;momentPrototype__proto.weekday=getSetLocaleDayOfWeek;momentPrototype__proto.isoWeekday=getSetISODayOfWeek;momentPrototype__proto.dayOfYear=getSetDayOfYear; // Hour
    momentPrototype__proto.hour=momentPrototype__proto.hours=getSetHour; // Minute
    momentPrototype__proto.minute=momentPrototype__proto.minutes=getSetMinute; // Second
    momentPrototype__proto.second=momentPrototype__proto.seconds=getSetSecond; // Millisecond
    momentPrototype__proto.millisecond=momentPrototype__proto.milliseconds=getSetMillisecond; // Offset
    momentPrototype__proto.utcOffset=getSetOffset;momentPrototype__proto.utc=setOffsetToUTC;momentPrototype__proto.local=setOffsetToLocal;momentPrototype__proto.parseZone=setOffsetToParsedOffset;momentPrototype__proto.hasAlignedHourOffset=hasAlignedHourOffset;momentPrototype__proto.isDST=isDaylightSavingTime;momentPrototype__proto.isDSTShifted=isDaylightSavingTimeShifted;momentPrototype__proto.isLocal=isLocal;momentPrototype__proto.isUtcOffset=isUtcOffset;momentPrototype__proto.isUtc=isUtc;momentPrototype__proto.isUTC=isUtc; // Timezone
    momentPrototype__proto.zoneAbbr=getZoneAbbr;momentPrototype__proto.zoneName=getZoneName; // Deprecations
    momentPrototype__proto.dates=deprecate('dates accessor is deprecated. Use date instead.',getSetDayOfMonth);momentPrototype__proto.months=deprecate('months accessor is deprecated. Use month instead',getSetMonth);momentPrototype__proto.years=deprecate('years accessor is deprecated. Use year instead',getSetYear);momentPrototype__proto.zone=deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779',getSetZone);var momentPrototype=momentPrototype__proto;function moment__createUnix(input){return local__createLocal(input*1000);}function moment__createInZone(){return local__createLocal.apply(null,arguments).parseZone();}var defaultCalendar={sameDay:'[Today at] LT',nextDay:'[Tomorrow at] LT',nextWeek:'dddd [at] LT',lastDay:'[Yesterday at] LT',lastWeek:'[Last] dddd [at] LT',sameElse:'L'};function locale_calendar__calendar(key,mom,now){var output=this._calendar[key];return isFunction(output)?output.call(mom,now):output;}var defaultLongDateFormat={LTS:'h:mm:ss A',LT:'h:mm A',L:'MM/DD/YYYY',LL:'MMMM D, YYYY',LLL:'MMMM D, YYYY h:mm A',LLLL:'dddd, MMMM D, YYYY h:mm A'};function longDateFormat(key){var format=this._longDateFormat[key],formatUpper=this._longDateFormat[key.toUpperCase()];if(format||!formatUpper){return format;}this._longDateFormat[key]=formatUpper.replace(/MMMM|MM|DD|dddd/g,function(val){return val.slice(1);});return this._longDateFormat[key];}var defaultInvalidDate='Invalid date';function invalidDate(){return this._invalidDate;}var defaultOrdinal='%d';var defaultOrdinalParse=/\d{1,2}/;function ordinal(number){return this._ordinal.replace('%d',number);}function preParsePostFormat(string){return string;}var defaultRelativeTime={future:'in %s',past:'%s ago',s:'a few seconds',m:'a minute',mm:'%d minutes',h:'an hour',hh:'%d hours',d:'a day',dd:'%d days',M:'a month',MM:'%d months',y:'a year',yy:'%d years'};function relative__relativeTime(number,withoutSuffix,string,isFuture){var output=this._relativeTime[string];return isFunction(output)?output(number,withoutSuffix,string,isFuture):output.replace(/%d/i,number);}function pastFuture(diff,output){var format=this._relativeTime[diff>0?'future':'past'];return isFunction(format)?format(output):format.replace(/%s/i,output);}var prototype__proto=Locale.prototype;prototype__proto._calendar=defaultCalendar;prototype__proto.calendar=locale_calendar__calendar;prototype__proto._longDateFormat=defaultLongDateFormat;prototype__proto.longDateFormat=longDateFormat;prototype__proto._invalidDate=defaultInvalidDate;prototype__proto.invalidDate=invalidDate;prototype__proto._ordinal=defaultOrdinal;prototype__proto.ordinal=ordinal;prototype__proto._ordinalParse=defaultOrdinalParse;prototype__proto.preparse=preParsePostFormat;prototype__proto.postformat=preParsePostFormat;prototype__proto._relativeTime=defaultRelativeTime;prototype__proto.relativeTime=relative__relativeTime;prototype__proto.pastFuture=pastFuture;prototype__proto.set=locale_set__set; // Month
    prototype__proto.months=localeMonths;prototype__proto._months=defaultLocaleMonths;prototype__proto.monthsShort=localeMonthsShort;prototype__proto._monthsShort=defaultLocaleMonthsShort;prototype__proto.monthsParse=localeMonthsParse;prototype__proto._monthsRegex=defaultMonthsRegex;prototype__proto.monthsRegex=monthsRegex;prototype__proto._monthsShortRegex=defaultMonthsShortRegex;prototype__proto.monthsShortRegex=monthsShortRegex; // Week
    prototype__proto.week=localeWeek;prototype__proto._week=defaultLocaleWeek;prototype__proto.firstDayOfYear=localeFirstDayOfYear;prototype__proto.firstDayOfWeek=localeFirstDayOfWeek; // Day of Week
    prototype__proto.weekdays=localeWeekdays;prototype__proto._weekdays=defaultLocaleWeekdays;prototype__proto.weekdaysMin=localeWeekdaysMin;prototype__proto._weekdaysMin=defaultLocaleWeekdaysMin;prototype__proto.weekdaysShort=localeWeekdaysShort;prototype__proto._weekdaysShort=defaultLocaleWeekdaysShort;prototype__proto.weekdaysParse=localeWeekdaysParse;prototype__proto._weekdaysRegex=defaultWeekdaysRegex;prototype__proto.weekdaysRegex=weekdaysRegex;prototype__proto._weekdaysShortRegex=defaultWeekdaysShortRegex;prototype__proto.weekdaysShortRegex=weekdaysShortRegex;prototype__proto._weekdaysMinRegex=defaultWeekdaysMinRegex;prototype__proto.weekdaysMinRegex=weekdaysMinRegex; // Hours
    prototype__proto.isPM=localeIsPM;prototype__proto._meridiemParse=defaultLocaleMeridiemParse;prototype__proto.meridiem=localeMeridiem;function lists__get(format,index,field,setter){var locale=locale_locales__getLocale();var utc=create_utc__createUTC().set(setter,index);return locale[field](utc,format);}function listMonthsImpl(format,index,field){if(typeof format==='number'){index=format;format=undefined;}format=format||'';if(index!=null){return lists__get(format,index,field,'month');}var i;var out=[];for(i=0;i<12;i++){out[i]=lists__get(format,i,field,'month');}return out;} // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted,format,index,field){if(typeof localeSorted==='boolean'){if(typeof format==='number'){index=format;format=undefined;}format=format||'';}else {format=localeSorted;index=format;localeSorted=false;if(typeof format==='number'){index=format;format=undefined;}format=format||'';}var locale=locale_locales__getLocale(),shift=localeSorted?locale._week.dow:0;if(index!=null){return lists__get(format,(index+shift)%7,field,'day');}var i;var out=[];for(i=0;i<7;i++){out[i]=lists__get(format,(i+shift)%7,field,'day');}return out;}function lists__listMonths(format,index){return listMonthsImpl(format,index,'months');}function lists__listMonthsShort(format,index){return listMonthsImpl(format,index,'monthsShort');}function lists__listWeekdays(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdays');}function lists__listWeekdaysShort(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdaysShort');}function lists__listWeekdaysMin(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdaysMin');}locale_locales__getSetGlobalLocale('en',{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function ordinal(number){var b=number%10,output=toInt(number%100/10)===1?'th':b===1?'st':b===2?'nd':b===3?'rd':'th';return number+output;}}); // Side effect imports
    utils_hooks__hooks.lang=deprecate('moment.lang is deprecated. Use moment.locale instead.',locale_locales__getSetGlobalLocale);utils_hooks__hooks.langData=deprecate('moment.langData is deprecated. Use moment.localeData instead.',locale_locales__getLocale);var mathAbs=Math.abs;function duration_abs__abs(){var data=this._data;this._milliseconds=mathAbs(this._milliseconds);this._days=mathAbs(this._days);this._months=mathAbs(this._months);data.milliseconds=mathAbs(data.milliseconds);data.seconds=mathAbs(data.seconds);data.minutes=mathAbs(data.minutes);data.hours=mathAbs(data.hours);data.months=mathAbs(data.months);data.years=mathAbs(data.years);return this;}function duration_add_subtract__addSubtract(duration,input,value,direction){var other=create__createDuration(input,value);duration._milliseconds+=direction*other._milliseconds;duration._days+=direction*other._days;duration._months+=direction*other._months;return duration._bubble();} // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add(input,value){return duration_add_subtract__addSubtract(this,input,value,1);} // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract(input,value){return duration_add_subtract__addSubtract(this,input,value,-1);}function absCeil(number){if(number<0){return Math.floor(number);}else {return Math.ceil(number);}}function bubble(){var milliseconds=this._milliseconds;var days=this._days;var months=this._months;var data=this._data;var seconds,minutes,hours,years,monthsFromDays; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if(!(milliseconds>=0&&days>=0&&months>=0||milliseconds<=0&&days<=0&&months<=0)){milliseconds+=absCeil(monthsToDays(months)+days)*864e5;days=0;months=0;} // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds=milliseconds%1000;seconds=absFloor(milliseconds/1000);data.seconds=seconds%60;minutes=absFloor(seconds/60);data.minutes=minutes%60;hours=absFloor(minutes/60);data.hours=hours%24;days+=absFloor(hours/24); // convert days to months
    monthsFromDays=absFloor(daysToMonths(days));months+=monthsFromDays;days-=absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year
    years=absFloor(months/12);months%=12;data.days=days;data.months=months;data.years=years;return this;}function daysToMonths(days){ // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days*4800/146097;}function monthsToDays(months){ // the reverse of daysToMonths
    return months*146097/4800;}function as(units){var days;var months;var milliseconds=this._milliseconds;units=normalizeUnits(units);if(units==='month'||units==='year'){days=this._days+milliseconds/864e5;months=this._months+daysToMonths(days);return units==='month'?months:months/12;}else { // handle milliseconds separately because of floating point math errors (issue #1867)
    days=this._days+Math.round(monthsToDays(this._months));switch(units){case 'week':return days/7+milliseconds/6048e5;case 'day':return days+milliseconds/864e5;case 'hour':return days*24+milliseconds/36e5;case 'minute':return days*1440+milliseconds/6e4;case 'second':return days*86400+milliseconds/1000; // Math.floor prevents floating point math errors here
    case 'millisecond':return Math.floor(days*864e5)+milliseconds;default:throw new Error('Unknown unit '+units);}}} // TODO: Use this.as('ms')?
    function duration_as__valueOf(){return this._milliseconds+this._days*864e5+this._months%12*2592e6+toInt(this._months/12)*31536e6;}function makeAs(alias){return function(){return this.as(alias);};}var asMilliseconds=makeAs('ms');var asSeconds=makeAs('s');var asMinutes=makeAs('m');var asHours=makeAs('h');var asDays=makeAs('d');var asWeeks=makeAs('w');var asMonths=makeAs('M');var asYears=makeAs('y');function duration_get__get(units){units=normalizeUnits(units);return this[units+'s']();}function makeGetter(name){return function(){return this._data[name];};}var milliseconds=makeGetter('milliseconds');var seconds=makeGetter('seconds');var minutes=makeGetter('minutes');var hours=makeGetter('hours');var days=makeGetter('days');var months=makeGetter('months');var years=makeGetter('years');function weeks(){return absFloor(this.days()/7);}var round=Math.round;var thresholds={s:45, // seconds to minute
    m:45, // minutes to hour
    h:22, // hours to day
    d:26, // days to month
    M:11 // months to year
    }; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string,number,withoutSuffix,isFuture,locale){return locale.relativeTime(number||1,!!withoutSuffix,string,isFuture);}function duration_humanize__relativeTime(posNegDuration,withoutSuffix,locale){var duration=create__createDuration(posNegDuration).abs();var seconds=round(duration.as('s'));var minutes=round(duration.as('m'));var hours=round(duration.as('h'));var days=round(duration.as('d'));var months=round(duration.as('M'));var years=round(duration.as('y'));var a=seconds<thresholds.s&&['s',seconds]||minutes<=1&&['m']||minutes<thresholds.m&&['mm',minutes]||hours<=1&&['h']||hours<thresholds.h&&['hh',hours]||days<=1&&['d']||days<thresholds.d&&['dd',days]||months<=1&&['M']||months<thresholds.M&&['MM',months]||years<=1&&['y']||['yy',years];a[2]=withoutSuffix;a[3]=+posNegDuration>0;a[4]=locale;return substituteTimeAgo.apply(null,a);} // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold(threshold,limit){if(thresholds[threshold]===undefined){return false;}if(limit===undefined){return thresholds[threshold];}thresholds[threshold]=limit;return true;}function humanize(withSuffix){var locale=this.localeData();var output=duration_humanize__relativeTime(this,!withSuffix,locale);if(withSuffix){output=locale.pastFuture(+this,output);}return locale.postformat(output);}var iso_string__abs=Math.abs;function iso_string__toISOString(){ // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    var seconds=iso_string__abs(this._milliseconds)/1000;var days=iso_string__abs(this._days);var months=iso_string__abs(this._months);var minutes,hours,years; // 3600 seconds -> 60 minutes -> 1 hour
    minutes=absFloor(seconds/60);hours=absFloor(minutes/60);seconds%=60;minutes%=60; // 12 months -> 1 year
    years=absFloor(months/12);months%=12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y=years;var M=months;var D=days;var h=hours;var m=minutes;var s=seconds;var total=this.asSeconds();if(!total){ // this is the same as C#'s (Noda) and python (isodate)...
    // but not other JS (goog.date)
    return 'P0D';}return (total<0?'-':'')+'P'+(Y?Y+'Y':'')+(M?M+'M':'')+(D?D+'D':'')+(h||m||s?'T':'')+(h?h+'H':'')+(m?m+'M':'')+(s?s+'S':'');}var duration_prototype__proto=Duration.prototype;duration_prototype__proto.abs=duration_abs__abs;duration_prototype__proto.add=duration_add_subtract__add;duration_prototype__proto.subtract=duration_add_subtract__subtract;duration_prototype__proto.as=as;duration_prototype__proto.asMilliseconds=asMilliseconds;duration_prototype__proto.asSeconds=asSeconds;duration_prototype__proto.asMinutes=asMinutes;duration_prototype__proto.asHours=asHours;duration_prototype__proto.asDays=asDays;duration_prototype__proto.asWeeks=asWeeks;duration_prototype__proto.asMonths=asMonths;duration_prototype__proto.asYears=asYears;duration_prototype__proto.valueOf=duration_as__valueOf;duration_prototype__proto._bubble=bubble;duration_prototype__proto.get=duration_get__get;duration_prototype__proto.milliseconds=milliseconds;duration_prototype__proto.seconds=seconds;duration_prototype__proto.minutes=minutes;duration_prototype__proto.hours=hours;duration_prototype__proto.days=days;duration_prototype__proto.weeks=weeks;duration_prototype__proto.months=months;duration_prototype__proto.years=years;duration_prototype__proto.humanize=humanize;duration_prototype__proto.toISOString=iso_string__toISOString;duration_prototype__proto.toString=iso_string__toISOString;duration_prototype__proto.toJSON=iso_string__toISOString;duration_prototype__proto.locale=locale;duration_prototype__proto.localeData=localeData; // Deprecations
    duration_prototype__proto.toIsoString=deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',iso_string__toISOString);duration_prototype__proto.lang=lang; // Side effect imports
    // FORMATTING
    addFormatToken('X',0,0,'unix');addFormatToken('x',0,0,'valueOf'); // PARSING
    addRegexToken('x',matchSigned);addRegexToken('X',matchTimestamp);addParseToken('X',function(input,array,config){config._d=new Date(parseFloat(input,10)*1000);});addParseToken('x',function(input,array,config){config._d=new Date(toInt(input));}); // Side effect imports
    utils_hooks__hooks.version='2.13.0';setHookCallback(local__createLocal);utils_hooks__hooks.fn=momentPrototype;utils_hooks__hooks.min=min;utils_hooks__hooks.max=max;utils_hooks__hooks.now=now;utils_hooks__hooks.utc=create_utc__createUTC;utils_hooks__hooks.unix=moment__createUnix;utils_hooks__hooks.months=lists__listMonths;utils_hooks__hooks.isDate=isDate;utils_hooks__hooks.locale=locale_locales__getSetGlobalLocale;utils_hooks__hooks.invalid=valid__createInvalid;utils_hooks__hooks.duration=create__createDuration;utils_hooks__hooks.isMoment=isMoment;utils_hooks__hooks.weekdays=lists__listWeekdays;utils_hooks__hooks.parseZone=moment__createInZone;utils_hooks__hooks.localeData=locale_locales__getLocale;utils_hooks__hooks.isDuration=isDuration;utils_hooks__hooks.monthsShort=lists__listMonthsShort;utils_hooks__hooks.weekdaysMin=lists__listWeekdaysMin;utils_hooks__hooks.defineLocale=defineLocale;utils_hooks__hooks.updateLocale=updateLocale;utils_hooks__hooks.locales=locale_locales__listLocales;utils_hooks__hooks.weekdaysShort=lists__listWeekdaysShort;utils_hooks__hooks.normalizeUnits=normalizeUnits;utils_hooks__hooks.relativeTimeThreshold=duration_humanize__getSetRelativeTimeThreshold;utils_hooks__hooks.prototype=momentPrototype;var _moment=utils_hooks__hooks;return _moment;});});var require$$0$1 = moment$1&&(typeof moment$1==='undefined'?'undefined':babelHelpers.typeof(moment$1))==='object'&&'default' in moment$1?moment$1['default']:moment$1;

    var momentRange = __commonjs(function (module, exports, global) {
      (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module unless amdModuleId is set
          define(["moment"], function (a0) {
            return root['DateRange'] = factory(a0);
          });
        } else if ((typeof exports === 'undefined' ? 'undefined' : babelHelpers.typeof(exports)) === 'object') {
          // Node. Does not work with strict CommonJS, but
          // only CommonJS-like environments that support module.exports,
          // like Node.
          module.exports = factory(require$$0$1);
        } else {
          root['DateRange'] = factory(moment);
        }
      })(__commonjs_global, function (moment) {

        //-----------------------------------------------------------------------------
        // Contstants
        //-----------------------------------------------------------------------------

        var INTERVALS = {
          year: true,
          month: true,
          week: true,
          day: true,
          hour: true,
          minute: true,
          second: true
        };

        //-----------------------------------------------------------------------------
        // Date Ranges
        //-----------------------------------------------------------------------------

        /**
         * DateRange class to store ranges and query dates.
         *
         * @constructor
         * @param {(Moment|Date)} start Start of interval
         * @param {(Moment|Date)} end End of interval
         */ /**
            * DateRange class to store ranges and query dates.
            *
            * @constructor
            * @param {!Array} range Array containing start and end dates.
            */ /**
               * DateRange class to store ranges and query dates.
               *
               * @constructor
               * @param {!String} range String formatted as an IS0 8601 time interval
               */
        function DateRange(start, end) {
          var parts;
          var s = start;
          var e = end;

          if (arguments.length === 1 || end === undefined) {
            if ((typeof start === 'undefined' ? 'undefined' : babelHelpers.typeof(start)) === 'object' && start.length === 2) {
              s = start[0];
              e = start[1];
            } else if (typeof start === 'string') {
              parts = start.split('/');
              s = parts[0];
              e = parts[1];
            }
          }

          this.start = s === null ? moment(-8640000000000000) : moment(s);
          this.end = e === null ? moment(8640000000000000) : moment(e);
        }

        /**
         * Constructor for prototype.
         *
         * @type {DateRange}
         */
        DateRange.prototype.constructor = DateRange;

        /**
         * Deep clone range.
         *
         * @return {!DateRange}
         */
        DateRange.prototype.clone = function () {
          return moment().range(this.start, this.end);
        };

        /**
         * Determine if the current interval contains a given moment/date/range.
         *
         * @param {(Moment|Date|DateRange)} other Date to check
         * @param {!boolean} exclusive True if the to value is exclusive
         *
         * @return {!boolean}
         */
        DateRange.prototype.contains = function (other, exclusive) {
          var start = this.start;
          var end = this.end;

          if (other instanceof DateRange) {
            return start <= other.start && (end > other.end || end.isSame(other.end) && !exclusive);
          } else {
            return start <= other && (end > other || end.isSame(other) && !exclusive);
          }
        };

        /**
         * Determine if the current date range overlaps a given date range.
         *
         * @param {!DateRange} range Date range to check
         *
         * @return {!boolean}
         */
        DateRange.prototype.overlaps = function (range) {
          return this.intersect(range) !== null;
        };

        /**
         * Determine the intersecting periods from one or more date ranges.
         *
         * @param {!DateRange} other A date range to intersect with this one
         *
         * @return {DateRange} Returns the intersecting date or `null` if the ranges do
         *                     not intersect
         */
        DateRange.prototype.intersect = function (other) {
          var start = this.start;
          var end = this.end;

          if (start <= other.start && other.start < end && end < other.end) {
            return new DateRange(other.start, end);
          } else if (other.start < start && start < other.end && other.end <= end) {
            return new DateRange(start, other.end);
          } else if (other.start < start && start <= end && end < other.end) {
            return this;
          } else if (start <= other.start && other.start <= other.end && other.end <= end) {
            return other;
          }

          return null;
        };

        /**
         * Merge date ranges if they intersect.
         *
         * @param {!DateRange} other A date range to add to this one
         *
         * @return {DateRange} Returns the new `DateRange` or `null` if they do not
         *                     overlap
         */
        DateRange.prototype.add = function (other) {
          if (this.overlaps(other)) {
            return new DateRange(moment.min(this.start, other.start), moment.max(this.end, other.end));
          }

          return null;
        };

        /**
         * Subtract one range from another.
         *
         * @param {!DateRange} other A date range to substract from this one
         *
         * @return {!Array<DateRange>}
         */
        DateRange.prototype.subtract = function (other) {
          var start = this.start;
          var end = this.end;

          if (this.intersect(other) === null) {
            return [this];
          } else if (other.start <= start && start < end && end <= other.end) {
            return [];
          } else if (other.start <= start && start < other.end && other.end < end) {
            return [new DateRange(other.end, end)];
          } else if (start < other.start && other.start < end && end <= other.end) {
            return [new DateRange(start, other.start)];
          } else if (start < other.start && other.start < other.end && other.end < end) {
            return [new DateRange(start, other.start), new DateRange(other.end, end)];
          } else if (start < other.start && other.start < end && other.end < end) {
            return [new DateRange(start, other.start), new DateRange(other.start, end)];
          }
        };

        /**
         * Build a n array of dates.
         *
         * @param {(!DateRange|String)} range Date range to be used for iteration or
         *                                    shorthand string (shorthands:
         *                                    http://momentjs.com/docs/#/manipulating/add/)
         * @param {!boolean} exclusive Indicate that the end of the range should not
         *                             be included in the iter.
         *
         * @return {!Array}
         */
        DateRange.prototype.toArray = function (by, exclusive) {
          var acc = [];
          this.by(by, function (unit) {
            acc.push(unit);
          }, exclusive);
          return acc;
        };

        /**
         * Iterate over the date range by a given date range, executing a function
         * for each sub-range.
         *
         * @param {(!DateRange|String)} range Date range to be used for iteration or
         *                                    shorthand string (shorthands:
         *                                    http://momentjs.com/docs/#/manipulating/add/)
         * @param {!DateRange~by} hollaback Callback
         * @param {!boolean} exclusive Indicate that the end of the range should not
         *                             be included in the iter.
         *
         * @return {DateRange} `this`
         */
        DateRange.prototype.by = function (range, hollaback, exclusive) {
          if (typeof range === 'string') {
            _byString.call(this, range, hollaback, exclusive);
          } else {
            _byRange.call(this, range, hollaback, exclusive);
          }
          return this;
        };

        /**
         * Callback executed for each sub-range.
         *
         * @callback DateRange~by
         *
         * @param {!Moment} current Current moment object for iteration
         */

        /**
         * @private
         */
        function _byString(interval, hollaback, exclusive) {
          var current = moment(this.start);

          while (this.contains(current, exclusive)) {
            hollaback.call(this, current.clone());
            current.add(1, interval);
          }
        }

        /**
         * @private
         */
        function _byRange(interval, hollaback, exclusive) {
          var div = this / interval;
          var l = Math.floor(div);

          if (l === Infinity) {
            return;
          }
          if (l === div && exclusive) {
            l--;
          }

          for (var i = 0; i <= l; i++) {
            hollaback.call(this, moment(this.start.valueOf() + interval.valueOf() * i));
          }
        }

        /**
         * Date range formatted as an [ISO8601 Time
         * Interval](http://en.wikipedia.org/wiki/ISO_8601#Time_intervals).
         *
         * @return {!String}
         */
        DateRange.prototype.toString = function () {
          return this.start.format() + '/' + this.end.format();
        };

        /**
         * Date range in milliseconds. Allows basic coercion math of date ranges.
         *
         * @return {!number}
         */
        DateRange.prototype.valueOf = function () {
          return this.end - this.start;
        };

        /**
         * Center date of the range.
         *
         * @return {!Moment}
         */
        DateRange.prototype.center = function () {
          var center = this.start + this.diff() / 2;
          return moment(center);
        };

        /**
         * Date range toDate
         *
         * @return {!Array<Date>}
         */
        DateRange.prototype.toDate = function () {
          return [this.start.toDate(), this.end.toDate()];
        };

        /**
         * Determine if this date range is the same as another.
         *
         * @param {!DateRange} other Another date range to compare to
         *
         * @return {!boolean}
         */
        DateRange.prototype.isSame = function (other) {
          return this.start.isSame(other.start) && this.end.isSame(other.end);
        };

        /**
         * The difference of the end vs start.
         *
         * @param {number} unit Unit of difference, if no unit is passed in
         *                      milliseconds are returned. E.g.: `"days"`, `"months"`,
         *                      etc...
         *
         * @return {!number}
         */
        DateRange.prototype.diff = function (unit) {
          return this.end.diff(this.start, unit);
        };

        //-----------------------------------------------------------------------------
        // Moment Extensions
        //-----------------------------------------------------------------------------

        /**
         * Build a date range.
         *
         * @param {(Moment|Date)} start Start of range
         * @param {(Moment|Date)} end End of range
         *
         * @this {Moment}
         *
         * @return {!DateRange}
         */
        moment.range = function (start, end) {
          if (start in INTERVALS) {
            return new DateRange(moment(this).startOf(start), moment(this).endOf(start));
          } else {
            return new DateRange(start, end);
          }
        };

        /**
         * Expose constructor
         *
         * @const
         */
        moment.range.constructor = DateRange;

        /**
         * @deprecated
         */
        moment.fn.range = moment.range;

        /**
         * Check if the current moment is within a given date range.
         *
         * @param {!DateRange} range Date range to check
         *
         * @this {Moment}
         *
         * @return {!boolean}
         */
        moment.fn.within = function (range) {
          return range.contains(this._d);
        };

        //-----------------------------------------------------------------------------
        // Export
        //-----------------------------------------------------------------------------

        return DateRange;
      });
    });

    momentRange && (typeof momentRange === 'undefined' ? 'undefined' : babelHelpers.typeof(momentRange)) === 'object' && 'default' in momentRange ? momentRange['default'] : momentRange;

    var Moments = function () {
      function Moments() {
        babelHelpers.classCallCheck(this, Moments);
      }

      babelHelpers.createClass(Moments, null, [{
        key: 'toRange',
        value: function toRange() {
          for (var _len = arguments.length, moments = Array(_len), _key = 0; _key < _len; _key++) {
            moments[_key] = arguments[_key];
          }

          if (!moments || moments.length < 2) {
            throw new Error('Expected at least two moments but found only ' + moments);
          }

          return require$$0$1.range(Moments.earliest.apply(Moments, moments), Moments.latest.apply(Moments, moments));
        }
      }, {
        key: 'earliest',
        value: function earliest() {
          for (var _len2 = arguments.length, moments = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            moments[_key2] = arguments[_key2];
          }

          return this._comparison.apply(this, ['isSameOrBefore'].concat(moments));
        }
      }, {
        key: 'latest',
        value: function latest() {
          for (var _len3 = arguments.length, moments = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            moments[_key3] = arguments[_key3];
          }

          return this._comparison.apply(this, ['isSameOrAfter'].concat(moments));
        }
      }, {
        key: '_comparison',
        value: function _comparison(fn) {
          var result = null;

          for (var _len4 = arguments.length, moments = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            moments[_key4 - 1] = arguments[_key4];
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = moments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var m = _step.value;

              if (result == null) {
                result = m;
              } else {
                if (m[fn](result)) {
                  result = m;
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return result;
        }
      }]);
      return Moments;
    }();

    // FIXME: ENCAPSULATION - currently, the Datepicker jquery fn instantiates this, then this instantiates that.  So strange.

    var DateRangePicker = function (_Base) {
      babelHelpers.inherits(DateRangePicker, _Base);

      function DateRangePicker($element, config) {
        babelHelpers.classCallCheck(this, DateRangePicker);


        // create a config sans inputs

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DateRangePicker).call(this, $element, config));

        var _config = $.extend({}, _this.config, { inputs: undefined }); // don't pass along inputs to dp

        // for each input, instantiate it
        _this.inputs = [];
        _this.datepickers = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.config.inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;


            // track all inputs
            var $input = $(i);
            _this.inputs.push($input);

            // instantiate each datepicker
            Datepicker._jQueryInterface.call($input, _config).on(Event.DATE_CHANGE, function (ev) {
              return _this.dateUpdated(ev);
            });

            // track all datepickers
            _this.datepickers.push($input.data(Data.KEY));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this.updateRange();
        return _this;
      }

      babelHelpers.createClass(DateRangePicker, [{
        key: 'updateRange',
        value: function updateRange() {
          // gather all dates
          this.dates = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.datepickers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var dp = _step2.value;

              this.dates.push(dp.getDate());
            }

            // create a range from all dates
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          this.range = Moments.toRange.apply(Moments, babelHelpers.toConsumableArray(this.dates));

          // let the datepickers know what range we are working with
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.datepickers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _dp = _step3.value;

              _dp.setRange(this.range);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      }, {
        key: 'dateUpdated',
        value: function dateUpdated(ev) {
          // `this.updating` is a workaround for preventing infinite recursion between Event.DATE_CHANGE triggering
          //    and calls to `setDate`.  Until there is a better mechanism.
          if (this.updating) {
            return;
          }

          this.updating = true;

          try {
            var datepicker = $(ev.target).data(Data.KEY);
            if (typeof datepicker === "undefined") {
              return;
            }

            if (!this.inputs.is(ev.target)) {
              // not our input
              return;
            }

            // TODO: it appears we can have more than two datepickers, I'm not sure of the use-case, but it would seem to make more sense  with just two (and be simpler).
            var newDate = datepicker.getDate();
            var index = $.inArray(ev.target, this.inputs);
            var indexBefore = index - 1;
            var indexAfter = index + 1;
            var length = this.inputs.length;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = this.datepickers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var dp = _step4.value;

                if (!dp.getDate()) dp.setDate(newDate);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }

            if (newDate.isBefore(this.dates.array[indexBefore])) {
              // Date being moved earlier/left
              while (indexBefore >= 0 && newDate.isBefore(this.dates.array[indexBefore])) {
                this.datepickers[indexBefore--].setDate(newDate);
              }
            } else if (newDate.isAfter(this.dates.array[indexAfter])) {
              // Date being moved later/right
              while (indexAfter < length && newDate.isAfter(this.dates.array[indexAfter])) {
                this.datepickers[indexAfter++].setDate(newDate);
              }
            }
            this.updateRange();
          } finally {
            this.updating = undefined;
          }
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = this.datepickers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var dp = _step5.value;

              dp.dispose();
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          this.dates = null;
          this.range = null;
          this.inputs = null;
          this.datepickers = null;
        }
      }]);
      return DateRangePicker;
    }(Base);

    var popper = __commonjs(function (module, exports, global) {
        /**
         * @fileOverview Kickass library to create and place poppers near their reference elements.
         * @version {{version}}
         * @license
         * Copyright (c) 2016 Federico Zivolo and contributors
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in all
         * copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         * SOFTWARE.
         */

        //
        // Cross module loader
        // Supported: Node, AMD, Browser globals
        //
        ;(function (root, factory) {
            if (typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define(factory);
            } else if ((typeof module === 'undefined' ? 'undefined' : babelHelpers.typeof(module)) === 'object' && module.exports) {
                // Node. Does not work with strict CommonJS, but
                // only CommonJS-like environments that support module.exports,
                // like Node.
                module.exports = factory();
            } else {
                // Browser globals (root is window)
                root.Popper = factory();
            }
        })(__commonjs_global, function () {

            'use strict';

            var root = window;

            // default options
            var DEFAULTS = {
                // placement of the popper
                placement: 'bottom',

                gpuAcceleration: true,

                // shift popper from its origin by the given amount of pixels (can be negative)
                offset: 0,

                // the element which will act as boundary of the popper
                boundariesElement: 'viewport',

                // amount of pixel used to define a minimum distance between the boundaries and the popper
                boundariesPadding: 5,

                // popper will try to prevent overflow following this order,
                // by default, then, it could overflow on the left and on top of the boundariesElement
                preventOverflowOrder: ['left', 'right', 'top', 'bottom'],

                // the behavior used by flip to change the placement of the popper
                flipBehavior: 'flip',

                arrowElement: '[x-arrow]',

                // list of functions used to modify the offsets before they are applied to the popper
                modifiers: ['shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle'],

                modifiersIgnored: []
            };

            /**
             * Create a new Popper.js instance
             * @constructor Popper
             * @param {HTMLElement} reference - The reference element used to position the popper
             * @param {HTMLElement|Object} popper
             *      The HTML element used as popper, or a configuration used to generate the popper.
             * @param {String} [popper.tagName='div'] The tag name of the generated popper.
             * @param {Array} [popper.classNames=['popper']] Array of classes to apply to the generated popper.
             * @param {Array} [popper.attributes] Array of attributes to apply, specify `attr:value` to assign a value to it.
             * @param {HTMLElement|String} [popper.parent=window.document.body] The parent element, given as HTMLElement or as query string.
             * @param {String} [popper.content=''] The content of the popper, it can be text, html, or node; if it is not text, set `contentType` to `html` or `node`.
             * @param {String} [popper.contentType='text'] If `html`, the `content` will be parsed as HTML. If `node`, it will be appended as-is.
             * @param {String} [popper.arrow.tagName='div'] Same as `popper.tagName` but for the arrow element.
             * @param {Array} [popper.arrow.classNames='popper__arrow'] Same as `popper.classNames` but for the arrow element.
             * @param {String} [popper.arrow.attributes=['x-arrow']] Same as `popper.attributes` but for the arrow element.
             * @param {Object} options
             * @param {String} [options.placement=bottom]
             *      Placement of the popper accepted values: `top(-left, -right), right(-left, -right), bottom(-left, -right),
             *      left(-left, -right)`
             *
             * @param {Boolean} [options.gpuAcceleration=true]
             *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
             *      browser to use the GPU to accelerate the rendering.
             *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
             *
             * @param {Number} [options.offset=0]
             *      Amount of pixels the popper will be shifted (can be negative).
             *
             * @param {String|Element} [options.boundariesElement='viewport']
             *      The element which will define the boundaries of the popper position, the popper will never be placed outside
             *      of the defined boundaries (except if `keepTogether` is enabled)
             *
             * @param {Number} [options.boundariesPadding=5]
             *      Additional padding for the boundaries
             *
             * @param {Array} [options.preventOverflowOrder=['left', 'right', 'top', 'bottom']]
             *      Order used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
             *      this means that the last ones will never overflow
             *
             * @param {String|Array} [options.flipBehavior='flip']
             *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
             *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
             *      its axis (`right - left`, `top - bottom`).
             *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
             *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
             *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
             *
             * @param {Array} [options.modifiers=[ 'shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle']]
             *      List of functions used to modify the data before they are applied to the popper, add your custom functions
             *      to this array to edit the offsets and placement.
             *      The function should reflect the @params and @returns of preventOverflow
             *
             * @param {Array} [options.modifiersIgnored=[]]
             *      Put here any built-in modifier name you want to exclude from the modifiers list
             *      The function should reflect the @params and @returns of preventOverflow
             *
             * @param {Boolean} [options.removeOnDestroy=false]
             *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
             */
            function Popper(reference, popper, options) {
                this._reference = reference.jquery ? reference[0] : reference;
                this.state = {};

                // if the popper variable is a configuration object, parse it to generate an HTMLElement
                // generate a default popper if is not defined
                var isNotDefined = typeof popper === 'undefined' || popper === null;
                var isConfig = popper && popper.constructor.name === 'Object';
                if (isNotDefined || isConfig) {
                    this._popper = this.parse(isConfig ? popper : {});
                }
                // otherwise, use the given HTMLElement as popper
                else {
                        this._popper = popper.jquery ? popper[0] : popper;
                    }

                // with {} we create a new object with the options inside it
                this._options = Object.assign({}, DEFAULTS, options);

                // iterate trough the list of modifiers, the ones defined as strings refers to internal methods of Popper.js
                // so we return the corresponding method
                this._options.modifiers = this._options.modifiers.map(function (modifier) {
                    if (typeof modifier === 'string') {
                        if (this._options.modifiersIgnored.indexOf(modifier) !== -1) {
                            return;
                        }
                        return this.modifiers[modifier];
                    } else {
                        return modifier;
                    }
                }.bind(this));

                // set the x-placement attribute before everything else because it could be used to add margins to the popper
                // margins needs to be calculated to get the correct popper offsets
                if (this._options.modifiers.indexOf('applyStyle') !== -1) {
                    this._popper.setAttribute('x-placement', this._options.placement);
                }

                // fire the first update to position the popper in the right place
                this.update();

                // setup event listeners, they will take care of update the position in specific situations
                this._setupEventListeners();
            }

            //
            // Methods
            //
            /**
             * Destroy the popper
             * @method
             * @memberof Popper
             */
            Popper.prototype.destroy = function () {
                this._popper.removeAttribute('x-placement');
                this._popper.style.left = '';
                this._popper.style.position = '';
                this._popper.style.top = '';
                this._popper.style[getSupportedPropertyName('transform')] = '';
                this._removeEventListeners();

                // remove the popper if user explicity asked for the deletion on destroy
                if (this._options.removeOnDestroy) {
                    this._popper.remove();
                }
            };

            /**
             * Updates the position of the popper, computing the new offsets and applying the new style
             * @method
             * @memberof Popper
             */
            Popper.prototype.update = function () {
                var data = { instance: this };

                // store placement inside the data object, modifiers will be able to edit `placement` if needed
                // and refer to _originalPlacement to know the original value
                data.placement = this._options.placement;
                data._originalPlacement = this._options.placement;

                // compute the popper and reference offsets and put them inside data.offsets
                data.offsets = this._getOffsets(this._popper, this._reference, data.placement);

                // get boundaries
                data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);

                data = this.runModifiers(data, this._options.modifiers);

                if (typeof this.state.updateCallback === 'function') {
                    this.state.updateCallback(data);
                }
            };

            /**
             * If a function is passed, it will be executed after the initialization of popper with as first argument the Popper instance.
             * @method
             * @memberof Popper
             * @param {Function} callback
             */
            Popper.prototype.onCreate = function (callback) {
                // the createCallbacks return as first argument the popper instance
                callback(this);
            };

            /**
             * If a function is passed, it will be executed after each update of popper with as first argument the set of coordinates and informations
             * used to style popper and its arrow.
             * @method
             * @memberof Popper
             * @param {Function} callback
             */
            Popper.prototype.onUpdate = function (callback) {
                this.state.updateCallback = callback;
            };

            /**
             * Helper used to generate poppers from a configuration file
             * @method
             * @memberof Popper
             * @returns {HTMLElement} popper
             */
            Popper.prototype.parse = function (config) {
                var defaultConfig = {
                    tagName: 'div',
                    classNames: ['popper'],
                    attributes: [],
                    parent: root.document.body,
                    content: '',
                    contentType: 'text',
                    arrow: {
                        tagName: 'div',
                        classNames: ['popper__arrow'],
                        attributes: ['x-arrow']
                    }
                };
                config = Object.assign({}, defaultConfig, config);

                var d = root.document;

                var popper = d.createElement(config.tagName);
                addClassNames(popper, config.classNames);
                addAttributes(popper, config.attributes);
                if (config.contentType === 'node') {
                    popper.appendChild(config.content.jquery ? config.content[0] : config.content);
                } else if (config.contentType === 'html') {
                    popper.innerHTML = config.content;
                } else {
                    popper.textContent = config.content;
                }

                if (config.arrow) {
                    var arrow = d.createElement(config.arrow.tagName);
                    addClassNames(arrow, config.arrow.classNames);
                    addAttributes(arrow, config.arrow.attributes);
                    popper.appendChild(arrow);
                }

                var parent = config.parent;

                // if the given parent is a string, use it to match an element
                // if more than one element is matched, the first one will be used as parent
                // if no elements are matched, the script will throw an error
                if (typeof parent === 'string') {
                    parent = d.querySelectorAll(config.parent);
                    if (parent.length > 1) {
                        console.warning('WARNING: the given `parent` query(' + config.parent + ') matched more than one element, the first one will be used');
                    }
                    if (parent.length === 0) {
                        throw 'ERROR: the given `parent` doesn\'t exists!';
                    }
                    parent = parent[0];
                }
                // if the given parent is a DOM nodes list or an array of nodes with more than one element,
                // the first one will be used as parent
                if (parent.length > 1) {
                    console.warning('WARNING: you have passed as parent a list of elements, the first one will be used');
                    parent = parent[0];
                }

                // append the generated popper to its parent
                parent.appendChild(popper);

                return popper;

                /**
                 * Adds class names to the given element
                 * @function
                 * @ignore
                 * @param {HTMLElement} target
                 * @param {Array} classes
                 */
                function addClassNames(element, classNames) {
                    classNames.forEach(function (className) {
                        element.classList.add(className);
                    });
                }

                /**
                 * Adds attributes to the given element
                 * @function
                 * @ignore
                 * @param {HTMLElement} target
                 * @param {Array} attributes
                 * @example
                 * addAttributes(element, [ 'data-info:foobar' ]);
                 */
                function addAttributes(element, attributes) {
                    attributes.forEach(function (attribute) {
                        element.setAttribute(attribute.split(':')[0], attribute.split(':')[1]);
                    });
                }
            };

            /**
             * Get offsets to the popper
             * @method
             * @memberof Popper
             * @access private
             * @param {Element} popper - the popper element
             * @param {Element} reference - the reference element (the popper will be relative to this)
             * @returns {Object} An object containing the offsets which will be applied to the popper
             */
            Popper.prototype._getOffsets = function (popper, reference, placement) {
                placement = placement.split('-')[0];
                var popperOffsets = {};

                var container = getOffsetParent(reference);

                // Decide if the popper will be fixed
                // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
                var isParentFixed = isFixed(reference, container);
                popperOffsets.position = isParentFixed ? 'fixed' : 'absolute';
                this.state.position = popperOffsets.position;

                //
                // Get reference element position
                //
                var referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed);

                //
                // Get popper sizes
                //
                var popperRect = getOuterSizes(popper);

                //
                // Compute offsets of popper
                //

                // depending by the popper placement we have to compute its offsets slightly differently
                if (['right', 'left'].indexOf(placement) !== -1) {
                    popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
                    if (placement === 'left') {
                        popperOffsets.left = referenceOffsets.left - popperRect.width;
                    } else {
                        popperOffsets.left = referenceOffsets.right;
                    }
                } else {
                    popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
                    if (placement === 'top') {
                        popperOffsets.top = referenceOffsets.top - popperRect.height;
                    } else {
                        popperOffsets.top = referenceOffsets.bottom;
                    }
                }

                // Add width and height to our offsets object
                popperOffsets.width = popperRect.width;
                popperOffsets.height = popperRect.height;

                return {
                    popper: popperOffsets,
                    reference: referenceOffsets
                };
            };

            /**
             * Setup needed event listeners used to update the popper position
             * @method
             * @memberof Popper
             * @access private
             */
            Popper.prototype._setupEventListeners = function () {
                // NOTE: 1 DOM access here
                this.state.updateBound = this.update.bind(this);
                root.addEventListener('resize', this.state.updateBound);
                // if the boundariesElement is window we don't need to listen for the scroll event
                if (this._options.boundariesElement !== 'window') {
                    var target = getScrollParent(this._reference);
                    // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
                    if (target === root.document.body || target === root.document.documentElement) {
                        target = root;
                    }
                    target.addEventListener('scroll', this.state.updateBound);
                }
            };

            /**
             * Remove event listeners used to update the popper position
             * @method
             * @memberof Popper
             * @access private
             */
            Popper.prototype._removeEventListeners = function () {
                // NOTE: 1 DOM access here
                root.removeEventListener('resize', this.state.updateBound);
                if (this._options.boundariesElement !== 'window') {
                    var target = getScrollParent(this._reference);
                    // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
                    if (target === root.document.body || target === root.document.documentElement) {
                        target = root;
                    }
                    target.removeEventListener('scroll', this.state.updateBound);
                }
                this.state.updateBound = null;
            };

            /**
             * Computed the boundaries limits and return them
             * @method
             * @memberof Popper
             * @access private
             * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
             * @param {Number} padding - Boundaries padding
             * @param {Element} boundariesElement - Element used to define the boundaries
             * @returns {Object} Coordinates of the boundaries
             */
            Popper.prototype._getBoundaries = function (data, padding, boundariesElement) {
                // NOTE: 1 DOM access here
                var boundaries = {};
                var width, height;
                if (boundariesElement === 'window') {
                    var body = root.document.body,
                        html = root.document.documentElement;

                    height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                    width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

                    boundaries = {
                        top: 0,
                        right: width,
                        bottom: height,
                        left: 0
                    };
                } else if (boundariesElement === 'viewport') {
                    var offsetParent = getOffsetParent(this._popper);
                    var scrollParent = getScrollParent(this._popper);
                    var offsetParentRect = getOffsetRect(offsetParent);

                    // if the popper is fixed we don't have to substract scrolling from the boundaries
                    var scrollTop = data.offsets.popper.position === 'fixed' ? 0 : scrollParent.scrollTop;
                    var scrollLeft = data.offsets.popper.position === 'fixed' ? 0 : scrollParent.scrollLeft;

                    boundaries = {
                        top: 0 - (offsetParentRect.top - scrollTop),
                        right: root.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
                        bottom: root.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
                        left: 0 - (offsetParentRect.left - scrollLeft)
                    };
                } else {
                    if (getOffsetParent(this._popper) === boundariesElement) {
                        boundaries = {
                            top: 0,
                            left: 0,
                            right: boundariesElement.clientWidth,
                            bottom: boundariesElement.clientHeight
                        };
                    } else {
                        boundaries = getOffsetRect(boundariesElement);
                    }
                }
                boundaries.left += padding;
                boundaries.right -= padding;
                boundaries.top = boundaries.top + padding;
                boundaries.bottom = boundaries.bottom - padding;
                return boundaries;
            };

            /**
             * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
             * @method
             * @memberof Popper
             * @access public
             * @param {Object} data
             * @param {Array} modifiers
             * @param {Function} ends
             */
            Popper.prototype.runModifiers = function (data, modifiers, ends) {
                var modifiersToRun = modifiers.slice();
                if (ends !== undefined) {
                    modifiersToRun = this._options.modifiers.slice(0, getArrayKeyIndex(this._options.modifiers, ends));
                }

                modifiersToRun.forEach(function (modifier) {
                    if (isFunction(modifier)) {
                        data = modifier.call(this, data);
                    }
                }.bind(this));

                return data;
            };

            /**
             * Helper used to know if the given modifier depends from another one.
             * @method
             * @memberof Popper
             * @returns {Boolean}
             */

            Popper.prototype.isModifierRequired = function (requesting, requested) {
                var index = getArrayKeyIndex(this._options.modifiers, requesting);
                return !!this._options.modifiers.slice(0, index).filter(function (modifier) {
                    return modifier === requested;
                }).length;
            };

            //
            // Modifiers
            //

            /**
             * Modifiers list
             * @namespace Popper.modifiers
             * @memberof Popper
             * @type {Object}
             */
            Popper.prototype.modifiers = {};

            /**
             * Apply the computed styles to the popper element
             * @method
             * @memberof Popper.modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @returns {Object} The same data object
             */
            Popper.prototype.modifiers.applyStyle = function (data) {
                // apply the final offsets to the popper
                // NOTE: 1 DOM access here
                var styles = {
                    position: data.offsets.popper.position
                };

                // round top and left to avoid blurry text
                var left = Math.round(data.offsets.popper.left);
                var top = Math.round(data.offsets.popper.top);

                // if gpuAcceleration is set to true and transform is supported, we use `translate3d` to apply the position to the popper
                // we automatically use the supported prefixed version if needed
                var prefixedProperty;
                if (this._options.gpuAcceleration && (prefixedProperty = getSupportedPropertyName('transform'))) {
                    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
                    styles.top = 0;
                    styles.left = 0;
                }
                // othwerise, we use the standard `left` and `top` properties
                else {
                        styles.left = left;
                        styles.top = top;
                    }

                setStyle(this._popper, styles);

                // set an attribute which will be useful to style the tooltip (use it to properly position its arrow)
                // NOTE: 1 DOM access here
                this._popper.setAttribute('x-placement', data.placement);

                // if the arrow modifier is required and the arrow style has been computed, apply the arrow style
                if (this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) && data.offsets.arrow) {
                    setStyle(data.arrowElement, data.offsets.arrow);
                }

                return data;
            };

            /**
             * Modifier used to shift the popper on the start or end of its reference element side
             * @method
             * @memberof Popper.modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @returns {Object} The data object, properly modified
             */
            Popper.prototype.modifiers.shift = function (data) {
                var placement = data.placement;
                var basePlacement = placement.split('-')[0];
                var shiftVariation = placement.split('-')[1];

                // if shift shiftVariation is specified, run the modifier
                if (shiftVariation) {
                    var reference = data.offsets.reference;
                    var popper = getPopperClientRect(data.offsets.popper);

                    var shiftOffsets = {
                        y: {
                            start: { top: reference.top },
                            end: { top: reference.top + reference.height - popper.height }
                        },
                        x: {
                            start: { left: reference.left },
                            end: { left: reference.left + reference.width - popper.width }
                        }
                    };

                    var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

                    data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
                }

                return data;
            };

            /**
             * Modifier used to make sure the popper does not overflows from it's boundaries
             * @method
             * @memberof Popper.modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @returns {Object} The data object, properly modified
             */
            Popper.prototype.modifiers.preventOverflow = function (data) {
                var order = this._options.preventOverflowOrder;
                var popper = getPopperClientRect(data.offsets.popper);

                var check = {
                    left: function left() {
                        var left = popper.left;
                        if (popper.left < data.boundaries.left) {
                            left = Math.max(popper.left, data.boundaries.left);
                        }
                        return { left: left };
                    },
                    right: function right() {
                        var left = popper.left;
                        if (popper.right > data.boundaries.right) {
                            left = Math.min(popper.left, data.boundaries.right - popper.width);
                        }
                        return { left: left };
                    },
                    top: function top() {
                        var top = popper.top;
                        if (popper.top < data.boundaries.top) {
                            top = Math.max(popper.top, data.boundaries.top);
                        }
                        return { top: top };
                    },
                    bottom: function bottom() {
                        var top = popper.top;
                        if (popper.bottom > data.boundaries.bottom) {
                            top = Math.min(popper.top, data.boundaries.bottom - popper.height);
                        }
                        return { top: top };
                    }
                };

                order.forEach(function (direction) {
                    data.offsets.popper = Object.assign(popper, check[direction]());
                });

                return data;
            };

            /**
             * Modifier used to make sure the popper is always near its reference
             * @method
             * @memberof Popper.modifiers
             * @argument {Object} data - The data object generated by _update method
             * @returns {Object} The data object, properly modified
             */
            Popper.prototype.modifiers.keepTogether = function (data) {
                var popper = getPopperClientRect(data.offsets.popper);
                var reference = data.offsets.reference;
                var f = Math.floor;

                if (popper.right < f(reference.left)) {
                    data.offsets.popper.left = f(reference.left) - popper.width;
                }
                if (popper.left > f(reference.right)) {
                    data.offsets.popper.left = f(reference.right);
                }
                if (popper.bottom < f(reference.top)) {
                    data.offsets.popper.top = f(reference.top) - popper.height;
                }
                if (popper.top > f(reference.bottom)) {
                    data.offsets.popper.top = f(reference.bottom);
                }

                return data;
            };

            /**
             * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
             * Requires the `preventOverflow` modifier before it in order to work.
             * **NOTE:** This modifier will run all its previous modifiers everytime it tries to flip the popper!
             * @method
             * @memberof Popper.modifiers
             * @argument {Object} data - The data object generated by _update method
             * @returns {Object} The data object, properly modified
             */
            Popper.prototype.modifiers.flip = function (data) {
                // check if preventOverflow is in the list of modifiers before the flip modifier.
                // otherwise flip would not work as expected.
                if (!this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)) {
                    console.warn('WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!');
                    return data;
                }

                if (data.flipped && data.placement === data._originalPlacement) {
                    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
                    return data;
                }

                var placement = data.placement.split('-')[0];
                var placementOpposite = getOppositePlacement(placement);
                var variation = data.placement.split('-')[1] || '';

                var flipOrder = [];
                if (this._options.flipBehavior === 'flip') {
                    flipOrder = [placement, placementOpposite];
                } else {
                    flipOrder = this._options.flipBehavior;
                }

                flipOrder.forEach(function (step, index) {
                    if (placement !== step || flipOrder.length === index + 1) {
                        return;
                    }

                    placement = data.placement.split('-')[0];
                    placementOpposite = getOppositePlacement(placement);

                    var popperOffsets = getPopperClientRect(data.offsets.popper);

                    // this boolean is used to distinguish right and bottom from top and left
                    // they need different computations to get flipped
                    var a = ['right', 'bottom'].indexOf(placement) !== -1;

                    // using Math.floor because the reference offsets may contain decimals we are not going to consider here
                    if (a && Math.floor(data.offsets.reference[placement]) > Math.floor(popperOffsets[placementOpposite]) || !a && Math.floor(data.offsets.reference[placement]) < Math.floor(popperOffsets[placementOpposite])) {
                        // we'll use this boolean to detect any flip loop
                        data.flipped = true;
                        data.placement = flipOrder[index + 1];
                        if (variation) {
                            data.placement += '-' + variation;
                        }
                        data.offsets.popper = this._getOffsets(this._popper, this._reference, data.placement).popper;

                        data = this.runModifiers(data, this._options.modifiers, this._flip);
                    }
                }.bind(this));
                return data;
            };

            /**
             * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
             * The offsets will shift the popper on the side of its reference element.
             * @method
             * @memberof Popper.modifiers
             * @argument {Object} data - The data object generated by _update method
             * @returns {Object} The data object, properly modified
             */
            Popper.prototype.modifiers.offset = function (data) {
                var offset = this._options.offset;
                var popper = data.offsets.popper;

                if (data.placement.indexOf('left') !== -1) {
                    popper.top -= offset;
                } else if (data.placement.indexOf('right') !== -1) {
                    popper.top += offset;
                } else if (data.placement.indexOf('top') !== -1) {
                    popper.left -= offset;
                } else if (data.placement.indexOf('bottom') !== -1) {
                    popper.left += offset;
                }
                return data;
            };

            /**
             * Modifier used to move the arrows on the edge of the popper to make sure them are always between the popper and the reference element
             * It will use the CSS outer size of the arrow element to know how many pixels of conjuction are needed
             * @method
             * @memberof Popper.modifiers
             * @argument {Object} data - The data object generated by _update method
             * @returns {Object} The data object, properly modified
             */
            Popper.prototype.modifiers.arrow = function (data) {
                var arrow = this._options.arrowElement;

                // if the arrowElement is a string, suppose it's a CSS selector
                if (typeof arrow === 'string') {
                    arrow = this._popper.querySelector(arrow);
                }

                // if arrow element is not found, don't run the modifier
                if (!arrow) {
                    return data;
                }

                // the arrow element must be child of its popper
                if (!this._popper.contains(arrow)) {
                    console.warn('WARNING: `arrowElement` must be child of its popper element!');
                    return data;
                }

                // arrow depends on keepTogether in order to work
                if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
                    console.warn('WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!');
                    return data;
                }

                var arrowStyle = {};
                var placement = data.placement.split('-')[0];
                var popper = getPopperClientRect(data.offsets.popper);
                var reference = data.offsets.reference;
                var isVertical = ['left', 'right'].indexOf(placement) !== -1;

                var len = isVertical ? 'height' : 'width';
                var side = isVertical ? 'top' : 'left';
                var altSide = isVertical ? 'left' : 'top';
                var opSide = isVertical ? 'bottom' : 'right';
                var arrowSize = getOuterSizes(arrow)[len];

                //
                // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
                //

                // top/left side
                if (reference[opSide] - arrowSize < popper[side]) {
                    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
                }
                // bottom/right side
                if (reference[side] + arrowSize > popper[opSide]) {
                    data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide];
                }

                // compute center of the popper
                var center = reference[side] + reference[len] / 2 - arrowSize / 2;

                var sideValue = center - popper[side];

                // prevent arrow from being placed not contiguously to its popper
                sideValue = Math.max(Math.min(popper[len] - arrowSize, sideValue), 0);
                arrowStyle[side] = sideValue;
                arrowStyle[altSide] = ''; // make sure to remove any old style from the arrow

                data.offsets.arrow = arrowStyle;
                data.arrowElement = arrow;

                return data;
            };

            //
            // Helpers
            //

            /**
             * Get the outer sizes of the given element (offset size + margins)
             * @function
             * @ignore
             * @argument {Element} element
             * @returns {Object} object containing width and height properties
             */
            function getOuterSizes(element) {
                // NOTE: 1 DOM access here
                var styles = root.getComputedStyle(element);
                var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
                var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);

                return { width: element.offsetWidth + y, height: element.offsetHeight + x };
            }

            /**
             * Get the opposite placement of the given one/
             * @function
             * @ignore
             * @argument {String} placement
             * @returns {String} flipped placement
             */
            function getOppositePlacement(placement) {
                var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
                return placement.replace(/left|right|bottom|top/g, function (matched) {
                    return hash[matched];
                });
            }

            /**
             * Given the popper offsets, generate an output similar to getBoundingClientRect
             * @function
             * @ignore
             * @argument {Object} popperOffsets
             * @returns {Object} ClientRect like output
             */
            function getPopperClientRect(popperOffsets) {
                var offsets = Object.assign({}, popperOffsets);
                offsets.right = offsets.left + offsets.width;
                offsets.bottom = offsets.top + offsets.height;
                return offsets;
            }

            /**
             * Given an array and the key to find, returns its index
             * @function
             * @ignore
             * @argument {Array} arr
             * @argument keyToFind
             * @returns index or null
             */
            function getArrayKeyIndex(arr, keyToFind) {
                var i = 0,
                    key;
                for (key in arr) {
                    if (arr[key] === keyToFind) {
                        return i;
                    }
                    i++;
                }
                return null;
            }

            /**
             * Get CSS computed property of the given element
             * @function
             * @ignore
             * @argument {Eement} element
             * @argument {String} property
             */
            function getStyleComputedProperty(element, property) {
                // NOTE: 1 DOM access here
                var css = root.getComputedStyle(element, null);
                return css[property];
            }

            /**
             * Returns the offset parent of the given element
             * @function
             * @ignore
             * @argument {Element} element
             * @returns {Element} offset parent
             */
            function getOffsetParent(element) {
                // NOTE: 1 DOM access here
                var offsetParent = element.offsetParent;
                return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
            }

            /**
             * Returns the scrolling parent of the given element
             * @function
             * @ignore
             * @argument {Element} element
             * @returns {Element} offset parent
             */
            function getScrollParent(element) {
                if (element === root.document) {
                    // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
                    // greater than 0 and return the proper element
                    if (root.document.body.scrollTop) {
                        return root.document.body;
                    } else {
                        return root.document.documentElement;
                    }
                }

                // Firefox want us to check `-x` and `-y` variations as well
                if (['scroll', 'auto'].indexOf(getStyleComputedProperty(element, 'overflow')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(element, 'overflow-x')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(element, 'overflow-y')) !== -1) {
                    return element;
                }
                return element.parentNode ? getScrollParent(element.parentNode) : element;
            }

            /**
             * Check if the given element is fixed or is inside a fixed parent
             * @function
             * @ignore
             * @argument {Element} element
             * @argument {Element} customContainer
             * @returns {Boolean} answer to "isFixed?"
             */
            function isFixed(element) {
                if (element === root.document.body) {
                    return false;
                }
                if (getStyleComputedProperty(element, 'position') === 'fixed') {
                    return true;
                }
                return element.parentNode ? isFixed(element.parentNode) : element;
            }

            /**
             * Set the style to the given popper
             * @function
             * @ignore
             * @argument {Element} element - Element to apply the style to
             * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
             */
            function setStyle(element, styles) {
                function is_numeric(n) {
                    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
                }
                Object.keys(styles).forEach(function (prop) {
                    var unit = '';
                    // add unit if the value is numeric and is one of the following
                    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
                        unit = 'px';
                    }
                    element.style[prop] = styles[prop] + unit;
                });
            }

            /**
             * Check if the given variable is a function
             * @function
             * @ignore
             * @argument {Element} element - Element to check
             * @returns {Boolean} answer to: is a function?
             */
            function isFunction(functionToCheck) {
                var getType = {};
                return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            }

            /**
             * Get the position of the given element, relative to its offset parent
             * @function
             * @ignore
             * @param {Element} element
             * @return {Object} position - Coordinates of the element and its `scrollTop`
             */
            function getOffsetRect(element) {
                var elementRect = {
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    left: element.offsetLeft,
                    top: element.offsetTop
                };

                elementRect.right = elementRect.left + elementRect.width;
                elementRect.bottom = elementRect.top + elementRect.height;

                // position
                return elementRect;
            }

            /**
             * Get bounding client rect of given element
             * @function
             * @ignore
             * @param {HTMLElement} element
             * @return {Object} client rect
             */
            function getBoundingClientRect(element) {
                var rect = element.getBoundingClientRect();
                return {
                    left: rect.left,
                    top: rect.top,
                    right: rect.right,
                    bottom: rect.bottom,
                    width: rect.right - rect.left,
                    height: rect.bottom - rect.top
                };
            }

            /**
             * Given an element and one of its parents, return the offset
             * @function
             * @ignore
             * @param {HTMLElement} element
             * @param {HTMLElement} parent
             * @return {Object} rect
             */
            function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
                var elementRect = getBoundingClientRect(element);
                var parentRect = getBoundingClientRect(parent);

                if (fixed) {
                    var scrollParent = getScrollParent(parent);
                    parentRect.top += scrollParent.scrollTop;
                    parentRect.bottom += scrollParent.scrollTop;
                    parentRect.left += scrollParent.scrollLeft;
                    parentRect.right += scrollParent.scrollLeft;
                }

                var rect = {
                    top: elementRect.top - parentRect.top,
                    left: elementRect.left - parentRect.left,
                    bottom: elementRect.top - parentRect.top + elementRect.height,
                    right: elementRect.left - parentRect.left + elementRect.width,
                    width: elementRect.width,
                    height: elementRect.height
                };
                return rect;
            }

            /**
             * Get the prefixed supported property name
             * @function
             * @ignore
             * @argument {String} property (camelCase)
             * @returns {String} prefixed property (camelCase)
             */
            function getSupportedPropertyName(property) {
                var prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

                for (var i = 0; i < prefixes.length; i++) {
                    var toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
                    if (typeof root.document.body.style[toCheck] !== 'undefined') {
                        return toCheck;
                    }
                }
                return null;
            }

            /**
             * The Object.assign() method is used to copy the values of all enumerable own properties from one or more source
             * objects to a target object. It will return the target object.
             * This polyfill doesn't support symbol properties, since ES5 doesn't have symbols anyway
             * Source: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
             * @function
             * @ignore
             */
            if (!Object.assign) {
                Object.defineProperty(Object, 'assign', {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: function value(target) {
                        if (target === undefined || target === null) {
                            throw new TypeError('Cannot convert first argument to object');
                        }

                        var to = Object(target);
                        for (var i = 1; i < arguments.length; i++) {
                            var nextSource = arguments[i];
                            if (nextSource === undefined || nextSource === null) {
                                continue;
                            }
                            nextSource = Object(nextSource);

                            var keysArray = Object.keys(nextSource);
                            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                                var nextKey = keysArray[nextIndex];
                                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                                if (desc !== undefined && desc.enumerable) {
                                    to[nextKey] = nextSource[nextKey];
                                }
                            }
                        }
                        return to;
                    }
                });
            }

            return Popper;
        });
    });

    var Popper = popper && (typeof popper === 'undefined' ? 'undefined' : babelHelpers.typeof(popper)) === 'object' && 'default' in popper ? popper['default'] : popper;

    /**
     * Datepicker for fields using momentjs for all date-based functionality.
     *
     * Internal dates are stored as UTC moments.  To use them in local time, execute moment.local() prior to formatting.
     */
    var Datepicker = function ($) {

      var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];
      var Default = {
        // lang defaults to en, most i18n comes from moment's locales.
        lang: 'en',
        // i18n - for the very few strings we use.
        i18n: {
          en: {
            today: 'Today',
            clear: 'Clear',
            cancel: 'Cancel',
            ok: 'Ok'
          }
        },
        button: {
          today: false, // If true, displays a “Today” button at the bottom of the datepicker to select the current date
          clear: false,
          cancel: false,
          ok: false
        },
        autoclose: false, // Whether or not to close the datepicker immediately when a date is selected
        keyboard: {
          navigation: true, // allow date navigation by arrow keys
          touch: true // false will disable keyboard on mobile devices
        },
        rtl: false,
        enableOnReadonly: true, // If false the datepicker will not show on a readonly datepicker field
        showOnFocus: true, // If false, the datepicker will be prevented from showing when the input field associated with it receives focus
        label: {
          title: undefined // string that will appear on top of the datepicker. Some templates do not have a position for title.
        },

        //-----------------
        // view types:
        //    days | months | years | decades | centuries
        view: {
          start: 'days', // The view that the datepicker should show when it is opened
          min: 'days', // Set a minimum limit for the view mode
          max: 'centuries', // Set a maximum limit for the view mode
          disabled: [], // Any view disabled will be skipped on #changeView
          modes: [{
            cssClass: ClassName.DAYS,
            navStep: 1
          }, {
            cssClass: ClassName.MONTHS,
            navStep: 1
          }, {
            cssClass: ClassName.YEARS,
            navStep: 10
          }, {
            cssClass: ClassName.DECADES,
            navStep: 100
          }, {
            cssClass: ClassName.CENTURIES,
            navStep: 1000
          }]
        },

        week: {
          start: 0 // Day of the week start. 0 (Sunday) to 6 (Saturday)
          // end is calculated based on start
        },
        // format: // pass in a momentjs compatible format, or it will default to L based on locale
        date: {
          //start: default: beginning of time - The earliest date that may be selected all earlier dates will be disabled.
          //end:  default: end of time - The latest date that may be selected all later dates will be disabled
          disabled: [], // Single or Array of disabled dates - can be string or moment
          //'default': // default is today - can be a string or a moment

          toggle: false, // If true, selecting the currently active date will unset the respective date (same as multi-date behavior)

          // -----------
          // multi-dates
          count: 1, // // 2 or more will enable multidate picking. Each date in month view acts as a toggle button, keeping track of which dates the user has selected in order. If a number is given, the picker will limit how many dates can be selected to that number, dropping the oldest dates from the list when the number is exceeded. true equates to no limit. The input’s value (if present) is set to a string generated by joining the dates, formatted, with multidate.separator
          separator: ',' // Separator for multiple dates when generating the input value
        },
        daysOfWeek: {
          // Values are 0 (Sunday) to 6 (Saturday)
          disabled: [], // Days of the week that should be disabled. Example: disable weekends: [0,6]
          highlighted: [] // Days of the week that should be highlighted. Example: highlight weekends: [0,6].
        },

        // Popper.js options - see https://popper.js.org/
        popper: {
          // any popper.js options are valid here and will be passed to that component
          // placement: 'right',
          placement: 'bottom-start',
          // flipBehavior: ['bottom-start', 'top-start'],
          removeOnDestroy: true
        },

        //template: undefined, // if undefined - will use new BaseTemplate().createTemplate()

        // -------------------
        // callbacks  TODO: better way to do this?

        /*
         A function that takes a date as a parameter and returns one of the following values:
          - undefined to have no effect
         - An object with the following properties:
         disabled: A Boolean, indicating whether or not this date is disabled
         classes: A String representing additional CSS classes to apply to the date’s cell
         tooltip: A tooltip to apply to this date, via the title HTML attribute
         */
        beforeShowDay: undefined,
        beforeShowMonth: undefined,
        beforeShowYear: undefined,
        beforeShowDecade: undefined,
        beforeShowCentury: undefined
      };

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       * TODO: break this into components - ConfigurationManager(? not sure on this one), DateManager, EventManager, Renderer?
       */

      var Datepicker = function (_Base) {
        babelHelpers.inherits(Datepicker, _Base);

        function Datepicker($element) {
          babelHelpers.classCallCheck(this, Datepicker);

          for (var _len = arguments.length, configs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            configs[_key - 1] = arguments[_key];
          }

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Datepicker).call(this, Default, Preset.resolve.apply(Preset, configs)));

          _this.$element = $element;
          _this.shown = false;
          _this.dates = null; //new DateArray() no need to init, #update will init initial round

          // get our own utc instance and configure the locale
          _this.moment = _this.newMoment();

          // disallow updates during setup, call after
          _this.allowUpdate = false;

          // normalize options that are flexible
          _this.normalizeConfig();

          //
          _this.view = _this.config.view.start;

          // inline datepicker if target is a div
          if (_this.$element.is('div')) {
            _this.isInline = true;
          }
          // find the $input right now
          else if (_this.$element.is('input')) {
              _this.$input = _this.$element;
            } else {
              throw new Error('Target element[' + _this.$element[0].localName + '] is neither a div(inline) nor an input.');
            }

          // FIXME: data-datepicker-toggle='#input-id' or whatever pattern bootstrap uses for toggle - `click: () => this.show()` instead of old `component` or add-on

          // initialize the renderer and create the $picker element
          _this.renderer = new Renderer(_this);

          // initialize the EventManager
          _this.eventManager = new EventManager(_this);

          // turn back on updates
          _this.allowUpdate = true;
          _this.update();
          _this.showView();

          if (_this.isInline) {
            _this.show();
          }
          return _this;
        }

        babelHelpers.createClass(Datepicker, [{
          key: 'dispose',
          value: function dispose() {
            var dataKey = arguments.length <= 0 || arguments[0] === undefined ? Data.KEY : arguments[0];

            this.hide();
            this.eventManager.dispose();
            this.renderer.dispose();
            this.eventManager = undefined;
            this.renderer = undefined;
            this.popper = undefined;
            babelHelpers.get(Object.getPrototypeOf(Datepicker.prototype), 'dispose', this).call(this, dataKey);
          }

          /**
           * @returns a new UTC moment configured with the locale
           */

        }, {
          key: 'newMoment',
          value: function newMoment() {
            var m = null;

            if (arguments.length < 1) {
              // if no args, use the current date/time (cannot pass in null otherwise time is zeroed)
              m = require$$0$1();
            } else {
              m = require$$0$1.apply(undefined, arguments);
            }

            m.utc();
            m.locale(this.config.lang);
            return m;
          }

          /**
           * @returns - array of UTC moments selected
           */

        }, {
          key: 'getDates',
          value: function getDates() {

            // Depending on the show/hide state when called, this.dates may or may not be populated.
            //  Use it if populated (i.e. initial #update before show), not based on #isShowing
            return (this.dates ? this.dates.array : undefined) || this.parseDateArrayFromInput();
          }

          /**
           * Determine the viewDate and constrain by the configuration - no side effects
           *
           * NOTE: this.viewDate is null after hidden, and this methoud is used by #update to redetermine a new value.
           *        The result of this method is explicitly not cached, if you want the cached value during a normal
           *        internal operation, you should be using the `this.viewDate` set by #update
           * @param fallbackToDefaults - resolve the date first, if not found, fallback to the default config.date.start
           * @returns - the latest UTC moment selected
           */

        }, {
          key: 'getDate',
          value: function getDate() {
            var fallbackToDefaults = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            // Depending on the show/hide state when called, this.dates may or may not be populated.
            //  Use it if populated (i.e. initial #update before show), not based on #isShowing
            var dateArray = this.getDates();
            if (dateArray.length) {
              // return the last date in the array (go backwards 1 index)
              return dateArray.slice(-1)[0].clone();
            }

            // if not found above and not to be resolved by defaults, null
            if (!fallbackToDefaults) {
              return null;
            }

            // resolve based on the defaults
            if (this.viewDate < this.config.date.start) {
              return this.config.date.start.clone();
            } else if (this.viewDate > this.config.date.end) {
              return this.config.date.end.clone();
            } else {
              return this.config.date.default.clone();
            }
          }
        }, {
          key: 'updateMultidateOrToggle',
          value: function updateMultidateOrToggle(viewDate) {

            // if multidate is not enabled && and toggle is not true, just update and get out.
            if (this.config.date.count < 2 && this.config.date.toggle !== true) {
              this.update(viewDate);
              return;
            }

            // If nothing passed in, we are clearing all dates
            if (!viewDate) {
              this.update(null);
              return;
            }

            //------------
            // Multidate enabled
            //------------

            // We need to operate on a temporary date array, passed to update
            var newDates = this.dates.copy();

            var index = newDates.contains(viewDate);

            // first check toggle off on a date
            if (index !== -1) {
              newDates.remove(index);
            }
            // if not a toggle, it's a new date
            else {
                newDates.push(viewDate);
              }

            // constrain the date count by the limit, removing the first
            while (newDates.length() > this.config.date.count) {
              newDates.remove(0);
            }

            // finally call update with the new dates
            if (newDates.length() === 0) {
              // if length is 0, pass null to reset the internal dates, otherwise it will look at/parse input
              this.update(null);
            } else {
              this.update.apply(this, babelHelpers.toConsumableArray(newDates.array));
            }
          }

          /**
           * Any call stack resulting here means that we are selecting a new date (or dates) and re-rendering.
           *
           *
           * @param momentsOrStrings - one or more - String|moment - optional.  null will clear dates, nothing or empty will resolve dates.
           * @returns {Datepicker}
           */

        }, {
          key: 'update',
          value: function update() {
            if (!this.allowUpdate) {
              return this;
            }

            // parse dates and get out if there is no diff
            var newDates = this.configureNewDateArray.apply(this, arguments);
            if (newDates.isSame(this.dates)) {
              this.debug('no update needed, dates are the same');
              return;
            }

            // there is a change
            this.dates = newDates;

            // resolve the new viewDate constrained by the configuration
            this.viewDate = this.getDate(true);

            // set the input value
            this.$input.val(this.getDateFormatted());

            // re-render the element
            this.renderer.render();

            // fire the date change
            this.eventManager.trigger(Event.DATE_CHANGE);

            // fire change on the input to be sure other plugins see it (i.e. validation)
            this.$input.change();

            // If on the day view && autoclose is enabled - hide
            if (this.view === View.DAYS && this.config.autoclose) {
              this.hide();
            }

            return this;
          }

          /**
           * Sets a new lower date limit on the datepicker.
           * Omit (or provide an otherwise falsey value) to unset the limit.
           * @param dateStart
           * @returns {Datepicker}
           */

        }, {
          key: 'setDateStart',
          value: function setDateStart(dateStart) {
            if (dateStart) {
              // verify/reparse
              this.config.date.start = this.parseDate(dateStart);
            } else {
              // default to beginning of time
              this.config.date.start = this.startOfAllTime();
            }
            // called from #normalizeConfig
            this.update();
            return this;
          }

          /**
           * Sets a new upper date limit on the datepicker.
           * Omit (or provide an otherwise falsey value) to unset the limit.
           * @param dateEnd
           * @returns {Datepicker}
           */

        }, {
          key: 'setDateEnd',
          value: function setDateEnd(dateEnd) {

            if (dateEnd) {
              // verify/reparse
              this.config.date.end = this.parseDate(dateEnd);
            } else {
              // default to beginning of time
              this.config.date.end = this.endOfAllTime();
            }
            // called from #normalizeConfig
            this.update();
            return this;
          }

          /**
           * Sets the days that should be disabled
           * Omit (or provide an otherwise falsey value) to unset.
           * @param dates - String|Moment|Array of String|Moment
           * @returns {Datepicker}
           */

        }, {
          key: 'setDatesDisabled',
          value: function setDatesDisabled(dates) {
            var dateArray = dates;
            // Disabled dates
            if (!Array.isArray(dateArray)) {
              dateArray = [dateArray];
            }

            var newDisabled = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = dateArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var d = _step.value;

                newDisabled.push(this.parseDate(d));
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            this.config.date.disabled = newDisabled;
            // called from #normalizeConfig
            this.update();
            return this;
          }

          /**
           * Sets the days of week that should be disabled.  See config.daysOfWeek.disabled
           * Omit (or provide an otherwise falsey value) to unset.
           * @param days
           * @returns {Datepicker}
           */

        }, {
          key: 'setDaysOfWeekDisabled',
          value: function setDaysOfWeekDisabled(days) {
            this.config.daysOfWeek.disabled = days;
            this.normalizeConfig();
            this.update();
            return this;
          }

          /**
           * Sets the days of week that should be highlighted. See config.daysOfWeek.highlighted
           * Omit (or provide an otherwise falsey value) to unset.
           * @param days
           * @returns {Datepicker}
           */

        }, {
          key: 'setDaysOfWeekHighlighted',
          value: function setDaysOfWeekHighlighted(days) {
            this.config.daysOfWeek.highlighted = days;
            this.normalizeConfig();
            this.update();
            return this;
          }

          // ------------------------------------------------------------------------
          // protected

          /**
           *
           * @param range - a {DateRange} from moment-range - provide a falsey value to unset
           */

        }, {
          key: 'setRange',
          value: function setRange(range) {
            this.range = range;
            this.renderer.render();
          }

          // ------------------------------------------------------------------------
          // private

          /**
           * Change view given the direction.  If past the bottom, it will #hide
           * @param direction
           */

        }, {
          key: 'changeView',
          value: function changeView(direction) {
            if (direction < 0 && this.view === View.DAYS) {
              this.hide();
            } else {
              var nextView = this.boundedView(this.view + direction);
              if (this.config.view.disabled.includes(nextView)) {

                // determine general direction
                var skipDisabledDirection = direction < 1 ? -1 : 1;
                this.changeView(direction + skipDisabledDirection);
              } else {
                this.showView(nextView);
              }
            }
          }

          /**
           * Get a view within the bounds of min/max
           * @param view
           * @returns {number}
           */

        }, {
          key: 'boundedView',
          value: function boundedView(view) {
            return Math.max(this.config.view.min, Math.min(this.config.view.max, view));
          }

          /**
           * Show a specific view by id.
           * @param viewId
           */

        }, {
          key: 'showView',
          value: function showView() {
            var viewId = arguments.length <= 0 || arguments[0] === undefined ? this.view : arguments[0];

            this.view = viewId;
            this.renderer.showView(this.view);
          }

          /**
           *
           * @param date - start date
           * @param dir - direction/number of units
           * @param unit - day|month|year etc to use with moment#add
           * @returns {*}
           */

        }, {
          key: 'moveAvailableDate',
          value: function moveAvailableDate(date, dir, unit) {
            var m = date.clone();
            do {
              m = m.add(dir, unit);

              if (!this.boundedDate(m)) return false;

              unit = Unit.DAY;
            } while (this.dateIsDisabled(m));

            return m;
          }
        }, {
          key: 'isShowing',
          value: function isShowing() {
            return this.shown;
          }

          //

        }, {
          key: 'show',
          value: function show() {
            if (this.isInline || this.isShowing()) {
              return;
            }

            if (this.$input.attr('readonly') && this.config.enableOnReadonly === false) {
              return;
            }

            // re-read the dates to populate internal state
            this.update();

            // popper
            this.popper = new Popper(this.$element, { contentType: 'node', content: this.renderer.$picker }, extend({}, true, { boundariesElement: this.$element }, this.config.popper));
            this.shown = true;
            this.eventManager.onShown();
            return this;
          }
        }, {
          key: 'hide',
          value: function hide() {
            if (this.isInline || !this.isShowing()) {
              return this;
            }

            // on hide, always do the same resets
            this.viewDate = this.dates = null;

            // popper
            this.popper.destroy();
            this.popper = undefined;
            this.shown = false;

            this.eventManager.onHidden();

            // reset the view
            this.showView(this.config.view.start);

            return this;
          }
        }, {
          key: 'normalizeConfig',
          value: function normalizeConfig() {
            // disallow updates - must call #update after
            var originalAllowUpdate = this.allowUpdate;
            this.allowUpdate = false;

            // Normalize views as view-type integers
            this.config.view.start = this.resolveViewType(this.config.view.start);
            this.config.view.min = this.resolveViewType(this.config.view.min);
            this.config.view.max = this.resolveViewType(this.config.view.max); // default to years (slightly different than other view resolution)
            var disabledViews = this.config.view.disabled;
            if (!Array.isArray(disabledViews)) {
              disabledViews = [disabledViews];
            }
            this.config.view.disabled = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = disabledViews[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var disabledView = _step2.value;

                this.config.view.disabled.push(this.resolveViewType(disabledView));
              }

              // Check that the start view is between min and max
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            this.config.view.start = Math.min(this.config.view.start, this.config.view.max);
            this.config.view.start = Math.max(this.config.view.start, this.config.view.min);

            // Week
            this.config.week.start %= 7;
            this.config.week.end = (this.config.week.start + 6) % 7;

            // Format - setup the format or default to a momentjs format
            this.config.format = this.config.format || this.moment.localeData().longDateFormat('L');

            // Start/End or Min/max dates
            this.setDateStart(this.config.date.start);
            this.setDateEnd(this.config.date.end);
            this.setDatesDisabled(this.config.date.disabled);

            // Default date - if unspecified, it is now
            this.config.date.default = this.parseDate(this.config.date.default || this.moment.clone());

            // restore allowUpdate
            this.allowUpdate = originalAllowUpdate;
          }
        }, {
          key: 'formatDate',
          value: function formatDate(mom) {
            var format = arguments.length <= 1 || arguments[1] === undefined ? this.config.format : arguments[1];

            return mom.format(format);
          }
        }, {
          key: 'parseDates',
          value: function parseDates() {
            //if(!dates || dates.length < 1){
            //  return []
            //}

            var results = [];

            for (var _len2 = arguments.length, dates = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              dates[_key2] = arguments[_key2];
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = dates[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var date = _step3.value;

                if (date) {
                  results.push(this.parseDate(date));
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            return results;
          }
        }, {
          key: 'parseDate',
          value: function parseDate(value) {
            var format = arguments.length <= 1 || arguments[1] === undefined ? this.config.format : arguments[1];

            // @see http://momentjs.com/docs/#/parsing/

            // return any current moment
            if (require$$0$1.isMoment(value)) {
              if (!value.isValid()) {
                this.throwError('Invalid moment: ' + value + ' provided.');
              }

              return this.newMoment(value);
            } else if (typeof value === "string") {
              // parse with locale and strictness
              var m = require$$0$1(value, format, this.config.lang, true);

              if (!m.isValid()) {
                this.throwError('Invalid moment: ' + value + ' for format: ' + format + ' and locale: ' + this.config.lang);
              }

              return m;
            } else {
              this.throwError('Unknown value type ' + (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) + ' for value: ' + this.dump(value));
            }
          }
        }, {
          key: 'shouldBeHighlighted',
          value: function shouldBeHighlighted(date) {
            return $.inArray(date.day(), this.config.daysOfWeek.highlighted) !== -1;
          }
        }, {
          key: 'weekOfDateIsDisabled',
          value: function weekOfDateIsDisabled(date) {
            return $.inArray(date.day(), this.config.daysOfWeek.disabled) !== -1;
          }
        }, {
          key: 'dateIsDisabled',
          value: function dateIsDisabled(date) {
            return this.weekOfDateIsDisabled(date) || $.grep(this.config.date.disabled, function (d) {
              return date.isSame(d, Unit.DAY);
            }).length > 0;
          }
        }, {
          key: 'boundedDate',
          value: function boundedDate(date) {
            return date.isSameOrAfter(this.config.date.start) && date.isSameOrBefore(this.config.date.end);
          }
        }, {
          key: 'boundedDates',
          value: function boundedDates() {
            var _this2 = this;

            for (var _len3 = arguments.length, dates = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              dates[_key3] = arguments[_key3];
            }

            return $.grep(dates, function (date) {
              return !_this2.boundedDate(date) || !date;
            }, true);
          }
        }, {
          key: 'startOfDay',
          value: function startOfDay() {
            var moment = arguments.length <= 0 || arguments[0] === undefined ? this.moment : arguments[0];

            return moment.clone().startOf(Unit.DAY);
          }
        }, {
          key: 'startOfAllTime',
          value: function startOfAllTime() {
            var moment = arguments.length <= 0 || arguments[0] === undefined ? this.moment : arguments[0];

            return moment.clone().startOf(Unit.YEAR).year(0);
          }
        }, {
          key: 'endOfAllTime',
          value: function endOfAllTime() {
            var moment = arguments.length <= 0 || arguments[0] === undefined ? this.moment : arguments[0];

            return moment.clone().endOf(Unit.YEAR).year(9999); // ?? better value to set for this?
          }
        }, {
          key: 'resolveViewType',
          value: function resolveViewType(view) {
            if (typeof view === 'string') {
              var value = null;
              switch (view) {
                case 'days':
                  value = View.DAYS;
                  break;
                case 'months':
                  value = View.MONTHS;
                  break;
                case 'years':
                  value = View.YEARS;
                  break;
                case 'decades':
                  value = View.DECADES;
                  break;
                case 'centuries':
                  value = View.CENTURIES;
                  break;
                default:
                  throw new Error('Unknown view type \'' + view + '\'. Try one of: days | months | years | decades | centuries');
              }
              return value;
            } else {
              return view;
            }
          }
        }, {
          key: 'clearDates',
          value: function clearDates() {
            this.update(null);
          }
        }, {
          key: 'getDateFormatted',
          value: function getDateFormatted() {
            var format = arguments.length <= 0 || arguments[0] === undefined ? this.config.format : arguments[0];

            return this.dates.formattedArray(format).join(this.config.date.separator);
          }

          /**
           * resolve a new {DateArray}
           *
           * @param dates
           * @returns {DateArray}
           */

        }, {
          key: 'configureNewDateArray',
          value: function configureNewDateArray() {
            if (arguments.length > 0) {
              var newDatesArray = this.parseDates.apply(this, arguments);
              newDatesArray = this.boundedDates.apply(this, babelHelpers.toConsumableArray(newDatesArray));
              return new (Function.prototype.bind.apply(DateArray, [null].concat(babelHelpers.toConsumableArray(newDatesArray))))();
            } else {
              return new (Function.prototype.bind.apply(DateArray, [null].concat(babelHelpers.toConsumableArray(this.parseDateArrayFromInput()))))();
              // already checks dates inside #parseDatesFromInput
            }
          }

          /**
           * @returns - array of UTC moments
           */

        }, {
          key: 'parseDateArrayFromInput',
          value: function parseDateArrayFromInput() {
            var value = this.$input.val();
            var dates = void 0;

            if (value && this.config.date.count > 1) {
              dates = value.split(this.config.date.separator);
            } else {
              dates = [value];
            }
            dates = this.parseDates.apply(this, babelHelpers.toConsumableArray(dates));
            dates = this.boundedDates.apply(this, babelHelpers.toConsumableArray(dates));
            return dates;
          }

          // ------------------------------------------------------------------------
          // static

        }], [{
          key: '_jQueryInterface',
          value: function _jQueryInterface(config) {
            //let methodResult = undefined
            return this.each(function () {
              var $element = $(this);
              var data = $element.data(Data.KEY);
              // Options priority: js args, data-attrs
              var _config = $.extend({}, $element.data(), (typeof config === 'undefined' ? 'undefined' : babelHelpers.typeof(config)) === 'object' && config // config could be a string method name.
              );

              // instantiate a Datepicker or a DateRangePicker
              if (!data) {
                // FIXME: I really think this should be encapsulated in DateRangePicker, and not here.
                if ($element.hasClass('input-daterange') || _config.inputs) {
                  data = new DateRangePicker($element, $.extend(_config, { inputs: _config.inputs || $element.find('input').toArray() }));
                } else {
                  data = new Datepicker($element, _config);
                }
                $element.data(Data.KEY, data);
              }

              // call public methods jquery style
              if (typeof config === 'string') {
                if (data[config] === undefined) {
                  throw new Error('No method named "' + config + '"');
                }
                //methodResult =
                data[config]();
              }
            });

            //if (methodResult !== undefined) {
            //  // return method result if there is one
            //  return methodResult
            //}
            //else {
            //  // return the element
            //  return this
            //}
          }
        }]);
        return Datepicker;
      }(Base);

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */


      $(document).on(Event.CLICK_DATA_API, Selector.DATA_PROVIDE, function (event) {
        event.preventDefault();
        Datepicker._jQueryInterface.call(this, 'show');
      });

      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */
      $.fn[JQUERY_NAME] = Datepicker._jQueryInterface;
      $.fn[JQUERY_NAME].Constructor = Datepicker;
      $.fn[JQUERY_NAME].noConflict = function () {
        $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
        return Datepicker._jQueryInterface;
      };

      return Datepicker;
    }(jQuery);

    exports.Datepicker = Datepicker;
    exports.BS3Template = BS4Template;
    exports.BS4Template = BS4Template;
    exports.BMD4Template = BMD4Template;
    exports.StringTemplate = BS4Template$1;

}((this.picker = this.picker || {})));
//# sourceMappingURL=picker.iife.js.map