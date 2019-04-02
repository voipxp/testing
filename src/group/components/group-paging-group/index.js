import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroup', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  '$routeParams',
  'Alert',
  'Route',
  'GroupPagingGroupService'
]
function controller($routeParams, Alert, Route, GroupPagingGroupService) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.serviceUserId = $routeParams.serviceUserId
  ctrl.$onInit = activate
  ctrl.open = open

  ctrl.update = update

  function activate() {
    ctrl.loading = true
    return loadInstance()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadInstance() {
    return GroupPagingGroupService.show(ctrl.serviceUserId).then(function(
      data
    ) {
      ctrl.instance = data
      return data
    })
  }

  function update(instance, callback) {
    Alert.spinner.open()
    GroupPagingGroupService.update(ctrl.serviceUserId, instance)
      .then(loadInstance)
      .then(function() {
        Alert.notify.success('Paging Group Updated')
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

  function open(serviceUserId) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'paging',
      serviceUserId
    )
  }
}
