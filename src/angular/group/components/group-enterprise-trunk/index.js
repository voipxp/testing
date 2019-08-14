import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupEnterpriseTrunk', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Route', 'Alert', 'GroupEnterpriseTrunkService', '$location']
function controller(Route, Alert, GroupEnterpriseTrunkService, $location) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.update = update
  ctrl.destroy = destroy

  function activate() {
    ctrl.trunkName = $location.search().trunkName
    ctrl.loading = true
    loadTrunk()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadTrunk() {
    return GroupEnterpriseTrunkService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.trunkName
    ).then(function(data) {
      ctrl.trunk = data
      return data
    })
  }

  function update(trunk, callback) {
    Alert.spinner.open()
    GroupEnterpriseTrunkService.update(ctrl.serviceProviderId, ctrl.groupId, ctrl.trunkName, trunk)
      .then(loadTrunk)
      .then(function() {
        Alert.notify.success('Enterprise Trunk Updated')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(callback) {
    Alert.spinner.open()
    GroupEnterpriseTrunkService.destroy(ctrl.serviceProviderId, ctrl.groupId, ctrl.trunkName)
      .then(function() {
        Alert.notify.warning('Enterprise Trunk Removed')
        callback()
        Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'enterpriseTrunks')
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
