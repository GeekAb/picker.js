import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, findMonth, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD, MM_DD_YYYY} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('callbacks', () => {
    describe('beforeShowDay', () => {
      it('should use', () => {
        const beforeShowDay = (mom) => {
          switch (mom.get('date')) {
            case 25:
              return {
                tooltip: `Example tooltip`,
                classes: `active`
              }
            case 26:
              return {classes: `test26`}
            case 27:
              return {selectable: false, classes: `test27`}
            case 28:
              return {selectable: false}
          }
        }

        $input.val('10/26/2012').datepicker({
          beforeShowDay: beforeShowDay
        })

        let dp = assertData()
        expect(dp.config.beforeShowDay).to.equal(beforeShowDay)

        dp.show()

        expect(findDayOfMonth('25'), `25th has tooltip`).to.have.attr(`title`, `Example tooltip`)
        expect(findDayOfMonth('25')).not.to.have.class(ClassName.DISABLED)

        expect(findDayOfMonth('26')).to.have.class(`test26`)
        expect(findDayOfMonth('26')).not.to.have.class(ClassName.DISABLED)

        expect(findDayOfMonth('27')).to.have.class(`test27`)
        expect(findDayOfMonth('27')).to.have.class(ClassName.DISABLED)

        expect(findDayOfMonth('28')).to.have.class(ClassName.DISABLED)

        expect(findDayOfMonth('29')).not.to.have.class(ClassName.DISABLED)
      })
    })

    describe('beforeShowMonth', () => {

      it(`should use`, () => {

        const beforeShowMonth = (mom) => {


          let month = mom.month()
          switch (month) {
            case 0:
              return {
                tooltip: `Example tooltip`,
                classes: `active`
              }
            case 2:
              return {classes: `testMarch`}
            case 4:
              return {selectable: false, classes: `testMay`}
            case 5:
              return {selectable: false}
          }
        }

        $input.val('10/26/2012').datepicker({
          beforeShowMonth: beforeShowMonth
        })

        let dp = assertData()
        expect(dp.config.beforeShowMonth).to.equal(beforeShowMonth)

        dp.show()

        expect(findMonth('Jan'), `1st has tooltip`).to.have.attr(`title`, `Example tooltip`)
        expect(findMonth('Jan')).not.to.have.class(ClassName.DISABLED)

        expect(findMonth('Mar')).to.have.class(`testMarch`)
        expect(findMonth('Mar')).not.to.have.class(ClassName.DISABLED)

        expect(findMonth('May')).to.have.class(`testMay`)
        expect(findMonth('May')).to.have.class(ClassName.DISABLED)

        expect(findMonth('Jun')).to.have.class(ClassName.DISABLED)

        expect(findMonth('Jul')).not.to.have.class(ClassName.DISABLED)
      })
    })
  })
})
