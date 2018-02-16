;(function() {
  angular.module('odin.vdm').component('vdmTemplateTagOptions', {
    templateUrl: 'vdm/components/templates/tags/options.component.html',
    controller: Controller,
    bindings: { tags: '<' },
    require: { parent: '^vdmTemplateTags' }
  })

  function Controller(Alert, Module) {
    var ctrl = this
    ctrl.$onChanges = onChanges
    ctrl.edit = edit

    function onChanges(changes) {
      if (changes.tags && changes.tags.currentValue) loadOptions()
    }

    function loadOptions() {
      ctrl.options = _.find(ctrl.tags, { name: '%dss_key_edit_disable%' })
    }

    function edit() {
      if (!Module.update('VDM')) return
      ctrl.editOptions = angular.copy(ctrl.options)
      Alert.modal.open('vdmTemplateTagOptionsModal', function(close) {
        // bail if already set
        if (ctrl.editOptions.value === ctrl.options.value) return close()
        ctrl.parent.update(ctrl.editOptions, close)
      })
    }
  }
})()
