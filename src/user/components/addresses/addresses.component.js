;(function() {
  angular.module('odin.user').component('userAddresses', {
    templateUrl: 'user/components/addresses/addresses.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      serviceProviderId: '<',
      groupId: '<'
    }
  })

  function Controller(Module) {
    var ctrl = this
    ctrl.$onInit = function() {
      Module.show('Provisioning').then(function(module) {
        ctrl.hasProvisioning = module.permissions.read
      })
    }
  }
})()
