import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmDevice', {
  template,
  controller,
  bindings: { module: '<', id: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'Route', 'VdmGroupTemplateService', 'Module', '$q', '$location']
function controller(Alert, Route, VdmGroupTemplateService, Module, $q, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
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
    return VdmGroupTemplateService.show(ctrl.serviceProviderId, ctrl.groupId, ctrl.id).then(
      function(data) {
        ctrl.template = data
      }
    )
  }

  function loadPermissions() {
    return Module.load().then(function() {
      ctrl.customConfig = Module.read('VDM - Custom Config')
    })
  }

  function open(id) {
    if (id) {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'vdm', 'templates', id)
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'vdm')
    }
  }
}
