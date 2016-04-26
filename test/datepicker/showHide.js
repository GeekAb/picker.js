import {$, $input, safeDispose, fromData, assertData, findPopper, assertNotFound, assertVisible, assertHidden, assertDatesEqual, prepare} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  let dp
  beforeEach(() => {
    prepare()
    $input.datepicker()
    dp = assertData()
  })

  afterEach(() => safeDispose())

  describe('show and hide', () => {
    it('should work', () => {
      assertNotFound(Selector.POPPER)
      expect(dp.show()).to.equal(dp) // chainable
      assertVisible(Selector.POPPER)
      expect(dp.isShowing()).to.equal(true)
      expect(dp.hide()).to.equal(dp) // chainable
      assertNotFound(Selector.POPPER)
      expect(dp.isShowing()).to.equal(false)
    })
  })
})
