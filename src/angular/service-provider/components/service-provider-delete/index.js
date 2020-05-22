import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderDelete', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = ['ACL','Alert', 'ServiceProviderService', 'Route', 'Session']
function controller(ACL, Alert, ServiceProviderService, Route, Session) {
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
            back()
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }

  function back() {
    if (Session.data('resellerId')) {
      Route.open('resellers', Session.data('resellerId'), 'service-providers')
    } else if(ACL.is('System')) {
      Route.open('system','serviceProviders')
    }else Route.open('serviceProviders',ctrl.serviceProviderId)
    }
  }
