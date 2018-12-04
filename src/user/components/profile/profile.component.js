;(function() {
  angular.module('odin.user').component('userProfile', {
    templateUrl: 'user/components/profile/profile.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    Alert,
    UserService,
    ACL,
    GroupPolicyService,
    ServiceProviderPolicyService,
    $q,
    Session
  ) {
    var ctrl = this
    ctrl.update = update
    ctrl.$onInit = onInit
    ctrl.addressSummary = addressSummary
    ctrl.edit = edit
    ctrl.loginType = Session.data('loginType')

    function onInit() {
      ctrl.loading = true
      return $q
        .all([
          loadUser(),
          GroupPolicyService.load(),
          ServiceProviderPolicyService.load()
        ])
        .then(function() {
          if (ctrl.loginType === 'Group') {
            ctrl.canRead = GroupPolicyService.userProfileRead()
            ctrl.canUpdate = GroupPolicyService.userProfileUpdate()
          } else if (ctrl.loginType === 'Service Provider') {
            ctrl.canRead = ServiceProviderPolicyService.userProfileRead()
            ctrl.canUpdate = ServiceProviderPolicyService.userProfileUpdate()
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
})()
