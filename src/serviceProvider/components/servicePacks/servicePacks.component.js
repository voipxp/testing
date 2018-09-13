;(function() {
  angular.module('odin.serviceProvider').component('servicePacks', {
    templateUrl:
      'serviceProvider/components/servicePacks/servicePacks.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<' }
  })

  function Controller(
    Alert,
    ServicePackService,
    ServiceProviderServiceService,
    Route,
    $q,
    $scope,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.add = add
    ctrl.onCreate = onCreate

    function onInit() {
      ctrl.loading = true
      $q.all([loadServicePacks(), loadServices(), loadPermissions()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPermissions() {
      return Module.show('Service Packs').then(function(module) {
        ctrl.permissions = module.permissions
      })
    }

    function loadServicePacks() {
      return ServicePackService.index(ctrl.serviceProviderId, true).then(
        function(data) {
          ctrl.servicePacks = data
        }
      )
    }

    function loadServices() {
      return ServiceProviderServiceService.show(ctrl.serviceProviderId).then(
        function(data) {
          ctrl.services = data.userServices || []
        }
      )
    }

    function open(servicePackName) {
      Route.open(
        'serviceProviders',
        ctrl.serviceProviderId,
        'servicePacks',
        servicePackName
      )
    }

    function add() {
      $scope.$broadcast('servicePackCreate:load')
    }

    function onCreate(event) {
      open(event.servicePack.servicePackName)
    }
  }
})()
