;(function() {
  angular.module('odin.group').component('userCreate', {
    templateUrl: 'group/components/users/userCreate.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      onUpdate: '&'
    }
  })

  function Controller(Alert, $scope, EventEmitter, $q, UserService) {
    var ctrl = this

    ctrl.$onChanges = onChanges
    ctrl.setCLID = setCLID
    ctrl.setUserId = setUserId
    ctrl.toggleOptional = toggleOptional

    function onChanges(changes) {
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
    }

    function open() {
      ctrl.user = {}
      Alert.modal.open('createUserModal', function onSave(close) {
        create(ctrl.user, close)
      })
    }

    function setUserId(event) {
      if (ctrl.user) ctrl.user.userId = event.userId
    }

    function create(user, callback) {
      if (ctrl.user.password !== ctrl.user.password2) {
        Alert.notify.danger('Passwords do not match')
        return
      }
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
          console.log('error', error)
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
})()
