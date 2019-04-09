import angular from 'angular'
import { RRule } from 'rrule'
import template from './index.html'

angular.module('odin.group').component('rruleSelect', {
  template,
  controller,
  bindings: { rrule: '=', startTime: '<' }
})

function controller() {
  var ctrl = this
  ctrl.update = update

  ctrl.options = [
    { label: 'Daily', value: RRule.DAILY },
    { label: 'Weekly', value: RRule.WEEKLY },
    { label: 'Monthly', value: RRule.MONTHLY },
    { label: 'Yearly', value: RRule.YEARLY }
  ]

  ctrl.label = {}
  ctrl.label[RRule.DAILY] = 'Days'
  ctrl.label[RRule.WEEKLY] = 'Weeks'
  ctrl.label[RRule.MONTHLY] = 'Months'
  ctrl.label[RRule.YEARLY] = 'Years'

  function update() {
    if (ctrl.rrule.freq) {
      ctrl.rrule.interval = ctrl.rrule.interval || 1
    } else {
      delete ctrl.rrule.interval
    }
  }
}
