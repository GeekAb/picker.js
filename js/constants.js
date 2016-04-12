/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
export const NAME = 'datepicker'
export const DATA_KEY = `.${NAME}`
export const EVENT_KEY = `.${DATA_KEY}`
export const DATA_API_KEY = '.data-api'
export const JQUERY_NAME = NAME // `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`

export const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]
export const Event = {
    DATE_CHANGE           : `date.change${EVENT_KEY}`,


  //  SHOW           : `show${EVENT_KEY}`,
  //  SHOWN          : `shown${EVENT_KEY}`,
  //  HIDE           : `hide${EVENT_KEY}`,
  //  HIDDEN         : `hidden${EVENT_KEY}`,
  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
}

const ClassName = {
  //IN         : 'in'
}

export const Selector = {
  DATA_PROVIDE: '[data-provide="datepicker"]'
}
