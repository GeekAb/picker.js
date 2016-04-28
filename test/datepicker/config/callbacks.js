import {
  $,
  $input,
  safeDispose,
  fromData,
  assertData,
  assertText,
  findPopper,
  findToday,
  findMonth,
  findYear,
  findDecade,
  findCentury,
  assertNotFound,
  assertVisible,
  assertHidden,
  assertDatesEqual,
  findDayOfMonth,
  prepare,
  YYYY_MM_DD,
  MM_DD_YYYY
} from '../../support'
import {Selector, ClassName} from '../../../js/constants'
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
              return {disabled: true, classes: `test27`}
            case 28:
              return {disabled: true}
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
              return {disabled: true, classes: `testMay`}
            case 5:
              return {disabled: true}
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

    describe('beforeShowYear', () => {

      it(`should use`, function () {

        const beforeShowYear = (mom) => {
          switch (mom.year()) {
            case 2013:
              return {
                tooltip: `Example tooltip`,
                classes: `active`
              }
            case 2014:
              return {classes: `test2014`}
            case 2015:
              return {disabled: true, classes: `test2015`}
            case 2016:
              return {disabled: true}
          }
        }

        $input.val('10/26/2012').datepicker({
          beforeShowYear: beforeShowYear
        })

        let dp = assertData()
        expect(dp.config.beforeShowYear).to.equal(beforeShowYear)

        dp.show()

        expect(findYear(2013)).to.have.attr(`title`, `Example tooltip`)
        expect(findYear(2013)).not.to.have.class(ClassName.DISABLED)

        expect(findYear(2014)).to.have.class(`test2014`)
        expect(findYear(2014)).not.to.have.class(ClassName.DISABLED)

        expect(findYear(2015)).to.have.class(`test2015`)
        expect(findYear(2015)).to.have.class(ClassName.DISABLED)

        expect(findYear(2016)).to.have.class(ClassName.DISABLED)

        expect(findYear(2017)).not.to.have.class(ClassName.DISABLED)
      })
    })

    describe('beforeShowDecade', () => {
      it(`should use`, () => {
        let beforeShowDecade = (mom) => {
          switch (mom.year()) {
            case 2030:
              return {
                tooltip: `Example tooltip`,
                classes: `active`
              }
            case 2040:
              return {classes: `test2040`}
            case 2050:
              return {disabled: true, classes: `test2050`}
            case 2060:
              return {disabled: true}
          }
        }

        $input.val('03/05/2012').datepicker({
          beforeShowDecade: beforeShowDecade
        })

        let dp = assertData()
        expect(dp.config.beforeShowDecade).to.equal(beforeShowDecade)

        dp.show()

        expect(findDecade(2030)).to.have.attr(`title`, `Example tooltip`)
        expect(findDecade(2030)).not.to.have.class(ClassName.DISABLED)

        expect(findDecade(2040)).to.have.class(`test2040`)
        expect(findDecade(2040)).not.to.have.class(ClassName.DISABLED)

        expect(findDecade(2050)).to.have.class(`test2050`)
        expect(findDecade(2050)).to.have.class(ClassName.DISABLED)

        expect(findDecade(2060)).to.have.class(ClassName.DISABLED)

        expect(findDecade(2070)).not.to.have.class(ClassName.DISABLED)
      })
    })

    describe('beforeShowCentury', () => {
      it(`should use`, () => {
        let beforeShowCentury = (mom) => {
          switch (mom.year()) {
            case 2300:
              return {
                tooltip: `Example tooltip`,
                classes: `active`
              }
            case 2400:
              return {classes: `test2400`}
            case 2500:
              return {disabled: true, classes: `test2500`}
            case 2600:
              return {disabled: true}
          }
        }

        $input.val('03/05/2012').datepicker({
          beforeShowCentury: beforeShowCentury
        })

        let dp = assertData()
        expect(dp.config.beforeShowCentury).to.equal(beforeShowCentury)

        dp.show()

        expect(findCentury(2300)).to.have.attr(`title`, `Example tooltip`)
        expect(findCentury(2300)).not.to.have.class(ClassName.DISABLED)

        expect(findCentury(2400)).to.have.class(`test2400`)
        expect(findCentury(2400)).not.to.have.class(ClassName.DISABLED)

        expect(findCentury(2500)).to.have.class(`test2500`)
        expect(findCentury(2500)).to.have.class(ClassName.DISABLED)

        expect(findCentury(2600)).to.have.class(ClassName.DISABLED)

        expect(findCentury(2700)).not.to.have.class(ClassName.DISABLED)
      })
    })
  })
})

