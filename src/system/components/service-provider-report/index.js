import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('serviceProviderReport', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderReportsService',
  '$routeParams',
  'Route',
  '$location'
]
function controller(
  Alert,
  ServiceProviderReportsService,
  $routeParams,
  Route,
  $location
) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.settings = {}

  ctrl.columns = [
    {
      key: 'serviceProviderId',
      label: 'Service Provider ID'
    },
    {
      key: 'serviceProviderName',
      label: 'Service Provider Name'
    },
    {
      key: 'isEnterprise',
      label: 'Enterprise'
    },
    {
      key: 'groupId',
      label: 'Group Name'
    },
    {
      key: 'groupName',
      label: 'Group Name'
    },
    {
      key: 'userLimit',
      label: 'User Limit'
    }
  ]
  function onInit() {
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.loading = true
    loadServiceProviderReport()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }
  function loadServiceProviderReport() {
    return ServiceProviderReportsService.index().then(function(data) {
      ctrl.items = data
      return ctrl.items
    })
  }
  function onClick(item) {
    var returnTo = $location.url()
    Route.open('groups', item.serviceProviderId, item.groupId).search({
      returnTo: returnTo
    })
  }
}
