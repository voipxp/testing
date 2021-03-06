import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userProfile', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserService',
  'ACL',
  'GroupPolicyService',
  'ServiceProviderPolicyService',
  'GroupWebPolicyService',
  '$q'
]
function controller(
  Alert,
  UserService,
  ACL,
  GroupPolicyService,
  ServiceProviderPolicyService,
  GroupWebPolicyService,
  $q
) {
  var ctrl = this
  ctrl.update = update
  ctrl.$onInit = onInit
  ctrl.addressSummary = addressSummary
  ctrl.edit = edit
  ctrl.isDepartmentAdmin = ACL.is('Group Department')

  function onInit() {
    ctrl.loading = true
    ctrl.isAdmin = ACL.has('Group Department')
    return $q
      .all([
        loadUser(),
        GroupPolicyService.load(),
        ServiceProviderPolicyService.load(),
        GroupWebPolicyService.load()
      ])
      .then(function() {
        ctrl.canRead = true
        ctrl.canUpdate = true
        if (ACL.has('Reseller') || ACL.is('User')) {
          ctrl.canRead = true
          ctrl.canUpdate = true
        } else if (ACL.is('Group')) {
          ctrl.canRead = GroupPolicyService.userProfileRead()
          ctrl.canUpdate = GroupPolicyService.userProfileUpdate()
        } else if (ACL.is('Service Provider')) {
          ctrl.canRead = ServiceProviderPolicyService.userProfileRead()
          ctrl.canUpdate = ServiceProviderPolicyService.userProfileUpdate()
        } else if (ACL.is('Group Department')) {
          ctrl.canRead = GroupWebPolicyService.departmentAdminUserProfileRead()
          ctrl.canUpdate = GroupWebPolicyService.departmentAdminUserProfileUpdate()
        }
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadUser() {
    return UserService.show(ctrl.userId).then(function(data) {
      ctrl.user = data
    })
  }

  function edit() {
    ctrl.editUser = angular.copy(ctrl.user)
    Alert.modal.open('editUserProfile', function(close) {
      update(ctrl.editUser, close).catch(function() {})
    })
  }

  function update(user, callback) {
    Alert.spinner.open()
    return UserService.update(ctrl.userId, user)
      .then(loadUser)
      .then(function() {
        Alert.notify.success('Profile Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function addressSummary() {
    var address = _.get(ctrl.user, 'address')
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
}
