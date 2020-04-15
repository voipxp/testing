import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroup', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['ACL', 'Alert', 'Route', 'GroupPagingGroupService', '$location']
function controller(ACL, Alert, Route, GroupPagingGroupService, $location) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.open = open
  ctrl.back = back
  ctrl.update = update

  function activate() {
    ctrl.serviceUserId = $location.search().serviceUserId
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
  
  function back() {
    if(ACL.is('Group Department')) {
      Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'paging')
    } else if(ACL.is('Group')){
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'groupService')
    }else{
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'groupPagingGroups')
    }
  }
}
