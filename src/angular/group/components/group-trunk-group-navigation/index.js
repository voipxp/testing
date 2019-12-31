import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupNavigation', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<', hideNavigation:'<' }
})

controller.$inject = ['$location', 'Route', 'ACL']
function controller($location, Route, ACL) {
  var ctrl = this
  ctrl.$onInit = function() {
    ctrl.trunkName = $location.search().trunkName
  }
  ctrl.open = open

  function open(trunk) {
    var trunkName = (trunk && trunk.name) || trunk
    if (trunkName) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'trunkGroups',
        'trunkGroup'
      ).search({ trunkName: trunkName })
    } else {
      if(ACL.is('Group Department')) {
        Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'trunkGroups')
      } else {
        Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'trunkGroups')
      }
    }
  }
}
