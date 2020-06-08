import angular from 'angular'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('serviceProviderRoutingProfile', {
    template,
    controller,
    bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
  })

controller.$inject = [
  '$q',
  'Alert',
  'SystemRoutingProfileService',
  'ServiceProviderRoutingProfileService'
]
function controller(
  $q,
  Alert,
  SystemRoutingProfileService,
  ServiceProviderRoutingProfileService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = {}

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadSystemRoutingProfiles(), loadServiceProviderRoutingProfile()])
      .then(function() {})
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSystemRoutingProfiles() {
    return SystemRoutingProfileService.index().then(function(data) {
      ctrl.options.routingProfiles = data
    })
  }

  function loadServiceProviderRoutingProfile() {
    return ServiceProviderRoutingProfileService.show(
      ctrl.serviceProviderId
    ).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editServiceProviderRoutingProfileModal', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    settings.serviceProviderId = ctrl.serviceProviderId
    ServiceProviderRoutingProfileService.update(
      ctrl.serviceProviderId,
      ctrl.editSettings.routingProfile
    )
      .then(loadServiceProviderRoutingProfile)
      .then(function() {
        Alert.notify.success('Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
