import Base from './base'
import {Selector, ClassName, Unit, View, Visibility} from './constants'

/*
 TODO: Wow, this is a lot of converted code.  would be great to break this up even further if it makes sense
 */
const Renderer = class extends Base {

  constructor(datepicker) {
    super()
    this.dp = datepicker
    this.config = this.dp.config // shortcut reference to same config
    this.$picker = $(this.config.template)

    if (this.dp.isInline) {
      this.$picker.addClass(ClassName.INLINE).appendTo(this.dp.$element)
    }
    else {
      this.$picker.addClass(ClassName.DROPDOWN)
    }

    if (this.config.rtl) {
      this.$picker.addClass(ClassName.RTL)
    }

    this.renderDaysOfWeekHeader()
  }

  dispose() {
    this.$picker.remove()
    this.$picker = undefined
    this.dp = undefined
    super.dispose()
  }

  fill() {
    let viewDate = this.dp.viewDate.clone().local()
    let year = viewDate.year()
    let month = viewDate.month()

    let startYear = this.config.date.start.year()
    let startMonth = this.config.date.start.month()
    let endYear = this.config.date.end.year()
    let endMonth = this.config.date.end.month()

    //FIXME: remove these????
    let todayText = this.i18n('today')
    let clearText = this.i18n('clear')
    //let titleFormat = dates[this.config.language].titleFormat || dates['en'].titleFormat
    let titleFormat = `ddd, MMM D` // Thu, Apr 13

    if (isNaN(year) || isNaN(month))
      return
    this.$picker.find(`${Selector.DAYS} ${Selector.SWITCH}`).text(this.dp.formatDate(viewDate, titleFormat))
    // FIXME: remove option?
    this.$picker.find('tfoot .today').text(todayText).toggle(this.config.today.button !== false)
    // FIXME: remove option?
    this.$picker.find('tfoot .clear').text(clearText).toggle(this.config.clearBtn !== false)
    // FIXME: remove option? title text?
    this.$picker.find(`thead ${Selector.TITLE}`).text(this.config.title).toggle(this.config.title !== '')
    this.updateNavArrows(viewDate)
    this.renderMonths(viewDate)

    // get prevMonth moment set to same day of the week
    let prevMonth = viewDate.clone().startOf(Unit.MONTH).subtract(1, 'day') // end of last month
    prevMonth.day(prevMonth.day() - (prevMonth.day() - this.config.week.start + 7) % 7) // set day of week

    // TODO: not sure why 42 days is added (yet)...
    let nextMonth = prevMonth.clone().add(42, 'days')

    // render days
    let html = []
    while (prevMonth.isBefore(nextMonth)) {
      this.renderDay(viewDate, prevMonth, html)
      prevMonth.add(1, 'days')
    }
    this.$picker.find(`${Selector.DAYS} tbody`).empty().append(html.join(''))

    let monthsTitle = `use year here?`//dates[this.config.language].monthsTitle || dates['en'].monthsTitle || 'Months'
    let $months = this.$picker.find(Selector.MONTHS)
      .find(Selector.SWITCH)
      .text(this.config.view.max < View.YEARS ? monthsTitle : year)
      .end()
      .find('span').removeClass(ClassName.ACTIVE)


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
     selectable: A Boolean, indicating whether or not this date is selectable
     classes: A String representing additional CSS classes to apply to the date’s cell
     tooltip: A tooltip to apply to this date, via the title HTML attribute
     */
    if (this.config.beforeShowMonth !== undefined) {
      for (let i in $months) {
        //$.each($months, function (i, month) {
        let $month = $($months[i])
        let moDate = this.dp.newMoment().year(year).month(i).startOf(Unit.MONTH)
        let before = this.config.beforeShowMonth(moDate)
        if (before === undefined) {
          before = {}
        }
        if (before.selectable === false && !$month.hasClass(ClassName.DISABLED)) {
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

    // Generating decade/years picker
    this.fillYearsView(
      Selector.YEARS,
      Unit.YEAR,
      10,
      1,
      year,
      startYear,
      endYear,
      this.config.beforeShowYear
    )

    // Generating century/decades picker
    this.fillYearsView(
      Selector.DECADES,
      Unit.DECADE,
      100,
      10,
      year,
      startYear,
      endYear,
      this.config.beforeShowDecade
    )

    // Generating millennium/centuries picker
    this.fillYearsView(
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

  // called publicly from dp#changeView
  updateNavArrows(viewDate) {
    if (!this.allowUpdate)
      return

    let year = viewDate.year()
    let month = viewDate.month()

    switch (this.dp.viewMode) {
      case View.DAYS:
        if (year <= this.config.date.start.year() && month <= this.config.date.start.month()) {
          this.$picker.find(Selector.PREV).css(Visibility.HIDDEN)
        }
        else {
          this.$picker.find(Selector.PREV).css(Visibility.VISIBLE)
        }
        if (year >= this.config.date.end.year() && month >= this.config.date.end.month()) {
          this.$picker.find(Selector.NEXT).css(Visibility.HIDDEN)
        }
        else {
          this.$picker.find(Selector.NEXT).css(Visibility.VISIBLE)
        }
        break
      case View.MONTHS:
      case View.YEARS:
      case View.DECADES:
      case View.CENTURIES:
        if (year <= this.config.date.start.year() || this.config.view.max < View.YEARS) {
          this.$picker.find(Selector.PREV).css(Visibility.HIDDEN)
        }
        else {
          this.$picker.find(Selector.PREV).css(Visibility.VISIBLE)
        }
        if (year >= this.config.date.end.year() || this.config.view.max < View.YEARS) {
          this.$picker.find(Selector.NEXT).css(Visibility.HIDDEN)
        }
        else {
          this.$picker.find(Selector.NEXT).css(Visibility.VISIBLE)
        }
        break
    }
  }

  // ------------------------------------------------------------------------
  // private

  renderDaysOfWeekHeader() {
    let dowCnt = this.config.week.start
    let html = '<tr>'
    while (dowCnt < this.config.week.start + 7) {
      let disabledClass = ($.inArray(dowCnt, this.config.daysOfWeek.disabled) > -1) ? ClassName.DISABLED : ''
      html += `<th class="${ClassName.DOW} ${disabledClass}">${this.dp.newMoment().day((dowCnt++) % 7).format('dd')}</th>`
    }
    html += '</tr>'
    this.$picker.find(`${Selector.DAYS} thead`).append(html)
  }

  renderDay(viewDate, prevMonth, html) {
    let before = null
    let tooltip = ''
    if (prevMonth.day() === this.config.week.start) {
      html.push('<tr>')
    }
    let classNames = this.getClassNames(viewDate, prevMonth)
    classNames.push(Unit.DAY)

    /*
     A function that takes a date as a parameter and returns one of the following values:

     - undefined to have no effect
     - An object with the following properties:
     selectable: A Boolean, indicating whether or not this date is selectable
     classes: A String representing additional CSS classes to apply to the date’s cell
     tooltip: A tooltip to apply to this date, via the title HTML attribute
     */
    if (this.config.beforeShowDay !== undefined) {
      before = this.config.beforeShowDay(prevMonth)
      if (before === undefined) {
        before = {}
      }
      if (before.selectable === false) {
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
    html.push(`<td class="${classNames.join(' ')}"${tooltip}>${prevMonth.date()}</td>`)
    if (prevMonth.day() === this.config.week.end) {
      html.push('</tr>')
    }
  }

  renderMonths(viewDate) {
    let html = ''
    for (let i = 0; i < 12; i++) { // 0..11
      let focused = viewDate && viewDate.month() === i ? ClassName.FOCUSED : ''
      html += `<span class="${Unit.MONTH} ${focused}">${this.dp.newMoment().month(i).format(`MMM`)}</span>` // Jan
    }
    this.$picker.find(`${Selector.MONTHS} td`).html(html)
  }

  fillYearsView(selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
    //let before

    let html = ''
    let $view = this.$picker.find(selector)
    let year = parseInt(currentYear / factor, 10) * factor
    let startStep = parseInt(startYear / step, 10) * step
    let endStep = parseInt(endYear / step, 10) * step
    let steps = $.map(this.dp.dates.array, function (d) {
      return parseInt(d.year() / step, 10) * step
    })

    $view.find(Selector.SWITCH).text(`${year}-${year + step * 9}`)

    let thisYear = year - step
    for (let i = -1; i < 11; i += 1) {
      let classes = [cssClass]
      let tooltip = null

      if (i === -1) {
        classes.push(ClassName.OLD)
      }
      else if (i === 10) {
        classes.push(ClassName.NEW)
      }
      if ($.inArray(thisYear, steps) !== -1) {
        classes.push(ClassName.ACTIVE)
      }
      if (thisYear < startStep || thisYear > endStep) {
        classes.push(ClassName.DISABLED)
      }
      if (thisYear === this.dp.viewDate.year()) {
        classes.push(ClassName.FOCUSED)
      }

      /*
       A function that takes a date as a parameter and returns one of the following values:

       - undefined to have no effect
       - An object with the following properties:
       selectable: A Boolean, indicating whether or not this date is selectable
       classes: A String representing additional CSS classes to apply to the date’s cell
       tooltip: A tooltip to apply to this date, via the title HTML attribute
       */
      if (callback !== undefined) {
        //before = callback(new Date(thisYear, 0, 1))
        let m = this.dp.newMoment().year(thisYear).month(0).startOf(Unit.MONTH)
        let before = callback(m)

        if (before === undefined) {
          before = {}
        }
        if (before.selectable === false) {
          classes.push(ClassName.DISABLED)
        }
        if (before.classes) {
          classes = classes.concat(before.classes.split(/\s+/))
        }
        if (before.tooltip) {
          tooltip = before.tooltip ? `title="${before.tooltip}"` : ''
        }
      }

      html += `<span class="${classes.join(' ')}"${tooltip}>${thisYear}</span>`
      thisYear += step
    }
    $view.find('td').html(html)
  }

  getClassNames(viewDate, date) {
    let classes = []
    let year = viewDate.year()
    let month = viewDate.month()

    let today = this.dp.newMoment().local()

    if (date.year() < year || (date.year() === year && date.month() < month)) {
      classes.push(ClassName.OLD)
    }
    else if (date.year() > year || (date.year() === year && date.month() > month)) {
      classes.push(ClassName.NEW)
    }
    if (this.dp.focusDate && date.isSame(this.dp.focusDate, 'day')) {
      classes.push(ClassName.FOCUSED)
    }
    // Compare internal UTC date with local today, not UTC today
    if (this.config.today.highlight && date.isSame(today, 'day')) {
      classes.push(ClassName.TODAY)
    }
    if (this.dp.dates.contains(date) !== -1) {
      classes.push(ClassName.ACTIVE)
    }
    if (!this.dp.dateWithinRange(date)) {
      classes.push(ClassName.DISABLED)
    }
    if (this.dp.dateIsDisabled(date)) {
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
