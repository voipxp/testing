import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDepartment', {
  template,
  controller
})

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this
  ctrl.$onInit = function() {
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.name = $routeParams.name
  }

  ctrl.goBack = function() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'departments')
  }
}
