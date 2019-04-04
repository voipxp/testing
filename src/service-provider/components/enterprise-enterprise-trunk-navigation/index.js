import angular from 'angular'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('enterpriseEnterpriseTrunkNavigation', {
    template,
    controller
  })

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.trunkName = $routeParams.trunkName
  ctrl.open = open

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
