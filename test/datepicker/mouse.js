import {
  $,
  $input,
  safeDispose,
  fromData,
  assertData,
  findPopper,
  findFocusedDay,
  findDayOfMonth,
  findPrev,
  findMonth,
  findNext,
  findYear,
  findDecade,
  findCentury,
  assertNotFound,
  assertVisible,
  assertHidden,
  assertDatesEqual,
  prepare,
  findMonthsSwitch,
  findYearsSwitch,
  findDecadesSwitch,
  findCenturiesSwitch
} from '../support'
import {Selector, ClassName, Data} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  afterEach(() => safeDispose())

  describe('mouse', () => {
    describe('visibility', () => {
      let dp
      beforeEach(() => {
        prepare()
        $input.datepicker()
        dp = assertData()
      })

      it('should not hide on mousedown inside popper', () => {
        assertNotFound(Selector.POPPER)
        $input.focus()
        assertVisible(Selector.DAYS).trigger(`mousedown`)
        assertVisible(Selector.POPPER) // still visible
      })

      it('should hide on body mousedown', () => {
        assertNotFound(Selector.POPPER)
        $input.focus()
        assertVisible(Selector.POPPER)
        expect(dp.isShowing()).to.equal(true)
        $('body').mousedown()
        assertNotFound(Selector.POPPER)
        expect(dp.isShowing()).to.equal(false)
      })
    })

    describe('arrows', () => {

      const expected = moment('03/05/2012')
      let dp

      it('day view', () => {
        beforeEach(() => {
          prepare()
          $input.datepicker({
            date: {default: expected}
          })

          dp = assertData()
          dp.show()
          let $focused = findFocusedDay()
          assertDatesEqual(moment($focused.data(Data.MOMENT)), expected)
        })

        it(`clicking prev should go to previous month`, () => {
          findPrev().click()

          let $day = findDayOfMonth('21')
          assertDatesEqual(moment($day.data(Data.MOMENT)), moment('02/21/2012'))
        })

        it(`clicking next should go to next month`, () => {
          findNext().click()

          let $day = findDayOfMonth('21')
          assertDatesEqual(moment($day.data(Data.MOMENT)), moment('04/21/2012'))
        })
      })

      it('year view', () => {

        beforeEach(() => {
          prepare()
          $input.datepicker({
            date: {default: expected}
          })

          dp = assertData()
          dp.show()
          let $focused = findFocusedDay()
          assertDatesEqual(moment($focused.data(Data.MOMENT)), expected)
        })

        it(`clicking prev should go to previous year`, () => {
          findPrev().click()

          let $month = findMonth('Mar')
          assertDatesEqual(moment($month.data(Data.MOMENT)), moment('03/01/2011'))
        })

        it(`clicking next should go to next year`, () => {
          findNext().click()

          let $month = findMonth('Mar')
          assertDatesEqual(moment($month.data(Data.MOMENT)), moment('03/01/2013'))
        })
      })
    })

    describe('switch', () => {
      const expected = moment('03/05/2012')
      let dp
      beforeEach(() => {
        prepare()
        $input.datepicker({
          date: {default: expected}
        })

        dp = assertData()
        dp.show()
      })

      it(`should navigate to months, years, decades, centuries, and back`, () => {
        assertVisible(Selector.DAYS)

        findMonthsSwitch().click()
        assertVisible(Selector.MONTHS)

        findYearsSwitch().click()
        assertVisible(Selector.YEARS)

        findDecadesSwitch().click()
        assertVisible(Selector.DECADES)

        findCenturiesSwitch().click()
        assertVisible(Selector.CENTURIES)

        findCentury(2800).click()
        findDecade(2810).click()
        findYear(2811).click()
        findMonth('Jan').click()
        findDayOfMonth('31').click()

        assertDatesEqual(dp.getDate(), moment('01/31/2811'))
      })
    })
  })
})

