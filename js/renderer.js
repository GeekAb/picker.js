import Base from './base'
import {Selector, ClassName, Unit, View, Visibility, Data} from './constants'

const Renderer = class extends Base {

  constructor(datepicker) {
    super()
    this.dp = datepicker
    this.config = this.dp.config // shortcut reference to same config
    this.$picker = $(this.config.template.interpolate())

    if (this.dp.isInline) {
      this.$picker.addClass(ClassName.INLINE).appendTo(this.dp.$element)
    }

    if (this.config.rtl) {
      this.$picker.addClass(ClassName.RTL)
    }

    this.renderDaysViewDOW()
    this.renderButtons()
  }

  dispose() {
    this.$picker.remove()
    this.$picker = undefined
    this.dp = undefined
    super.dispose()
  }

  /**
   * Show a specific view by id.
   * @param viewId
   */
  showView(viewId) {
    this.$picker
      .children('div')
      .hide()
      .filter(`.${this.config.view.modes[viewId].cssClass}`) // days|months|years|decades|centuries
      .show()
    this.updateNavArrows()
  }

  render() {
    let viewDate = this.dp.viewDate.clone().local()
    // title text
    this.$picker.find(`${Selector.LABEL_TITLE}`).text(this.config.title).toggle(this.config.label.title !== undefined)
    this.$picker.find(`${Selector.LABEL_YEAR}`).text(this.config.template.formatLabelYear(viewDate))
    this.$picker.find(`${Selector.LABEL_DATE}`).text(this.config.template.formatLabelDate(viewDate))

    this.updateNavArrows(viewDate)
    this.renderMonthsView(viewDate)
    this.renderDaysView(viewDate)

    // Generate the years/decades/centuries
    let year = viewDate.year()
    let startYear = this.config.date.start.year()
    let endYear = this.config.date.end.year()

    // Generating years picker
    this.renderYearsView(
      Selector.YEARS,
      Unit.YEAR,
      10,
      1,
      year,
      startYear,
      endYear,
      this.config.beforeShowYear
    )

    // Generating decades picker
    this.renderYearsView(
      Selector.DECADES,
      Unit.DECADE,
      100,
      10,
      year,
      startYear,
      endYear,
      this.config.beforeShowDecade
    )

    // Generating centuries picker
    this.renderYearsView(
      Selector.CENTURIES,
      Unit.CENTURY,
      1000,
      100,
      year,
      startYear,
      endYear,
      this.config.beforeShowCentury
    )
  }

  // ------------------------------------------------------------------------
  // private

  updateNavArrows(viewDate) {
    if (!this.allowUpdate)
      return

    let year = viewDate.year()
    let month = viewDate.month()
    let $prev = this.$picker.find(Selector.PREV)
    let $next = this.$picker.find(Selector.NEXT)

    switch (this.dp.viewMode) {
      case View.DAYS:
        if (year <= this.config.date.start.year() && month <= this.config.date.start.month()) {
          $prev.css(Visibility.HIDDEN)
        }
        else {
          $prev.css(Visibility.VISIBLE)
        }
        if (year >= this.config.date.end.year() && month >= this.config.date.end.month()) {
          $next.css(Visibility.HIDDEN)
        }
        else {
          $next.css(Visibility.VISIBLE)
        }
        break
      case View.MONTHS:
      case View.YEARS:
      case View.DECADES:
      case View.CENTURIES:
        if (year <= this.config.date.start.year() || this.config.view.max < View.YEARS) {
          $prev.css(Visibility.HIDDEN)
        }
        else {
          $prev.css(Visibility.VISIBLE)
        }
        if (year >= this.config.date.end.year() || this.config.view.max < View.YEARS) {
          $next.css(Visibility.HIDDEN)
        }
        else {
          $next.css(Visibility.VISIBLE)
        }
        break
    }
  }

  renderDaysViewDOW() {
    let dowCnt = this.config.week.start
    let html = '<tr>'
    while (dowCnt < this.config.week.start + 7) {
      let disabledClass = ($.inArray(dowCnt, this.config.daysOfWeek.disabled) > -1) ? ClassName.DISABLED : ''
      let date = this.dp.newMoment().day((dowCnt++) % 7)
      html += `<th class="${ClassName.DOW} ${disabledClass}">${this.config.template.formatDayOfWeek(date)}</th>`
    }
    html += '</tr>'
    this.$picker.find(`${Selector.DAYS} thead`).append(html)
  }

  renderButtons() {
    // today button text
    this.$picker.find(Selector.TODAY).text(this.i18n('today')).toggle(this.config.button.today !== false)
    // clear button text
    this.$picker.find(Selector.CLEAR).text(this.i18n('clear')).toggle(this.config.button.clear !== false)
    // cancel button
    this.$picker.find(Selector.CANCEL).text(this.i18n('cancel')).toggle(this.config.button.cancel !== false)
    // ok button
    this.$picker.find(Selector.OK).text(this.i18n('ok')).toggle(this.config.button.ok !== false)
  }

  renderDaysView(viewDate) {
    // get prevMonth moment set to same day of the week
    let prevMonth = viewDate.clone().startOf(Unit.MONTH).subtract(1, 'day') // end of last month
    prevMonth.day(prevMonth.day() - (prevMonth.day() - this.config.week.start + 7) % 7) // set day of week

    // TODO: not sure why 42 days is added (yet)...
    let nextMonth = prevMonth.clone().add(42, 'days')

    let html = []
    while (prevMonth.isBefore(nextMonth)) {
      this.renderDay(viewDate, prevMonth, html)
      prevMonth.add(1, 'days')
    }

    let $view = this.$picker.find(`${Selector.DAYS}`)

    // attach new days content
    $view.find(`tbody`).empty().append(html.join(''))

    // render switch text e.g. Thu, Apr 13
    $view.find(`${Selector.SWITCH}`).text(this.config.template.formatDaySwitch(viewDate))
  }

  renderDay(viewDate, date, html) {
    let before = null
    let tooltip = ''
    if (date.day() === this.config.week.start) {
      html.push('<tr>')
    }
    let classNames = this.getDayClassNames(viewDate, date)
    classNames.push(Unit.DAY)
    // this.config.template.addDayClasses(date, classNames)

    /*
     A function that takes a date as a parameter and returns one of the following values:

     - undefined to have no effect
     - An object with the following properties:
     disabled: A Boolean, indicating whether or not this date is disabled
     classes: A String representing additional CSS classes to apply to the date’s cell
     tooltip: A tooltip to apply to this date, via the title HTML attribute
     */
    if (this.config.beforeShowDay !== undefined) {
      before = this.config.beforeShowDay(date)
      if (before === undefined) {
        before = {}
      }
      if (before.disabled === true) {
        classNames.push(ClassName.DISABLED)
      }
      if (before.classes) {
        classNames = classNames.concat(before.classes.split(/\s+/))
      }
      if (before.tooltip) {
        tooltip = before.tooltip ? ` title="${before.tooltip}"` : ''
      }
    }

    classNames = $.unique(classNames)
    html.push(this.config.template.renderDay(date, classNames, tooltip))
    if (date.day() === this.config.week.end) {
      html.push('</tr>')
    }
  }

  renderMonthsView(viewDate) {
    let $view = this.$picker.find(Selector.MONTHS)
    let year = viewDate.year()
    let startYear = this.config.date.start.year()
    let startMonth = this.config.date.start.month()
    let endYear = this.config.date.end.year()
    let endMonth = this.config.date.end.month()
    let html = ''

    for (let i = 0; i < 12; i++) { // 0..11
      let classNames = [Unit.MONTH]
      if (viewDate && viewDate.month() === i) classNames.push(ClassName.FOCUSED)

      let date = this.dp.newMoment().month(i).startOf('month')
      html += this.config.template.renderMonth(date, classNames)
    }

    $view.find(`td`).html(html)
    $view.find(Selector.SWITCH).text(year)
    let $months = $view.find(Selector.MONTH)

    for (let d of this.dp.dates.array) {
      if (d.year() === year) {
        $months.eq(d.month()).addClass(ClassName.ACTIVE)
      }
    }

    if (year < startYear || year > endYear) {
      $months.addClass(ClassName.DISABLED)
    }
    if (year === startYear) {
      $months.slice(0, startMonth).addClass(ClassName.DISABLED)
    }
    if (year === endYear) {
      $months.slice(endMonth + 1).addClass(ClassName.DISABLED)
    }


    /*
     A function that takes a date as a parameter and returns one of the following values:

     - undefined to have no effect
     - An object with the following properties:
     disabled: A Boolean, indicating whether or not this date is disabled
     classes: A String representing additional CSS classes to apply to the date’s cell
     tooltip: A tooltip to apply to this date, via the title HTML attribute
     */
    if (this.config.beforeShowMonth !== undefined) {
      for (let month of $months) {
        let $month = $(month)
        let m = this.dp.newMoment($month.data(Data.MOMENT))
        let before = this.config.beforeShowMonth(m)
        if (before === undefined) {
          before = {}
        }
        if (before.disabled === true) {
          $month.addClass(ClassName.DISABLED)
        }
        if (before.classes) {
          $month.addClass(before.classes)
        }
        if (before.tooltip) {
          $month.prop('title', before.tooltip)
        }
      }
    }
  }

  renderYearsView(selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
    let html = ''
    let $view = this.$picker.find(selector)
    let currentYearFactored = parseInt(currentYear / factor, 10) * factor
    let startStep = parseInt(startYear / step, 10) * step
    let endStep = parseInt(endYear / step, 10) * step
    let steps = $.map(this.dp.dates.array, function (d) {
      return parseInt(d.year() / step, 10) * step
    })

    $view.find(Selector.SWITCH).text(`${currentYearFactored}-${currentYearFactored + step * 9}`)

    let year = currentYearFactored - step
    for (let i = -1; i < 11; i += 1) {
      let classNames = [cssClass]

      if (i === -1) {
        classNames.push(ClassName.OLD)
      }
      else if (i === 10) {
        classNames.push(ClassName.NEW)
      }
      if ($.inArray(year, steps) !== -1) {
        classNames.push(ClassName.ACTIVE)
      }
      if (year < startStep || year > endStep) {
        classNames.push(ClassName.DISABLED)
      }
      if (year === this.dp.viewDate.year()) {
        classNames.push(ClassName.FOCUSED)
      }

      /*
       A function that takes a date as a parameter and returns one of the following values:

       - undefined to have no effect
       - An object with the following properties:
       disabled: A Boolean, indicating whether or not this date is disabled
       classes: A String representing additional CSS classes to apply to the date’s cell
       tooltip: A tooltip to apply to this date, via the title HTML attribute
       */
      let tooltip = ``
      let m = this.dp.newMoment().year(year).startOf(Unit.YEAR)
      if (callback !== undefined) {
        let before = callback(m)

        if (before === undefined) {
          before = {}
        }
        if (before.disabled === true) {
          classNames.push(ClassName.DISABLED)
        }
        if (before.classes) {
          classNames = classNames.concat(before.classes.split(/\s+/))
        }
        if (before.tooltip) {
          tooltip = before.tooltip ? `title="${before.tooltip}"` : ''
        }
      }

      html += this.config.template.renderYear(m, classNames, tooltip)
      year += step
    }
    $view.find('td').html(html)
  }

  getDayClassNames(viewDate, date) {
    let classes = []
    let viewYear = viewDate.year()
    let viewMonth = viewDate.month()
    let year = date.year()
    let month = date.month()
    let today = this.dp.newMoment().local()

    if (year < viewYear || (year === viewYear && month < viewMonth)) {
      classes.push(ClassName.OLD)
    }
    else if (year > viewYear || (year === viewYear && month > viewMonth)) {
      classes.push(ClassName.NEW)
    }
    if (this.dp.viewDate && date.isSame(this.dp.viewDate, 'day')) {
      classes.push(ClassName.FOCUSED)
    }
    // Compare internal UTC date with local today, not UTC today
    if (date.isSame(today, 'date')) {
      classes.push(ClassName.TODAY)
    }
    if (this.dp.dates.contains(date) !== -1) {
      classes.push(ClassName.ACTIVE)
    }
    if (!this.dp.boundedDate(date) || this.dp.dateIsDisabled(date)) {
      classes.push(ClassName.DISABLED)
    }
    if (this.dp.shouldBeHighlighted(date)) {
      classes.push(ClassName.HIGHLIGHTED)
    }

    // uses moment-range
    let range = this.dp.range
    if (range) {
      if (range.contains(date)) {
        classes.push(ClassName.RANGE)
      }
      if (range.start.isSame(date) || range.end.isSame(date)) {
        classes.push(ClassName.SELECTED)
      }
      if (range.start.isSame(date)) {
        classes.push(ClassName.RANGE_START)
      }
      if (range.end.isSame(date)) {
        classes.push(ClassName.RANGE_END)
      }
    }
    return classes
  }
}

export default Renderer
