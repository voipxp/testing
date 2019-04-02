import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('flexibleSeatingHosts', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  '$routeParams',
  'Alert',
  'GroupFlexibleSeatingHostService',
  'Route',
  '$scope',
  '$q',
  'GroupPolicyService'
]
function controller(
  $routeParams,
  Alert,
  GroupFlexibleSeatingHostService,
  Route,
  $scope,
  $q,
  GroupPolicyService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.open = open
  ctrl.add = add
  ctrl.onCreate = onCreate
  ctrl.onUpdate = onUpdate
  ctrl.toggle = toggle

  function onInit() {
    ctrl.loading = true
    return $q
      .all([load(), GroupPolicyService.load()])
      .then(function() {
        ctrl.canCreate = GroupPolicyService.enhancedServiceCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function load() {
    return GroupFlexibleSeatingHostService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.hosts = data.hosts
    })
  }

  function open(flexibleSeatingHost) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'flexibleSeatingHosts',
      'flexibleSeatingHost'
    ).search({ serviceUserId: flexibleSeatingHost.serviceUserId })
  }

  function toggle(service) {
    service.isLoading = true
    GroupFlexibleSeatingHostService.status(service)
      .then(load)
      .then(function() {
        if (service.isActive) {
          Alert.notify.success('Service Enabled')
        } else {
          Alert.notify.warning('Service Disabled')
        }
      })
      .catch(function(error) {
        service.isActive = !service.isActive
        Alert.notify.danger(error)
      })
  }

  function add() {
    $scope.$broadcast('flexibleSeatingHostCreate:load')
  }

  function onCreate(event) {
    open(event.flexibleSeatingHost)
  }
  function onUpdate(event) {
    open(event.flexibleSeatingHost)
  }
}
