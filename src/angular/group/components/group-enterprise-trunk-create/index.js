import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupEnterpriseTrunkCreate', {
  template,
  controller,
  bindings: { serviceProviderId: '=', groupId: '=', onSave: '&' }
})

controller.$inject = ['Alert', 'GroupEnterpriseTrunkService', '$scope']
function controller(Alert, GroupEnterpriseTrunkService, $scope) {
  var ctrl = this

  ctrl.$onInit = activate
  ctrl.options = GroupEnterpriseTrunkService.options
  ctrl.changeRouting = changeRouting
  ctrl.routingTypes = ['Priority Weighted Routing', 'Ordered Routing']

  function activate() {
    ctrl.trunk = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    ctrl.routingType = null
    if ($scope.editGroupEnterpriseTrunkCreateForm) {
      $scope.editGroupEnterpriseTrunkCreateForm.$setPristine()
    }
  }

  function edit() {
    activate()
    Alert.modal.open('editGroupEnterpriseTrunkCreate', function(close) {
      create(ctrl.trunk, close)
    })
  }

  function create(trunk, callback) {
    Alert.spinner.open()
    GroupEnterpriseTrunkService.store(
      ctrl.serviceProviderId,
      ctrl.groupId,
      trunk
    )
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

  $scope.$on('groupEnterpriseTrunkCreate:load', edit)
}
