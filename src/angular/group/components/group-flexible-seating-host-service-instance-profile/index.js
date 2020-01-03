import angular from 'angular'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupFlexibleSeatingHostServiceInstanceProfile', {
    template,
    controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      serviceUserId: '<',
      readOnly: '<',
      flexibleSeatingHost: '<',
      loading: '<',
      onUpdate: '&',
      onDelete: '&'
    }
  })

controller.$inject = [
  'Alert',
  '$q',
  'ACL',
  'GroupDepartmentService',
  'SystemLanguageService',
  'SystemTimeZoneService',
  'GroupDeviceService',
  'EventEmitter',
  'GroupWebPolicyService'
]
function controller(
  Alert,
  $q,
  ACL,
  GroupDepartmentService,
  SystemLanguageService,
  SystemTimeZoneService,
  GroupDeviceService,
  EventEmitter,
  GroupWebPolicyService
) {
  var ctrl = this

  ctrl.departments = []
  ctrl.languages = []
  ctrl.timezones = []
  ctrl.numbers = []
  ctrl.devices = []
  ctrl.selectNumber = selectNumber
  ctrl.edit = edit
  ctrl.isDepartmentAdmin = ACL.is('Group Department')

  function activate() {
    Alert.spinner.open()
    return $q
      .all([loadDepartments(), loadLanguages(), loadTimezones(), loadDevices()])
      .then(function() {
        if(ACL.is('Group Department')) {
          ctrl.canPNUpdate = GroupWebPolicyService.departmentAdminPhoneNumberExtensionAccessCreate()
        } else {
          ctrl.canPNUpdate = true
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function loadDevices() {
    return GroupDeviceService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.devices = data
        return data
      }
    )
  }

  function loadDepartments() {
    return GroupDepartmentService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.departments = data
      return data
    })
  }

  function loadLanguages() {
    return SystemLanguageService.index().then(function(data) {
      ctrl.languages = data
      return data
    })
  }

  function loadTimezones() {
    return SystemTimeZoneService.index().then(function(data) {
      ctrl.timezones = data
      return data
    })
  }

  function selectNumber(event) {
    console.log('event', event)
    ctrl.editFlexibleSeatingHost.serviceInstanceProfile.phoneNumber =
      event.phoneNumber
    var extension = ctrl.editFlexibleSeatingHost.serviceInstanceProfile
      .phoneNumber
      ? ctrl.editFlexibleSeatingHost.serviceInstanceProfile.phoneNumber.slice(
          -4
        )
      : null
    ctrl.editFlexibleSeatingHost.serviceInstanceProfile.extension = extension
  }

  function edit() {
    activate().then(function() {
      ctrl.editFlexibleSeatingHost = angular.copy(ctrl.flexibleSeatingHost)
      Alert.modal.open(
        'editServiceInstanceProfile',
        function(close) {
          sendUpdate(ctrl.editFlexibleSeatingHost, close)
        },
        sendDelete
      )
    })
  }
  function sendUpdate(flexibleSeatingHost, callback) {
    ctrl.onUpdate(
      EventEmitter({
        flexibleSeatingHost: flexibleSeatingHost,
        callback: callback
      })
    )
  }
  function sendDelete(flexibleSeatingHost, callback) {
    ctrl.onDelete(
      EventEmitter({
        flexibleSeatingHost: flexibleSeatingHost,
        callback: callback
      })
    )
  }
}
