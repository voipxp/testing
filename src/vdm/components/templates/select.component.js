;(function() {
  angular.module('odin.vdm').component('vdmSelectTemplate', {
    templateUrl: 'vdm/components/templates/select.component.html',
    controller: Controller,
    bindings: { onUpdate: '&' }
  })

  function Controller(
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
})()
