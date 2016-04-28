import {Data, Selector} from '../js/constants'

export const MM_DD_YYYY = 'MM/DD/YYYY'
export const YYYY_MM_DD = 'YYYY-MM-DD'

export const $ = window.jQuery
export const $input = $('input')

export const prepare = () => {
  safeDispose() // paranoia - try to make sure each test is clear to run
  expect($input.length).to.equal(1)
  assertData(true)
}

export const safeDispose = () => {
  // regardless of the state of the test, try to clean up every artifact so each test is isolated
  try {
    $input.datepicker('dispose')
  }
  catch (error) {
  }

  findPopper().remove()
  $input.data(Data.KEY, null)
  $input.val('')
  $input.removeAttr('readonly')
}

export const fromData = () => {
  return $input.data(Data.KEY)
}

export const assertData = (invert = false) => {
  let dp = fromData()
  if (invert) {
    expect((dp == null || dp == undefined), 'data').to.be.true
  }
  else {
    expect(dp, 'data').not.to.be.null
    expect(dp.config, 'dp.config').not.to.be.null
  }
  return dp
}

export const findPopper = () => {
  return $(Selector.POPPER)
}

export const assertNotFound = (selector) => {
  expect($(selector).length, selector).to.equal(0)
}

export const assertVisible = (selector) => {
  let $element = $(selector)
  expect($element, selector).to.be.visible
  return $element
}

export const assertHidden = (selector) => {
  let $element = $(selector)
  expect($element, selector).to.be.hidden
  return $element
}

export const assertText = (selector, text) => {
  let $element = $(selector)
  expect($element, selector).to.contain(text)
  return $element
}


export const assertDatesEqual = (actual, expected, granularity = 'millisecond') => {
  let msg = `${actual ? actual.format() : null} should equal ${expected ? expected.format() : null}`

  if (expected == null) {
    expect(actual, msg).to.be.null
  }
  else {
    expect(expected.isSame(actual, granularity), msg).to.be.true
  }
}

// add exact match textEquals filter to jquery (contains will get multiple days)
$.expr[':'].textEquals = function (el, i, m) {
  var searchText = m[3]
  var match = $(el).text().trim().match(`^${searchText}$`)
  return match && match.length > 0
}

/**
 * Day of month that is not `old` or `new`, but this month
 *
 * @param dayOfMonth - string that exact matches your format i.e. `01`,`31` or `1`,`31`
 * @returns {*|HTMLElement}
 */
export const findDayOfMonth = (dayOfMonth) => {
  let selector = `${Selector.DAYS} td:not(${Selector.OLD}):not(${Selector.NEW}):textEquals(${dayOfMonth})`
  return assertFound(selector)
}

export const findToday = () => {
  let selector = `${Selector.DAYS} td${Selector.TODAY}`
  return assertFound(selector)
}

export const findActiveDay = () => {
  let selector = `${Selector.DAYS} ${Selector.DAY}${Selector.ACTIVE}`
  return assertFound(selector)
}

export const findFocusedDay = () => {
  let selector = `${Selector.DAYS} ${Selector.DAY}${Selector.FOCUSED}`
  return assertFound(selector)
}

export const findMonth = (month) => {
  let selector = `${Selector.MONTHS} tbody td span:textEquals(${month})`
  return assertFound(selector)
}

export const findYear = (year) => {
  let selector = `${Selector.YEARS} tbody td span:textEquals(${year})`
  return assertFound(selector)
}

export const findDecade = (decade) => {
  let selector = `${Selector.DECADES} tbody td span:textEquals(${decade})`
  return assertFound(selector)
}

export const findCentury = (century) => {
  let selector = `${Selector.CENTURIES} tbody td span:textEquals(${century})`
  return assertFound(selector)
}

export const findPrev = () => {
  let selector = `${Selector.DAYS} th${Selector.PREV}`
  return assertFound(selector)
}
export const findNext = () => {
  let selector = `${Selector.DAYS} th${Selector.NEXT}`
  return assertFound(selector)
}

export const findMonthsSwitch = () => {
  return assertFound(`${Selector.DAYS} thead th${Selector.SWITCH}`)
}

export const findYearsSwitch = () => {
  return assertFound(`${Selector.YEARS} thead th${Selector.SWITCH}`)
}

export const findDecadesSwitch = () => {
  return assertFound(`${Selector.DECADES} thead th${Selector.SWITCH}`)
}

export const findCenturiesSwitch = () => {
  return assertFound(`${Selector.DECADES} thead th${Selector.SWITCH}`)
}

export const assertFound = (selector, count = 1) => {
  let $element = $(selector)
  if (assertFound) {
    expect($element.length, `Should find one ${selector}`).to.equal(count)
  }
  return $element
}

export const fireKey = (keycode, shiftKey = false, ctrlKey = false) => {
  $input.trigger({
    type: `keydown`,
    keyCode: keycode,
    shiftKey: shiftKey,
    ctrlKey: ctrlKey
  })
}
