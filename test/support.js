import {NAME, Selector} from '../js/constants'

export const $ = window.jQuery
export const $input = $('input')

//export const fromData = 'foo'

export const fromData = () => {
  return $input.data(NAME)
}

export const assertData = (invert = false) => {
  let dp = fromData()
  if (invert) {
    expect(dp).to.be.null
  }
  else {
    expect(dp).not.to.be.null
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

// done in the testrunner.html
//import chai from 'chai'
//export const expect = chai.expect
