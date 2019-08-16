import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupEnterpriseTrunkNavigation', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Route', '$location']
function controller(Route, $location) {
  var ctrl = this
  ctrl.$onInit = function() {
    ctrl.trunkName = $location.search().trunkName
  }
  ctrl.open = open

  function open(trunk) {
    var trunkName = (trunk && trunk.enterpriseTrunkName) || trunk
    if (trunkName) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'enterpriseTrunks',
        'entepriseTrunk'
      ).search({ trunkName })
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'enterpriseTrunks', trunkName)
    }
  }
}
