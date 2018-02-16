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
      { label: 'Sun', value: RRule.SU },
      { label: 'Mon', value: RRule.MO },
      { label: 'Tue', value: RRule.TU },
      { label: 'Wed', value: RRule.WE },
      { label: 'Thu', value: RRule.TH },
      { label: 'Fri', value: RRule.FR },
      { label: 'Sat', value: RRule.SA }
    ]

    console.log('days', ctrl.days)

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
})()
