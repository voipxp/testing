import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmDevice', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'Route',
  'VdmGroupTemplateService',
  'Module',
  '$q',
  '$location'
]
function controller(
  Alert,
  Route,
  VdmGroupTemplateService,
  Module,
  $q,
  $location
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
    ctrl.templateId = $location.search().id
    ctrl.deviceName = $location.search().deviceName
    ctrl.templateName = $location.search().name
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
