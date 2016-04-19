import {DATA_KEY, Selector} from '../js/constants'

export const $ = window.jQuery
export const $input = $('input')

export const safeDispose = () => {
  try {
    $input.datepicker('dispose')
  }
  catch (error) {
    console.log(error)
    $input.data(DATA_KEY, null)
  }
}

export const fromData = () => {
  return $input.data(DATA_KEY)
}

export const assertData = (invert = false) => {
  let dp = fromData()
  if (invert) {
    expect(dp).to.be.null
  }
  else {
    expect(dp, 'dp').not.to.be.null
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

export const assertDatesEqual = (actual, expected, message) => {
  expect(expected.isSame(actual), message).to.be.true
}


// done in the testrunner.html
//import chai from 'chai'
//export const expect = chai.expect
