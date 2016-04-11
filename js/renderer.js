import Base from './base'

const VISIBILITY_HIDDEN = {visibility: 'hidden'}
const VISIBILITY_VISIBLE = {visibility: 'visible'}
const ClassNames = {
  prev: '.prev',
  next: '.next'
}

const Default = {
  debug: false
}

const Renderer = class extends Base {

  constructor(datepicker) {
    super(Default)
    this.dp = datepicker
    this.config = this.db.config // shortcut reference to same config
    this.$picker = $(this.config.template)
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
      return;
    this.$picker.find('.datepicker-days .datepicker-switch').text(this.dp.formatDate(viewDate, titleFormat));
    // FIXME: remove option?
    //this.$picker.find('tfoot .today').text(todaytxt).toggle(this.config.today.button !== false);
    // FIXME: remove option?
    //this.$picker.find('tfoot .clear').text(cleartxt).toggle(this.config.clearBtn !== false);
    // FIXME: remove option? title text?
    this.$picker.find('thead .datepicker-title').text(this.config.title).toggle(this.config.title !== '');
    this.updateNavArrows(viewDate);
    this.fillMonths(viewDate);

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
    this.$picker.find('.datepicker-days tbody').empty().append(html.join(''));




    xxxxxx

    let monthsTitle = `use year here?`//dates[this.config.language].monthsTitle || dates['en'].monthsTitle || 'Months';
    let months = this.$picker.find('.datepicker-months')
      .find('.datepicker-switch')
      .text(this.config.view.max < 2 ? monthsTitle : year)
      .end()
      .find('span').removeClass('active');

    $.each(this.dp.dates, function (i, d) {
      if (d.year() === year)
        months.eq(d.month()).addClass('active');
    });

    if (year < startYear || year > endYear) {
      months.addClass('disabled');
    }
    if (year === startYear) {
      months.slice(0, startMonth).addClass('disabled');
    }
    if (year === endYear) {
      months.slice(endMonth + 1).addClass('disabled');
    }

    if (this.config.beforeShowMonth !== $.noop) {
      let that = this;
      $.each(months, function (i, month) {
        let moDate = new Date(year, i, 1);
        // FIXME: use different format
        let before = that.config.beforeShowMonth(moDate);
        if (before === undefined)
          before = {};
        else if (typeof(before) === 'boolean')
          before = {enabled: before};
        else if (typeof(before) === 'string')
          before = {classes: before};
        if (before.enabled === false && !$(month).hasClass('disabled'))
          $(month).addClass('disabled');
        if (before.classes)
          $(month).addClass(before.classes);
        if (before.tooltip)
          $(month).prop('title', before.tooltip);
      });
    }

    // Generating decade/years picker
    this.dp._fill_yearsView(
      '.datepicker-years',
      'year',
      10,
      1,
      year,
      startYear,
      endYear,
      this.config.beforeShowYear
    );

    // Generating century/decades picker
    this.dp._fill_yearsView(
      '.datepicker-decades',
      'decade',
      100,
      10,
      year,
      startYear,
      endYear,
      this.config.beforeShowDecade
    );

    // Generating millennium/centuries picker
    this.dp._fill_yearsView(
      '.datepicker-centuries',
      'century',
      1000,
      100,
      year,
      startYear,
      endYear,
      this.config.beforeShowCentury
    );
  }

  renderDay(viewDate, prevMonth) {
    let before = null
    let tooltip = null
    if (prevMonth.day() === this.config.week.start) {
      html.push('<tr>')
    }
    let classNames = this.getClassNames(viewDate, prevMonth);
    classNames.push('day');

    /*
     A function that takes a date as a parameter and returns one of the following values:

     - undefined to have no effect
     - An object with the following properties:
     selectable: A Boolean, indicating whether or not this date is selectable
     classes: A String representing additional CSS classes to apply to the date’s cell
     tooltip: A tooltip to apply to this date, via the title HTML attribute
     */
    if (this.config.beforeShowDay !== undefined) {
      before = this.config.beforeShowDay(prevMonth);
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
        tooltip = before.tooltip ? `title="${before.tooltip}"` : null
      }
    }

    classNames = $.unique(classNames);
    html.push(`<td class="${classNames.join(' ')}" ${tooltip}>${prevMonth.date()}</td>`)
    if (prevMonth.day() === this.config.week.end) {
      html.push('</tr>');
    }
  }


  fillMonths(viewDate) {
    let html = ''
    for (let i of 11) { // 0..11
      let focused = viewDate && viewDate.month() === i ? ' focused' : '';
      html += `<span class="month ${focused}">${moment().month(i).format(`MMM`)}</span>` // Jan
    }
    this.$picker.find('.datepicker-months td').html(html);
  }

  updateNavArrows(viewDate) {
    if (!this.allowUpdate)
      return;

    let year = viewDate.year()
    let month = viewDate.month()

    switch (this.dp.viewMode) {
      case 0:
        if (year <= this.config.date.start.year() && month <= this.config.date.start.month()) {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_HIDDEN);
        }
        else {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_VISIBLE);
        }
        if (year >= this.config.date.end.year() && month >= this.config.date.end.month()) {
          this.$picker.find(ClassNames.next).css(VISIBILITY_HIDDEN);
        }
        else {
          this.$picker.find(ClassNames.next).css(VISIBILITY_VISIBLE);
        }
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        if (year <= this.config.date.start.year() || this.config.view.max < 2) {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_HIDDEN);
        }
        else {
          this.$picker.find(ClassNames.prev).css(VISIBILITY_VISIBLE);
        }
        if (year >= this.config.date.end.year() || this.config.view.max < 2) {
          this.$picker.find(ClassNames.next).css(VISIBILITY_HIDDEN);
        }
        else {
          this.$picker.find(ClassNames.next).css(VISIBILITY_VISIBLE);
        }
        break;
    }
  }

  getClassNames(viewDate, date) {
    let classes = []
    let year = viewDate.year()
    let month = viewDate.month()

    let today = this.db.newMoment().local()

    if (date.year() < year || (date.year() === year && date.month() < month)) {
      classes.push('old');
    }
    else if (date.year() > year || (date.year() === year && date.month() > month)) {
      classes.push('new');
    }
    if (this.dp.focusDate && date.isSame(this.dp.focusDate, 'day')) {
      classes.push('focused');
    }
    // Compare internal UTC date with local today, not UTC today
    if (this.config.today.highlight && date.isSame(today, 'day')) {
      classes.push('today');
    }
    if (this.dp.dates.contains(date) !== -1) {
      classes.push('active');
    }
    if (!this.dp.dateWithinRange(date)) {
      classes.push('disabled');
    }
    if (this.dp.dateIsDisabled(date)) {
      classes.push('disabled', 'disabled-date');
    }
    if (this.dp.shouldBeHighlighted(date)) {
      classes.push('highlighted');
    }

    // FIXME: range needs work - be sure to look at moment-range
    if (this.dp.range) {
      if (date > this.dp.range[0] && date < this.dp.range[this.dp.range.length - 1]) {
        classes.push('range');
      }
      if ($.inArray(date.valueOf(), this.dp.range) !== -1) {
        classes.push('selected');
      }
      if (date.valueOf() === this.dp.range[0]) {
        classes.push('range-start');
      }
      if (date.valueOf() === this.dp.range[this.dp.range.length - 1]) {
        classes.push('range-end');
      }
    }
    return classes;
  }
}

export default Renderer
