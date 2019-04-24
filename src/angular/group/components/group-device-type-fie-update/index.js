import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceTypeFileUpdate', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceType: '<',
    fileFormat: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'HashService',
  'GroupDeviceTypeFileService',
  'EventEmitter',
  '$scope',
  'SystemFileService',
  'DownloadService'
]
function controller(
  Alert,
  HashService,
  GroupDeviceTypeFileService,
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
    return GroupDeviceTypeFileService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceType,
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
    GroupDeviceTypeFileService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceType,
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

  $scope.$on('groupDeviceTypeFileUpdate:load', function(event, data) {
    ctrl.fileFormat = data.fileFormat
    open()
  })
}
