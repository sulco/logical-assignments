import './style.css'
import 'alpinejs'

window.assignments = function() {
  return {
    x: [0, 0, 0, 0],
    y: [0, 0, 0, 0],
    showSc: true,
    assigned: [null, false, true, false],

    saved: [],

    save() {
      this.saved.push(
        [
          this.x[0],
          this.y[0],
          this.x[1],
          this.x[2],
          this.x[3],
          [...this.assigned],
        ].map(format),
      )
    },

    remove(i) {
      this.saved.splice(i, 1)
    },

    set(prop, i) {
      const { value } = this[`${prop}Values`][i]
      this[prop][0] = value
      this.recalc()
    },

    recalc() {
      this.x[1] = this.x[2] = this.x[3] = this.x[0]
      this.y[1] = this.y[2] = this.y[3] = this.y[0]

      // &&=  assign if x truthy
      this.assigned[1] = !!this.x[0]
      // ||=  assign if x falsy
      this.assigned[2] = !this.x[0]
      // ??=  assign if x nullish
      this.assigned[3] = [null, undefined].includes(this.x[0])

      this.x[1] &&= this.y[1]
      this.x[2] ||= this.y[2]
      this.x[3] ??= this.y[3]
    },

    xValues: [
      { value: 0, label: '0' },
      { value: 1, label: '1' },
      { value: -1, label: '-1' },
      { value: false, label: 'false' },
      { value: true, label: 'true' },
      { value: NaN, label: 'NaN' },
      { value: undefined, label: 'undefined' },
      { value: null, label: 'null' },
      { value: '', label: '""' },
      { value: 'jake', label: '"jake"' },
      { value: [], label: '[]' },
    ],

    yValues: [
      { value: 0, label: '0' },
      { value: 5, label: '5' },
      { value: -5, label: '-5' },
      { value: false, label: 'false' },
      { value: true, label: 'true' },
      { value: NaN, label: 'NaN' },
      { value: undefined, label: 'undefined' },
      { value: null, label: 'null' },
      { value: '', label: '""' },
      { value: 'jane', label: '"jane"' },
      { value: [], label: '[]' },
    ],

    format
  }
}

function format(v) {
  switch (v) {
    case undefined:
      return 'undefined'
    case null:
      return 'null'
  }
  if (v instanceof Array) {
    return '[]'
  }
  return typeof v === 'string' ? `"${v}"` : v
}
