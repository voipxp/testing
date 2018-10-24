;(function() {
  angular.module('odin.group').component('groupHuntGroup', {
    templateUrl: 'group/components/huntGroups/huntGroup.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    GroupHuntGroupService,
    Route,
    $routeParams,
    UserPermissionService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.options = GroupHuntGroupService.options
    ctrl.back = back
    ctrl.reload = loadHuntGroup
    ctrl.updateProfile = updateProfile
    ctrl.update = update
    ctrl.destroy = destroy

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadHuntGroup(), UserPermissionService.load(ctrl.serviceUserId)])
        .then(function(data) {
          return loadPermissions(data[1])
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadHuntGroup() {
      return GroupHuntGroupService.show(ctrl.serviceUserId).then(function(
        data
      ) {
        ctrl.huntGroup = data
      })
    }

    function loadPermissions(permission) {
      if (permission.read('Premium Call Records')) {
        ctrl.showPremium = true
      }
      ctrl.showReporting = ctrl.showPremium
    }

    function updateProfile(event) {
      var huntGroup = angular.copy(ctrl.huntGroup)
      huntGroup.serviceInstanceProfile = event.profile
      update(huntGroup, event.callback)
    }

    function update(huntGroup, callback) {
      huntGroup.serviceUserId = ctrl.serviceUserId
      Alert.spinner.open()
      return GroupHuntGroupService.update(huntGroup)
        .then(onInit)
        .then(function() {
          Alert.notify.success('Hunt Group Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(callback) {
      Alert.spinner.open()
      GroupHuntGroupService.destroy(ctrl.serviceUserId)
        .then(function() {
          Alert.notify.warning('Hunt Group Removed')
          callback()
          back()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'huntGroups')
    }
  }
})()
