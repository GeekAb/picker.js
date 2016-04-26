import {$, $input, safeDispose, fromData, assertData, findPopper, findFocusedDay, findDayOfMonth, findPrev, findMonth, findNext,  findYear, findDecade, findCentury, assertNotFound, assertVisible, assertHidden, assertDatesEqual, prepare, findMonthsSwitch, findYearsSwitch, findDecadesSwitch, findCenturiesSwitch, fireKey} from '../support'
import {Selector, ClassName, Data} from '../../js/constants'
import Keycodes from '../../js/util/keycodes'
import moment from 'moment'

describe('Datepicker', () => {

  afterEach(() => safeDispose())

  describe('keyboard', () => {
    let dp
    beforeEach(() => {
      prepare()
      $input.datepicker()
      dp = assertData()
      $input.focus()
    })

    describe('tab', () => {
      beforeEach(() => {
        assertVisible(Selector.POPPER)
      })
      afterEach(() => {
        assertNotFound(Selector.POPPER)
      })

      it(`tab should select today and hide`, () => {
        fireKey(Keycodes.TAB)
        assertDatesEqual(dp.getDate(), moment(), 'date')
      })

      it(`left then tab should select yesterday and hide`, () => {
        fireKey(Keycodes.LEFT)
        fireKey(Keycodes.TAB)
        assertDatesEqual(dp.getDate(), moment().subtract(1, 'days'), 'date')
      })

      it(`right then tab should select tomorrow and hide`, () => {
        fireKey(Keycodes.RIGHT)
        fireKey(Keycodes.TAB)
        assertDatesEqual(dp.getDate(), moment().add(1, 'days'), 'date')
      })

      it(`up then tab should select -7 days and hide`, () => {
        fireKey(Keycodes.UP)
        fireKey(Keycodes.TAB)
        assertDatesEqual(dp.getDate(), moment().subtract(7, 'days'), 'date')
      })

      it(`down then tab should select +7 days and hide`, () => {
        fireKey(Keycodes.DOWN)
        fireKey(Keycodes.TAB)
        assertDatesEqual(dp.getDate(), moment().add(7, 'days'), 'date')
      })
    })

    describe('enter', () => {
      beforeEach(() => {
        assertVisible(Selector.POPPER)
      })
      afterEach(() => {
        assertVisible(Selector.POPPER)
      })

      it(`enter should select today`, () => {
        fireKey(Keycodes.ENTER)
        assertDatesEqual(dp.getDate(), moment(), 'date')
      })

      it(`left then enter should select yesterday`, () => {
        fireKey(Keycodes.LEFT)
        fireKey(Keycodes.ENTER)
        assertDatesEqual(dp.getDate(), moment().subtract(1, 'days'), 'date')
      })

      it(`right then enter should select tomorrow`, () => {
        fireKey(Keycodes.RIGHT)
        fireKey(Keycodes.ENTER)
        assertDatesEqual(dp.getDate(), moment().add(1, 'days'), 'date')
      })

      it(`up then enter should select -7 days`, () => {
        fireKey(Keycodes.UP)
        fireKey(Keycodes.ENTER)
        assertDatesEqual(dp.getDate(), moment().subtract(7, 'days'), 'date')
      })

      it(`down then enter should select +7 days`, () => {
        fireKey(Keycodes.DOWN)
        fireKey(Keycodes.ENTER)
        assertDatesEqual(dp.getDate(), moment().add(7, 'days'), 'date')
      })
    })
  })
})

