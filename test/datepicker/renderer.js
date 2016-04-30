import {
  $input,
  safeDispose,
  assertData,
  assertDayRows,
  findDayOfMonth,
  prepare,
  YYYY_MM_DD,
  MM_DD_YYYY
} from '../support'
import {Selector, ClassName, Data} from '../../js/constants'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('renderer', () => {

    describe('days', () => {
      describe('first row should have the 1st and last row should contain last day of the month and no more rows', () => {

        it(`04/29/2016`, () => {
          $input.val(`04/29/2016`).datepicker({})

          assertData().show()

          // first day in the first row
          findDayOfMonth('1', 1)
          findDayOfMonth('30', 5)
          assertDayRows(5)
        })

        it(`05/29/2016`, () => {
          $input.val(`05/29/2016`).datepicker({})

          assertData().show()

          // first day in the first row
          findDayOfMonth('1', 1)
          findDayOfMonth('31', 5)
          assertDayRows(5)
        })

        it(`07/29/2016`, () => {
          $input.val(`07/29/2016`).datepicker({})

          assertData().show()

          // first day in the first row
          findDayOfMonth('1', 1)
          findDayOfMonth('31', 6)
          assertDayRows(6)
        })
      })
    })
  })
})
