import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterAudioSettingsView', {
  template,
  controller,
  bindings: { userId: '<', service: '=', external: '@', label: '@' }
})

function controller() {
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
