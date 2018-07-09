;(function() {
  angular.module('odin.app').component('adminAccount', {
    templateUrl: 'app/components/account/admin.component.html',
    controller: Controller
  })

  function Controller(Session, Alert, Auth) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.neverExpires = 2147483647
    function onInit() {
      ctrl.userId = Session.data('userId')
      ctrl.loginType = Session.data('loginType')
      ctrl.expiration = Session.data('passwordExpiresDays')
    }

    function edit() {
      ctrl.oldPassword = ctrl.newPassword1 = ctrl.newPassword2 = null
      Alert.modal.open('changeMyPassword', function(close) {
        changePassword(ctrl.oldPassword, ctrl.newPassword, close)
      })
    }

    function changePassword(oldPassword, newPassword, callback) {
      Alert.spinner.open()
      Auth.password(oldPassword, newPassword)
        .then(function(data) {
          return updateSession(data)
        })
        .then(function() {
          Alert.notify.success('Password Changed')
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function updateSession(token) {
      return Session.set(token)
        .then(Auth.session)
        .then(Session.update)
        .then(function(data) {
          console.log('session reset', data)
        })
    }
  }
})()
