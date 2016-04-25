import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD, MM_DD_YYYY} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('autoclose', () => {
    it('should autoclose after day click', () => {
      $input.val('03/05/2012').datepicker({
        autoclose: true
      })
      let dp = assertData()
      expect(dp.config.autoclose, `config.autoclose`).to.equal(true)

      dp.show()
      let $day = findDayOfMonth('21')
      $day.click()

      assertNotFound(Selector.POPPER)
      assertDatesEqual(dp.getDate(), moment('03/21/2012'))
    })
  })
})

