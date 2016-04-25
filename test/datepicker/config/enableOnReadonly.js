import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD, MM_DD_YYYY} from '../../support'
import {Selector, ClassName} from '../../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => {
    prepare()
    $input.prop('readonly', 'readonly')
    $input.val('03/05/2012')
  })
  afterEach(() => safeDispose())

  describe('enableOnReadonly', () => {
    it('default true should show popper', () => {
      $input.datepicker()
      let dp = assertData()
      expect(dp.config.enableOnReadonly, `config.enableOnReadonly`).to.equal(true)

      assertNotFound(Selector.POPPER)
      dp.show()
      assertVisible(Selector.POPPER)
    })

    it('false should not show popper', () => {
      $input.datepicker({enableOnReadonly: false})
      let dp = assertData()
      expect(dp.config.enableOnReadonly, `config.enableOnReadonly`).to.equal(false)

      assertNotFound(Selector.POPPER)
      dp.show()
      assertNotFound(Selector.POPPER)
    })
  })
})

