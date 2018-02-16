;(function() {
  angular.module('odin.vdm').component('vdmTemplateDetails', {
    templateUrl: 'vdm/components/templates/details.component.html',
    controller: Controller,
    bindings: { template: '<' },
    require: { parent: '^vdmTemplate' }
  })

  function Controller(Alert, Module) {
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
})()
