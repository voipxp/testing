;(function() {
  angular.module('odin.provisioning').component('serviceProviderClone', {
    templateUrl:
      'provisioning/components/serviceProviders/clone.component.html',
    controller: Controller,
    bindings: { onCreate: '&' }
  })

  function Controller(
    EventEmitter,
    CloneServiceProviderService,
    $scope,
    Alert
  ) {
    var ctrl = this
    ctrl.select = select
    ctrl.onSelect = onSelect

    function select() {
      $scope.$broadcast('selectServiceProvider:load')
    }

    function onSelect(event) {
      console.log('onSelectServiceProvider', event)
      ctrl.serviceProviderId = event.serviceProviderId
    }

    function load() {
      ctrl.serviceProviderId = null
      ctrl.serviceProvider = {}
      Alert.modal.open('cloneServiceProviderModal', function(close) {
        create(ctrl.serviceProvider, close)
      })
    }

    function create(serviceProvider, callback) {
      Alert.spinner.open()
      CloneServiceProviderService.all(ctrl.serviceProviderId, serviceProvider)
        .then(function() {
          Alert.notify.success('Service Provider Cloned')
          callback()
          sendUpdate(serviceProvider)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function sendUpdate(serviceProvider) {
      ctrl.onCreate(EventEmitter({ serviceProvider: serviceProvider }))
    }

    $scope.$on('serviceProviderClone:load', load)
  }
})()
