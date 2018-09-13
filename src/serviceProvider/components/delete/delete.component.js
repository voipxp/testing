;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderDelete', {
    templateUrl: 'serviceProvider/components/delete/delete.component.html',
    controller: Controller
  })

  function Controller(Alert, ServiceProviderService, Route, $routeParams) {
    var ctrl = this
    ctrl.remove = remove

    ctrl.serviceProviderId = $routeParams.serviceProviderId

    function remove() {
      Alert.confirm
        .open('Are you sure you want to remove ' + ctrl.serviceProviderId + '?')
        .then(function() {
          Alert.spinner.open()
          return ServiceProviderService.destroy(ctrl.serviceProviderId)
            .then(function() {
              Alert.notify.success('Service Provider Removed')
              Route.open('serviceProviders')
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
})()
