import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('enterpriseEnterpriseTrunk', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<' }
})

controller.$inject = [
  '$location',
  'Route',
  'Alert',
  'EnterpriseEnterpriseTrunkService'
]
function controller($location, Route, Alert, EnterpriseEnterpriseTrunkService) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.update = update
  ctrl.remove = remove

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
    return EnterpriseEnterpriseTrunkService.show(
      ctrl.serviceProviderId,
      ctrl.trunkName
    ).then(function(data) {
      ctrl.trunk = data
      return data
    })
  }

  function update(trunk, callback) {
    Alert.spinner.open()
    EnterpriseEnterpriseTrunkService.update(
      ctrl.serviceProviderId,
      ctrl.trunkName,
      trunk
    )
      .then(loadTrunk)
      .then(function() {
        Alert.notify.success('Enterprise Trunk Updated')
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

  function remove(callback) {
    Alert.confirm
      .open('Are you sure you want to remove this Enterprise Trunk?')
      .then(function() {
        Alert.spinner.open()
        EnterpriseEnterpriseTrunkService.destroy(
          ctrl.serviceProviderId,
          ctrl.trunkName
        )
          .then(function() {
            Alert.notify.success('Trunk Removed')
            if (_.isFunction(callback)) {
              callback()
            }
            Route.open(
              'serviceProviders',
              ctrl.serviceProviderId,
              'enterpriseTrunks'
            )
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }
}
