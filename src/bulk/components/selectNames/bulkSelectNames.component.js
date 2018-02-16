;(function() {
  angular.module('odin.bulk').component('bulkSelectNames', {
    templateUrl: 'bulk/components/selectNames/bulkSelectNames.component.html',
    controller: Controller,
    bindings: {
      firstName: '<',
      lastName: '<',
      callingLineIdFirstName: '<',
      callingLineIdLastName: '<',
      onUpdate: '&'
    }
  })

  function Controller(EventEmitter) {
    var ctrl = this
    ctrl.complete = complete
    ctrl.canComplete = canComplete
    ctrl.update = update

    function complete() {
      ctrl.onUpdate(
        EventEmitter({
          firstName: ctrl.firstName,
          lastName: ctrl.lastName,
          callingLineIdFirstName: ctrl.callingLineIdFirstName,
          callingLineIdLastName: ctrl.callingLineIdLastName
        })
      )
    }

    function canComplete() {
      return (
        ctrl.firstName &&
        ctrl.lastName &&
        ctrl.callingLineIdFirstName &&
        ctrl.callingLineIdLastName
      )
    }

    // convenience method to auto-fill CLID
    function update(field) {
      var pairs = {
        firstName: 'callingLineIdFirstName',
        lastName: 'callingLineIdLastName'
      }
      var partner = pairs[field]
      if (partner) {
        ctrl[partner] = ctrl[field]
      }
    }
  }
})()
