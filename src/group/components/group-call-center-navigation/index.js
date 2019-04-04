import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterNavigation', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.serviceUserId = $routeParams.serviceUserId
  ctrl.open = open

  // TODO
  // Make this display inline
  function open() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'callCenters')
  }
}
