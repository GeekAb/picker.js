/*!
  * picker.js v0.1.2 (https://github.com/alienfast/picker.js#readme)
  * Copyright 2016 Kevin Ross <kevin.ross@alienfast.com> (https://github.com/rosskevin)
  * Licensed under MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('extend'), require('stringify-object'), require('moment'), require('moment-range'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'extend', 'stringify-object', 'moment', 'moment-range', 'popper.js'], factory) :
  (factory((global.picker = global.picker || {}),global.extend,global.stringify,global.moment,global.momentRange,global.Popper));
}(this, function (exports,extend,stringify,moment,momentRange,Popper) { 'use strict';

  extend = 'default' in extend ? extend['default'] : extend;
  stringify = 'default' in stringify ? stringify['default'] : stringify;
  moment = 'default' in moment ? moment['default'] : moment;
  Popper = 'default' in Popper ? Popper['default'] : Popper;

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

        return moment.range(Moments.earliest.apply(Moments, moments), Moments.latest.apply(Moments, moments));
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
            m = moment();
          } else {
            m = moment.apply(undefined, arguments);
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
          if (moment.isMoment(value)) {
            if (!value.isValid()) {
              this.throwError('Invalid moment: ' + value + ' provided.');
            }

            return this.newMoment(value);
          } else if (typeof value === "string") {
            // parse with locale and strictness
            var m = moment(value, format, this.config.lang, true);

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

}));
//# sourceMappingURL=picker.umd.js.map