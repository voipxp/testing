import angular from 'angular'
import Sugar from 'sugar-date'
import _ from 'lodash'
import { RRule } from 'rrule'
import template from './index.html'

angular.module('odin.group').component('rruleMonthly', {
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
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }

  function onInit() {
    flatten('byweekday')
    flatten('bymonthday')
    parseWeekday()
    setDefault()
  }

  // cleanup
  function onDestroy() {
    delete ctrl.rrule.byweekday
    delete ctrl.rrule.bymonthday
  }

  function flatten(property) {
    if (_.isArray(ctrl.rrule[property])) {
      ctrl.rrule[property] = ctrl.rrule[property][0]
    }
  }

  function updatePrefix() {
    if (!ctrl.weekdayPrefix) {
      delete ctrl.rrule.byweekday
      setDefault()
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

  // set to monthday of startTime if no byweekday
  function setDefault() {
    if (ctrl.rrule.bymonthday || ctrl.rrule.byweekday) return
    ctrl.rrule.bymonthday = ctrl.startTime.getDate()
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
