import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroups', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$routeParams', 'Route', '$scope']
function controller($routeParams, Route, $scope) {
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
    if (trunkName) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'trunkGroups',
        'trunkGroup'
      ).search({ trunkName: trunkName })
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'trunkGroups')
    }
  }

  function add() {
    $scope.$broadcast('groupTrunkGroupCreate:load')
  }
}
