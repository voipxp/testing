import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupNavigation', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$routeParams', 'Route']
function controller($routeParams, Route) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.trunkName = $routeParams.trunkName
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
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'trunkGroups')
    }
  }
}
