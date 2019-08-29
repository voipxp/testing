import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('resellerCreate', {
  template,
  controller,
  bindings: { onCreate: '&' }
})

controller.$inject = ['ResellerService', 'EventEmitter', '$scope', 'Alert']
function controller(ResellerService, EventEmitter, $scope, Alert) {
  var ctrl = this
  ctrl.selectType = selectType
  ctrl.onCreate = onCreate

  function load() {
    ctrl.reseller = {}
  }

  function onCreate(event) {
    console.log('onCreate reseller-create', event)
  }
  function create(callback) {
    Alert.spinner.open()
    ResellerService.store(ctrl.reseller)
      .then(function() {
        Alert.notify.success('Reseller Created')
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
    ctrl.onCreate(EventEmitter({ reseller: reseller }))
  }

  function selectType() {
    if (ctrl.serviceProvider.isEnterprise) {
      ctrl.serviceProvider.useCustomRoutingProfile = false
    }
  }

  $scope.$on('resellerCreate:load', function() {
    load()
    Alert.modal.open('createResellerModal', create)
  })
}
