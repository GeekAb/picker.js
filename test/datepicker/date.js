import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, findActiveDay, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD, MM_DD_YYYY} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('date', () => {

    describe('toggle', () => {
      describe('disabled', () => {
        it(`clicking twice on date should leave it selected`, () => {
          const expectedValue = `03/05/2012`
          const expected = moment(expectedValue, MM_DD_YYYY)
          $input.val(expected.format(MM_DD_YYYY)).datepicker()

          let dp = assertData()
          expect(dp.config.date.toggle, `config.date.toggle`).to.equal(false)

          dp.show()

          // Initial value is selected
          assertDatesEqual(dp.getDate(), expected)

          // click on our active date
          let $activeDay = findActiveDay()
          $activeDay.click()

          // make sure it`s still set
          expect($input.val()).to.equal(expectedValue)
          assertDatesEqual(dp.getDate(), expected)
        })
      })


      describe('enabled', () => {
        it(`clicking twice on date should unselect it`, () => {
          const expectedValue = `03/05/2012`
          const expected = moment(expectedValue, MM_DD_YYYY)
          $input.val(expected.format(MM_DD_YYYY)).datepicker({date: {toggle: true}})

          let dp = assertData()
          expect(dp.config.date.toggle, `config.date.toggle`).to.equal(true)

          dp.show()

          // Initial value is selected
          assertDatesEqual(dp.getDate(), expected)
          expect($input.val()).to.equal(expectedValue)

          // click on our active date
          let $activeDay = findActiveDay()
          $activeDay.click()

          // make sure it`s still set
          expect($input.val()).to.equal('')
          assertDatesEqual(dp.getDate(), null)
        })
      })
    })

    describe('count', () => {
      it(`clicking twice on date should unselect it`, () => {
        const expectedValue = `03/05/2012`
        const expected = moment(expectedValue, MM_DD_YYYY)

        const assertInitial = () => {
          expect(dp.getDates().length).to.equal(1)

          // getDates returns array in order selected
          assertDatesEqual(dp.getDates()[0], expected)

          // getDate returns the last date selected
          assertDatesEqual(dp.getDate(), expected)

          expect($input.val()).to.equal(expectedValue)
        }

        $input.val(expected.format(MM_DD_YYYY)).datepicker({date: {count: 2}})

        let dp = assertData()
        expect(dp.config.date.count, `config.date.count`).to.equal(2)

        dp.show()

        // Initial value is selected
        assertInitial()

        // Select additional date - 14
        findDayOfMonth('14').click()

        const expectedValue14 = `03/14/2012`
        const expected14 = moment(expectedValue14, MM_DD_YYYY)

        // input value using separator
        expect($input.val()).to.equal(`${expectedValue},${expectedValue14}`)
        // getDate returns the last date selected
        assertDatesEqual(dp.getDate(), expected14)
        // getDates returns array in order selected
        assertDatesEqual(dp.getDates()[0], expected)
        assertDatesEqual(dp.getDates()[1], expected14)
        expect(dp.getDates().length).to.equal(2)

        // Unselect the additional date `14`, should be same as initial (must re-find it to trigger click again)
        findDayOfMonth('14').click()
        assertInitial()
      })
    })
  })
})
