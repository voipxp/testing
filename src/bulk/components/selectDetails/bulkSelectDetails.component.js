;(function() {
  angular.module('odin.bulk').component('bulkSelectDetails', {
    templateUrl:
      'bulk/components/selectDetails/bulkSelectDetails.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      timeZone: '<',
      language: '<',
      networkClassOfService: '<',
      onUpdate: '&'
    }
  })

  function Controller($q, Alert, EventEmitter) {
    var ctrl = this
    ctrl.complete = complete

    function complete() {
      ctrl.onUpdate(
        EventEmitter({
          timeZone: ctrl.timeZone,
          language: ctrl.language,
          networkClassOfService: ctrl.networkClassOfService
        })
      )
    }
  }
})()
