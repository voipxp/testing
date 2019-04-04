import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDevices', {
  template,
  controller
})

controller.$inject = ['$routeParams']
function controller($routeParams) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
}
