import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroups', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.open = open

  function open(serviceUserId) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'paging',
      'group'
    ).search({ serviceUserId: serviceUserId })
  }
}
