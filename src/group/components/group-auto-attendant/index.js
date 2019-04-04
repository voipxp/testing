import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('autoAttendant', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  '$routeParams',
  'Alert',
  'GroupAutoAttendantService',
  'Route',
  '$q',
  'GroupPolicyService'
]
function controller(
  $routeParams,
  Alert,
  GroupAutoAttendantService,
  Route,
  $q,
  GroupPolicyService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceUserId = $routeParams.serviceUserId
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.back = back
  ctrl.update = update
  ctrl.destroy = destroy
  ctrl.onUpdateProfile = onUpdateProfile
  ctrl.isStandard = isStandard

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadAutoAttendant(), GroupPolicyService.load()])
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
    // return loadAutoAttendant()
    //   .catch(Alert.notify.danger)
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

  function isStandard() {
    return _.get(ctrl, 'autoAttendant.type') === 'Standard'
  }

  function loadAutoAttendant() {
    return GroupAutoAttendantService.show(ctrl.serviceUserId).then(function(
      data
    ) {
      ctrl.autoAttendant = data
    })
  }

  function update(autoAttendant, callback) {
    Alert.spinner.open()
    return GroupAutoAttendantService.update(autoAttendant)
      .then(loadAutoAttendant)
      .then(function() {
        Alert.notify.success('Auto Attendant Saved')
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
    GroupAutoAttendantService.destroy(ctrl.serviceUserId)
      .then(function() {
        Alert.notify.success('Auto Attendant Removed')
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
    var autoAttendant = angular.copy(ctrl.autoAttendant)
    autoAttendant.serviceInstanceProfile = event.profile
    update(autoAttendant, event.callback)
  }

  function back() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'autoAttendants')
  }
}
