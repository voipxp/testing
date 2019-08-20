import angular from 'angular'
import _ from 'lodash'

angular
  .module('odin.serviceProvider')
  .factory('ServiceProviderPolicyService', Service)

Service.$inject = ['AuthService', 'Session', 'ACL', '$q']
function Service(AuthService, Session, ACL, $q) {
  var service = {
    load: load,
    accessDeviceAssociationRead: accessDeviceAssociationRead, //
    accessDeviceAssociationUpdate: accessDeviceAssociationUpdate, //
    accessDeviceCreate: accessDeviceCreate, //
    accessDeviceRead: accessDeviceRead, //
    accessDeviceUpdate: accessDeviceUpdate, //
    adminCreate: adminCreate, //
    adminRead: adminRead, //
    adminUpdate: adminUpdate, //
    assignServiceRead: assignServiceRead, //
    assignServiceUpdate: assignServiceUpdate, //
    callingLineIdRead: callingLineIdRead, //
    callingLineIdUpdate: callingLineIdUpdate, //
    communicationBarringUpdate: communicationBarringUpdate, //
    communicationBarringRead: communicationBarringRead, //
    departmentCreate: departmentCreate, //
    departmentRead: departmentRead, //
    departmentUpdate: departmentUpdate, //
    dialableCallerIdRead: dialableCallerIdRead, //
    dialableCallerIdUpdate: dialableCallerIdUpdate, //
    groupCreate: groupCreate, //
    groupRead: groupRead, //
    groupUpdate: groupUpdate, //
    groupDelete: groupDelete,
    networkPolicyRead: networkPolicyRead, //
    networkPolicyUpdate: networkPolicyUpdate, //
    numberActivationRead: numberActivationRead, //
    numberActivationUpdate: numberActivationUpdate, //
    officeZoneRead: officeZoneRead, //
    officeZoneUpdate: officeZoneUpdate, //
    phoneNumberExtensionRead: phoneNumberExtensionRead, //
    phoneNumberExtensionUpdate: phoneNumberExtensionUpdate, //
    profileRead: profileRead, //
    profileUpdate: profileUpdate, //
    serviceRead: serviceRead, //
    serviceUpdate: serviceUpdate, //
    servicePackRead: servicePackRead, //
    servicePackUpdate: servicePackUpdate, //
    servicePackCreate: servicePackCreate, //
    sessionControlRead: sessionControlRead, //
    sessionControlUpdate: sessionControlUpdate, //
    userDelete: userDelete, //
    userCreate: userCreate, //
    userProfileRead: userProfileRead, //
    userProfileUpdate: userProfileUpdate, //
    userRead: userRead, //
    userUpdate: userUpdate //
  }
  return service

  function load() {
    // no need if not a system admin
    if (ACL.has('Reseller')) return $q.resolve()
  }

  function accessDeviceAssociationRead() {
    return checkAccess('accessDeviceAccess', [
      'Full',
      'Associate User With Device',
      'Read-Only'
    ])
  }

  function accessDeviceAssociationUpdate() {
    return checkAccess('accessDeviceAccess', [
      'Full',
      'Associate User With Device'
    ])
  }

  function accessDeviceCreate() {
    return checkAccess('accessDeviceAccess', ['Full'])
  }

  function accessDeviceRead() {
    return checkAccess('accessDeviceAccess', [
      'Full',
      'Associate User With Device',
      'Read-Only'
    ])
  }

  function accessDeviceUpdate() {
    return checkAccess('accessDeviceAccess', ['Full'])
  }

  function adminCreate() {
    return checkAccess('adminAccess', ['Full'])
  }

  function adminRead() {
    return checkAccess('adminAccess', ['Full', 'Read-Only'])
  }

  function adminUpdate() {
    return checkAccess('adminAccess', ['Full'])
  }

  function assignServiceRead() {
    return checkAccess('serviceAccess', ['Full', 'Read-Only'])
  }

  function assignServiceUpdate() {
    return checkAccess('serviceAccess', ['Full'])
  }

  function callingLineIdRead() {
    return checkAccess('callingLineIdNumberAccess', ['Full', 'Read-Only'])
  }

  function communicationBarringUpdate() {
    return checkAccess('communicationBarringAccess', ['Full'])
  }

  function communicationBarringRead() {
    return checkAccess('communicationBarringAccess', ['Full', 'Read-Only'])
  }

  function callingLineIdUpdate() {
    return checkAccess('callingLineIdNumberAccess', ['Full'])
  }

  function departmentCreate() {
    return checkAccess('departmentAccess', ['Full'])
  }

  function departmentRead() {
    return checkAccess('departmentAccess', ['Full', 'Read-Only'])
  }

  function departmentUpdate() {
    return checkAccess('departmentAccess', ['Full'])
  }

  function dialableCallerIdRead() {
    return checkAccess('dialableCallerIDAccess', ['Full', 'Read-Only'])
  }

  function dialableCallerIdUpdate() {
    return checkAccess('dialableCallerIDAccess', ['Full'])
  }
  function groupCreate() {
    return checkAccess('groupAccess', ['Full'])
  }

  function groupRead() {
    return checkAccess('groupAccess', [
      'Full',
      'Restricted from Adding or Removing Groups'
    ])
  }

  function groupUpdate() {
    return checkAccess('groupAccess', ['Full'])
  }

  function groupDelete() {
    return checkAccess('groupAccess', ['Full'])
  }

  function numberActivationRead() {
    return checkAccess('numberActivationAccess', ['Full', 'Read-Only'])
  }

  function numberActivationUpdate() {
    return checkAccess('numberActivationAccess', ['Full'])
  }

  function officeZoneRead() {
    return checkAccess('officeZoneAccess', ['Full', 'Read-Only'])
  }

  function officeZoneUpdate() {
    return checkAccess('officeZoneAccess', ['Full'])
  }

  function networkPolicyRead() {
    return checkAccess('networkPolicyAccess', ['Full'])
  }

  function networkPolicyUpdate() {
    return checkAccess('networkPolicyAccess', ['Full'])
  }

  function phoneNumberExtensionRead() {
    return checkAccess('phoneNumberExtensionAccess', ['Full', 'Read-Only'])
  }

  function phoneNumberExtensionUpdate() {
    return checkAccess('phoneNumberExtensionAccess', ['Full'])
  }

  function profileRead() {
    return checkAccess('profileAccess', ['Read-Only', 'Full'])
  }

  function profileUpdate() {
    return checkAccess('profileAccess', 'Full')
  }

  function sessionControlRead() {
    return checkAccess('sessionAdmissionControlAccess', ['Full', 'Read-Only'])
  }

  function sessionControlUpdate() {
    return checkAccess('sessionAdmissionControlAccess', ['Full'])
  }

  function serviceRead() {
    return checkAccess('serviceAccess', ['Full', 'Read-Only'])
  }

  function serviceUpdate() {
    return checkAccess('serviceAccess', ['Full'])
  }

  function servicePackUpdate() {
    return checkAccess('serviceAccess', ['Full'])
  }
  function servicePackCreate() {
    return checkAccess('servicePackAccess', ['Full'])
  }
  function servicePackRead() {
    return checkAccess('servicePackAccess', ['Full'])
  }

  function userCreate() {
    return checkAccess('userAccess', ['Full'])
  }

  function userDelete() {
    return checkAccess('userAccess', ['Full'])
  }

  function userProfileRead() {
    return checkAccess('userAccess', [
      'Full',
      'Full Profile',
      'Read-Only Profile'
    ])
  }

  function userProfileUpdate() {
    return checkAccess('userAccess', ['Full', 'Full Profile'])
  }

  function userRead() {
    return checkAccess('userAccess', [
      'Full',
      'Full Profile',
      'Read-Only Profile',
      'No Profile'
    ])
  }

  function userUpdate() {
    return checkAccess('userAccess', ['Full', 'Full Profile'])
  }

  function checkAccess(attribute, values) {
    if (ACL.has('Reseller')) return true
    var policy = Session.data('policy')
    values = _.castArray(values)
    var permission = _.get(policy, attribute)
    return _.includes(values, permission)
  }
}
