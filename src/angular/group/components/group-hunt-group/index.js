import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupHuntGroup', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<'}
})

controller.$inject = [
  'Alert',
  'GroupHuntGroupService',
  'Route',
  'Module',
  'GroupHuntGroupWeightedCallDistributionService',
  '$q',
  '$location',
  'ACL'
]
function controller(
  Alert,
  GroupHuntGroupService,
  Route,
  Module,
  GroupHuntGroupWeightedCallDistributionService,
  $q,
  $location,
  ACL
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.options = GroupHuntGroupService.options
  ctrl.back = back
  ctrl.reload = loadHuntGroup
  ctrl.updateProfile = updateProfile
  ctrl.update = update
  ctrl.destroy = destroy
  ctrl.updateWeight = updateWeight

  function onInit() {
    ctrl.serviceUserId = $location.search().serviceUserId
    ctrl.loading = true
    return $q
      .all([loadHuntGroup(), Module.load()])
      .then(loadPermissions)
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadHuntGroup() {
    return GroupHuntGroupService.show(ctrl.serviceUserId).then(function(data) {
      ctrl.huntGroup = data
    })
  }

  function loadPermissions(permission) {
    if (Module.read('Premium Call Records')) {
      ctrl.showPremium = true
    }
    ctrl.showReporting = ctrl.showPremium
  }

  function updateProfile(event) {
    var huntGroup = angular.copy(ctrl.huntGroup)
    huntGroup.serviceInstanceProfile = event.profile
    update(huntGroup, event.callback)
  }

  function update(huntGroup, callback) {
    huntGroup.serviceUserId = ctrl.serviceUserId
    Alert.spinner.open()
    return GroupHuntGroupService.update(huntGroup)
      .then(onInit)
      .then(function() {
        Alert.notify.success('Hunt Group Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
  function updateWeight(huntGroup, callback) {
    huntGroup.serviceUserId = ctrl.serviceUserId
    Alert.spinner.open()
    return GroupHuntGroupWeightedCallDistributionService.update(huntGroup)
      .then(onInit)
      .then(function() {
        Alert.notify.success('Hunt Group Agent Weight Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
  function destroy(callback) {
    Alert.spinner.open()
    GroupHuntGroupService.destroy(ctrl.serviceUserId)
      .then(function() {
        Alert.notify.warning('Hunt Group Removed')
        callback()
        back()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function back() {
    if(ACL.is('Group Department')) {
      Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'huntGroups')
    } else if(ACL.is('Group')){
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'groupService')
    }else{
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'huntGroups')
    }
  }
}
