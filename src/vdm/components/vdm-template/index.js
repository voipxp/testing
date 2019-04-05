import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmTemplate', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  'Alert',
  'Route',
  'VdmGroupTemplateService',
  'VdmSystemTemplateService',
  '$routeParams'
]
function controller(
  Alert,
  Route,
  VdmGroupTemplateService,
  VdmSystemTemplateService,
  $routeParams
) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.id = $routeParams.id
  ctrl.templateName = $routeParams.name
  ctrl.back = back
  ctrl.$onInit = onInit
  ctrl.update = update
  ctrl.destroy = destroy

  function onInit() {
    ctrl.loading = true
    loadTemplate()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function back() {
    if (ctrl.template.parentId) {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'vdm').search(
        {}
      )
    } else {
      Route.open('vdm').search({})
    }
  }

  function isGroup() {
    return ctrl.serviceProviderId && ctrl.groupId
  }

  function loadTemplate() {
    var action = isGroup() ? loadGroupTemplate : loadSystemTemplate
    return action().then(function(data) {
      ctrl.template = data
    })
  }

  function loadGroupTemplate() {
    return VdmGroupTemplateService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.id
    )
  }

  function loadSystemTemplate() {
    return VdmSystemTemplateService.show(ctrl.id)
  }

  function updateSystem(template) {
    return VdmSystemTemplateService.update(template)
  }

  function updateGroup(template) {
    return VdmGroupTemplateService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      template
    )
  }

  function destroySystem(template) {
    return VdmSystemTemplateService.destroy(template.id)
  }

  function destroyGroup(template) {
    return VdmGroupTemplateService.destroy(
      ctrl.serviceProviderId,
      ctrl.groupId,
      template.id
    )
  }

  function update(template, callback) {
    Alert.spinner.open()
    var action = isGroup() ? updateGroup : updateSystem
    return action(template)
      .then(loadTemplate)
      .then(function() {
        Alert.notify.success('Template Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(template, callback) {
    Alert.spinner.open()
    var action = isGroup() ? destroyGroup : destroySystem
    return action(template)
      .then(function() {
        Alert.notify.warning('Template Removed')
        callback()
        back()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}