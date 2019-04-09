import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingNav', {
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

  function open(serviceUserId) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'paging',
      serviceUserId
    )
  }
}
