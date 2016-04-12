import Base from './base'
import Datepicker from './datepicker'
//import moment from 'moment'
//import 'moment-range'
import Moments from './util/moments'

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
      let $input = $(input)
      this.inputs.push($input)

      // instantiate each datepicker
      Datepicker._jQueryInterface.call($input, _config)
        .on('changeDate', (ev) => this.dateUpdated(ev))

      // track all datepickers
      this.datepickers.push($input.data(Datepicker.DATA_KEY))
    }

    this.updateDates()
  }

  updateDates() {
    this.dates = []
    for(let dp of this.datepickers){
      this.dates.push(dp.getDate())
    }
    this.updateRanges()
  }

  updateRanges() {
    let range = Moments.toRange(...this.dates)
    for(let dp of this.datepickers){
      dp.setRange(range)
    }
  }



  dateUpdated(e) {
    // `this.updating` is a workaround for preventing infinite recursion
    // between `changeDate` triggering and `setUTCDate` calling.  Until
    // there is a better mechanism.
    if (this.updating)
      return
    this.updating = true

    var dp = $(e.target).data('datepicker')

    if (typeof(dp) === "undefined") {
      return
    }

    var new_date = dp.getUTCDate(),
      i = $.inArray(e.target, this.inputs),
      j = i - 1,
      k = i + 1,
      l = this.inputs.length
    if (i === -1)
      return

    $.each(this.datepickers, function (i, p) {
      if (!p.getUTCDate())
        p.setUTCDate(new_date)
    })

    if (new_date < this.dates.array[j]) {
      // Date being moved earlier/left
      while (j >= 0 && new_date < this.dates.array[j]) {
        this.datepickers[j--].setUTCDate(new_date)
      }
    }
    else if (new_date > this.dates.array[k]) {
      // Date being moved later/right
      while (k < l && new_date > this.dates.array[k]) {
        this.datepickers[k++].setUTCDate(new_date)
      }
    }
    this.updateDates()

    delete this.updating
  }

  remove() {
    $.map(this.datepickers, function (p) {
      p.remove()
    })
    delete this.$element.data().datepicker
  }
}

export default DateRangePicker
