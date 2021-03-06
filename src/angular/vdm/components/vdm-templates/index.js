import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmTemplates', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'Route',
  'VdmSystemTemplateService',
  'VdmGroupTemplateService',
  '$scope',
  'Module'
]

function controller(
  Alert,
  Route,
  VdmSystemTemplateService,
  VdmGroupTemplateService,
  $scope,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.selectDevice = selectDevice
  ctrl.onSelectDevice = onSelectDevice
  ctrl.onSelectTemplate = onSelectTemplate

  function onInit() {
    ctrl.loading = true
    loadTemplates()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })

    Module.show('VDM').then(function(module) {
      ctrl.module = module
    })
  }

  function isGroup() {
    return ctrl.serviceProviderId && ctrl.groupId
  }

  function loadTemplates() {
    var action = isGroup() ? loadGroupTemplates : loadSystemTemplates
    return action().then(function(data) {
      ctrl.templates = data
    })
  }

  function loadSystemTemplates() {
    return VdmSystemTemplateService.index()
  }

  function loadGroupTemplates() {
    return VdmGroupTemplateService.index(ctrl.serviceProviderId, ctrl.groupId)
  }

  function add() {
    isGroup() ? addGroup() : addSystem()
  }

  function addGroup() {
    $scope.$broadcast('vdmSelectTemplate:load')
  }

  function addSystem() {
    ctrl.template = {}
    Alert.modal.open('addVdmTemplateModal', function(close) {
      create(ctrl.template, close)
    })
  }

  function selectDevice() {
    $scope.$broadcast('vdmSelectDevice:load')
  }

  function onSelectDevice(event) {
    ctrl.template.deviceType = event.device.deviceType
    ctrl.template.deviceTemplate = event.device.deviceTemplate
    ctrl.template.name = event.device.deviceType
  }

  function onSelectTemplate(event) {
    assign(event.template)
  }

  function assign(template) {
    Alert.spinner.open()
    VdmGroupTemplateService.store(
      ctrl.serviceProviderId,
      ctrl.groupId,
      template
    )
      .then(function(data) {
        Alert.notify.success('Template Created')
        open({ id: data.deviceTypeId, parentId: true })
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function create(template, callback) {
    Alert.spinner.open()
    VdmSystemTemplateService.store(template)
      .then(function(data) {
        Alert.notify.success('Template Created')
        callback()
        open(data)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function open(template) {
    if (template.parentId) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'vdm',
        'templates',
        template.id
      ).search({ name: template.name, navigate: template.name })
    } else {
      Route.open('system', 'vdm', 'templates', template.id).search({
        name: template.name,
        navigate: template.name
      })
    }
  }
}
