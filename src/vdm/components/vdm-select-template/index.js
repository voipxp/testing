import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmSelectTemplate', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = [
  'Alert',
  'VdmSystemTemplateService',
  'EventEmitter',
  'HashService',
  '$scope'
]
function controller(
  Alert,
  VdmSystemTemplateService,
  EventEmitter,
  HashService,
  $scope
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function open() {
    Alert.spinner.open()
    loadTemplates()
      .then(function() {
        Alert.modal.open(ctrl.modalId)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function loadTemplates() {
    return VdmSystemTemplateService.index().then(function(data) {
      ctrl.templates = data
    })
  }

  function select(template) {
    Alert.modal.close(ctrl.modalId)
    ctrl.onUpdate(EventEmitter({ template: template }))
  }

  $scope.$on('vdmSelectTemplate:load', open)
}
