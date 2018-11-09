;(function() {
  angular.module('odin.user').component('userId', {
    templateUrl: 'user/components/userId/userId.component.html',
    controller: Controller,
    bindings: { userId: '<', groupId: '<', serviceProviderId: '<' }
  })

  function Controller(Alert, UserIdService, UserService, Route) {
    var ctrl = this
    ctrl.update = update
    ctrl.edit = edit
    ctrl.setUserId = setUserId

    function edit() {
      Alert.modal.open(
        'editUserIdModal',
        function(close) {
          update(ctrl.newUserId, close)
        },
        function(close) {
          remove(close)
        }
      )
    }

    function setUserId(event) {
      ctrl.newUserId = event.userId
    }

    function remove(callback) {
      Alert.confirm
        .open('Are you sure you want to remove ' + ctrl.userId + '?')
        .then(function() {
          Alert.spinner.open()
          return UserService.destroy(ctrl.userId)
            .then(function() {
              Alert.notify.success('User Removed')
              callback()
              Route.open(
                'groups',
                ctrl.serviceProviderId,
                ctrl.groupId,
                'users'
              )
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }

    function update(newUserId, callback) {
      Alert.spinner.open()
      return UserIdService.update(ctrl.userId, newUserId)
        .then(function() {
          Alert.notify.success('User ID Updated')
          callback()
          Route.open('users', ctrl.serviceProviderId, ctrl.groupId, newUserId)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
