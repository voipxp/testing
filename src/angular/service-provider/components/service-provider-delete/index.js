import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderDelete', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = ['Alert', 'ServiceProviderService', 'Route']
function controller(Alert, ServiceProviderService, Route) {
  var ctrl = this
  ctrl.remove = remove

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
