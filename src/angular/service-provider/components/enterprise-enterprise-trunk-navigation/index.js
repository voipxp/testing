import angular from 'angular'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('enterpriseEnterpriseTrunkNavigation', {
    template,
    controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

controller.$inject = ['Route', '$location']
function controller(Route, $location) {
  var ctrl = this
  ctrl.open = open
  ctrl.$onInit = function() {
    ctrl.trunkName = $location.search().trunkName
  }

  function open(trunk) {
    var trunkName = (trunk && trunk.enterpriseTrunkName) || trunk
    if (trunkName) {
      Route.open(
        'serviceProviders',
        ctrl.serviceProviderId,
        'enterpriseTrunks',
        'enterpriseTrunk'
      ).search({ trunkName })
    } else {
      Route.open('serviceProviders', ctrl.serviceProviderId, 'enterpriseTrunks')
    }
  }
}
