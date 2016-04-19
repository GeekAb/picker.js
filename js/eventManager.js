import Base from './base'
import {Selector, ClassName, Unit, View, Event} from './constants'
import Keycodes from './util/keycodes'
import Key from './util/key'

const EventManager = class extends Base {

  constructor(datepicker) {
    super()
    this.dp = datepicker
    this.renderer = this.dp.renderer
    this.config = this.dp.config // shortcut reference to same config

    // build events
    let events = {
      keyup: (ev) => this.onKeyup(ev),
      keydown: (ev) => this.onKeydown(ev),
      paste: (ev) => this.onPaste(ev),
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

    // build secondary events
    this.secondaryEvents = [
      [this.renderer.$picker, {click: (ev) => this.onClick(ev)}],
      [$(document), {
        mousedown: (ev) => this.onMousedown(ev)
      }]
    ]

    //
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
    this.trigger(Event.SHOW)
    if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && !this.config.keyboard.touch) {
      $(this.dp.$element).blur()
    }
  }

  onHidden() {
    this.detachSecondaryEvents()
    this.trigger(Event.HIDE)
  }

  onMousedown(ev) {
    // if clicked outside the datepicker, hide it
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

  onClick(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    let $target = $(ev.target)
    let $navArrow = $target.closest(`${Selector.PREV}, ${Selector.NEXT}`)

    // Clicked on the switch
    if ($target.hasClass(ClassName.SWITCH)) {
      this.dp.changeView(1)
    }

    // Clicked on prev or next
    else if ($navArrow.length > 0) {
      let dir = this.config.view.modes[this.dp.view].navStep * ($navArrow.hasClass(ClassName.PREV) ? -1 : 1)
      if (this.dp.view === View.DAYS) {
        this.dp.viewDate.add(dir, Unit.MONTH)
        this.trigger(Event.MONTH_CHANGE, this.dp.viewDate)
      }
      else {
        this.dp.viewDate.add(dir, Unit.YEAR)
        if (this.dp.view === View.MONTHS) {
          this.trigger(Event.YEAR_CHANGE, this.dp.viewDate)
        }
      }
      this.renderer.fill()
    }

    // Clicked on today button
    else if ($target.hasClass(ClassName.TODAY)) {
      this.dp.showView(View.DAYS)
      this.dp.clickDate(this.dp.newMoment(), this.config.today.button === true ? null : 'view')
    }

    // Clicked on clear button
    else if ($target.hasClass(ClassName.CLEAR)) {
      this.dp.clearDates()
    }

    else if (!$target.hasClass(ClassName.DISABLED)) {
      // Clicked on a day
      if ($target.hasClass(Unit.DAY)) {
        let day = parseInt($target.text(), 10) || 1
        let year = this.dp.viewDate.year()
        let month = this.dp.viewDate.month()
        let monthChanged = false
        let yearChanged = false

        // From last month  FIXME: couldn't this just be saved state instead of trying to figure out from the UI?
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
          this.trigger(Event.YEAR_CHANGE, this.dp.viewDate)
        }
        if (monthChanged) {
          this.trigger(Event.MONTH_CHANGE, this.dp.viewDate)
        }
      }

      // Clicked on a month
      if ($target.hasClass(Unit.MONTH)) {
        this.dp.viewDate.date(1)
        let day = 1
        let month = $target.parent().find('span').index($target)
        let year = this.dp.viewDate.year()
        this.dp.viewDate.month(month)
        this.trigger(Event.MONTH_CHANGE, this.dp.viewDate)
        if (this.config.view.min === View.MONTHS) {
          this.dp.clickDate(this.dp.newMoment(year, month, day))
          this.dp.showView()
        }
        else {
          this.dp.showView(View.DAYS)
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
          this.trigger(Event.YEAR_CHANGE, this.dp.viewDate)
        }
        if ($target.hasClass(Unit.DECADE)) {
          this.trigger(Event.DECADE_CHANGE, this.dp.viewDate)
        }
        if ($target.hasClass(Unit.CENTURY)) {
          this.trigger(Event.CENTURY_CHANGE, this.dp.viewDate)
        }

        if (this.config.view.min === View.YEARS) {
          this.dp.clickDate(this.dp.viewDate)
        }
        this.dp.changeView(-1)
        this.renderer.fill()
      }
    }
  }

  onKeyup(ev) {
    if (Key.isNot(ev,
        Keycodes.ESC,
        Keycodes.LEFT,
        Keycodes.RIGHT,
        Keycodes.UP,
        Keycodes.DOWN,
        Keycodes.SPACE,
        Keycodes.ENTER,
        Keycodes.TAB))
      this.dp.update()
  }

  onKeydown(ev) {
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
        else {
          this.dp.hide()
        }
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
              this.trigger(Event.YEAR_CHANGE, this.dp.viewDate)
          }
          else if (ev.shiftKey) {
            newViewDate = this.dp.moveAvailableDate(focusDate, dir, Unit.MONTH)

            if (newViewDate)
              this.trigger(Event.MONTH_CHANGE, this.dp.viewDate)
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
      this.trigger(Event.DATE_CHANGE)
      this.dp.$element.change()
    }
  }

  onPaste(ev) {
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

  trigger(event, altdate) {
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

    this.fire(event, {
      type: event,
      date: date,
      dates: this.dp.dates.clonedArray()
    })
  }

  /**
   *
   * @param eventKey
   * @param object/hash - properties will be set on event
   * @returns {boolean} - if false, code should get out because handler prevented
   */
  fire(eventKey, object = {}) {
    let event = $.Event(eventKey, object)
    this.debugDump(`firing ${eventKey}`, object)
    this.dp.$element.trigger(event)
    if (event.isDefaultPrevented()) {
      this.debug(`default prevented on ${eventKey}`)
      return false
    }
    else {
      return true
    }
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
