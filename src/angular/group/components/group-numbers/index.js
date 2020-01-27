import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupNumbers', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderNumberService',
  'GroupNumberService',
  'NumberService',
  'GroupPhoneNumberSearchService',
  'ACL'
]
function controller(
  Alert,
  ServiceProviderNumberService,
  GroupNumberService,
  NumberService,
  GroupPhoneNumberSearchService,
  ACL
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.actions = [ 'Activate Numbers', 'Deactivate Numbers']
  ctrl.columns = [
    {
      key: 'phoneNumbers',
      label: 'Phone Numbers'
    },
    {
      key: 'userId',
      label: 'User ID'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'extension',
      label: 'Extension'
    },
    {
      key: 'department',
      label: 'Department'
    },
    {
      key: 'activated',
      label: 'Activated',
      type: 'boolean',
      align: 'centered'
    }
  ]

  function onInit() {
    ctrl.loading = true
    ctrl.isProvisioning = ACL.has('Reseller')
     loadNumbers()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadNumbers() {
    return GroupPhoneNumberSearchService.load(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.numbers = _.map(data, function(number) {  
          number.dns.expanded = _.map(NumberService.expand(number.dns), 'min')
          return number
        })
      }
    )
  }
    
  
}
