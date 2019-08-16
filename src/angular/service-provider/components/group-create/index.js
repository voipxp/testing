import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('groupCreate', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'EventEmitter',
  'Alert',
  '$scope',
  '$q',
  'GroupService',
  'ServiceProviderDomainService',
  'SystemStateService',
  'SystemTimeZoneService'
]
function controller(
  EventEmitter,
  Alert,
  $scope,
  $q,
  GroupService,
  ServiceProviderDomainService,
  SystemStateService,
  SystemTimeZoneService
) {
  var ctrl = this

  function load() {
    Alert.spinner.open()
    return $q
      .all([loadDomains(), loadStates(), loadTimeZones()])
      .then(function() {
        ctrl.group = { defaultDomain: ctrl.domains.default, userLimit: 25 }
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function open() {
    Alert.modal.open('createGroupModal', function(close) {
      create(close)
    })
  }

  function loadDomains() {
    return ServiceProviderDomainService.index(ctrl.serviceProviderId).then(function(data) {
      ctrl.domains = data
      return data
    })
  }

  function loadStates() {
    return SystemStateService.index().then(function(data) {
      ctrl.states = data
      return data
    })
  }

  function loadTimeZones() {
    return SystemTimeZoneService.index().then(function(data) {
      ctrl.timezones = data
      return data
    })
  }

  function create(callback) {
    Alert.spinner.open()
    ctrl.group.serviceProviderId = ctrl.serviceProviderId
    GroupService.store(ctrl.serviceProviderId, ctrl.group)
      .then(function() {
        Alert.notify.success('Group Created')
        callback()
        sendUpdate(ctrl.group)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function sendUpdate(group) {
    ctrl.onUpdate(EventEmitter({ group: group }))
  }

  $scope.$on('groupCreate:load', function() {
    load()
      .then(open)
      .catch(function(error) {
        Alert.notify.danger(error)
      })
  })
}
