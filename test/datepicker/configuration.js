import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, YYYY_MM_DD} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  let dp
  beforeEach(() => {
    expect($input.length).to.equal(1)
    assertData(true)
    //$input.datepicker()
    //dp = assertData()
  })

  afterEach(() => {
    safeDispose()
  })

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
      it('should autoclose', () => {
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
          assertDatesEqual(dp.viewDate, today, 'day')
          assertDatesEqual(dp.getDate(), today, 'day')
        })
      })

      describe('className', () => {
        it(`should be marked`, () => {
          $input.datepicker()

          assertData().show()
          assertVisible(Selector.DAYS)
          expect(findToday()).to.have.class(ClassName.TODAY)

          // use any other two digit day (just to avoid multi-matches with contains)
          let notToday = moment().date() == 10 ? 11 : 10
          expect(findDayOfMonth(new String(notToday))).not.to.have.class(ClassName.TODAY)
        })
      })
    })
  })
})

