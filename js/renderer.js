import Base from './base'
import moment from 'moment'
import 'moment-range'

const VISIBILITY_HIDDEN = {visibility: 'hidden'}
const VISIBILITY_VISIBLE = {visibility: 'visible'}
const ClassNames = {
  prev: '.prev',
  next: '.next'
}

const Default = {
  debug: false
}

/*
 TODO: Wow, this is a lot of converted code.  would be great to break this up even further if it makes sense
 */
const Renderer = class extends Base {

  constructor(datepicker) {
    super(Default)
    this.dp = datepicker
    this.config = this.db.config // shortcut reference to same config
    this.$picker = $(this.config.template)
  }

  dispose() {
    super.dispose()
    this.dp = null
    this.$picker = null
  }

  // FIXME: evaluate this and remove any code we can delegate to popper.js
  place() {
    if (this.isInline)
      return this
    let calendarWidth = this.$picker.outerWidth()
    let calendarHeight = this.$picker.outerHeight()
    let visualPadding = 10
    let container = $(this.config.container)
    let windowWidth = container.width()
    let scrollTop = this.config.container === 'body' ? $(document).scrollTop() : container.scrollTop()
    let appendOffset = container.offset()

    let parentsZindex = []
    this.dp.$element.parents().each(function () {
      let itemZIndex = $(this).css('z-index')
      if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex))
    })
    let zIndex = Math.max.apply(Math, parentsZindex) + this.config.zIndexOffset
    let offset = this.component ? this.component.parent().offset() : this.dp.$element.offset()
    let height = this.component ? this.component.outerHeight(true) : this.dp.$element.outerHeight(false)
    let width = this.component ? this.component.outerWidth(true) : this.dp.$element.outerWidth(false)
    let left = offset.left - appendOffset.left,
      top = offset.top - appendOffset.top

    if (this.config.container !== 'body') {
      top += scrollTop
    }

    this.$picker.removeClass(
      'datepicker-orient-top datepicker-orient-bottom ' +
      'datepicker-orient-right datepicker-orient-left'
    )

    if (this.config.orientation.x !== 'auto') {
      this.$picker.addClass('datepicker-orient-' + this.config.orientation.x)
      if (this.config.orientation.x === 'right')
        left -= calendarWidth - width
    }
    // auto x orientation is best-placement: if it crosses a window
    // edge, fudge it sideways
    else {
      if (offset.left < 0) {
        // component is outside the window on the left side. Move it into visible range
        this.$picker.addClass('datepicker-orient-left')
        left -= offset.left - visualPadding
      }
      else if (left + calendarWidth > windowWidth) {
        // the calendar passes the widow right edge. Align it to component right side
        this.$picker.addClass('datepicker-orient-right')
        left += width - calendarWidth
      }
      else {
        // Default to left
        this.$picker.addClass('datepicker-orient-left')
      }
    }

    // auto y orientation is best-situation: top or bottom, no fudging,
    // decision based on which shows more of the calendar
    let yorient = this.config.orientation.y
    let top_overflow
    if (yorient === 'auto') {
      top_overflow = -scrollTop + top - calendarHeight
      yorient = top_overflow < 0 ? 'bottom' : 'top'
    }

    this.$picker.addClass('datepicker-orient-' + yorient)
    if (yorient === 'top')
      top -= calendarHeight + parseInt(this.$picker.css('padding-top'))
    else
      top += height

    if (this.config.rtl) {
      let right = windowWidth - (left + width)
      this.$picker.css({
        top: top,
        right: right,
        zIndex: zIndex
      })
    }
    else {
      this.$picker.css({
        top: top,
        left: left,
        zIndex: zIndex
      })
    }
    return this
  }

  // FIXME: appears to be called in #fill and from the db constructor - redundant? naming?
  renderMonths(viewDate) {
    let html = ''
    for (let i of 11) { // 0..11
      let focused = viewDate && viewDate.month() === i ? ' focused' : ''
      html += `<span class="month ${focused}">${moment().month(i).format(`MMM`)}</span>` // Jan
    }
    this.$picker.find('.datepicker-months td').html(html)
  }

  fillDow() {
    let dowCnt = this.config.week.start
    let html = '<tr>'
    while (dowCnt < this.config.week.start + 7) {
      let disabledClass = ($.inArray(dowCnt, this.config.daysOfWeek.disabled) > -1) ? 'disabled' : ''
      //html += `<th class="dow ${disabledClass}">${dates[this.config.language].daysMin[(dowCnt++) % 7]}</th>`
      html += `<th class="dow ${disabledClass}">${this.dp.newMoment().day((dowCnt++) % 7).format('dd')}</th>`
    }
    html += '</tr>'
    this.$picker.find('.datepicker-days thead').append(html)
  }

  fill() {
    let viewDate = this.dp.viewDate.clone().local()
    let year = viewDate.year()
    let month = viewDate.month()

    let startYear = this.config.date.start.year()
    let startMonth = this.config.date.start.month()
    let endYear = this.config.date.end.year()
    let endMonth = this.config.date.end.month()

    //let todaytxt = dates[this.config.language].today || dates['en'].today || ''
    //let cleartxt = dates[this.config.language].clear || dates['en'].clear || ''
    //let titleFormat = dates[this.config.language].titleFormat || dates['en'].titleFormat
    let titleFormat = `ddd, MMM D` // Thu, Apr 13

    if (isNaN(year) || isNaN(month))
      return
    this.$picker.find('.datepicker-days .datepicker-switch').text(this.dp.formatDate(viewDate, titleFormat))
    // FIXME: remove option?
    //this.$picker.find('tfoot .today').text(todaytxt).toggle(this.config.today.button !== false)
    // FIXME: remove option?
    //this.$picker.find('tfoot .clear').text(cleartxt).toggle(this.config.clearBtn !== false)
    // FIXME: remove option? title text?
    this.$picker.find('thead .datepicker-title').text(this.config.title).toggle(this.config.title !== '')
    this.updateNavArrows(viewDate)
    this.renderMonths(viewDate)

    // get prevMonth moment set to same day of the week
    let prevMonth = viewDate.clone().startOf('month').subtract(1, 'day') // end of last month
    prevMonth.day(prevMonth.day() - (prevMonth.day() - this.config.week.start + 7) % 7) // set day of week

    // TODO: not sure why 42 days is added (yet)...
    let nextMonth = prevMonth.clone().add(42, 'days')

    // render days
    let html = []
    while (prevMonth.isBefore(nextMonth)) {
      this.renderDay(viewDate, prevMonth)
      prevMonth.add(1, 'days')
    }
    this.$picker.find('.datepicker-days tbody').empty().append(html.join(''))

    let monthsTitle = `use year here?`//dates[this.config.language].monthsTitle || dates['en'].monthsTitle || 'Months'
    let $months = this.$picker.find('.datepicker-months')
      .find('.datepicker-switch')
      .text(this.config.view.max < 2 ? monthsTitle : year)
      .end()
      .find('span').removeClass('active')


    for (let d of this.dp.dates.array) {
      if (d.year() === year) {
        $months.eq(d.month()).addClass('active')
      }
    }

    if (year < startYear || year > endYear) {
      $months.addClass('disabled')
    }
    if (year === startYear) {
      $months.slice(0, startMonth).addClass('disabled')
    }
    if (year === endYear) {
      $months.slice(endMonth + 1).addClass('disabled')
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
        let moDate = this.db.newMoment().year(year).month(i).startOf('month')
        //let moDate = new Date(year, i, 1)
        let before = that.config.beforeShowMonth(moDate)
        if (before === undefined) {
          before = {}
        }
        if (before.selectable === false && !$month.hasClass('disabled')) {
          $month.addClass('disabled')
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
      '.datepicker-years',
      'year',
      10,
      1,
      year,
      startYear,
      endYear,
      this.config.beforeShowYear
    )

    // Generating century/decades picker
    this.fillYearsView(
      '.datepicker-decades',
      'decade',
      100,
      10,
      year,
      startYear,
      endYear,
      this.config.beforeShowDecade
    )

    // Generating millennium/centuries picker
    this.fillYearsView(
      '.datepicker-centuries',
      'century',
      1000,
      100,
      year,
      startYear,
      endYear,
      this.config.beforeShowCentury
    )
  }

  // called publicly from dp#showMode
  updateNavArrows(viewDate) {
    if (!this.allowUpdate)
      return

    let year = viewDate.year()
    let month = viewDate.month()

    switch (this.dp.viewMode) {
      case 0:
        if (year <= this.config.date.start.year() && month <= this.config.date.start.month()) {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_HIDDEN)
        }
        else {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_VISIBLE)
        }
        if (year >= this.config.date.end.year() && month >= this.config.date.end.month()) {
          this.$picker.find(ClassNames.next).css(VISIBILITY_HIDDEN)
        }
        else {
          this.$picker.find(ClassNames.next).css(VISIBILITY_VISIBLE)
        }
        break
      case 1:
      case 2:
      case 3:
      case 4:
        if (year <= this.config.date.start.year() || this.config.view.max < 2) {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_HIDDEN)
        }
        else {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_VISIBLE)
        }
        if (year >= this.config.date.end.year() || this.config.view.max < 2) {
          this.$picker.find(ClassNames.next).css(VISIBILITY_HIDDEN)
        }
        else {
          this.$picker.find(ClassNames.next).css(VISIBILITY_VISIBLE)
        }
        break
    }
  }

  // ------------------------------------------------------------------------
  // private

  fillYearsView(selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
    //let before

    let html = ''
    let $view = this.$picker.find(selector)
    let year = parseInt(currentYear / factor, 10) * factor
    let startStep = parseInt(startYear / step, 10) * step
    let endStep = parseInt(endYear / step, 10) * step
    let steps = $.map(this.dates.array, function (d) {
      return parseInt(d.getUTCFullYear() / step, 10) * step
    })

    $view.find('.datepicker-switch').text(`${year}-${year + step * 9}`)

    let thisYear = year - step
    for (let i = -1; i < 11; i += 1) {
      let classes = [cssClass]
      let tooltip = null

      if (i === -1) {
        classes.push('old')
      }
      else if (i === 10) {
        classes.push('new')
      }
      if ($.inArray(thisYear, steps) !== -1) {
        classes.push('active')
      }
      if (thisYear < startStep || thisYear > endStep) {
        classes.push('disabled')
      }
      if (thisYear === this.viewDate.getFullYear()) {
        classes.push('focused')
      }

      /*
       A function that takes a date as a parameter and returns one of the following values:

       - undefined to have no effect
       - An object with the following properties:
       selectable: A Boolean, indicating whether or not this date is selectable
       classes: A String representing additional CSS classes to apply to the date’s cell
       tooltip: A tooltip to apply to this date, via the title HTML attribute
       */
      if (callback !== $.noop) {
        //before = callback(new Date(thisYear, 0, 1))
        let m = this.db.newMoment().year(thisYear).month(0).startOf('month')
        before = callback(m)

        if (before === undefined) {
          before = {}
        }
        if (before.selectable === false) {
          classes.push('disabled')
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

  renderDay(viewDate, prevMonth) {
    let before = null
    let tooltip = null
    if (prevMonth.day() === this.config.week.start) {
      html.push('<tr>')
    }
    let classNames = this.getClassNames(viewDate, prevMonth)
    classNames.push('day')

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
        classNames.push('disabled')
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

  getClassNames(viewDate, date) {
    let classes = []
    let year = viewDate.year()
    let month = viewDate.month()

    let today = this.db.newMoment().local()

    if (date.year() < year || (date.year() === year && date.month() < month)) {
      classes.push('old')
    }
    else if (date.year() > year || (date.year() === year && date.month() > month)) {
      classes.push('new')
    }
    if (this.dp.focusDate && date.isSame(this.dp.focusDate, 'day')) {
      classes.push('focused')
    }
    // Compare internal UTC date with local today, not UTC today
    if (this.config.today.highlight && date.isSame(today, 'day')) {
      classes.push('today')
    }
    if (this.dp.dates.contains(date) !== -1) {
      classes.push('active')
    }
    if (!this.dp.dateWithinRange(date)) {
      classes.push('disabled')
    }
    if (this.dp.dateIsDisabled(date)) {
      classes.push('disabled', 'disabled-date')
    }
    if (this.dp.shouldBeHighlighted(date)) {
      classes.push('highlighted')
    }

    // uses moment-range
    let range = this.dp.range
    if (range) {
      if (range.contains(date)) {
        classes.push('range')
      }
      if (range.start.isSame(date) || range.end.isSame(date)) {
        classes.push('selected')
      }
      if (range.start.isSame(date)) {
        classes.push('range-start')
      }
      if (range.end.isSame(date)) {
        classes.push('range-end')
      }
    }
    return classes
  }
}

export default Renderer
