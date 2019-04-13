import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroups', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Route', '$scope']
function controller(Route, $scope) {
  var ctrl = this
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
