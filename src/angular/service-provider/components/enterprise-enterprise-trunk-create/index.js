import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('enterpriseEnterpriseTrunkCreate', {
  template,
  controller,
  bindings: { serviceProviderId: '=', onSave: '&' }
})

controller.$inject = ['Alert', 'EnterpriseEnterpriseTrunkService', '$scope']
function controller(Alert, EnterpriseEnterpriseTrunkService, $scope) {
  var ctrl = this

  ctrl.$onInit = activate
  ctrl.options = EnterpriseEnterpriseTrunkService.options
  ctrl.changeRouting = changeRouting
  ctrl.routingTypes = ['Priority Weighted Routing', 'Ordered Routing']

  function activate() {
    ctrl.trunk = { serviceProviderId: ctrl.serviceProviderId }
    ctrl.routingType = null
    if ($scope.editEnterpriseEnterpriseTrunkCreateForm) {
      $scope.editEnterpriseEnterpriseTrunkCreateForm.$setPristine()
    }
  }

  function edit() {
    activate()
    Alert.modal.open('editEnterpriseEnterpriseTrunkCreate', function(close) {
      create(ctrl.trunk, close)
    })
  }

  function create(trunk, callback) {
    Alert.spinner.open()
    EnterpriseEnterpriseTrunkService.store(ctrl.serviceProviderId, trunk)
      .then(function() {
        Alert.notify.success('Trunk Created')
        if (_.isFunction(ctrl.onSave)) {
          ctrl.onSave({ trunk: trunk })
        }
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function changeRouting() {
    if (ctrl.routingType === 'Priority Weighted Routing') {
      delete ctrl.trunk.orderedRouting
      ctrl.trunk.priorityWeightedRouting = {}
    } else if (ctrl.routingType === 'Ordered Routing') {
      delete ctrl.trunk.priorityWeightedRouting
      ctrl.trunk.orderedRouting = {}
    }
  }

  $scope.$on('enterpriseEnterpriseTrunkCreate:load', edit)
}
