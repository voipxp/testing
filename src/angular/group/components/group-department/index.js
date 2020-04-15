import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDepartment', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})
controller.$inject = ['Route', '$location']
function controller(Route, $location) {
  var ctrl = this
  ctrl.$onInit = function() {
    ctrl.name = $location.search().name
  }

  ctrl.goBack = function() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'departments')
  }
}
