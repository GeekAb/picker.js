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
    describe('visibilty', () => {
      it('should show and hide', () => {
        assertNotFound(Selector.POPPER)
        expect(dp.show()).to.equal(dp) // chainable
        assertVisible(Selector.POPPER)
        expect(dp.isShowing()).to.equal(true)
        expect(dp.hide()).to.equal(dp) // chainable
        assertNotFound(Selector.POPPER)
        expect(dp.isShowing()).to.equal(false)
      })

      it('should show on input.focus() and hide on body mousedown', () => {
        assertNotFound(Selector.POPPER)
        $input.focus()
        assertVisible(Selector.POPPER)
        expect(dp.isShowing()).to.equal(true)
        $('body').mousedown()
        assertNotFound(Selector.POPPER)
        expect(dp.isShowing()).to.equal(false)
      })
    })
  })
})
