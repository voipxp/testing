import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroupOriginators', {
  template,
  controller,
  bindings: {
    serviceProviderId: '=',
    groupId: '=',
    serviceUserId: '='
  }
})

controller.$inject = ['Alert', 'GroupPagingGroupOriginatorService', 'Module']
function controller(Alert, GroupPagingGroupOriginatorService, Module) {
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
    return GroupPagingGroupOriginatorService.assigned(ctrl.serviceUserId).then(function(data) {
      ctrl.assigned = data
      return data
    })
  }

  function loadAvailable() {
    return GroupPagingGroupOriginatorService.available(ctrl.serviceProviderId, ctrl.groupId).then(
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
    Alert.modal.open('editGroupPagingOriginators', function onSave(close) {
      update(ctrl.editAssigned, close)
    })
  }

  function update(editAssigned, callback) {
    Alert.spinner.open()
    GroupPagingGroupOriginatorService.update(ctrl.serviceUserId, editAssigned)
      .then(loadAssigned)
      .then(function() {
        Alert.notify.success('Originators Updated')
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
