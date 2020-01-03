import angular from 'angular'
import _ from 'lodash'

angular.module('odin.group').factory('GroupWebPolicyService', Service)

Service.$inject = ['AuthService', 'Session', 'ACL', '$q']
function Service(AuthService, Session, ACL, $q) {
  var service = {
    load: load,
    callingPlanAccessCreate: callingPlanAccessCreate,
    extensionAccessCreate: extensionAccessCreate,
    extensionAccessRead: extensionAccessRead,
    ldapIntegrationAccessCreate: ldapIntegrationAccessCreate,
    ldapIntegrationAccessRead: ldapIntegrationAccessRead,
    voiceMessagingAccessCreate: voiceMessagingAccessCreate,
    departmentAdminUserAccessCreate: departmentAdminUserAccessCreate,
    departmentAdminUserProfileRead: departmentAdminUserProfileRead,
    departmentAdminUserProfileUpdate: departmentAdminUserProfileUpdate,
    departmentAdminUserAccessRead: departmentAdminUserAccessRead,
    departmentAdminUserDelete: departmentAdminUserDelete,
    departmentAdminUserIdUpdate: departmentAdminUserIdUpdate,
    departmentAdminTrunkGroupAccessCreate: departmentAdminTrunkGroupAccessCreate,
    departmentAdminPhoneNumberExtensionAccessCreate: departmentAdminPhoneNumberExtensionAccessCreate,
    departmentAdminPhoneNumberExtensionAccessRead: departmentAdminPhoneNumberExtensionAccessRead,
    departmentAdminCallingLineIdNumberAccessCreate: departmentAdminCallingLineIdNumberAccessCreate,
    departmentAdminCallingLineIdNumberAccessRead: departmentAdminCallingLineIdNumberAccessRead,
    userAuthenticationAccessCreate: userAuthenticationAccessCreate,
    userGroupDirectoryAccessCreate: userGroupDirectoryAccessCreate,
    userProfileAccessCreate: userProfileAccessCreate,
    userProfileAccessRead: userProfileAccessRead,
    userEnhancedCallLogAccessCreate: userEnhancedCallLogAccessCreate,
    userEnhancedCallLogAccessRead: userEnhancedCallLogAccessRead,
    userAutoAttendantNameDialingAccessCreate: userAutoAttendantNameDialingAccessCreate
  }
  return service

  function load() {
    // no need if not a group admin
    if (ACL.has('Service Provider')) return $q.resolve()
    if (ACL.has('Group')) return $q.resolve()
    if (ACL.has('Group Department')) return $q.resolve()
  }

  function callingPlanAccessCreate() {
    return checkAccess('callingPlanAccess', ['Full'])
  }

  function extensionAccessCreate() {
    return checkAccess('extensionAccess', ['Full'])
  }

  function extensionAccessRead() {
    return checkAccess('extensionAccess', ['Full', 'Read-Only'])
  }

  function ldapIntegrationAccessCreate() {
    return checkAccess('ldapIntegrationAccess', ['Full'])
  }

  function ldapIntegrationAccessRead() {
    return checkAccess('ldapIntegrationAccess', ['Full', 'Read-Only'])
  }

  function voiceMessagingAccessCreate() {
    return checkAccess('ldapIntegrationAccess', ['Full'])
  }



  function departmentAdminUserAccessCreate() {
    return checkAccess('departmentAdminUserAccess', ['Full'])
  }

  function departmentAdminUserProfileRead() {
    return checkAccess('departmentAdminUserAccess', [
      'Full',
      'Read-Only Profile'
    ])
  }

  function departmentAdminUserProfileUpdate() {
    return checkAccess('departmentAdminUserAccess', ['Full'])
  }

  function departmentAdminUserAccessRead() {
    return checkAccess('departmentAdminUserAccess', ['Full', 'Read-Only Profile', 'No Profile'])
  }

  function departmentAdminUserDelete() {
    return checkAccess('departmentAdminUserAccess', ['Full'])
  }
  function departmentAdminUserIdUpdate() {
    return checkAccess('departmentAdminUserAccess', ['Full'])
  }

  function departmentAdminTrunkGroupAccessCreate() {
    return checkAccess('departmentAdminTrunkGroupAccess', ['Full'])
  }

  function departmentAdminPhoneNumberExtensionAccessCreate() {
    return checkAccess('departmentAdminPhoneNumberExtensionAccess', ['Full'])
  }

  function departmentAdminPhoneNumberExtensionAccessRead() {
    return checkAccess('departmentAdminPhoneNumberExtensionAccess', ['Full', 'Read-Only'])
  }

  function departmentAdminCallingLineIdNumberAccessCreate() {
    return checkAccess('departmentAdminCallingLineIdNumberAccess', ['Full'])
  }
  function departmentAdminCallingLineIdNumberAccessRead() {
    return checkAccess('departmentAdminCallingLineIdNumberAccess', ['Full', 'Read-Only'])
  }

  function userAuthenticationAccessCreate() {
    return checkAccess('userAuthenticationAccess', ['Full'])
  }

  function userGroupDirectoryAccessCreate() {
    return checkAccess('userGroupDirectoryAccess', ['Full'])
  }

  function userProfileAccessCreate() {
    return checkAccess('userProfileAccess', ['Full'])
  }

  function userProfileAccessRead() {
    return checkAccess('userProfileAccess', ['Full', 'Read-Only'])
  }

  function userEnhancedCallLogAccessCreate() {
    return checkAccess('userEnhancedCallLogAccess', ['Full'])
  }

  function userEnhancedCallLogAccessRead() {
    return checkAccess('userEnhancedCallLogAccess', ['Full', 'Read-Only'])
  }

  function userAutoAttendantNameDialingAccessCreate() {
    return checkAccess('userAutoAttendantNameDialingAccess', ['Full'])
  }

  function checkAccess(attribute, values) {
    if (ACL.has('Service Provider')) return true
    var policy = Session.data('policy')
    values = _.castArray(values)
    var permission = _.get(policy, attribute)
    return _.includes(values, permission)
  }
}
