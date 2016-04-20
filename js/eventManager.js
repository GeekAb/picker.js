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
    this.$document = $(document)

    // Element events
    this.elementEvents = {
      keyup: (ev) => this.onKeyup(ev),
      keydown: (ev) => this.onKeydown(ev),
      paste: (ev) => this.onPaste(ev),
      click: () => this.dp.show()
    }

    // on element focus show
    if (this.config.showOnFocus === true) {
      this.elementEvents.focus = () => this.dp.show()
    }

    // Trigger input updates immediately on changed year/month
    if (this.config.immediateUpdates) {
      this.elementEvents[`${Event.YEAR_CHANGE} ${Event.MONTH_CHANGE}`] = (ev) => this.dp.update(ev.date)
    }

    // Picker events
    this.pickerEvents = {
      //keyup: (ev) => this.onKeyup(ev), // FIXME: these need to be added for keyboard nav after initial click (initial attempt didn't work - needs debugging)
      //keydown: (ev) => this.onKeydown(ev),
      click: (ev) => this.onPickerClick(ev)
    }

    this.pickerDocumntEvents = {
      mousedown: (ev) => this.onMousedown(ev)
    }

    // Initial attachment of events on element (input) - only removed on dispose
    this.attachElementEvents()
  }

  dispose() {
    this.detachElementEvents()
    this.detachPickerEvents()
    this.dp = undefined
    this.renderer = undefined
    this.elementEvents = undefined
    this.pickerEvents = undefined
    this.$document = undefined
    super.dispose()
  }

  attachElementEvents() {
    this.attachEvents(this.dp.$input, this.elementEvents) // FIXME: should be $element?
  }

  detachElementEvents() {
    this.detachEvents(this.dp.$input, this.elementEvents)
  }

  attachPickerEvents() {
    this.attachEvents(this.renderer.$picker, this.pickerEvents)
    this.attachEvents(this.$document, this.pickerDocumntEvents)
  }

  detachPickerEvents() {
    this.detachEvents(this.renderer.$picker, this.pickerEvents)
    this.detachEvents(this.$document, this.pickerDocumntEvents)
  }

  onShown() {
    this.attachPickerEvents()
    this.trigger(Event.SHOW)
    if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && !this.config.keyboard.touch) {
      this.dp.$element.blur()
    }
  }

  onHidden() {
    this.detachPickerEvents()
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

  onPickerClick(ev) {
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
      this.dp.update(this.dp.newMoment())
    }

    // Clicked on clear button
    else if ($target.hasClass(ClassName.CLEAR)) {
      this.dp.clearDates()
    }

    else if (!$target.hasClass(ClassName.DISABLED)) {
      // Clicked on a day
      if ($target.hasClass(Unit.DAY)) {
        let day = parseInt($target.text(), 10) || 1
        let origViewDate = this.dp.viewDate.clone()
        let year = this.dp.viewDate.year()
        let month = this.dp.viewDate.month()

        // From last month  FIXME: couldn't this just be saved state instead of trying to figure out from the UI?
        if ($target.hasClass(ClassName.OLD)) {
          if (month === 0) {
            month = 11
            year = year - 1
          }
          else {
            month = month - 1
          }
        }

        // From next month
        if ($target.hasClass(ClassName.NEW)) {
          if (month === 11) {
            month = 0
            year = year + 1
          }
          else {
            month = month + 1
          }
        }
        this.dp.updateMultidate(this.dp.newMoment([year, month, day]))
        if (origViewDate.year() != year) {
          this.trigger(Event.YEAR_CHANGE, this.dp.viewDate)
        }
        if (origViewDate.month() != month) {
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
          this.dp.updateMultidate(this.dp.newMoment([year, month, day]))
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
          this.dp.updateMultidate(this.dp.viewDate)
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
    let dir = null
    let newViewDate = null
    //let focusDate = this.dp.focusDate || this.dp.viewDate
    let focusDate = this.dp.focusDate || this.dp.dates.last() || this.dp.viewDate  //taken from enter section, not sure why different

    switch (ev.keyCode) {
      case Keycodes.ESC:
        if (this.dp.focusDate) {
          // TODO: is this escaping back from a month/year/decade/century screen? if so comment it!
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
          else if (!this.dp.weekOfDateIsDisabled(focusDate)) {
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
          this.dp.focusDate = newViewDate
          this.dp.update(newViewDate)
          ev.preventDefault()
        }
        break
      case Keycodes.ENTER:
        //if (this.config.keyboard.navigation) {
        //  this.dp.toggleMultidate(focusDate)
        //}

        this.dp.focusDate = null
        this.dp.update(this.dp.dates.last() || this.dp.viewDate)

        ev.preventDefault()
        ev.stopPropagation()

        if (this.config.autoclose) {
          this.dp.hide()
        }
        break
      case Keycodes.TAB:
        this.dp.update(this.dp.dates.last() || this.dp.viewDate)
        this.dp.hide()
        break
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
    this.debug(`fire: ${eventKey}`, object)
    this.dp.$element.trigger(event)
    if (event.isDefaultPrevented()) {
      this.debug(`default prevented on ${eventKey}`)
      return false
    }
    else {
      return true
    }
  }

  attachEvents(element, hash) {
    for(let key of Object.keys(hash)){
      let value = hash[key]
      element.on(key, value)
    }
  }

  detachEvents(element, hash) {
    for(let key of Object.keys(hash)){
      let value = hash[key]
      element.off(key, value)
    }
  }
}

export default EventManager
