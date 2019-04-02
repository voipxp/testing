import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroupTargets', {
  template,
  controller,
  bindings: {
    serviceProviderId: '=',
    groupId: '=',
    serviceUserId: '='
  }
})

controller.$inject = ['Alert', 'GroupPagingGroupTargetService', 'Module']
function controller(Alert, GroupPagingGroupTargetService, Module) {
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
