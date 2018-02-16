;(function() {
  angular.module('odin.bulk').component('bulkSelectUsers', {
    templateUrl: 'bulk/components/selectUsers/bulkSelectUsers.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      users: '<',
      onUpdate: '&'
    }
  })

  function Controller(Alert, UserService, EventEmitter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.complete = complete

    function onInit() {
      ctrl.loading = true
      loadUsers()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUsers() {
      return UserService.index(ctrl.serviceProviderId, ctrl.groupId).then(
        function(data) {
          // set selected users to any that were sent in
          // so long as they still exist
          ctrl.selectedUsers = []
          _.forEach(ctrl.users, function(user) {
            if (_.find(data, { userId: user.userId })) {
              ctrl.selectedUsers.push(angular.copy(user))
            }
          })
          // set availableUsers to those that aren't already selected
          ctrl.availableUsers = _.filter(data, function(user) {
            return !_.find(ctrl.selectedUsers, { userId: user.userId })
          })
        }
      )
    }

    function complete() {
      ctrl.onUpdate(EventEmitter({ users: ctrl.selectedUsers }))
    }
  }
})()
