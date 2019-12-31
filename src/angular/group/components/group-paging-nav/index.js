import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingNav', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<', hideNavigation: '<' }
})

controller.$inject = ['$location', 'Route', 'ACL']
function controller($location, Route, ACL) {
  var ctrl = this
  ctrl.$onInit = function() {
    ctrl.serviceUserId = $location.search().serviceUserId
  }
  ctrl.open = open

  function open(serviceUserId) {
    if(ACL.is('Group Department')) {
        Route.open(
          'department',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'paging',
          serviceUserId
        )
    } else {
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'paging',
          serviceUserId
        )
    }

  }
}
