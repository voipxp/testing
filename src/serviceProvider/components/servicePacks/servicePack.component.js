;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderServicePack', {
      templateUrl:
        'serviceProvider/components/servicePacks/servicePack.component.html',
      controller: Controller
    })

  function Controller(Alert, ServicePackService, $routeParams, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.servicePackName = $routeParams.servicePackName
    ctrl.open = open
    ctrl.edit = edit

    ctrl.quantity = function(value) {
      return value === -1 ? 'Unlimited' : value
    }

    ctrl.isUnlimited = function() {
      return ctrl.servicePack && ctrl.servicePack.allowedQuantity === -1
    }

    function onInit() {
      ctrl.loading = true
      loadServicePack()
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadServicePack() {
      return ServicePackService.show(
        ctrl.serviceProviderId,
        ctrl.servicePackName
      ).then(function(data) {
        console.log('servicePack', data)
        ctrl.servicePack = data
      })
    }

    function open(servicePackName) {
      Route.open('serviceProviders', ctrl.serviceProviderId)(
        'servicePacks',
        servicePackName
      )
    }

    function edit() {
      ctrl.editServicePack = angular.copy(ctrl.servicePack)
      ctrl.editServicePack.newServicePackName =
        ctrl.editServicePack.servicePackName
      Alert.modal.open(
        'editServicePack',
        function onSave(close) {
          console.log('edit', ctrl.editServicePack)
          update(ctrl.editServicePack, close)
        },
        function onDelete(close) {
          Alert.confirm
            .open('Are you sure you want to delete this Service Pack?')
            .then(function() {
              remove(close)
            })
        }
      )
    }

    function update(servicePack, callback) {
      var wasRenamed =
        servicePack.newServicePackName !== servicePack.servicePackName
      Alert.spinner.open()
      ServicePackService.update(
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
      ServicePackService.destroy(ctrl.serviceProviderId, ctrl.servicePackName)
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
})()
