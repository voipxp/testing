;(function() {
  angular.module('odin.user').component('userProfile', {
    templateUrl: 'user/components/profile/profile.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    Alert,
    UserService,
    PasswordService,
    $routeParams,
    $q,
    Session,
    Auth,
    ACL
  ) {
    var ctrl = this
    ctrl.update = update
    ctrl.$onInit = onInit
    ctrl.addressSummary = addressSummary
    ctrl.edit = edit
    ctrl.generatePassword = generatePassword

    ctrl.password = password

    var neverExpires = [2147483647, -2147483648]

    ctrl.passwordNeverExpires = function() {
      return _.includes(neverExpires, ctrl.user.passwordExpiresDays)
    }

    ctrl.passwordExpiresToday = function() {
      return ctrl.user.passwordExpiresDays === 0
    }

    ctrl.passwordExpiring = function() {
      return !ctrl.passwordNeverExpires() && ctrl.user.passwordExpiresDays < 0
    }

    ctrl.passwordExpired = function() {
      return !ctrl.passwordNeverExpires() && ctrl.user.passwordExpiresDays > 0
    }

    function onInit() {
      ctrl.loading = true
      return $q
        .all([Session.load(), loadUser()])
        .then(function() {
          ctrl.isAdmin = ACL.has('Group')
          ctrl.isCurrentUser = ctrl.userId === Session.data('userId')
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUser() {
      return UserService.show(ctrl.userId).then(function(data) {
        ctrl.user = data
        console.log('user', data)
      })
    }

    function edit() {
      ctrl.editUser = angular.copy(ctrl.user)
      Alert.modal.open('editUserProfile', function(close) {
        update(ctrl.editUser, close).catch(function() {})
      })
    }

    function password() {
      ctrl.editUser = angular.copy(ctrl.user)
      Alert.modal.open('editUserPassword', function(close) {
        if (ctrl.editUser.newPassword !== ctrl.editUser.newPassword2) {
          Alert.notify.danger('Passwords do not match')
          return
        }
        if (!ctrl.isCurrentUser) {
          delete ctrl.editUser.oldPassword
        }
        changePassword(ctrl.editUser, close)
      })
    }

    function changePassword(user, callback) {
      ctrl.showPassword = ''
      Alert.spinner.open()
      return UserService.update(ctrl.userId, user)
        .then(function() {
          return ctrl.isCurrentUser
            ? updateSession(user.userId, user.newPassword)
            : $q.when()
        })
        .then(loadUser)
        .then(function() {
          Alert.notify.success('Password Changed')
          callback()
        })
        .catch(function(error) {
          console.log('error', error.data)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    // so we don't have to login again
    function updateSession(userId, password) {
      return Auth.token(userId, password)
        .then(Session.set)
        .then(Auth.session)
        .then(Session.update)
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
          console.log('error', error.data)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
    function generatePassword() {
      console.log('generatePassword')
      ctrl.editUser = {}
      ctrl.editUser.newPassword = PasswordService.generate()
      ctrl.editUser.newPassword2 = ctrl.editUser.newPassword
      ctrl.showPassword = ctrl.editUser.newPassword
      console.log('ctrl.editUser.newPassword', ctrl.editUser.newPassword)
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
