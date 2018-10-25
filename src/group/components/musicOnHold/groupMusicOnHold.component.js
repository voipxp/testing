;(function() {
  angular.module('odin.group').component('groupMusicOnHold', {
    templateUrl: 'group/components/musicOnHold/groupMusicOnHold.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, GroupMusicOnHoldService, Route, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.update = update
    ctrl.destroy = destroy
    ctrl.back = back

    function onInit() {
      ctrl.departmentName = $routeParams.departmentName
      ctrl.isEnterpriseDepartment = $routeParams.isEnterpriseDepartment
      ctrl.title = ctrl.departmentName || 'Group'
      ctrl.loading = true
      loadMoh()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadMoh() {
      return GroupMusicOnHoldService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.departmentName,
        ctrl.isEnterpriseDepartment
      ).then(function(data) {
        ctrl.moh = data
      })
    }

    function update(moh, callback) {
      Alert.spinner.open()
      return GroupMusicOnHoldService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        moh
      )
        .then(loadMoh)
        .then(function() {
          Alert.notify.success('Music On Hold Instance Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(callback) {
      Alert.confirm
        .open('Are you sure you want to remove this Department?')
        .then(function() {
          Alert.spinner.open()
          return GroupMusicOnHoldService.destroy(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.departmentName,
            ctrl.isEnterpriseDepartment
          )
            .then(function() {
              Alert.notify.success('Music On Hold Department Removed')
              callback()
              back()
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'musicOnHold')
    }
  }
})()
