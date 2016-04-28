import Base from './base'
import Datepicker from './datepicker'
import Moments from './util/moments'
import {Data, Event} from './constants'

// FIXME: ENCAPSULATION - currently, the Datepicker jquery fn instantiates this, then this instantiates that.  So strange.

const DateRangePicker = class extends Base {

  constructor($element, config) {
    super($element, config)

    // create a config sans inputs
    let _config = $.extend({}, this.config, {inputs: undefined}) // don't pass along inputs to dp

    // for each input, instantiate it
    this.inputs = []
    this.datepickers = []
    for (let i of this.config.inputs) {

      // track all inputs
      let $input = $(i)
      this.inputs.push($input)

      // instantiate each datepicker
      Datepicker._jQueryInterface.call($input, _config)
        .on(Event.DATE_CHANGE, (ev) => this.dateUpdated(ev))

      // track all datepickers
      this.datepickers.push($input.data(Data.KEY))
    }

    this.updateRange()
  }

  updateRange() {
    // gather all dates
    this.dates = []
    for (let dp of this.datepickers) {
      this.dates.push(dp.getDate())
    }

    // create a range from all dates
    this.range = Moments.toRange(...this.dates)

    // let the datepickers know what range we are working with
    for (let dp of this.datepickers) {
      dp.setRange(this.range)
    }
  }

  dateUpdated(ev) {
    // `this.updating` is a workaround for preventing infinite recursion between Event.DATE_CHANGE triggering
    //    and calls to `setDate`.  Until there is a better mechanism.
    if (this.updating) {
      return
    }

    this.updating = true

    try {
      let datepicker = $(ev.target).data(Data.KEY)
      if (typeof(datepicker) === "undefined") {
        return
      }

      if (!this.inputs.is(ev.target)) {
        // not our input
        return
      }

      // TODO: it appears we can have more than two datepickers, I'm not sure of the use-case, but it would seem to make more sense  with just two (and be simpler).
      let newDate = datepicker.getDate()
      let index = $.inArray(ev.target, this.inputs)
      let indexBefore = index - 1
      let indexAfter = index + 1
      let length = this.inputs.length

      for (let dp of this.datepickers) {
        if (!dp.getDate())
          dp.setDate(newDate)
      }

      if (newDate.isBefore(this.dates.array[indexBefore])) {
        // Date being moved earlier/left
        while (indexBefore >= 0 && newDate.isBefore(this.dates.array[indexBefore])) {
          this.datepickers[indexBefore--].setDate(newDate)
        }
      }
      else if (newDate.isAfter(this.dates.array[indexAfter])) {
        // Date being moved later/right
        while (indexAfter < length && newDate.isAfter(this.dates.array[indexAfter])) {
          this.datepickers[indexAfter++].setDate(newDate)
        }
      }
      this.updateRange()
    }
    finally {
      this.updating = undefined
    }
  }

  dispose() {
    for (let dp of this.datepickers) {
      dp.dispose()
    }

    this.dates = null
    this.range = null
    this.inputs = null
    this.datepickers = null
  }
}

export default DateRangePicker
