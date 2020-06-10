import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('serviceProviderReport', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderReportsService',
  'Route',
  '$location',
  'Session',
  'ACL'
]
function controller(
  Alert,
  ServiceProviderReportsService,
  Route,
  $location,
  Session,
  ACL
) {
  var ctrl = this
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
    ctrl.loading = true
    ctrl.hideNav = Session.data('resellerId') || ACL.is('System')
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
