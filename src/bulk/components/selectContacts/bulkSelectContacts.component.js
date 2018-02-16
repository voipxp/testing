;(function() {
  angular.module('odin.bulk').component('bulkSelectContacts', {
    templateUrl:
      'bulk/components/selectContacts/bulkSelectContacts.component.html',
    controller: Controller,
    bindings: {
      mobilePhoneNumber: '<',
      pagerPhoneNumber: '<',
      emailAddress: '<',
      yahooId: '<',
      onUpdate: '&'
    }
  })

  function Controller(Alert, EventEmitter) {
    var ctrl = this
    ctrl.complete = complete

    function complete() {
      ctrl.onUpdate(
        EventEmitter({
          mobilePhoneNumber: ctrl.mobilePhoneNumber,
          pagerPhoneNumber: ctrl.pagerPhoneNumber,
          emailAddress: ctrl.emailAddress,
          yahooId: ctrl.yahooId
        })
      )
    }
  }
})()
