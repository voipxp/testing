import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('groupSearch', {
  template,
  controller
})

controller.$inject = ['Alert', 'GroupSearchService', 'HashService', 'Route', '$rootScope']
function controller(Alert, GroupSearchService, HashService, Route, $rootScope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$doCheck = doCheck
  ctrl.search = search
  ctrl.onPagination = onPagination
  ctrl.select = select

  ctrl.types = [{ key: 'groupName', name: 'Group Name' }, { key: 'groupId', name: 'Group ID' }]

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function doCheck() {
    if (!ctrl.filter) {
      ctrl.groups = null
    }
  }

  function search() {
    ctrl.isLoading = true
    var params = { serviceProviderId: ctrl.serviceProviderId }
    params[ctrl.type] = '*' + ctrl.filter + '*'
    GroupSearchService.index(params)
      .then(function(data) {
        ctrl.groups = data
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.isLoading = false
      })
  }

  function select(group) {
    Alert.modal.close(ctrl.modalId)
    ctrl.filter = null
    ctrl.groups = null
    Route.open('groups', group.serviceProviderId || group.organizationId, group.groupId)
  }

  $rootScope.$on('groupSearch:load', function(event, data) {
    ctrl.serviceProviderId = data.serviceProviderId
    ctrl.filter = null
    ctrl.groups = null
    ctrl.type = 'groupName'
    Alert.modal.open(ctrl.modalId)
  })
}
