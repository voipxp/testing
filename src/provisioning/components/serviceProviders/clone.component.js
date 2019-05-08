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
    Alert,
    ACL
  ) {
    var ctrl = this
    ctrl.select = select
    ctrl.onSelect = onSelect
    ctrl.click = click

    function select() {
      $scope.$broadcast('selectServiceProvider:load')
    }

    function onSelect(event) {
      console.log('onSelectServiceProvider', event)
      ctrl.serviceProviderId = event.serviceProviderId
    }

    function load() {
      ctrl.isSystem = ACL.has('System')
      ctrl.serviceProviderId = null
      ctrl.serviceProvider = {}
      ctrl.options = {
        services: true,
        servicePacks: true,
        networkClassOfService: ctrl.isSystem,
        enterpriseVoiceVPN: true,
        callProcessingPolicy: true
      }
      Alert.modal.open('cloneServiceProviderModal', function(close) {
        create(ctrl.serviceProvider, ctrl.options, close)
      })
    }

    function click(type) {
      if (type === 'services') {
        if (!ctrl.options['services']) {
          ctrl.options['servicePacks'] = false
        }
      } else if (type === 'servicePacks') {
        if (ctrl.options['servicePacks']) {
          ctrl.options['services'] = true
        }
      } else if (type === 'isEnterprise') {
        if (ctrl.serviceProvider.isEnterprise) {
          ctrl.serviceProvider.useCustomRoutingProfile = false
        }
      }
    }

    function create(serviceProvider, options, callback) {
      Alert.spinner.open()
      CloneServiceProviderService.all(ctrl.serviceProviderId, {
        data: serviceProvider,
        options: options
      })
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