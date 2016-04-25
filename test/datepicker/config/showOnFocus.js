import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD, MM_DD_YYYY} from '../../support'
import {Selector, ClassName} from '../../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('showOnFocus', () => {
    it('default should show', () => {
      $input.datepicker({})
      let dp = assertData()
      expect(dp.config.showOnFocus, `config.showOnFocus`).to.equal(true)

      $input.focus()

      assertVisible(Selector.POPPER)
    })

    it('false should remain hidden', () => {
      $input.datepicker({showOnFocus: false})
      let dp = assertData()
      expect(dp.config.showOnFocus, `config.showOnFocus`).to.equal(false)

      $input.focus()

      assertNotFound(Selector.POPPER)
    })
  })
})

