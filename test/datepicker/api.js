import {$, $input, safeDispose, fromData, assertData, findPopper, assertNotFound, assertVisible, assertHidden, assertDatesEqual} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  let dp
  beforeEach(() => {
    expect($input.length).to.equal(1)
    assertData(true)
    $input.datepicker()
    dp = assertData()
  })

  afterEach(() => {
    safeDispose()
  })

  describe('#api', () => {
    it('should show and hide', () => {
      assertNotFound(Selector.POPPER)
      expect(dp.show()).to.equal(dp) // chainable
      assertVisible(Selector.POPPER)
      expect(dp.hide()).to.equal(dp) // chainable
      assertNotFound(Selector.POPPER)
    })
  })
})
