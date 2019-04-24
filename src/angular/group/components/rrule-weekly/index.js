import angular from 'angular'
import Sugar from 'sugar-date'
import _ from 'lodash'
import { RRule } from 'rrule'
import template from './index.html'

angular.module('odin.group').component('rruleWeekly', {
  template,
  controller,
  bindings: { rrule: '=', startTime: '<' }
})

function controller() {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onDestroy = onDestroy
  ctrl.days = [
    { label: 'Sunday', value: RRule.SU },
    { label: 'Monday', value: RRule.MO },
    { label: 'Tuesday', value: RRule.TU },
    { label: 'Wednesday', value: RRule.WE },
    { label: 'Thursday', value: RRule.TH },
    { label: 'Friday', value: RRule.FR },
    { label: 'Saturday', value: RRule.SA }
  ]

  function onInit() {
    setDefault()
  }

  function onDestroy() {
    delete ctrl.rrule.byweekday
  }

  function isNew() {
    return _.isEmpty(ctrl.rrule.byweekday)
  }

  // default to setting day of the startTime
  function setDefault() {
    if (!isNew()) return
    var day = Sugar.Date.format(ctrl.startTime, '{Weekday}')
    var prefix = day.slice(0, 2).toUpperCase()
    var weekday = RRule[prefix]
    ctrl.rrule.byweekday = ctrl.rrule.byweekday || []
    if (!_.find(ctrl.rrule.byweekday, weekday)) {
      ctrl.rrule.byweekday.push(weekday)
    }
  }
}
