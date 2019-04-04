import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupHuntGroups', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  'Alert',
  'GroupHuntGroupService',
  'Route',
  '$routeParams',
  '$scope',
  'GroupPolicyService',
  '$q'
]
function controller(
  Alert,
  GroupHuntGroupService,
  Route,
  $routeParams,
  $scope,
  GroupPolicyService,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.open = open
  ctrl.toggle = toggle
  ctrl.add = add
  ctrl.onCreate = onCreate

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadHuntGroups(), GroupPolicyService.load()])
      .then(function() {
        ctrl.canCreate = GroupPolicyService.enhancedServiceCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })

    // loadHuntGroups()
    //   .catch(Alert.notify.danger)
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

  function loadHuntGroups() {
    return GroupHuntGroupService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.huntGroups = data
    })
  }

  function toggle(service) {
    service.isLoading = true
    GroupHuntGroupService.status(service)
      .then(loadHuntGroups)
      .then(function() {
        if (service.isActive) {
          Alert.notify.success('Service Enabled')
        } else {
          Alert.notify.warning('Service Disabled')
        }
      })
      .catch(Alert.notify.danger)
  }

  function open(huntgroup) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'huntGroups',
      'huntGroup'
    ).search({
      serviceUserId: huntgroup.serviceUserId
    })
  }

  function add() {
    $scope.$broadcast('groupHuntGroupCreate:load')
  }

  function onCreate(event) {
    open(event.huntGroup)
  }
}
