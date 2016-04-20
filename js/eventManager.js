import Base from './base'
import {Selector, ClassName, Unit, View, Event, Data} from './constants'
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
      // FIXME: these need to be added for keyboard nav after initial click (initial attempt didn't work - needs debugging)
      //keyup: (ev) => this.onKeyup(ev),
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
      let direction = this.config.view.modes[this.dp.view].navStep * ($navArrow.hasClass(ClassName.PREV) ? -1 : 1)
      let unit
      if (this.dp.view === View.DAYS) {
        unit = Unit.MONTH
      }
      else {
        unit = Unit.YEAR
      }

      this.dp.viewDate.add(direction, unit)
      this.trigger(Event[`${unit.toUpperCase()}_CHANGE`])

      // set view date but don't select it using one of the #update methods
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
        let origViewDate = this.dp.viewDate.clone()
        let m = this.dp.newMoment($target.data(Data.MOMENT))
        this.dp.updateMultidate(m)
        if (origViewDate.year() != m.year()) {
          this.trigger(Event.YEAR_CHANGE, m)
        }
        if (origViewDate.month() != m.month()) {
          this.trigger(Event.MONTH_CHANGE, m)
        }
      }

      // Clicked on a month
      if ($target.hasClass(Unit.MONTH)) {
        let month = $target.parent().find('span').index($target)
        this.dp.viewDate.month(month)
        this.dp.updateMultidate(this.dp.viewDate)
        this.trigger(Event.MONTH_CHANGE)
        if (this.config.view.min === View.MONTHS) {
          this.dp.showView()
        }
        else {
          this.dp.showView(View.DAYS)
        }
      }

      // Clicked on a year|decade|century
      if ($target.hasClass(Unit.YEAR)
        || $target.hasClass(Unit.DECADE)
        || $target.hasClass(Unit.CENTURY)) {

        let year = parseInt($target.text(), 10) || 0
        let m = this.dp.viewDate.clone().year(year)
        let unit

        if ($target.hasClass(Unit.YEAR)) {
          unit = Unit.YEAR
        }
        if ($target.hasClass(Unit.DECADE)) {
          unit = Unit.DECADE
        }
        if ($target.hasClass(Unit.CENTURY)) {
          unit = Unit.CENTURY
        }

        this.dp.updateMultidate(m)
        if (unit) {
          this.trigger(Event[`${unit.toUpperCase()}_CHANGE`])
        }
        this.dp.changeView(-1)
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

    switch (ev.keyCode) {
      case Keycodes.ESC:
        if (this.dp.focusDate) {
          // TODO: is this escaping back from a month/year/decade/century screen? if so comment it!
          this.dp.focusDate = null
          this.dp.update()
        }
        else {
          this.dp.hide()
        }
        ev.preventDefault()
        ev.stopPropagation()
        break
      case Keycodes.ENTER:
      case Keycodes.TAB:
        this.dp.focusDate = null
        this.dp.updateMultidate(this.dp.dates.last() || this.dp.viewDate)

        ev.preventDefault()
        ev.stopPropagation()

        if (Key.is(Keycodes.TAB) || this.config.autoclose) {
          this.dp.hide()
        }
        break
      case Keycodes.LEFT:
      case Keycodes.UP:
      case Keycodes.RIGHT:
      case Keycodes.DOWN:
      {
        let focusDate = this.dp.focusDate || this.dp.dates.last() || this.dp.viewDate
        if (!this.config.keyboard.navigation || this.config.daysOfWeek.disabled.length === 7) {
          break
        }
        let direction = Key.is(ev, Keycodes.LEFT, Keycodes.UP) ? -1 : 1
        let unit
        if (this.dp.view === View.DAYS) {
          if (ev.ctrlKey) {
            unit = Unit.YEAR
          }
          else if (ev.shiftKey) {
            unit = Unit.MONTH
          }
          else if (Key.is(ev, Keycodes.LEFT, Keycodes.RIGHT)) {
            unit = Unit.DAY
          }
          else if (!this.dp.weekOfDateIsDisabled(focusDate)) {
            unit = Unit.WEEK
          }
        }
        else if (this.dp.view === View.MONTHS) {
          if (Key.is(ev, Keycodes.UP, Keycodes.DOWN)) {
            direction = direction * 4
          }
          unit = Unit.MONTH
        }
        else if (this.dp.view === View.YEARS) {
          if (Key.is(ev, Keycodes.UP, Keycodes.DOWN)) {
            direction = direction * 4
          }
          unit = Unit.YEAR
        }

        // now move the available date and render (highlight the moved date)
        if (unit) {
          this.dp.focusDate = this.viewDate = this.dp.moveAvailableDate(focusDate, direction, unit)
          this.renderer.fill()

          this.trigger(Event[`${unit.toUpperCase()}_CHANGE`])
          ev.preventDefault()
        }
        break
      }
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

  trigger(event) {
    let date = this.dp.dates.last()
    if (date) {
      //clone it if present
      date = date.clone()
    }

    this.fire(event, {
      type: event,
      date: date,
      datepicker: this.dp
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
    for (let key of Object.keys(hash)) {
      let value = hash[key]
      element.on(key, value)
    }
  }

  detachEvents(element, hash) {
    for (let key of Object.keys(hash)) {
      let value = hash[key]
      element.off(key, value)
    }
  }
}

export default EventManager
