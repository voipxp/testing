;(function() {
  angular.module('odin.system').component('systemDnSummary', {
    templateUrl: 'system/components/dn/summary.component.html',
    controller: Controller
  })

  function Controller(Alert, SystemDnService, CsvService, DownloadService) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.download = download

    ctrl.onPagination = onPagination

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.loading = true
      loadDnSummary()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDnSummary() {
      return SystemDnService.summary().then(function(data) {
        ctrl.summary = data
      })
    }

    function download() {
      var now = Sugar.Date.format(new Date(), '%Y-%m-%d')
      var filename = 'bw-dn-summary-' + now + '.csv'
      CsvService.export(ctrl.summary).then(function(csv) {
        DownloadService.download(csv, filename)
      })
    }
  }
})()
