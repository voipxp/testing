;(function() {
  angular.module('odin.group').component('rruleWeekly', {
    templateUrl: 'group/components/schedules/rruleWeekly.component.html',
    controller: Controller,
    bindings: { rrule: '=', startTime: '<' }
  })

  function Controller() {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onDestroy = onDestroy
    ctrl.days = [
      { label: 'Sunday', value: rrule.RRule.SU },
      { label: 'Monday', value: rrule.RRule.MO },
      { label: 'Tuesday', value: rrule.RRule.TU },
      { label: 'Wednesday', value: rrule.RRule.WE },
      { label: 'Thursday', value: rrule.RRule.TH },
      { label: 'Friday', value: rrule.RRule.FR },
      { label: 'Saturday', value: rrule.RRule.SA }
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
      var weekday = rrule.RRule[prefix]
      ctrl.rrule.byweekday = ctrl.rrule.byweekday || []
      if (!_.find(ctrl.rrule.byweekday, weekday)) {
        ctrl.rrule.byweekday.push(weekday)
      }
    }
  }
})()
