import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('serviceInstanceProfile', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    serviceUserId: '<',
    readOnly: '<',
    profile: '<',
    loading: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  '$q',
  'GroupDepartmentService',
  'SystemLanguageService',
  'SystemTimeZoneService',
  'EventEmitter'
]
function controller(
  Alert,
  $q,
  GroupDepartmentService,
  SystemLanguageService,
  SystemTimeZoneService,
  EventEmitter
) {
  var ctrl = this

  ctrl.departments = []
  ctrl.languages = []
  ctrl.timezones = []
  ctrl.numbers = []

  ctrl.selectNumber = selectNumber
  ctrl.edit = edit

  function activate() {
    Alert.spinner.open()
    return $q
      .all([loadDepartments(), loadLanguages(), loadTimezones()])
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
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
    ctrl.editProfile.phoneNumber = event.phoneNumber
    var extension = ctrl.editProfile.phoneNumber
      ? ctrl.editProfile.phoneNumber.slice(-4)
      : null
    ctrl.editProfile.extension = extension
  }

  function edit() {
    activate().then(function() {
      ctrl.editProfile = angular.copy(ctrl.profile)
      Alert.modal.open('editServiceInstanceProfile', function(close) {
        sendUpdate(ctrl.editProfile, close)
      })
    })
  }

  function sendUpdate(profile, callback) {
    ctrl.onUpdate(EventEmitter({ profile: profile, callback: callback }))
  }
}