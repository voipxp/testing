;(function() {
  angular.module('odin.group').component('groupPagingGroupTargets', {
    templateUrl: 'group/components/paging/targets.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '=',
      groupId: '=',
      serviceUserId: '='
    }
  })

  function Controller(Alert, GroupPagingGroupTargetService, Module) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      loadAssigned()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadAssigned() {
      return GroupPagingGroupTargetService.assigned(ctrl.serviceUserId).then(
        function(data) {
          ctrl.assigned = data
          console.log('assigned', data)
          return data
        }
      )
    }

    function loadAvailable() {
      return GroupPagingGroupTargetService.available(ctrl.serviceUserId).then(
        function(data) {
          ctrl.available = _.filter(data, function(user) {
            return !_.find(ctrl.assigned, { userId: user.userId })
          })
          return ctrl.available
        }
      )
    }

    function edit() {
      if (!Module.update('Group Paging')) return
      ctrl.loadingEdit = true
      loadAvailable()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loadingEdit = false
        })
      ctrl.editAssigned = angular.copy(ctrl.assigned)
      Alert.modal.open('editGroupPagingTargets', function onSave(close) {
        console.log('editGroupPagingTargets', ctrl.editAssigned)
        update(ctrl.editAssigned, close)
      })
    }

    function update(editAssigned, callback) {
      Alert.spinner.open()
      GroupPagingGroupTargetService.update(ctrl.serviceUserId, editAssigned)
        .then(loadAssigned)
        .then(function() {
          Alert.notify.success('Targets Updated')
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
  }
})()
