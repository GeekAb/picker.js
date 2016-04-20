import {Data, Selector} from '../js/constants'

export const $ = window.jQuery
export const $input = $('input')

export const safeDispose = () => {
  try {
    $input.datepicker('dispose')
  }
  catch (error) {
    console.log(error)
    $input.data(Data.KEY, null)
  }
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
  expect($(selector).length).to.equal(0)
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

export const assertDatesEqual = (actual, expected, message = null) => {
  let msg = message
  if (msg === null) {
    msg = `${actual ? actual.format() : null} should equal ${expected ? expected.format() : null}`
  }
  expect(expected.isSame(actual), msg).to.be.true
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


// done in the testrunner.html
//import chai from 'chai'
//export const expect = chai.expect
