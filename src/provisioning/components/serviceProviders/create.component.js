;(function() {
  angular.module('odin.provisioning').component('serviceProviderCreate', {
    templateUrl:
      'provisioning/components/serviceProviders/create.component.html',
    controller: Controller,
    bindings: {
      onCreate: '&'
    }
  })

  function Controller(ServiceProviderService, EventEmitter, $scope, Alert) {
    var ctrl = this
    ctrl.selectType = selectType

    function load() {
      ctrl.serviceProvider = {
        isEnterprise: false,
        useCustomRoutingProfile: true,
        contact: {},
        address: {}
      }
    }

    function create(callback) {
      Alert.spinner.open()
      ServiceProviderService.store(ctrl.serviceProvider)
        .then(function() {
          Alert.notify.success('Service Provider Created')
          callback()
          sendUpdate(ctrl.serviceProvider)
        })
        .catch(function(error) {
          Alert.notify.danger(error.data)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function sendUpdate(serviceProvider) {
      ctrl.onCreate(EventEmitter({ serviceProvider: serviceProvider }))
    }

    function selectType() {
      if (ctrl.serviceProvider.isEnterprise) {
        ctrl.serviceProvider.useCustomRoutingProfile = false
      }
    }

    $scope.$on('serviceProviderCreate:load', function() {
      load()
      Alert.modal.open('createServiceProviderModal', create)
    })
  }
})()
