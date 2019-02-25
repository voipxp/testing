;(function() {
  angular.module('odin.group').component('rruleSelect', {
    templateUrl: 'group/components/schedules/rruleSelect.component.html',
    controller: Controller,
    bindings: { rrule: '=', startTime: '<' }
  })

  function Controller() {
    var ctrl = this
    ctrl.update = update

    ctrl.options = [
      { label: 'Daily', value: rrule.RRule.DAILY },
      { label: 'Weekly', value: rrule.RRule.WEEKLY },
      { label: 'Monthly', value: rrule.RRule.MONTHLY },
      { label: 'Yearly', value: rrule.RRule.YEARLY }
    ]

    ctrl.label = {}
    ctrl.label[rrule.RRule.DAILY] = 'Days'
    ctrl.label[rrule.RRule.WEEKLY] = 'Weeks'
    ctrl.label[rrule.RRule.MONTHLY] = 'Months'
    ctrl.label[rrule.RRule.YEARLY] = 'Years'

    function update() {
      if (ctrl.rrule.freq) {
        ctrl.rrule.interval = ctrl.rrule.interval || 1
      } else {
        delete ctrl.rrule.interval
      }
    }
  }
})()
