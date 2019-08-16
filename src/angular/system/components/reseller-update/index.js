import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('resellerUpdate', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = ['ResellerService', 'EventEmitter', '$scope', 'Alert', '$timeout']
function controller(ResellerService, EventEmitter, $scope, Alert, $timeout) {
  var ctrl = this
  ctrl.selectType = selectType
  ctrl.onUpdate = onUpdate

  function onUpdate(event) {}

  function modify(callback) {
    Alert.spinner.open()
    ResellerService.update(ctrl.reseller)
      .then(function() {
        Alert.notify.success('Reseller Updated')
        callback()
        sendUpdate(ctrl.reseller)
      })
      .catch(function(error) {
        Alert.notify.danger(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function destroy(callback) {
    Alert.spinner.open()
    ResellerService.destroy(ctrl.reseller.resellerId)
      .then(function() {
        Alert.notify.success('Reseller deleted')
        callback()
        sendUpdate(ctrl.reseller)
      })
      .catch(function(error) {
        Alert.notify.danger(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function sendUpdate(reseller) {
    ctrl.onUpdate(EventEmitter({ reseller: reseller }))
  }

  function selectType() {
    if (ctrl.serviceProvider.isEnterprise) {
      ctrl.serviceProvider.useCustomRoutingProfile = false
    }
  }

  $scope.$on('resellerUpdate:load', function(event, reseller) {
    ctrl.reseller = reseller
    $timeout(() => (ctrl.reseller = reseller), 0)
    Alert.modal.open(
      'updateResellerModal',
      function(close) {
        modify(close)
      },
      function(close) {
        Alert.confirm.open('Are you sure you want to remove this reseller?').then(function() {
          destroy(close)
        })
      }
    )
  })
}
