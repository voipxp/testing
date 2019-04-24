import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.system').component('serviceProvidersPanel', {
  template,
  controller,
  bindings: { limitTo: '<' }
})

controller.$inject = ['Alert', 'ServiceProviderService', '$scope', 'Route']
function controller(Alert, ServiceProviderService, $scope, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.onCreate = onCreate
  ctrl.open = open
  ctrl.onPagination = onPagination
  ctrl.clone = clone

  function onInit() {
    ctrl.loading = true
    loadServiceProviders()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function loadServiceProviders() {
    return ServiceProviderService.index().then(function(data) {
      ctrl.serviceProviders = data.map(function(item) {
        item.name = _.trim(item.serviceProviderName) || item.serviceProviderId
        return item
      })
    })
  }

  function add() {
    $scope.$broadcast('serviceProviderCreate:load')
  }

  function onCreate(event) {
    open({ item: event.serviceProvider })
  }

  function clone() {
    $scope.$broadcast('serviceProviderClone:load')
  }

  function open(event) {
    var serviceProvider = event.item
    Route.open('serviceProviders', serviceProvider.serviceProviderId)
  }
}
