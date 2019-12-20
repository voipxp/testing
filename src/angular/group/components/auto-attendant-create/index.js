import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('autoAttendantCreate', {
  template,
  controller,
  bindings: {
    groupId: '<',
    serviceProviderId: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'HashService',
  '$scope',
  'EventEmitter',
  'GroupAutoAttendantService',
  'ACL',
  'Module',
  '$q',
  'GroupPolicyService',
  'ServiceProviderPolicyService'
]
function controller(
  Alert,
  HashService,
  $scope,
  EventEmitter,
  GroupAutoAttendantService,
  ACL,
  Module,
  $q,
  GroupPolicyService,
  ServiceProviderPolicyService
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.options = GroupAutoAttendantService.options
  ctrl.onSelectPhone = onSelectPhone
  ctrl.onSelectUserId = onSelectUserId
  ctrl.autoAttendant = {}
  ctrl.hasAnnouncements = ACL.hasVersion('20')

  function onInit() {
    $q.all([
      GroupPolicyService.load(),
      ServiceProviderPolicyService.load()]).
    then(function() {
      if( ACL.is('Service Provider') ) {
          ctrl.canCLIDUpdate = ServiceProviderPolicyService.callingLineIdUpdate()
          ctrl.canPNUpdate = ServiceProviderPolicyService.phoneNumberExtensionUpdate()
      } else if( ACL.is('Group') ){
          ctrl.canCLIDUpdate = GroupPolicyService.callingLineIdUpdate()
          ctrl.canPNUpdate = GroupPolicyService.phoneNumberExtensionUpdate()
      }
    })

    Module.show('Auto Attendant').then(function(module) {
      ctrl.module = module
    })
    ctrl.modalId = HashService.guid()
  }

  function open() {
    ctrl.autoAttendant = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      enableVideo: false,
      extensionDialingScope: ctrl.options.dialingScopes[0],
      nameDialingScope: ctrl.options.dialingScopes[0],
      nameDialingEntries: ctrl.options.dialingEntries[0],
      firstDigitTimeoutSeconds: 1
    }
    Alert.modal.open(ctrl.modalId, function(close) {
      create(ctrl.autoAttendant, close)
    })
  }

  function create(autoAttendant, callback) {
    Alert.spinner.open()
    GroupAutoAttendantService.store(autoAttendant)
      .then(function() {
        Alert.notify.success('Auto Attendant Created')
        callback()
        sendUpdate(autoAttendant)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function onSelectPhone(event) {
    _.set(
      ctrl.autoAttendant,
      'serviceInstanceProfile.phoneNumber',
      event.phoneNumber
    )
  }

  function onSelectUserId(event) {
    ctrl.autoAttendant.serviceUserId = event.userId
  }

  function sendUpdate(autoAttendant) {
    return ctrl.onUpdate(EventEmitter({ autoAttendant: autoAttendant }))
  }

  $scope.$on('autoAttendantCreate:load', open)
}
