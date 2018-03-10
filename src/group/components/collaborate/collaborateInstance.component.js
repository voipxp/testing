;(function() {
  angular.module('odin.group').component('groupCollaborateInstance', {
    templateUrl:
      'group/components/collaborate/collaborateInstance.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    GroupCollaborateService,
    Route,
    ACL,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.back = back
    ctrl.update = update
    ctrl.destroy = destroy
    ctrl.onUpdateProfile = onUpdateProfile
    ctrl.options = GroupCollaborateService.options
    ctrl.edit = edit
    ctrl.editUsers = editUsers

    ctrl.availableUsers = []
    ctrl.assignedUsers = []

    function onInit() {
      ctrl.loading = true
      $q
        .all([loadAvailableUsers()])
        .then(loadCollaborate())
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadCollaborate() {
      return GroupCollaborateService.show(ctrl.serviceUserId).then(function(
        data
      ) {
        ctrl.collaborate = data
        ctrl.assignedUsers = angular.copy(ctrl.collaborate.users)
        var users = ctrl.availableUsers
        ctrl.availableUsers = _.filter(users, function(user) {
          return !_.find(ctrl.assignedUsers, { userId: user.userId })
        })
      })
    }

    function loadAvailableUsers() {
      return GroupCollaborateService.users(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.availableUsers = data
        return data
      })
    }

    function update(collaborate, callback) {
      collaborate.users = angular.copy(ctrl.assignedUsers)
      Alert.spinner.open()
      Alert.spinner.close()
      return GroupCollaborateService.update(ctrl.serviceUserId, collaborate)
        .then(loadAvailableUsers())
        .then(loadCollaborate)
        .then(function() {
          Alert.notify.success('Collaborate Saved')
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function destroy(callback) {
      Alert.spinner.open()
      GroupCollaborateService.destroy(ctrl.serviceUserId)
        .then(function() {
          Alert.notify.success('Collaborate Removed')
          if (_.isFunction(callback)) {
            callback()
          }
          back()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function onUpdateProfile(event) {
      var collaborate = angular.copy(ctrl.collaborate)
      collaborate.serviceInstanceProfile = event.profile
      update(collaborate, event.callback)
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'autoAttendants'
      )
    }
    function edit() {
      loadCollaborate()
        .then(function() {
          ctrl.showOptional = false
          // var collaborate = angular.copy(ctrl.collaborate)
          Alert.modal.open('editGroupCollaborate', function(close) {
            update(ctrl.collaborate, close)
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }
    function editUsers() {
      loadCollaborate()
        .then(function() {
          ctrl.showOptional = false
          ctrl.editCollaborate = angular.copy(ctrl.collaborate)
          Alert.modal.open('editGroupCollaborateUsers', function(close) {
            update(ctrl.editCollaborate, close)
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }
  }
})()
