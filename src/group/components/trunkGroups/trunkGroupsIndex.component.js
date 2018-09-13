;(function() {
  angular.module('odin.group').component('groupTrunkGroups', {
    templateUrl: 'group/components/trunkGroups/trunkGroupsIndex.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route, $scope) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    ctrl.open = open
    ctrl.add = add
    ctrl.onSave = onSave

    function onSave(trunk) {
      open(trunk.name)
    }

    function open(trunk) {
      var trunkName = (trunk && trunk.name) || trunk
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'trunkGroups',
        trunkName
      )
    }

    function add() {
      $scope.$broadcast('groupTrunkGroupCreate:load')
    }
  }
})()
