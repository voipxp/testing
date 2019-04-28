import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenter', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Route',
  'Alert',
  'GroupCallCenterService',
  'ACL',
  'Module',
  '$location'
]
function controller(
  Route,
  Alert,
  GroupCallCenterService,
  ACL,
  Module,
  $location
) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.update = update
  ctrl.updateProfile = updateProfile
  ctrl.destroy = destroy
  ctrl.hasPermission = hasPermission

  function activate() {
    ctrl.serviceUserId = $location.search().serviceUserId
    ctrl.loading = true
    ctrl.hasBasicBounced = ACL.hasVersion('20')
    ctrl.hasMonitoring = Module.read('Call Center Monitoring')
    loadCallCenter
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function loadCallCenter() {
    return GroupCallCenterService.show(ctrl.serviceUserId).then(
      data => (ctrl.center = data)
    )
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
}
