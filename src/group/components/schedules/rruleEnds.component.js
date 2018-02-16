;(function() {
  angular.module('odin.group').component('rruleEnds', {
    templateUrl: 'group/components/schedules/rruleEnds.component.html',
    controller: Controller,
    bindings: { rrule: '=', startTime: '<' }
  })

  function Controller() {
    var ctrl = this
    ctrl.$onDestroy = onDestroy
    ctrl.update = update

    // cleanup
    function onDestroy() {
      delete ctrl.rrule.count
      delete ctrl.rrule.until
    }

    function update(endsPattern) {
      if (endsPattern === 'After') {
        delete ctrl.rrule.until
        ctrl.rrule.count = ctrl.rrule.count || 1
      } else if (endsPattern === 'On') {
        delete ctrl.rrule.count
      } else {
        delete ctrl.rrule.count
        delete ctrl.rrule.until
      }
    }
  }
})()
