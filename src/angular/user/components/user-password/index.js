import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userPassword', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'UserService', '$q', 'Session', 'AuthService', 'GroupPasswordService','PasswordModifyRequest']
function controller(Alert, UserService, $q, Session, AuthService, GroupPasswordService, PasswordModifyRequest) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
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
      .all([loadUser(), loadPasswordRulesMinLength()])
      .then(function() {
        ctrl.isCurrentUser = ctrl.userId === Session.data('userId')
     })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function  loadPasswordRulesMinLength() {
     GroupPasswordService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(rules) {
      ctrl.passMinLen =   rules.minLength
    })
  }
  function loadUser() {
    return UserService.show(ctrl.userId).then(function(data) {
     ctrl.user = data
    })
  }

  function edit() {
    ctrl.editUser = angular.copy(ctrl.user)
    
    Alert.modal.open('editUserPassword', function(close) {
      if (!ctrl.isCurrentUser) {
        delete ctrl.editUser.oldPassword
      }
      update(ctrl.editUser, close)
    })
  }

  function update(user, callback) {  
    Alert.spinner.open()
   // return UserService.update(ctrl.userId, user)
    ctrl.changePassword ={
      userId      : user.userId,
      newPassword : user.newPassword,
      oldPassword : user.oldPassword
    }
      return PasswordModifyRequest.updatePasswords( ctrl.changePassword )
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
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  // so we don't have to login again
  function updateSession(userId, password) {
    return AuthService.token(userId, password).then(Session.set)
  }
}
