import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderProfile', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = [
  'ServiceProviderService',
  'SystemStateService',
  'Alert',
  '$q',
  'ServiceProviderPolicyService',
  'ServiceProviderDomainService'
]
function controller(
  ServiceProviderService,
  SystemStateService,
  Alert,
  $q,
  ServiceProviderPolicyService,
  ServiceProviderDomainService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.contactSummary = contactSummary
  ctrl.addressSummary = addressSummary
  ctrl.toggleOptional = toggleOptional
  ctrl.selectType = selectType
  ctrl.edit = edit

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadServiceProvider(), ServiceProviderPolicyService.load()])
      .then(function() {
        ctrl.canRead = ServiceProviderPolicyService.profileRead()
        ctrl.canUpdate = ServiceProviderPolicyService.profileUpdate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onChanges(changes) {
    if (changes.serviceProviderId) {
      ctrl.serviceProviderId = changes.serviceProviderId.currentValue
    }
  }

  function loadServiceProvider() {
    return ServiceProviderService.show(ctrl.serviceProviderId).then(function(
      data
    ) {
      ctrl.serviceProvider = data
    })
  }

  function loadDomains() {
    return ServiceProviderDomainService.index(ctrl.serviceProviderId).then(function(data) {
      ctrl.domains = data
    })
  }

  function loadStates() {
    return SystemStateService.index().then(function(data) {
      ctrl.states = data
    })
  }

  function contactSummary() {
    var contact = ctrl.serviceProvider && ctrl.serviceProvider.contact
    if (!contact) return
    return _.compact([
      contact.contactName,
      contact.contactEmail,
      contact.contactPhone
    ]).join(', ')
  }

  function addressSummary() {
    var address = ctrl.serviceProvider && ctrl.serviceProvider.address
    if (!address) return
    var street = _.compact([address.addressLine1, address.addressLine2]).join(
      ' '
    )
    var stateZip = _.compact([
      address.stateOrProvince,
      address.zipOrPostalCode
    ]).join(' ')
    return _.compact([street, address.city, stateZip, address.country]).join(
      ', '
    )
  }

  function loadHelpers() {
    Alert.spinner.open()
    return $q.all([loadDomains(), loadStates()]).finally(function() {
      Alert.spinner.close()
    })
  }

  function edit() {
    loadHelpers()
      .then(function() {
        ctrl.showOptional = false
        ctrl.editServiceProvider = angular.copy(ctrl.serviceProvider)
        ctrl.editServiceProvider.serviceProviderId = ctrl.serviceProviderId
        Alert.modal.open('editServiceProviderDetails', function(close) {
          update(ctrl.editServiceProvider, close)
        })
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
  }

  function update(serviceProvider, callback) {
    Alert.spinner.open()
    ServiceProviderService.update(ctrl.serviceProviderId, serviceProvider)
      .then(loadServiceProvider)
      .then(function() {
        Alert.notify.success('Service Provider Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function toggleOptional() {
    ctrl.showOptional = !ctrl.showOptional
  }

  function selectType() {
    if (ctrl.editServiceProvider.isEnterprise) {
      ctrl.editServiceProvider.useCustomRoutingProfile = false
    }
  }
}
