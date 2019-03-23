import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('audioFileCreate', {
  template,
  controller,
  bindings: { onUpdate: '&' }
})

controller.$inject = ['Alert', 'EventEmitter', '$scope', 'HashService']
function controller(Alert, EventEmitter, $scope, HashService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onUpload = onUpload
  ctrl.options = { mediaTypes: ['WMA', 'WAV', '3GP', 'MOV'] }

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function open() {
    ctrl.audioFile = {}
    Alert.modal.open(ctrl.modalId, function(close) {
      sendUpdate(ctrl.audioFile)
      close()
    })
  }

  function onUpload(file) {
    ctrl.audioFile.content = file.content
    ctrl.audioFile.mediaType = 'WAV'
    ctrl.audioFile.name = file.name
  }

  function sendUpdate(audioFile) {
    ctrl.onUpdate(EventEmitter({ audioFile: audioFile }))
  }

  $scope.$on('audioFileCreate:load', open)
}
