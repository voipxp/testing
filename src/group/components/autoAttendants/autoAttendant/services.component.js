;(function() {
  angular.module('odin.group').component('virtualUserServices', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/services.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, UserServiceService, Module, $q, $window) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.module = Module
    ctrl.select = select

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadServices(), Module.load()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function select(service) {
      ctrl.selectedService = service.serviceName
      $window.scrollTo(0, 0)
    }

    function loadServices() {
      return UserServiceService.assigned(ctrl.userId).then(function(data) {
        ctrl.services = _.filter(data.userServices || [], function(service) {
          return Module.read(service.serviceName)
        })
      })
    }
  }
})()
