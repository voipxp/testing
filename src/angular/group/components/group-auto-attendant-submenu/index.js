import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAutoAttendantSubmenu', {
  template,
  controller,
  bindings: {
    module: '<',
    serviceProviderId: '<',
    groupId: '<',
    serviceUserId: '<',
    submenuId: '<',
    onDestroy: '&',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'GroupAutoAttendantSubmenuService',
  'EventEmitter',
  '$q'
]
function controller(Alert, GroupAutoAttendantSubmenuService, EventEmitter, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.update = update
  ctrl.destroy = destroy

  async function onInit() {
    ctrl.loading = true
    try {
      await $q.all([loadSubmenu(), loadUsage()])
    } catch (error) {
      Alert.notify.danger(error)
    } finally {
      ctrl.loading = false
    }
  }

  function loadSubmenu() {
    return GroupAutoAttendantSubmenuService.show(
      ctrl.serviceUserId,
      ctrl.submenuId
    ).then(function(data) {
      ctrl.menu = data
    })
  }

  function loadUsage() {
    return GroupAutoAttendantSubmenuService.usage(
      ctrl.serviceUserId,
      ctrl.submenuId
    ).then(function(data) {
      ctrl.usage = data
    })
  }

  function update(menu, callback) {
    Alert.spinner.open()
    GroupAutoAttendantSubmenuService.update(menu)
      .then(function() {
        ctrl.onUpdate(EventEmitter(menu))
        Alert.notify.success('Submenu Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(callback) {
    Alert.spinner.open()
    GroupAutoAttendantSubmenuService.destroy(ctrl.serviceUserId, ctrl.submenuId)
      .then(function() {
        Alert.notify.warning('Submenu Removed')
        ctrl.onDestroy()
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
