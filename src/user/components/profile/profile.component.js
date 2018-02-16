;(function() {
  angular.module('odin.user').component('userProfile', {
    templateUrl: 'user/components/profile/profile.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    Alert,
    UserService,
    $routeParams,
    $q,
    SystemStateService,
    SystemLanguageService,
    SystemTimeZoneService,
    Session,
    Auth
  ) {
    var ctrl = this
    ctrl.update = update
    ctrl.$onInit = onInit
    ctrl.addressSummary = addressSummary
    ctrl.edit = edit

    ctrl.password = password

    ctrl.neverExpires = 2147483647

    function onInit() {
      ctrl.loading = true
      return $q
        .all([
          Session.load(),
          loadUser(),
          loadStates(),
          loadTimeZones(),
          loadLanguages()
        ])
        .then(function() {
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

    function loadStates() {
      return SystemStateService.index().then(function(data) {
        ctrl.states = data
        return data
      })
    }

    function loadTimeZones() {
      return SystemTimeZoneService.index().then(function(data) {
        ctrl.timezones = data
        return data
      })
    }

    function loadLanguages() {
      return SystemLanguageService.index().then(function(data) {
        console.log('languages', data)
        ctrl.languages = data
        return data
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
