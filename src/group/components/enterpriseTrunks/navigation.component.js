;(function() {
  angular.module('odin.group').component('groupEnterpriseTrunkNavigation', {
    templateUrl: 'group/components/enterpriseTrunks/navigation.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.trunkName = $routeParams.trunkName
    ctrl.open = open

    function open(trunk) {
      var trunkName = (trunk && trunk.enterpriseTrunk) || trunk
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'enterpriseTrunks',
        trunkName
      )
    }
  }
})()
