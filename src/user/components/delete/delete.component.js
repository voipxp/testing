;(function() {
  angular.module('odin.user').component('userDelete', {
    templateUrl: 'user/components/delete/delete.component.html',
    controller: Controller,
    bindings: { userId: '<', groupId: '<', serviceProviderId: '<' }
  })

  function Controller(Alert, UserService, Route) {
    var ctrl = this
    ctrl.remove = remove

    function remove() {
      Alert.confirm
        .open('Are you sure you want to remove ' + ctrl.userId + '?')
        .then(function() {
          Alert.spinner.open()
          return UserService.destroy(ctrl.userId)
            .then(function() {
              Alert.notify.success('User Removed')
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
  }
})()
