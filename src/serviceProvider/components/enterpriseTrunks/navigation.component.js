;(function() {
  angular
    .module('odin.serviceProvider')
    .component('enterpriseEnterpriseTrunkNavigation', {
      templateUrl:
        'serviceProvider/components/enterpriseTrunks/navigation.component.html',
      controller: Controller
    })

  function Controller($routeParams, Route) {
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
        Route.open(
          'serviceProviders',
          ctrl.serviceProviderId,
          'enterpriseTrunks'
        )
      }
    }
  }
})()
