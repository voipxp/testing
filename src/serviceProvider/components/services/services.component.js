;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderServices', {
    templateUrl: 'serviceProvider/components/services/services.component.html',
    controller: Controller,
    bindings: {
      serviceType: '@'
    }
  })

  function Controller(
    Alert,
    ServiceProviderServiceService,
    $routeParams,
    $filter
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.serviceProviderId = $routeParams.serviceProviderId

    ctrl.quantity = function(value) {
      return value === -1 ? 'Unlimited' : value
    }

    function onInit() {
      ctrl.loading = true
      ctrl.title = $filter('humanize')(ctrl.serviceType)
      return loadServices()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
    }

    function loadServices() {
      return ServiceProviderServiceService.show(ctrl.serviceProviderId).then(
        function(data) {
          ctrl.services = _.filter(data[ctrl.serviceType], { licensed: true })
        }
      )
    }

    function edit(service) {
      ctrl.editService = angular.copy(service)
      Alert.modal.open('editServiceProviderService', function onSave(close) {
        var runUpdate = function() {
          update(ctrl.editService, close)
        }
        if (!ctrl.editService.authorized && service.authorized) {
          Alert.confirm
            .open('Are you sure you want to de-authorize this service?')
            .then(runUpdate)
        } else {
          runUpdate()
        }
      })
    }

    function update(service, callback) {
      Alert.spinner.open()

      // format as an array to fit API requirements
      var singleService = {}
      singleService[ctrl.serviceType] = [service]

      // Update service
      ServiceProviderServiceService.update(
        ctrl.serviceProviderId,
        singleService
      )
        .then(loadServices)
        .then(function() {
          Alert.notify.success('Service Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          console.log('error', error.data)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
