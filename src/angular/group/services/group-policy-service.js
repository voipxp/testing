import angular from 'angular'
import _ from 'lodash'

angular.module('odin.group').factory('GroupPolicyService', Service)

Service.$inject = ['AuthService', 'Session', 'ACL', '$q']
function Service(AuthService, Session, ACL, $q) {
  var service = {
    load: load,
    accessDeviceAssociationRead: accessDeviceAssociationRead,
    accessDeviceAssociationUpdate: accessDeviceAssociationUpdate,
    accessDeviceCreate: accessDeviceCreate,
    accessDeviceRead: accessDeviceRead,
    accessDeviceUpdate: accessDeviceUpdate,
    adminCreate: adminCreate,
    adminRead: adminRead,
    adminUpdate: adminUpdate,
    assignServiceRead: assignServiceRead,
    assignServiceUpdate: assignServiceUpdate,
    callingLineIdRead: callingLineIdRead,
    callingLineIdUpdate: callingLineIdUpdate,
    departmentCreate: departmentCreate,
    departmentRead: departmentRead,
    departmentUpdate: departmentUpdate,
    dialableCallerIdRead: dialableCallerIdRead,
    dialableCallerIdUpdate: dialableCallerIdUpdate,
    enhancedServiceCreate: enhancedServiceCreate,
    enhancedServiceRead: enhancedServiceRead,
    enhancedServiceUpdate: enhancedServiceUpdate,
    featureAccessCodeCreate: featureAccessCodeCreate,
    featureAccessCodeRead: featureAccessCodeRead,
    featureAccessCodeUpdate: featureAccessCodeUpdate,
    numberActivationRead: numberActivationRead,
    numberActivationUpdate: numberActivationUpdate,
    officeZoneRead: officeZoneRead,
    officeZoneUpdate: officeZoneUpdate,
    phoneNumberExtensionRead: phoneNumberExtensionRead,
    phoneNumberExtensionUpdate: phoneNumberExtensionUpdate,
    profileRead: profileRead,
    profileUpdate: profileUpdate,
    sessionControlRead: sessionControlRead,
    sessionControlUpdate: sessionControlUpdate,
    trunkGroupCreate: trunkGroupCreate,
    trunkGroupRead: trunkGroupRead,
    trunkGroupUpdate: trunkGroupUpdate,
    userCreate: userCreate,
    userProfileRead: userProfileRead,
    userProfileUpdate: userProfileUpdate,
    userRead: userRead,
    userUpdate: userUpdate
  }
  return service

  function load() {
    // no need if not a group admin
    if (ACL.has('Service Provider')) return $q.resolve()
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

  function enhancedServiceCreate() {
    return checkAccess('enhancedServiceInstanceAccess', ['Full'])
  }

  function enhancedServiceRead() {
    return checkAccess('enhancedServiceInstanceAccess', ['Full', 'Modify-Only'])
  }

  function enhancedServiceUpdate() {
    return checkAccess('enhancedServiceInstanceAccess', ['Full', 'Modify-Only'])
  }

  function featureAccessCodeCreate() {
    return checkAccess('featureAccessCodeAccess', ['Full'])
  }

  function featureAccessCodeRead() {
    return checkAccess('featureAccessCodeAccess', ['Full', 'Read-Only'])
  }

  function featureAccessCodeUpdate() {
    return checkAccess('featureAccessCodeAccess', ['Full'])
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

  function trunkGroupCreate() {
    return checkAccess('trunkGroupAccess', ['Full'])
  }

  function trunkGroupRead() {
    return checkAccess('trunkGroupAccess', [
      'Full',
      'Full Resources',
      'Read-Only Resources'
    ])
  }

  function trunkGroupUpdate() {
    return checkAccess('trunkGroupAccess', ['Full', 'Full Resources'])
  }

  function userCreate() {
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
    if (ACL.has('Service Provider')) return true
    var policy = Session.data('policy')
    values = _.castArray(values)
    var permission = _.get(policy, attribute)
    return _.includes(values, permission)
  }
}
