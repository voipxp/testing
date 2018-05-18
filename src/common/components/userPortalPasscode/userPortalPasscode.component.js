;(function() {
  angular.module('odin.common').component('userPortalPasscode', {
    templateUrl:
      'common/components/userPortalPasscode/userPortalPasscode.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      serviceProviderId: '<',
      groupId: '<',
      readOnly: '<'
    }
  })

  function Controller(
    Alert,
    UserPortalPasscodeService,
    PasscodeService,
    $scope,
    Session
  ) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.$onInit = activate

    ctrl.isUser = function() {
      return Session.data('loginType') === 'User'
    }

    function activate() {
      ctrl.passcode = {}
      ctrl.loading = true
      loadPasscode()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPasscode() {
      return UserPortalPasscodeService.show(ctrl.userId).then(function(data) {
        console.log('passcode', data)
        ctrl.passcode = data
        return data
      })
    }

    function update(passcode, callback) {
      if (!passcode.newPasscode) {
        Alert.notify.danger('New Passcode is Required')
        return
      }
      if (passcode.newPasscode !== passcode.newPasscode2) {
        Alert.notify.danger('Passcodes Do Not Match')
        return
      }
      Alert.spinner.open()
      UserPortalPasscodeService.update(ctrl.userId, passcode)
        .then(function() {
          ctrl.editPasscode = {}
          Alert.notify.success('Passcode Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function edit() {
      if ($scope.editUserPortalPasscodeForm) {
        $scope.editUserPortalPasscodeForm.$setPristine()
      }
      Alert.modal.open('editUserPortalPasscode', function(close) {
        update(ctrl.editPasscode, close)
      })
    }
  }
})()
