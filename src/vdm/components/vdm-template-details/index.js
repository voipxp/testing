import angular from 'angular'
import template from './index.html'

angular.module('odin.vdm').component('vdmTemplateDetails', {
  template,
  controller,
  bindings: { template: '<' },
  require: { parent: '^vdmTemplate' }
})

controller.$inject = ['Alert', 'Module']
function controller(Alert, Module) {
  var ctrl = this
  ctrl.edit = edit

  function edit() {
    ctrl.editTemplate = angular.copy(ctrl.template)
    var deleteAction
    if (Module.delete('VDM')) {
      var message = 'Are you sure you want to delete this Template'
      if (!ctrl.template.parentId) {
        message += ' AND all child Templates'
      }
      message += '?'
      deleteAction = function(close) {
        Alert.confirm.open(message).then(function() {
          ctrl.parent.destroy(ctrl.editTemplate, close)
        })
      }
    }
    Alert.modal.open(
      'editVdmTemplateModal',
      function(close) {
        ctrl.parent.update(ctrl.editTemplate, close)
      },
      deleteAction
    )
  }
}
