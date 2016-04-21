import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('clear', () => {
    describe('button', () => {

      it(`should not show by default`, () => {
        $input.datepicker()
        assertData().show()
        assertVisible(Selector.DAYS)
        assertHidden(`${Selector.DAYS} tfoot ${Selector.CLEAR}`)
      })


      it(`should show when enabled`, () => {
        $input.datepicker({
          clear: {button: true}
        })
        assertData().show()
        assertVisible(Selector.DAYS)
        assertVisible(`${Selector.DAYS} tfoot ${Selector.CLEAR}`)

        $(`${Selector.DAYS} thead th${Selector.SWITCH}`).click()
        assertVisible(Selector.MONTHS)
        assertVisible(`${Selector.MONTHS} tfoot ${Selector.CLEAR}`)

        $(`${Selector.MONTHS} thead th${Selector.SWITCH}`).click()
        assertVisible(Selector.YEARS)
        assertVisible(`${Selector.YEARS} tfoot ${Selector.CLEAR}`)
      })

      it(`should clear the input value`, () => {
        $input.val(`2012-03-05`)
          .datepicker({
            format: YYYY_MM_DD,
            clear: {button: true}
          })

        let dp = assertData()
        dp.show()
        assertVisible(Selector.DAYS)
        let $button = assertVisible(`${Selector.DAYS} tfoot ${Selector.CLEAR}`)
        $button.click()

        assertText('input', '')
        //let today = moment()
        //assertDatesEqual(dp.getDate(), today, 'day')
        expect(dp.getDate()).to.be.null
      })
    })
  })
})

