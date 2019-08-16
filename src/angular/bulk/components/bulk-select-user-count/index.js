import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectUserCount', {
  template,
  controller,
  bindings: {
    onUpdate: '&',
    serviceProviderId: '<',
    groupId: '<',
    userCount: '<'
  }
})

controller.$inject = ['Alert', 'EventEmitter', 'GroupService']
function controller(Alert, EventEmitter, GroupService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.complete = complete

  function onInit() {
    ctrl.loading = true
    loadGroup()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroup() {
    return GroupService.show(ctrl.serviceProviderId, ctrl.groupId).then(function(data) {
      ctrl.group = data
      ctrl.max = ctrl.group.userLimit - ctrl.group.userCount
    })
  }

  function complete() {
    ctrl.onUpdate(EventEmitter({ userCount: ctrl.userCount }))
  }
}
