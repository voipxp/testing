import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroups', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Route']
function controller(Route) {
  var ctrl = this
  ctrl.open = open

  function open(serviceUserId) {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'paging', 'group').search({
      serviceUserId: serviceUserId
    })
  }
}
