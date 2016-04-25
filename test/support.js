import {Data, Selector} from '../js/constants'

export const MM_DD_YYYY = 'MM/DD/YYYY'
export const YYYY_MM_DD = 'YYYY-MM-DD'

export const $ = window.jQuery
export const $input = $('input')

export const prepare = () => {
  expect($input.length).to.equal(1)
  assertData(true)
}

export const safeDispose = () => {
  try {
    $input.datepicker('dispose')
  }
  catch (error) {
    console.log(error)
    $input.data(Data.KEY, null)
  }
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

  if(expected == null){
    expect(actual, msg).to.be.null
  }
  else {
    expect(expected.isSame(actual, granularity), msg).to.be.true
  }
}

// add exact match textEquals filter to jquery (contains will get multiple days)
$.expr[':'].textEquals = function(el, i, m) {
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
export const findDayOfMonth = (dayOfMonth, assertFound = true) => {
  let selector = `${Selector.DAYS} td:not(${Selector.OLD}):not(${Selector.NEW}):textEquals(${dayOfMonth})`
  let $day = $(selector)
  if (assertFound) {
    expect($day.length, `Should find one ${selector}`).to.equal(1)
  }
  return $day
}

export const findToday = (assertFound = true) => {
  let selector = `${Selector.DAYS} td${Selector.TODAY}`
  let $today = $(selector)
  if (assertFound) {
    expect($today.length, `Should find one ${selector}`).to.equal(1)
  }
  return $today
}

export const findActiveDay = (assertFound = true) => {
  let selector = `${Selector.DAYS} ${Selector.DAY}${Selector.ACTIVE}`
  let $activeDay = $(selector)
  if (assertFound) {
    expect($activeDay.length, `Should find one ${selector}`).to.equal(1)
  }
  return $activeDay
}

export const findMonth = (month, assertFound = true) => {
  let selector = `${Selector.MONTHS} tbody td span:textEquals(${month})`
  let $month = $(selector)
  if (assertFound) {
    expect($month.length, `Should find one ${selector}`).to.equal(1)
  }
  return $month
}

export const findYear = (year, assertFound = true) => {
  let selector = `${Selector.YEARS} tbody td span:textEquals(${year})`
  let $year = $(selector)
  if (assertFound) {
    expect($year.length, `Should find one ${selector}`).to.equal(1)
  }
  return $year
}

export const findDecade = (decade, assertFound = true) => {
  let selector = `${Selector.DECADES} tbody td span:textEquals(${decade})`
  let $year = $(selector)
  if (assertFound) {
    expect($year.length, `Should find one ${selector}`).to.equal(1)
  }
  return $year
}

export const findCentury = (century, assertFound = true) => {
  let selector = `${Selector.CENTURIES} tbody td span:textEquals(${century})`
  let $year = $(selector)
  if (assertFound) {
    expect($year.length, `Should find one ${selector}`).to.equal(1)
  }
  return $year
}

// done in the testrunner.html
//import chai from 'chai'
//export const expect = chai.expect
