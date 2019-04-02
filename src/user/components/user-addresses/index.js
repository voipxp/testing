import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userAddresses', {
  template,
  controller,
  bindings: {
    userId: '<',
    serviceProviderId: '<',
    groupId: '<'
  }
})

controller.$inject = ['Module', 'ACL']
function controller(Module, ACL) {
  var ctrl = this
  ctrl.$onInit = function() {
    Module.show('Provisioning').then(function(module) {
      ctrl.hasProvisioning = module.permissions.read
      ctrl.isGroup = ACL.has('Group')
      ctrl.isServiceProvider = ACL.has('Service Provider')
    })
  }
}
