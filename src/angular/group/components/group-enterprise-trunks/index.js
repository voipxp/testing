import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupEnterpriseTrunks', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Route',
  'Alert',
  'GroupEnterpriseTrunkService',
  '$scope',
  'ACL'
]
function controller(Route, Alert, GroupEnterpriseTrunkService, $scope, ACL) {
  var ctrl = this
  ctrl.open = open
  ctrl.add = add
  ctrl.onSave = onSave
  ctrl.$onInit = activate
  ctrl.isServiceProvider = ACL.has('Service Provider')

  function activate() {
    ctrl.loading = true
    ctrl.canCreate = ctrl.module.permissions.create
    loadTrunks()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadTrunks() {
    return GroupEnterpriseTrunkService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.trunks = data
      return data
    })
  }

  function onSave(trunk) {
    open(trunk.enterpriseTrunkName)
  }

  function open(trunk) {
    var trunkName = (trunk && trunk.enterpriseTrunkName) || trunk
    if (trunkName) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'enterpriseTrunks',
        'enterpriseTrunk'
      ).search({ trunkName })
    } else {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'enterpriseTrunks'
      )
    }
  }

  function add() {
    if (!ctrl.canCreate) return
    $scope.$broadcast('groupEnterpriseTrunkCreate:load')
  }
}
