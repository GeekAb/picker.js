import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('today', () => {
    describe('button', () => {

      it(`should not show by default`, () => {
        $input.datepicker()
        assertData().show()
        assertVisible(Selector.DAYS)
        assertHidden(`${Selector.DAYS} tfoot ${Selector.TODAY}`)
      })


      it(`should show when enabled`, () => {
        $input.datepicker({
          today: {button: true}
        })
        assertData().show()
        assertVisible(Selector.DAYS)
        assertVisible(`${Selector.DAYS} tfoot ${Selector.TODAY}`)

        $(`${Selector.DAYS} thead th${Selector.SWITCH}`).click()
        assertVisible(Selector.MONTHS)
        assertVisible(`${Selector.MONTHS} tfoot ${Selector.TODAY}`)

        $(`${Selector.MONTHS} thead th${Selector.SWITCH}`).click()
        assertVisible(Selector.YEARS)
        assertVisible(`${Selector.YEARS} tfoot ${Selector.TODAY}`)
      })

      it(`should move to today's date`, () => {
        $input.val(`2012-03-05`)
          .datepicker({
            format: YYYY_MM_DD,
            today: {button: true}
          })

        let dp = assertData()
        dp.show()
        assertVisible(Selector.DAYS)
        let $button = assertVisible(`${Selector.DAYS} tfoot ${Selector.TODAY}`)

        $button.click()

        let today = moment()
        assertDatesEqual(dp.getDate(), today, 'day')
      })
    })

    describe('classes', () => {
      it(`no date specified should have 'today focused'`, () => {
        $input.datepicker()

        assertData().show()
        assertVisible(Selector.DAYS)

        let $today = findToday()
        expect($today).to.have.class(ClassName.TODAY)
        expect($today).to.have.class(ClassName.FOCUSED)
        expect($today).not.to.have.class(ClassName.ACTIVE)

        // use any other two digit day (just to avoid multi-matches with contains)
        let $notToday = findDayOfMonth(new String(moment().date() == 10 ? 11 : 10))
        expect($notToday).not.to.have.class(ClassName.TODAY)
        expect($notToday).not.to.have.class(ClassName.FOCUSED)
        expect($notToday).not.to.have.class(ClassName.ACTIVE)
      })

      it(`today clicked should have 'today focused active'`, () => {
        $input.datepicker()

        assertData().show()
        assertVisible(Selector.DAYS)

        findToday().click() // click re-renders, so we have to re-find it after
        let $today = findToday()
        expect($today).to.have.class(ClassName.TODAY)
        expect($today).to.have.class(ClassName.FOCUSED)
        expect($today).to.have.class(ClassName.ACTIVE)
      })
    })
  })
})

