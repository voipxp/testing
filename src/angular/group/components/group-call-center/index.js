import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenter', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<',serviceUserId: '<' }
})

controller.$inject = [
  'Route',
  'Alert',
  'GroupCallCenterService',
  'ACL',
  'Module',
  '$location',
  'GroupPasswordService'
]
function controller(
  Route,
  Alert,
  GroupCallCenterService,
  ACL,
  Module,
  $location,
  GroupPasswordService
) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.update = update
  ctrl.updateProfile = updateProfile
  ctrl.destroy = destroy
  ctrl.hasPermission = hasPermission
  ctrl.back = back
  function activate() {
    ctrl.serviceUserId = $location.search().serviceUserId || ctrl.serviceUserId
    ctrl.loading = true
    ctrl.hasBasicBounced = ACL.hasVersion('20')
    ctrl.hasMonitoring = Module.read('Call Center Monitoring')
    loadPasswordRulesMinLength()
    loadCallCenter()
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function loadCallCenter() {
    return GroupCallCenterService.show(ctrl.serviceUserId).then(
      data => (ctrl.center = data)
    )
  }
 
  function  loadPasswordRulesMinLength() { 
      GroupPasswordService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(rules) {
        ctrl.passMinLen = rules.minLength
      })
  }

  function update(center, callback) {
    Alert.spinner.open()
    GroupCallCenterService.update(ctrl.serviceUserId, center)
      .then(loadCallCenter)
      .then(() => {
        Alert.notify.success('Call Center Updated')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(callback) {
    Alert.spinner.open()
    GroupCallCenterService.destroy(ctrl.serviceUserId)
      .then(() => {
        Alert.notify.success('Call Center Removed')
        callback()
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'callCenters'
        )
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function updateProfile(event) {
    var editCenter = angular.copy(ctrl.center)
    editCenter.serviceInstanceProfile = event.profile
    update(editCenter, event.callback)
  }

  function hasPermission(attribute) {
    return GroupCallCenterService.hasPermission(ctrl.center, attribute)
  }

  function back() {
    if(ACL.is('Group Department')) {
      Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'callCenters')
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId,'groupService')
    }
  }
}
