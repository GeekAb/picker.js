import {
  $,
  $input,
  safeDispose,
  fromData,
  assertData,
  assertText,
  findPopper,
  findToday,
  findActiveDay,
  assertNotFound,
  assertVisible,
  assertHidden,
  assertDatesEqual,
  findDayOfMonth,
  prepare,
  YYYY_MM_DD,
  MM_DD_YYYY
} from '../../support'
import {Selector, ClassName, Data} from '../../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('daysOfWeek', () => {

    describe('disabled', () => {
      it(`should be marked with a class`, () => {
        $input.val(`10/26/2012`).datepicker({
          daysOfWeek: {disabled: [1, 5]}
        })

        assertData().show()
        expect(findDayOfMonth('22')).to.have.class(ClassName.DISABLED)
        expect(findDayOfMonth('24')).not.to.have.class(ClassName.DISABLED)
        expect(findDayOfMonth('26')).to.have.class(ClassName.DISABLED)
      })
    })


    it(`highlighted`, () => {
      it(`should be marked with a class`, () => {
        $input.val(`10/26/2012`).datepicker({
          daysOfWeek: {highlighted: [1, 5]}
        })

        assertData().show()
        expect(findDayOfMonth('22')).to.have.class(ClassName.HIGHLIGHTED)
        expect(findDayOfMonth('24')).not.to.have.class(ClassName.HIGHLIGHTED)
        expect(findDayOfMonth('26')).to.have.class(ClassName.HIGHLIGHTED)
      })
    })
  })
})
