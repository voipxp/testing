import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingNav', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['$location', 'Route']
function controller($location, Route) {
  var ctrl = this
  ctrl.$onInit = function() {
    ctrl.serviceUserId = $location.search().serviceUserId
  }
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
