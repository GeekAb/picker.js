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

    describe('view', () => {
      describe('start', () => {
        it(`should show months`, () => {
          $input.datepicker({
            view: {start: `months`}
          })

          assertData().show()
          assertHidden(Selector.DAYS)
          assertVisible(Selector.MONTHS)
          assertHidden(Selector.YEARS)
          assertHidden(Selector.DECADES)
          assertHidden(Selector.CENTURIES)
        })

        it(`should show years`, () => {
          $input.datepicker({
            view: {start: `years`}
          })

          assertData().show()
          assertHidden(Selector.DAYS)
          assertHidden(Selector.MONTHS)
          assertVisible(Selector.YEARS)
          assertHidden(Selector.DECADES)
          assertHidden(Selector.CENTURIES)
        })

        it(`should show decades`, () => {
          $input.datepicker({
            view: {start: `decades`}
          })

          assertData().show()
          assertHidden(Selector.DAYS)
          assertHidden(Selector.MONTHS)
          assertHidden(Selector.YEARS)
          assertVisible(Selector.DECADES)
          assertHidden(Selector.CENTURIES)
        })

        it(`should show centuries`, () => {
          $input.datepicker({
            view: {start: `centuries`}
          })

          assertData().show()
          assertHidden(Selector.DAYS)
          assertHidden(Selector.MONTHS)
          assertHidden(Selector.YEARS)
          assertHidden(Selector.DECADES)
          assertVisible(Selector.CENTURIES)
        })
      })
    })
  })
})

