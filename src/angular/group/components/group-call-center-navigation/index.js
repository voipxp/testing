import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterNavigation', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['$location', 'Route']
function controller($location, Route) {
  var ctrl = this
  ctrl.serviceUserId = $location.search().serviceUserId
  ctrl.open = open

  // TODO
  // Make this display inline
  function open() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'callCenters')
  }
}
