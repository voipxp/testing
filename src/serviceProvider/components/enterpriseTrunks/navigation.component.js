;(function() {
  angular
    .module('odin.serviceProvider')
    .component('enterpriseEnterpriseTrunkNavigation', {
      templateUrl:
        'serviceProvider/components/enterpriseTrunks/navigation.component.html',
      controller: Controller
    })

  function Controller($routeParams, Route, $location) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.trunkName = $routeParams.trunkName
    ctrl.open = open
    ctrl.returnTo = $location.search()['returnTo']

    function open(trunk) {
      var trunkName = (trunk && trunk.enterpriseTrunk) || trunk
      Route.open(
        'serviceProviders',
        ctrl.serviceProviderId,
        'enterpriseTrunks'
      )(trunkName)
    }
  }
})()
