import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmDevice', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  'Alert',
  'Route',
  '$routeParams',
  'VdmGroupTemplateService',
  'Module',
  '$q'
]
function controller(
  Alert,
  Route,
  $routeParams,
  VdmGroupTemplateService,
  Module,
  $q
) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.templateId = $routeParams.id
  ctrl.deviceName = $routeParams.deviceName
  ctrl.templateName = $routeParams.name
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
    ctrl.loading = true
    $q.all([loadTemplate(), loadPermissions()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadTemplate() {
    return VdmGroupTemplateService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.templateId
    ).then(function(data) {
      ctrl.template = data
    })
  }

  function loadPermissions() {
    return Module.load().then(function() {
      ctrl.customConfig = Module.read('VDM - Custom Config')
    })
  }

  function open(templateId) {
    if (templateId) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'vdm',
        'templates',
        templateId
      )
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'vdm')
    }
  }
}
