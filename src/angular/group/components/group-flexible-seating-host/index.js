import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupFlexibleSeatingHost', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<', hideNavigation: '<'}
})

controller.$inject = [
  'Alert',
  'GroupFlexibleSeatingHostService',
  'Route',
  '$q',
  'GroupPolicyService',
  '$location',
  'ACL'
]
function controller(
  Alert,
  GroupFlexibleSeatingHostService,
  Route,
  $q,
  GroupPolicyService,
  $location,
  ACL
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.back = back
  ctrl.update = update
  ctrl.destroy = destroy
  ctrl.onUpdateProfile = onUpdateProfile
  ctrl.onDeleteProfile = onDeleteProfile
  ctrl.showReporting = false
  function onInit() {
    ctrl.serviceUserId = $location.search().serviceUserId
    ctrl.loading = true
    return $q
      .all([loadGroupFlexibleSeatingHost(), GroupPolicyService.load()])
      .then(function() {
        ctrl.canRead = GroupPolicyService.enhancedServiceRead()
        ctrl.canUpdate = GroupPolicyService.enhancedServiceCreate()
        ctrl.canCreate = GroupPolicyService.enhancedServiceCreate()
        ctrl.canDelete = GroupPolicyService.enhancedServiceCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroupFlexibleSeatingHost() {
    return GroupFlexibleSeatingHostService.show(ctrl.serviceUserId).then(
      function(data) {
        ctrl.flexibleSeatingHost = data
      }
    )
  }

  function update(flexibleSeatingHost, callback) {
    Alert.spinner.open()
    return GroupFlexibleSeatingHostService.update(flexibleSeatingHost)
      .then(loadGroupFlexibleSeatingHost)
      .then(function() {
        Alert.notify.success('Flexible Seating Host Saved')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function destroy(callback) {
    Alert.spinner.open()
    GroupFlexibleSeatingHostService.destroy(ctrl.serviceUserId)
      .then(function() {
        Alert.notify.success('Flexbile Seating Host Removed')
        if (_.isFunction(callback)) {
          callback()
        }
        return back()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function onUpdateProfile(event) {
    var flexibleSeatingHost = angular.copy(ctrl.flexibleSeatingHost)
    flexibleSeatingHost = event.flexibleSeatingHost
    update(flexibleSeatingHost, event.callback)
  }
  function onDeleteProfile(event) {
    var flexibleSeatingHost = angular.copy(ctrl.flexibleSeatingHost)
    flexibleSeatingHost = event.flexibleSeatingHost
    Alert.confirm
      .open('Are you sure you want to delete host?')
      .then(function() {
        destroy(flexibleSeatingHost, event.callback)
      })
  }

  function back() {
    if(ACL.is('Group Department')) {
      Route.open(
        'department',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'flexibleSeatingHosts'
      )
    }else if(ACL.is('Group') || ACL.is('Service Provider') || ACL.is('System') ) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'group-services',
        'flexibleSeatingHosts'
      )
    } else {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'flexibleSeatingHosts'
      )
    }
  }
}
