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
    ctrl.departmentId = $routeParams.departmentId
    ctrl.update = update
    ctrl.destroy = destroy
    ctrl.back = back

    function onInit() {
      var name = ctrl.departmentId.split('+')
      ctrl.title = name[name.length - 1]
      ctrl.moh = {}
      ctrl.loading = true
      loadMoh()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadMoh() {
      return GroupMusicOnHoldService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.departmentId
      ).then(function(data) {
        console.log('MOH', data)
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
          Alert.notify.success('Music On Hold Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function destroy(callback) {
      Alert.confirm
        .open('Are you sure you want to remove this Department?')
        .then(function() {
          Alert.spinner.open()
          return GroupMusicOnHoldService.destroy(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.departmentId
          )
            .then(function() {
              Alert.notify.success('Music On Hold Removed')
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
        })
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'musicOnHold')
    }
  }
})()
