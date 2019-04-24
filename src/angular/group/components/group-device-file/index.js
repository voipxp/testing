import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceFileUpdate', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceName: '<',
    fileFormat: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'HashService',
  'GroupDeviceFileService',
  'EventEmitter',
  '$scope',
  'SystemFileService',
  'DownloadService'
]
function controller(
  Alert,
  HashService,
  GroupDeviceFileService,
  EventEmitter,
  $scope,
  SystemFileService,
  DownloadService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.download = download
  ctrl.onUpload = onUpload

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function open() {
    Alert.spinner.open()
    loadFile()
      .then(function() {
        Alert.modal.open(ctrl.modalId, function(close) {
          update(ctrl.file, close)
        })
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function loadFile() {
    return GroupDeviceFileService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceName,
      ctrl.fileFormat
    ).then(function(data) {
      ctrl.file = data
    })
  }

  function download() {
    Alert.spinner.open()
    SystemFileService.show(ctrl.file.configurationFileName)
      .then(function(data) {
        var text = atob(data.fileContent)
        DownloadService.downloadText(text, ctrl.fileFormat)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function onUpload(data) {
    ctrl.file.fileContent = data.content
  }

  function update(file, callback) {
    Alert.spinner.open()
    GroupDeviceFileService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceName,
      file
    )
      .then(function() {
        Alert.notify.success('File Updated')
        callback()
        ctrl.onUpdate(EventEmitter({ file: file }))
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  $scope.$on('groupDeviceFileUpdate:load', function(event, data) {
    ctrl.fileFormat = data.fileFormat
    open()
  })
}
