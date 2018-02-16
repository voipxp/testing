;(function() {
  angular.module('odin.user').component('userId', {
    templateUrl: 'user/components/userId/userId.component.html',
    controller: Controller
  })

  function Controller(Alert, UserIdService, Route, $routeParams) {
    var ctrl = this
    ctrl.update = update
    ctrl.edit = edit
    ctrl.setUserId = setUserId

    ctrl.userId = $routeParams.userId
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    function edit() {
      Alert.modal.open('editUserIdModal', function(close) {
        update(ctrl.newUserId, close)
      })
    }

    function setUserId(event) {
      ctrl.newUserId = event.userId
    }

    function update(newUserId, callback) {
      Alert.spinner.open()
      return UserIdService.update(ctrl.userId, newUserId)
        .then(function() {
          Alert.notify.success('User ID Updated')
          callback()
          Route.open('users', ctrl.serviceProviderId, ctrl.groupId, newUserId)()
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
