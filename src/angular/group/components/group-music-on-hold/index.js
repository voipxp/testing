import angular from 'angular'
import template from './index.html'
import { useAcl } from '@/utils'

angular.module('odin.group').component('groupMusicOnHold', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupMusicOnHoldService', 'Route', '$location', 'ACL']
function controller(Alert, GroupMusicOnHoldService, Route, $location, ACL) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.update = update
  ctrl.destroy = destroy
  ctrl.back = back

  function onInit() {
    ctrl.departmentName = $location.search().departmentName
    ctrl.isEnterpriseDepartment = $location.search().isEnterpriseDepartment
    ctrl.title = ctrl.departmentName || 'Group'
    ctrl.loading = true
    loadMoh()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadMoh() {
    return GroupMusicOnHoldService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.departmentName,
      ctrl.isEnterpriseDepartment
    ).then(function(data) {
      ctrl.moh = data
    })
  }

  function update(moh, callback) {
    Alert.spinner.open()
    return GroupMusicOnHoldService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      moh
    )
      .then(loadMoh)
      .then(function() {
        Alert.notify.success('Music On Hold Instance Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(callback) {
    Alert.confirm
      .open('Are you sure you want to remove this Department?')
      .then(function() {
        Alert.spinner.open()
        return GroupMusicOnHoldService.destroy(
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.departmentName,
          ctrl.isEnterpriseDepartment
        )
          .then(function() {
            Alert.notify.success('Music On Hold Department Removed')
            callback()
            back()
          })
          .catch(Alert.notify.danger)
          .finally(Alert.spinner.close)
      })
  }

  function back() {
    if( ACL.is('Group Department') ) {
      Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'musicOnHold')
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'musicOnHold')
    }
  }
}
