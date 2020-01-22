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
    onUpdate: '&',
    ngMinlength: '=',
    ngMaxlength: '='
  }
})

controller.$inject = [
  'Alert',
  '$q',
  'ACL',
  'GroupDepartmentService',
  'SystemLanguageService',
  'SystemTimeZoneService',
  'EventEmitter',
  'GroupPolicyService',
  'ServiceProviderPolicyService',
  'GroupWebPolicyService',
  'PasswordModifyRequest',
  'AuthService',
  'Session'
]
function controller(
  Alert,
  $q,
  ACL,
  GroupDepartmentService,
  SystemLanguageService,
  SystemTimeZoneService,
  EventEmitter,
  GroupPolicyService,
  ServiceProviderPolicyService,
  GroupWebPolicyService,
  PasswordModifyRequest,
  AuthService,
  Session
) {
  var ctrl = this

  ctrl.departments = []
  ctrl.languages = []
  ctrl.timezones = []
  ctrl.numbers = []

  ctrl.selectNumber = selectNumber
  ctrl.edit = edit
  ctrl.isDepartmentAdmin = ACL.is('Group Department')

  function activate() {
    Alert.spinner.open()
    return $q
      .all([
        loadDepartments(),
        loadLanguages(),
        loadTimezones(),
        GroupPolicyService.load(),
        ServiceProviderPolicyService.load()
      ])
      .then(function() {
        ctrl.canPNUpdate = true
        if (ACL.is('Service Provider')) {
          ctrl.canPNUpdate = ServiceProviderPolicyService.phoneNumberExtensionUpdate()
        } else if (ACL.is('Group')) {
          ctrl.canPNUpdate = GroupPolicyService.phoneNumberExtensionUpdate()
        } else if (ACL.is('Group Department')) {
          ctrl.canPNUpdate = GroupWebPolicyService.departmentAdminPhoneNumberExtensionAccessCreate()
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
      ctrl.isCurrentUser = ctrl.serviceUserId === Session.data('userId')
      Alert.modal.open('editServiceInstanceProfile', function(close) {
        sendUpdate(ctrl.editProfile, close)
      })
    })
  }

  function sendUpdate(profile, callback) {
    
	   ctrl.changePassWord = {
      userId : ctrl.serviceUserId,
      newPassword : profile.password,
    }
    if(profile.oldPassword) {
      ctrl.changePassWord['oldPassword'] = profile.oldPassword
    }
     
    if (profile.password) {
      delete profile.password
      updateSelfPassword(ctrl.changePassWord)
    }
	ctrl.onUpdate(EventEmitter({ profile: profile, callback: callback }))
  }
  
  function updateSelfPassword(user){
    return PasswordModifyRequest.updatePasswords( user )
    .then(function() {
      return ctrl.isCurrentUser
      ? updateSession(user.userId, user.newPassword)
      : $q.when()
    })
      .then(function() {
        Alert.notify.success('Password Changed')
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
  
  // so we don't have to login again
  function updateSession(userId, password) {
    return AuthService.token(userId, password).then(Session.set)
  }
  
}
