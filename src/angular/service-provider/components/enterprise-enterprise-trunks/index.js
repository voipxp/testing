import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('enterpriseEnterpriseTrunks', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<' }
})

controller.$inject = [
  'Route',
  'Alert',
  'EnterpriseEnterpriseTrunkService',
  '$scope'
]
function controller(Route, Alert, EnterpriseEnterpriseTrunkService, $scope) {
  var ctrl = this
  ctrl.open = open
  ctrl.add = add
  ctrl.onSave = onSave
  ctrl.$onInit = activate

  function activate() {
    ctrl.loading = true
    loadTrunks()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadTrunks() {
    return EnterpriseEnterpriseTrunkService.index(ctrl.serviceProviderId).then(
      function(data) {
        ctrl.trunks = data
        return data
      }
    )
  }

  function onSave(trunk) {
    open(trunk.enterpriseTrunkName)
  }

  function open(trunk) {
    var trunkName = (trunk && trunk.enterpriseTrunkName) || trunk
    if (trunkName) {
      Route.open(
        'serviceProviders',
        ctrl.serviceProviderId,
        'enterpriseTrunks',
        'enterpriseTrunk'
      ).search({ trunkName, navigate: trunkName})
    } else {
      Route.open('serviceProviders', ctrl.serviceProviderId, 'enterpriseTrunks')
    }
  }

  function add() {
    $scope.$broadcast('enterpriseEnterpriseTrunkCreate:load')
  }
}
