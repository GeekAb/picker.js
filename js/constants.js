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

export const JQUERY_NAME = NAME // `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`

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

export const EVENT_KEY = `.${Data.KEY}`
export const CHANGE_EVENT_KEY = `.change${EVENT_KEY}`

export const Event = {
  DATE_CHANGE: `date${CHANGE_EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
  //  SHOWN          : `shown${EVENT_KEY}`,
  HIDE: `hide${EVENT_KEY}`,
  //  HIDDEN         : `hidden${EVENT_KEY}`,
  CLICK_DATA_API: `click${EVENT_KEY}${Data.API_KEY}`,

  // units
  DAY_CHANGE: `${Unit.DAY}${CHANGE_EVENT_KEY}`,
  WEEK_CHANGE: `${Unit.WEEK}${CHANGE_EVENT_KEY}`,
  MONTH_CHANGE: `${Unit.MONTH}${CHANGE_EVENT_KEY}`,
  YEAR_CHANGE: `${Unit.YEAR}${CHANGE_EVENT_KEY}`,
  DECADE_CHANGE: `${Unit.DECADE}${CHANGE_EVENT_KEY}`,
  CENTURY_CHANGE: `${Unit.CENTURY}${CHANGE_EVENT_KEY}`
}

export const ClassName = {
  NAME: NAME,
  PREV: 'prev',
  NEXT: 'next',
  DOW: `dow`,
  SELECTED: `selected`,
  HIGHLIGHTED: `highlighted`,
  DISABLED: `disabled`,
  ACTIVE: `active`,
  FOCUSED: `focused`,
  NEW: `new`,
  OLD: `old`,
  VIEW: `view`,

  // buttons
  TODAY: `today`,
  CLEAR: `clear`,
  CANCEL: `cancel`,
  OK: `ok`,

  // labels for replacement of text
  LABEL_YEAR: `label-year`,
  LABEL_DATE: `label-date`,
  LABEL_TITLE: `title`,

  POPPER: `popper`,


  SWITCH: `switch`,

  INLINE: `inline`,
  RTL: `rtl`,

  DAYS: `days`,
  MONTHS: `months`,
  YEARS: `years`,
  DECADES: `decades`,
  CENTURIES: `centuries`,

  // range
  RANGE: 'range',
  RANGE_START: 'range-start',
  RANGE_END: 'range-end'
}

export const Selector = {
  DATA_PROVIDE: `[data-${Data.PROVIDE}="${NAME}"]`,

  DATEPICKER: `.${NAME}`,

  ACTIVE: `.${ClassName.ACTIVE}`,
  FOCUSED: `.${ClassName.FOCUSED}`,
  OLD: `.${ClassName.OLD}`,
  NEW: `.${ClassName.NEW}`,

  // buttons
  TODAY: `.${ClassName.TODAY}`,
  CLEAR: `.${ClassName.CLEAR}`,
  CANCEL: `.${ClassName.CANCEL}`,
  OK: `.${ClassName.OK}`,

  // labels for replacement of text
  LABEL_YEAR: `.${ClassName.LABEL_YEAR}`,
  LABEL_DATE: `.${ClassName.LABEL_DATE}`,
  LABEL_TITLE: `.${ClassName.LABEL_TITLE}`,

  PREV: `.${ClassName.PREV}`,
  NEXT: `.${ClassName.NEXT}`,

  SWITCH: `.${ClassName.SWITCH}`,
  POPPER: `.${ClassName.POPPER}`,

  DAY: `.${Unit.DAY}`,
  MONTH: `.${Unit.MONTH}`,
  YEAR: `.${Unit.YEAR}`,

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
