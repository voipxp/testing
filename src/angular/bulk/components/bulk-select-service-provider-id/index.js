import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectServiceProviderId', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = ['Alert', 'ServiceProviderService', 'EventEmitter', 'Session', '$scope']
function controller(Alert, ServiceProviderService, EventEmitter, Session, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.select = select
  ctrl.onCreate = onCreate

  function onInit() {
    ctrl.loading = true
    if (Session.data('serviceProviderId')) {
      return select(Session.data('serviceProviderId'))
    }
    loadServiceProviders()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function add() {
    $scope.$broadcast('serviceProviderCreate:load')
  }

  function onCreate(event) {
    select(event.serviceProvider)
  }

  function loadServiceProviders() {
    return ServiceProviderService.index().then(function(data) {
      ctrl.serviceProviders = data
    })
  }

  function select(serviceProvider) {
    var id = _.get(serviceProvider, 'serviceProviderId', serviceProvider)
    ctrl.onUpdate(EventEmitter({ serviceProviderId: id }))
  }
}
