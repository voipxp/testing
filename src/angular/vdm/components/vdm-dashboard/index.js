import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmDashboard', {
  template,
  controller
})

controller.$inject = ['$routeParams', 'Module']
function controller($routeParams, Module) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.$onInit = async () => {
    ctrl.module = await Module.show('VDM')
  }
}
