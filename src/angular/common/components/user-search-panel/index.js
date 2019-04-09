import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.common').component('userSearchPanel', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'UserSearchService', 'Route']
function controller(Alert, UserSearchService, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$doCheck = doCheck
  ctrl.search = search
  ctrl.open = open
  ctrl.changeType = changeType

  function onInit() {
    ctrl.type = 'userId'
  }

  function search() {
    ctrl.isLoading = true
    var params = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    params[ctrl.type] = ctrl.filter
    UserSearchService.index(params)
      .then(function(data) {
        ctrl.users = data
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.isLoading = false
      })
  }

  function changeType() {
    ctrl.users = null
  }

  function doCheck() {
    if (!ctrl.filter) {
      ctrl.users = null
    }
  }

  function open(user) {
    Route.open('users', user.serviceProviderId, user.groupId, user.userId)
  }
}
