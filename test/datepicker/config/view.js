import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD} from '../../support'
import {Selector, ClassName} from '../../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

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

