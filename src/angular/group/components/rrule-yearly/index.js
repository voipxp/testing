/*
  if !byweekday, set prefix to null
  if byweekday, set prefix and suffix
*/

import angular from 'angular'
import _ from 'lodash'
import { RRule } from 'rrule'
import Sugar from 'sugar-date'
import template from './index.html'

angular.module('odin.group').component('rruleYearly', {
  template,
  controller,
  bindings: { rrule: '=', startTime: '<' }
})

function controller() {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onDestroy = onDestroy
  ctrl.updatePrefix = updatePrefix
  ctrl.updateSuffix = updateSuffix

  var weekdayPrefixes = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Last: -1
  }

  ctrl.options = {
    weekdayPrefix: Object.keys(weekdayPrefixes),
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months: [
      { label: 'January', index: 1 },
      { label: 'February', index: 2 },
      { label: 'March', index: 3 },
      { label: 'April', index: 4 },
      { label: 'May', index: 5 },
      { label: 'June', index: 6 },
      { label: 'July', index: 7 },
      { label: 'August', index: 8 },
      { label: 'September', index: 9 },
      { label: 'October', index: 10 },
      { label: 'November', index: 11 },
      { label: 'December', index: 12 }
    ]
  }

  function onInit() {
    flatten('byweekday')
    flatten('bymonthday')
    flatten('bymonth')
    setDefaultMonth()
    parseWeekday()
    setDefaultMonthDay()
  }

  // cleanup
  function onDestroy() {
    delete ctrl.rrule.byweekday
    delete ctrl.rrule.bymonthday
    delete ctrl.rrule.bymonth
  }

  function flatten(property) {
    if (_.isArray(ctrl.rrule[property])) {
      ctrl.rrule[property] = ctrl.rrule[property][0]
    }
  }

  function updatePrefix() {
    if (!ctrl.weekdayPrefix) {
      delete ctrl.rrule.byweekday
      setDefaultMonthDay()
    } else {
      delete ctrl.rrule.bymonthday
      setDefaultSuffix()
      setWeekday()
    }
  }

  // parse currently set weekday into prefix/suffix
  function parseWeekday() {
    if (!ctrl.rrule.byweekday) return
    var prefix = _.find(Object.keys(weekdayPrefixes), function(prefix) {
      return weekdayPrefixes[prefix] === ctrl.rrule.byweekday.n
    })
    ctrl.weekdayPrefix = prefix
    var suffix = ctrl.options.days[ctrl.rrule.byweekday.weekday]
    ctrl.weekdaySuffix = suffix
    setWeekday()
  }

  function updateSuffix() {
    setWeekday()
  }

  // only set default if we are not doing byweekday and bymonthday is unset
  function setDefaultMonthDay() {
    if (ctrl.rrule.byweekday || ctrl.rrule.bymonthday) return
    ctrl.rrule.bymonthday = ctrl.startTime.getDate()
  }

  // set to startTime month
  function setDefaultMonth() {
    if (ctrl.rrule.bymonth) return
    ctrl.rrule.bymonth = ctrl.startTime.getMonth() + 1
  }

  // set to weekday of startTime
  function setDefaultSuffix() {
    if (ctrl.rrule.weekdaySuffix) return
    ctrl.weekdaySuffix = Sugar.Date.format(ctrl.startTime, '{Weekday}')
  }

  // merge the prefix and suffix into weekday object
  function setWeekday() {
    var prefix = weekdayPrefixes[ctrl.weekdayPrefix]
    var suffix = ctrl.weekdaySuffix.slice(0, 2).toUpperCase()
    ctrl.rrule.byweekday = [RRule[suffix].nth(prefix)]
  }
}
