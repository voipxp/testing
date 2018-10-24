;(function() {
  angular.module('odin.group').component('groupCallCenterAudioSettingsView', {
    templateUrl:
      'group/components/callCenters/callCenter/audioSettings/audioSettingsView.component.html',
    controller: Controller,
    bindings: { userId: '<', service: '=', external: '@', label: '@' }
  })

  function Controller() {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.isFile = isFile
    ctrl.isUrl = isUrl
    ctrl.isExternal = isExternal
    ctrl.isDefault = isDefault

    function onInit() {
      ctrl.service = ctrl.service || {}
    }

    function isFile() {
      var option = ctrl.external ? 'Custom' : 'File'
      return ctrl.service.audioMessageSource === option
    }

    function isUrl() {
      return ctrl.service.audioMessageSource === 'URL'
    }

    function isExternal() {
      return ctrl.service.audioMessageSource === 'External'
    }

    function isDefault() {
      return ctrl.service.audioMessageSource === 'Default'
    }
  }
})()
