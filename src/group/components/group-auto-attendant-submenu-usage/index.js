import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAutoAttendantSubmenuUsage', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    serviceUserId: '<',
    submenuId: '<'
  }
})

controller.$inject = ['Alert', 'GroupAutoAttendantSubmenuService']
function controller(Alert, GroupAutoAttendantSubmenuService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    return loadUsage()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
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
}
