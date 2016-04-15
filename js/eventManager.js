import Base from './base'
import {Selector, ClassName, Unit, View} from './constants'
import Keycodes from './util/keycodes'
import Key from './util/key'

const Default = {
  debug: true
}

const EventManager = class extends Base {

  constructor(datepicker) {
    super(Default)
    this.dp = datepicker
    this.renderer = this.dp.renderer
    this.config = this.dp.config // shortcut reference to same config

    //
    this.events = []
    this.secondaryEvents = []

    this.buildEvents()
    this.attachEvents()
  }

  dispose() {
    this.detachEvents()
    this.detachSecondaryEvents()
    this.dp = undefined
    this.renderer = undefined
    this.events = undefined
    this.secondaryEvents = undefined
    super.dispose()
  }

  onShown() {
    this.attachSecondaryEvents()
    this._trigger(Event.SHOW)
    if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && !this.config.keyboard.touch) {
      $(this.dp.$element).blur()
    }
  }

  onHidden() {
    this.detachSecondaryEvents()
    this._trigger(Event.HIDE)
  }


  click(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    let $target = $(ev.target)

    // Clicked on the switch
    if ($target.hasClass(ClassName.SWITCH)) {
      this.dp.showView(View.MONTHS)
    }

    // Clicked on prev or next
    let $navArrow = $target.closest(`${Selector.PREV}, ${Selector.NEXT}`)
    if ($navArrow.length > 0) {
      let dir = this.config.view.modes[this.dp.view].navStep * ($navArrow.hasClass(ClassName.PREV) ? -1 : 1)
      if (this.dp.view === View.DAYS) {
        this.dp.viewDate.add(dir, Unit.MONTH)
        this._trigger(Event.MONTH_CHANGE, this.dp.viewDate)
      }
      else {
        this.dp.viewDate.add(dir, Unit.YEAR)
        if (this.dp.view === View.MONTHS) {
          this._trigger(Event.YEAR_CHANGE, this.dp.viewDate)
        }
      }
      this.renderer.fill()
    }

    // Clicked on today button
    if ($target.hasClass(ClassName.TODAY)) {
      this.dp.showView(-2)
      this.dp.clickDate(this.dp.newMoment(), this.config.today.button === 'linked' ? null : 'view')
    }

    // Clicked on clear button
    if ($target.hasClass(ClassName.CLEAR)) {
      this.dp.clearDates()
    }

    if (!$target.hasClass(ClassName.DISABLED)) {
      // Clicked on a day
      if ($target.hasClass(Unit.DAY)) {
        let day = parseInt($target.text(), 10) || 1
        let year = this.dp.viewDate.year()
        let month = this.dp.viewDate.month()
        let monthChanged = false
        let yearChanged = false

        // From last month
        if ($target.hasClass(ClassName.OLD)) {
          if (month === 0) {
            month = 11
            year = year - 1
            monthChanged = true
            yearChanged = true
          }
          else {
            month = month - 1
            monthChanged = true
          }
        }

        // From next month
        if ($target.hasClass(ClassName.NEW)) {
          if (month === 11) {
            month = 0
            year = year + 1
            monthChanged = true
            yearChanged = true
          }
          else {
            month = month + 1
            monthChanged = true
          }
        }
        this.dp.clickDate(this.dp.newMoment(year, month, day))
        if (yearChanged) {
          this._trigger(Event.YEAR_CHANGE, this.dp.viewDate)
        }
        if (monthChanged) {
          this._trigger(Event.MONTH_CHANGE, this.dp.viewDate)
        }
      }

      // Clicked on a month
      if ($target.hasClass(Unit.MONTH)) {
        this.dp.viewDate.date(1)
        let day = 1
        let month = $target.parent().find('span').index($target)
        let year = this.dp.viewDate.year()
        this.dp.viewDate.month(month)
        this._trigger(Event.MONTH_CHANGE, this.dp.viewDate)
        if (this.config.view.min === View.MONTHS) {
          this.dp.clickDate(this.dp.newMoment(year, month, day))
          this.dp.showView()
        }
        else {
          this.dp.showView(-1)
        }
        this.renderer.fill()
      }

      // Clicked on a year|decade|century
      if ($target.hasClass(Unit.YEAR)
        || $target.hasClass(Unit.DECADE)
        || $target.hasClass(Unit.CENTURY)) {
        //this.dp.viewDate.startOf(Unit.MONTH)

        let year = parseInt($target.text(), 10) || 0
        this.dp.viewDate.year(year)

        if ($target.hasClass(Unit.YEAR)) {
          this._trigger(Event.YEAR_CHANGE, this.dp.viewDate)
        }
        if ($target.hasClass(Unit.DECADE)) {
          this._trigger(Event.DECADE_CHANGE, this.dp.viewDate)
        }
        if ($target.hasClass(Unit.CENTURY)) {
          this._trigger(Event.CENTURY_CHANGE, this.dp.viewDate)
        }

        if (this.config.view.min === View.YEARS) {
          this.dp.clickDate(this.dp.viewDate)
        }
        this.dp.showView(-1)
        this.renderer.fill()
      }
    }
  }

  // FIXME: nomenclature to be onKe*
  keyup(ev) {
    if (Key.isNot(ev,
        Keycodes.ESC,
        Keycodes.LEFT,
        Keycodes.RIGHT,
        Keycodes.UP,
        Keycodes.DOWN,
        Keycodes.SPACE,
        Keycodes.ENTER,
        Keycodes.TAB))
      this.dp.update()()
  }

  // FIXME: nomenclature to be onKe*
  keydown(ev) {
    if (!this.dp.isShowing()) {
      if (Key.is(ev, Keycodes.DOWN, Keycodes.ESC)) { // allow down to re-show picker
        this.dp.show()
        ev.stopPropagation()
      }
      return
    }
    let dateChanged = false
    let dir = null
    let newViewDate = null
    let focusDate = this.dp.focusDate || this.dp.viewDate

    switch (ev.keyCode) {
      case Keycodes.ESC:
        if (this.dp.focusDate) {
          this.dp.focusDate = null
          this.dp.viewDate = this.dp.dates.last() || this.dp.viewDate
          this.renderer.fill() // FIXME: why not use this.dp.update()()?
        }
        else
          this.dp.hide()
        ev.preventDefault()
        ev.stopPropagation()
        break
      case Keycodes.LEFT:
      case Keycodes.UP:
      case Keycodes.RIGHT:
      case Keycodes.DOWN:
        if (!this.config.keyboard.navigation || this.config.daysOfWeek.disabled.length === 7)
          break
        dir = Key.is(ev, Keycodes.LEFT, Keycodes.UP) ? -1 : 1
        if (this.dp.view === View.DAYS) {
          if (ev.ctrlKey) {
            newViewDate = this.dp.moveAvailableDate(focusDate, dir, Unit.YEAR)

            if (newViewDate)
              this._trigger(Event.YEAR_CHANGE, this.dp.viewDate)
          }
          else if (ev.shiftKey) {
            newViewDate = this.dp.moveAvailableDate(focusDate, dir, Unit.MONTH)

            if (newViewDate)
              this._trigger(Event.MONTH_CHANGE, this.dp.viewDate)
          }
          else if (Key.is(ev, Keycodes.LEFT, Keycodes.RIGHT)) {
            newViewDate = this.dp.moveAvailableDate(focusDate, dir, Unit.DAY)
          }
          else if (!this.weekOfDateIsDisabled(focusDate)) {
            newViewDate = this.dp.moveAvailableDate(focusDate, dir, Unit.WEEK)
          }
        }
        else if (this.dp.view === View.MONTHS) {
          if (Key.is(ev, Keycodes.UP, Keycodes.DOWN)) {
            dir = dir * 4
          }
          newViewDate = this.dp.moveAvailableDate(focusDate, dir, Unit.MONTH)
        }
        else if (this.dp.view === View.YEARS) {
          if (Key.is(ev, Keycodes.UP, Keycodes.DOWN)) {
            dir = dir * 4
          }
          newViewDate = this.dp.moveAvailableDate(focusDate, dir, Unit.YEAR)
        }
        if (newViewDate) {
          this.dp.focusDate = this.dp.viewDate = newViewDate
          this.dp.setInputValue()
          this.renderer.fill() // FIXME: why not use this.dp.update()()?
          ev.preventDefault()
        }
        break
      case Keycodes.ENTER:
        if (!this.config.forceParse)
          break
        focusDate = this.dp.focusDate || this.dp.dates.last() || this.dp.viewDate
        if (this.config.keyboard.navigation) {
          this.toggleMultidate(focusDate)
          dateChanged = true
        }
        this.dp.focusDate = null
        this.dp.viewDate = this.dp.dates.last() || this.dp.viewDate
        this.dp.setInputValue()
        this.renderer.fill() // FIXME: why not use this.dp.update()()?
        if (this.dp.isShowing()) {
          ev.preventDefault()
          ev.stopPropagation()
          if (this.config.autoclose)
            this.dp.hide()
        }
        break
      case Keycodes.TAB:
        this.dp.focusDate = null
        this.dp.viewDate = this.dp.dates.last() || this.dp.viewDate
        this.renderer.fill() // FIXME: why not use this.dp.update()()?
        this.dp.hide()
        break
    }
    if (dateChanged) {
      if (this.dp.dates.length()) {
        this._trigger(Event.DATE_CHANGE)
      }
      else {
        this._trigger(Event.DATE_CLEAR)
      }

      this.dp.$input.change()
    }
  }

  //FIXME: normalize these signatures? to be the same as #trigger in Base class?
  _trigger(event, altdate) {
    let date = null
    if (altdate) {
      date = altdate.clone()
    }
    else {
      date = this.dp.dates.last()
      if (date) {
        //clone it if present
        date = date.clone()
      }
    }

    super.trigger(event, {
      type: event,
      date: date,
      dates: this.dp.dates.clonedArray()
    })
  }

  // FIXME: nomenclature to be onKe*
  paste(ev) {
    let dateString = null
    if (ev.originalEvent.clipboardData && ev.originalEvent.clipboardData.types
      && $.inArray('text/plain', ev.originalEvent.clipboardData.types) !== -1) {
      dateString = ev.originalEvent.clipboardData.getData('text/plain')
    }
    else if (window.clipboardData) {
      dateString = window.clipboardData.getData('Text')
    }
    else {
      return
    }
    this.setDate(dateString)
    ev.preventDefault()
  }

  buildEvents() {
    let events = {
      keyup: (ev) => this.keyup(ev),
      keydown: (ev) => this.keydown(ev),
      paste: (ev) => this.paste(ev),
      click: () => this.dp.show()
    }

    if (this.config.showOnFocus === true) {
      events.focus = () => this.dp.show()
    }

    // single input
    this.events = [
      [this.dp.$input, events]
    ]


    if (this.config.immediateUpdates) {

      let immediateUpdateEvents = {}
      immediateUpdateEvents[`${Event.YEAR_CHANGE} ${Event.MONTH_CHANGE}`] = (ev) => this.dp.update()(ev.date)
      // Trigger input updates immediately on changed year/month
      this.events.push(
        [this.dp.$element, immediateUpdateEvents]
      )
    }

    this.secondaryEvents = [
      [this.renderer.$picker, { click: (ev) => this.click(ev) }],
      [$(document), {
        mousedown: (ev) => {
          // Clicked outside the datepicker, hide it
          if (!(
              this.dp.$element.is(ev.target) ||
              this.dp.$element.find(ev.target).length ||
              this.renderer.$picker.is(ev.target) ||
              this.renderer.$picker.find(ev.target).length ||
              this.renderer.$picker.hasClass(ClassName.INLINE)
            )) {
            this.dp.hide()
          }
        }
      }]
    ]
  }

  attachEvents() {
    this.detachEvents()
    this.applyEvents(this.events)
  }

  detachEvents() {
    this.unapplyEvents(this.events)
  }

  attachSecondaryEvents() {
    this.detachSecondaryEvents()
    this.applyEvents(this.secondaryEvents)
  }

  detachSecondaryEvents() {
    this.unapplyEvents(this.secondaryEvents)
  }

  applyEvents(evs) {
    for (let i = 0, el, ch, ev; i < evs.length; i++) {
      el = evs[i][0]
      if (evs[i].length === 2) {
        ch = undefined
        ev = evs[i][1]
      }
      else if (evs[i].length === 3) {
        ch = evs[i][1]
        ev = evs[i][2]
      }
      el.on(ev, ch)
    }
  }

  unapplyEvents(evs) {
    for (let i = 0, el, ev, ch; i < evs.length; i++) {
      el = evs[i][0]
      if (evs[i].length === 2) {
        ch = undefined
        ev = evs[i][1]
      }
      else if (evs[i].length === 3) {
        ch = evs[i][1]
        ev = evs[i][2]
      }
      el.off(ev, ch)
    }
  }
}

export default EventManager
