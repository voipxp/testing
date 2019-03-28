import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('servicePacks', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'ServicePackService',
  'ServiceProviderServiceService',
  'Route',
  '$q',
  '$scope',
  'Module'
]
function controller(
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
    return ServicePackService.index(ctrl.serviceProviderId, true).then(function(
      data
    ) {
      ctrl.servicePacks = data
    })
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
      'servicePack'
    ).search({ servicePackName })
  }

  function add() {
    $scope.$broadcast('servicePackCreate:load')
  }

  function onCreate(event) {
    open(event.servicePack.servicePackName)
  }
}
