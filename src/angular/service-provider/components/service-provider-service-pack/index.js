import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderServicePack', {
  template,
  controller,
  bindings: { serviceProviderId: '<', servicePackName: '<' }
})

controller.$inject = [
  'ACL',
  'Alert',
  'ServiceProviderServicePackService',
  'Route',
  'Module',
  '$q',
  '$location'
]
function controller(
  ACL,
  Alert,
  ServiceProviderServicePackService,
  Route,
  Module,
  $q,
  $location
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.edit = edit

  ctrl.quantity = function(value) {
    return value === -1 ? 'Unlimited' : value
  }

  ctrl.isUnlimited = function() {
    return ctrl.servicePack && ctrl.servicePack.allowedQuantity === -1
  }

  function onInit() {
    //ctrl.servicePackName = $location.search().servicePackName
    ctrl.loading = true
    $q.all([loadServicePack(), loadPermissions()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPermissions() {
    return Module.show('Service Packs').then(function(module) {
      ctrl.permissions = module.permissions
    })
  }

  function loadServicePack() {
    return ServiceProviderServicePackService.show(
      ctrl.serviceProviderId,
      ctrl.servicePackName
    ).then(function(data) {
      ctrl.servicePack = data
    })
  }

  function open(servicePackName) {
    if (servicePackName) {
      Route.open(
        'serviceProviders',
        ctrl.serviceProviderId,
        'servicePacks',
        servicePackName
      )
    } else {
      Route.open(
        'serviceProviders',
         ctrl.serviceProviderId,
          'servicePacks'
          )
    }
  }

  function edit() {
    if (!ctrl.permissions.update) return
    var deleteAction
    if (ctrl.permissions.delete) {
      deleteAction = function(close) {
        Alert.confirm
          .open('Are you sure you want to delete this Service Pack?')
          .then(function() {
            remove(close)
          })
      }
    }
    ctrl.editServicePack = angular.copy(ctrl.servicePack)
    ctrl.editServicePack.newServicePackName =
      ctrl.editServicePack.servicePackName
    Alert.modal.open(
      'editServicePack',
      function onSave(close) {
        update(ctrl.editServicePack, close)
      },
      deleteAction
    )
  }

  function update(servicePack, callback) {
    var wasRenamed =
      servicePack.newServicePackName !== servicePack.servicePackName
    Alert.spinner.open()
    ServiceProviderServicePackService.update(
      ctrl.serviceProviderId,
      ctrl.servicePackName,
      servicePack
    )
      .then(function() {
        Alert.notify.success('Service Pack Updated')
        if (_.isFunction(callback)) {
          callback()
        }
        if (wasRenamed) {
          return open(servicePack.newServicePackName)
        } else {
          return loadServicePack()
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
    Alert.spinner.open()
    ServiceProviderServicePackService.destroy(
      ctrl.serviceProviderId,
      ctrl.servicePackName
    )
      .then(function() {
        Alert.notify.success('Service Pack Removed')
        if (_.isFunction(callback)) {
          callback()
        }
        open()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
