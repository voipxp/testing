import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('serviceProviders', {
  template,
  controller,
  bindings: { resellerId: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderService',
  '$scope',
  'Route',
  'Session',
  '$location'
]
function controller(
  Alert,
  ServiceProviderService,
  $scope,
  Route,
  Session,
  $location
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.clone = clone
  ctrl.add = add
  ctrl.onCreate = onCreate
  ctrl.open = open
  ctrl.onPagination = onPagination

  function onInit() {
    ctrl.loading = true
    ctrl.hideNav =
      Session.data('resellerId') || $location.path().startsWith('/resellers')
    loadServiceProviders()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function loadServiceProviders() {
    return ServiceProviderService.index(ctrl.resellerId).then(function(data) {
      ctrl.serviceProviders = data
    })
  }

  function add() {
    $scope.$broadcast('serviceProviderCreate:load')
  }

  function clone() {
    $scope.$broadcast('serviceProviderClone:load')
  }

  function onCreate(event) {
    open(event.serviceProvider)
  }

  function open(serviceProvider) {
    Route.open('serviceProviders', serviceProvider.serviceProviderId)
  }
}
