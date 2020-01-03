import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('userCreate', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    onUpdate: '&'
  }
})
 
controller.$inject = ['Alert', '$scope', 'EventEmitter', 'UserService', 'Session','GroupPasswordService']
 
function controller(Alert, $scope, EventEmitter, UserService, Session, GroupPasswordService) {
  var ctrl = this
  ctrl.$onChanges = onChanges
  ctrl.setCLID = setCLID
  ctrl.setUserId = setUserId
  ctrl.toggleOptional = toggleOptional
  
  function  loadPasswordRulesMinLength() {
    GroupPasswordService.show(
    ctrl.serviceProviderId,
    ctrl.groupId
  ).then(function(rules) {
    ctrl.passMinLen = rules.minLength
  })
}

<<<<<<< HEAD
  /* Set and accessed for Group Admini*/
  ctrl.isDepartmentAdmin = (Session.data('loginType') === 'Group Department')
  ctrl.defaultDepartmentName = Session.data('groupDepartmentName') || null
  ctrl.groupDepartmentPathName= Session.data('groupDepartmentPathName') || null

  function onChanges(changes) {
=======
  function onChanges(changes) {  
>>>>>>> origin/Anshu-Bug-Fixes
    if (changes.serviceProviderId) {
      ctrl.serviceProviderId = changes.serviceProviderId.currentValue
    }
    if (changes.groupId) {
      ctrl.groupId = changes.groupId.currentValue
    }
    loadPasswordRulesMinLength()
  }

  function open() {
    ctrl.user = {}
    if(ctrl.isDepartmentAdmin) ctrl.user.department = { name: ctrl.defaultDepartmentName }
    Alert.modal.open('createUserModal', function onSave(close) {
      create(ctrl.user, close)
    })
  }

  function setUserId(event) {
    if (ctrl.user) ctrl.user.userId = event.userId
  }

  function create(user, callback) {
    ctrl.user.serviceProviderId = ctrl.serviceProviderId
    ctrl.user.groupId = ctrl.groupId
    if (ctrl.user.department && ctrl.user.department.name) {
      ctrl.user.department.serviceProviderId = ctrl.serviceProviderId
      ctrl.user.department.groupId = ctrl.groupId
    }

    Alert.spinner.open()
    UserService.store(ctrl.serviceProviderId, ctrl.groupId, ctrl.user)
      .then(function() {
        Alert.notify.success('User Created')
        callback()
        sendUpdate(user)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function sendUpdate(user) {
    ctrl.onUpdate(EventEmitter({ user: user }))
  }

  function toggleOptional() {
    ctrl.showOptional = !ctrl.showOptional
  }

  function setCLID() {
    ctrl.user.callingLineIdFirstName = ctrl.user.firstName
    ctrl.user.callingLineIdLastName = ctrl.user.lastName
  }

  $scope.$on('userCreate:load', open)
}
