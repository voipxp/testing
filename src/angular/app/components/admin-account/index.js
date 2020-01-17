import angular from 'angular'
import template from './index.html'

angular.module('odin.app').component('adminAccount', { template, controller })

controller.$inject = ['Session', 'Alert', 'AuthService', 'PasswordModifyRequest', '$q']
function controller(Session, Alert, AuthService, PasswordModifyRequest, $q) {
  const ctrl = this
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
      changePassword(ctrl.userId,ctrl.oldPassword, ctrl.newPassword, close)
    })
  }

  function changePassword( oldPassword, newPassword, callback ) {  
    Alert.spinner.open()
    ctrl.changePassWord = {
      userId : Session.data('userId'),
      newPassword : newPassword,
      oldPassword : oldPassword
    }

    return PasswordModifyRequest.updatePasswords( ctrl.changePassWord )
    //AuthService.password(oldPassword, newPassword)
    /*.then(function() {
      return ctrl.isCurrentUser
      ? updateSession(ctrl.changePassWord.userId, newPassword)
      : $q.when()
    }) */
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

  // so we don't have to login again
 /* function updateSession(userId, password) {
    return AuthService.token(userId, password).then(Session.set)
  } */
}
