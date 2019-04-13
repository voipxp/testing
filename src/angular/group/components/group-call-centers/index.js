import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenters', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Route',
  'Alert',
  'GroupCallCenterService',
  '$scope',
  'GroupPolicyService',
  '$q'
]
function controller(
  Route,
  Alert,
  GroupCallCenterService,
  $scope,
  GroupPolicyService,
  $q
) {
  var ctrl = this
  ctrl.open = open
  ctrl.add = add
  ctrl.onSave = onSave
  ctrl.$onInit = activate
  ctrl.toggle = toggle

  function activate() {
    ctrl.canCreate = ctrl.module.permissions.create
    ctrl.loading = true
    return $q
      .all([loadCallCenters(), GroupPolicyService.load()])
      .then(function() {
        ctrl.canCreate =
          GroupPolicyService.enhancedServiceCreate() && ctrl.canCreate
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
    // loadCallCenters()
    //   .catch(Alert.notify.danger)
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

  function loadCallCenters() {
    return GroupCallCenterService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.centers = data
      return data
    })
  }

  function onSave(center) {
    open(center.serviceUserId)
  }

  function open(object) {
    var serviceUserId = (object && object.serviceUserId) || object
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'callCenters',
      'callCenter'
    ).search({ serviceUserId })
  }

  function add() {
    $scope.$broadcast('groupCallCenterCreate:load')
  }

  function toggle(service) {
    service.isLoading = true
    GroupCallCenterService.status(service)
      .then(loadCallCenters)
      .then(function() {
        if (service.isActive) {
          Alert.notify.success('Service Enabled')
        } else {
          Alert.notify.warning('Service Disabled')
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
