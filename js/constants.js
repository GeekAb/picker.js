/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
export const NAME = 'datepicker'

export const Data = {
  KEY: `${NAME}`,
  API_KEY: '.data-api',
  MOMENT: 'moment',
  PROVIDE: 'provide'
}

export const EVENT_KEY = `.${Data.KEY}`
export const JQUERY_NAME = NAME // `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`

export const Event = {

  DATE_CHANGE: `date.change${EVENT_KEY}`,

  MONTH_CHANGE: `month.change${EVENT_KEY}`,
  YEAR_CHANGE: `year.change${EVENT_KEY}`,
  DECADE_CHANGE: `decade.change${EVENT_KEY}`,
  CENTURY_CHANGE: `century.change${EVENT_KEY}`,


  SHOW: `show${EVENT_KEY}`,
  //  SHOWN          : `shown${EVENT_KEY}`,
  HIDE: `hide${EVENT_KEY}`,
  //  HIDDEN         : `hidden${EVENT_KEY}`,
  CLICK_DATA_API: `click${EVENT_KEY}${Data.API_KEY}`
}

export const View = {
  DAYS: 0,
  MONTHS: 1,
  YEARS: 2,
  DECADES: 3,
  CENTURIES: 4
}

export const Unit = {
  // units
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  DECADE: 'decade',
  CENTURY: 'century'
}

export const ClassName = {
  NAME: NAME,
  PREV: 'prev',
  NEXT: 'next',
  DOW: `dow`,
  TODAY: `today`,
  CLEAR: `clear`,
  SELECTED: `selected`,
  HIGHLIGHTED: `highlighted`,
  DISABLED: `disabled`,
  ACTIVE: `active`,
  FOCUSED: `focused`,
  NEW: `new`,
  OLD: `old`,

  POPPER: `popper`,


  TITLE: `${NAME}-title`,
  SWITCH: `${NAME}-switch`,

  INLINE: `${NAME}-inline`,
  DROPDOWN: `${NAME}-dropdown`, // used to also have dropdown-menu
  RTL: `${NAME}-rtl`,

  DAYS: `${NAME}-days`,
  MONTHS: `${NAME}-months`,
  YEARS: `${NAME}-years`,
  DECADES: `${NAME}-decades`,
  CENTURIES: `${NAME}-centuries`,

  // range
  RANGE: 'range',
  RANGE_START: 'range-start',
  RANGE_END: 'range-end'
}

export const Selector = {
  DATA_PROVIDE: `[data-${Data.PROVIDE}="datepicker"]`,
  PREV: `.${ClassName.PREV}`,
  NEXT: `.${ClassName.NEXT}`,
  TITLE: `.${ClassName.TITLE}`,
  SWITCH: `.${ClassName.SWITCH}`,
  POPPER: `.${ClassName.POPPER}`,

  DAYS: `.${ClassName.DAYS}`,
  MONTHS: `.${ClassName.MONTHS}`,
  YEARS: `.${ClassName.YEARS}`,
  DECADES: `.${ClassName.DECADES}`,
  CENTURIES: `.${ClassName.CENTURIES}`
}


export const Visibility = {
  HIDDEN: {visibility: 'hidden'},
  VISIBLE: {visibility: 'visible'}
}
