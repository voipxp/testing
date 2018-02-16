;(function() {
  angular.module('odin.bulk').component('bulkCsv', {
    templateUrl: 'bulk/components/csv/bulkCsv.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    BulkTaskService,
    BulkImportService,
    CsvService,
    DownloadService
  ) {
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
})()
