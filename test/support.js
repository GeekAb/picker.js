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

/**
 * @param dayOfMonth - string that matches your format i.e. `01`,`31` or `1`,`31`
 * @returns {*|HTMLElement}
 */
export const findDayOfMonth = (dayOfMonth, assertFound = true) => {
  let selector = `${Selector.DAYS} td:contains(${dayOfMonth})`
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

// done in the testrunner.html
//import chai from 'chai'
//export const expect = chai.expect
