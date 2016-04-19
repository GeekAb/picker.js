const COMPARE_DATE_FORMAT = 'MM/DD/YYYY' // date granularity

/**
 * Helper converted from legacy code, not sure we need to keep it but for ease of conversion of the entire
 *  codebase, I've kept it.  TODO: Revisit this later to see if we actually need it.
 *  FIXME: if we keep this after refactoring, we _have_ to rename it.
 */
const DateArray = class {
  constructor(...moments) {
    this.array = [].concat(moments)
  }

  last() {
    return this.get(-1)
  }

  length() {
    return this.array.length
  }

  push(m) {
    this.array.push(m)
  }

  get(i) {
    return this.array.slice(i)[0]
  }

  /**
   * Compares at the granularity of
   * @param other
   * @param granularity - default 'date' (not specific to hours/minutes/seconds)
   * @returns {*}
   */
  contains(other, granularity = 'date') {
    for (let i in this.array) {
      let m = this.array[i]
      if (m.isSame(other, granularity)) {
        return i
      }
    }

    return -1
  }

  /**
   * Requires the same number and order of dates, then does a deep compare given the format
   * @param otherDateArray
   * @returns {boolean}
   */
  isSame(otherDateArray) {
    if (!otherDateArray) {
      return false
    }

    if(this.length() !== otherDateArray.length()){
      return false
    }

    for (let i in this.array) {
      let a = this.array[i]
      let b = otherDateArray.array[i]

      if(!a.isSame(b)){
        return false
      }
    }

    return true
  }

  remove(i) {
    this.array.splice(i, 1)
  }

  clear() {
    this.array = []
  }

  copy() {
    return new DateArray(...this.array)
  }

  clonedArray() {
    let clones = []
    for (let m of this.array) {
      clones.push(m.clone())
    }

    return clones
  }

  /**
   *
   * @param format - any momentjs format - default null will yield "2014-09-08T08:02:17-05:00" (ISO 8601)
   * @returns {Array}
   */
  formattedArray(format = null) {
    let formatted = []
    for (let m of this.array) {
      formatted.push(m.local().format(format))  // needs to be local as it is displayed or put into the input
    }
    return formatted
  }
}

export default DateArray
