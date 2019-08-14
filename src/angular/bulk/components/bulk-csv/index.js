import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkCsv', {
  template,
  controller
})

controller.$inject = [
  'Alert',
  'BulkTaskService',
  'BulkImportService',
  'CsvService',
  'DownloadService'
]
function controller(Alert, BulkTaskService, BulkImportService, CsvService, DownloadService) {
  var ctrl = this
  ctrl.download = download
  ctrl.upload = upload
  ctrl.services = BulkTaskService.index

  function download(service) {
    CsvService.export(service.example)
      .then(function(data) {
        DownloadService.download(data, service.task + '.example.csv')
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
  }

  function upload(file) {
    BulkImportService.open(file.content)
  }
}
