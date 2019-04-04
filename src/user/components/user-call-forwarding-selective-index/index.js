import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCallForwardingSelectiveIndex', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$routeParams']
function controller($routeParams) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.userId = $routeParams.userId
}
