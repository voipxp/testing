;(function() {
  angular.module('odin.group').component('rruleEnds', {
    templateUrl: 'group/components/schedules/rruleEnds.component.html',
    controller: Controller,
    bindings: { rrule: '=', startTime: '<' }
  })

  function Controller() {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onDestroy = onDestroy
    ctrl.update = update

    function onInit() {
      if (ctrl.rrule.until) {
        ctrl.endsPattern = 'On'
      } else if (ctrl.rrule.count || ctrl.rrule.count === 0) {
        ctrl.endsPattern = 'After'
      }
    }

    // cleanup
    function onDestroy() {
      delete ctrl.rrule.count
      delete ctrl.rrule.until
    }

    function update() {
      if (ctrl.endsPattern === 'After') {
        delete ctrl.rrule.until
        ctrl.rrule.count = ctrl.rrule.count || 1
      } else if (ctrl.endsPattern === 'On') {
        delete ctrl.rrule.count
      } else {
        delete ctrl.rrule.count
        delete ctrl.rrule.until
      }
    }
  }
})()
