import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('configuration', () => {
    describe('format', () => {
      it('should set default from momentjs locale', () => {
        $input.datepicker()
        let dp = assertData()
        expect(dp.config.format, `config.format`).to.equal(moment().localeData().longDateFormat('L'))
      })

      it('can be set in constructor', () => {
        const FORMAT = 'DD-MM-YYYY'
        $input.datepicker({format: FORMAT})
        let dp = assertData()
        expect(dp.config.format, `config.format`).to.equal(FORMAT)
      })
    })

    describe('autoclose', () => {
      it('should autoclose after day click', () => {
        const FORMAT = 'MM/DD/YYYY'
        $input.val('03/05/2012').datepicker({
          autoclose: true,
          format: FORMAT
        })
        let dp = assertData()
        expect(dp.config.autoclose, `config.autoclose`).to.equal(true)

        dp.show()
        let $day = findDayOfMonth('21')
        $day.click()

        assertNotFound(Selector.POPPER)
        assertDatesEqual(dp.getDate(), moment('03/21/2012', FORMAT))
      })
    })
  })
})

