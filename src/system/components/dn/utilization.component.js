;(function() {
  angular.module('odin.system').component('systemDnUtilization', {
    templateUrl: 'system/components/dn/utilization.component.html',
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
      loadDnUtilization()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDnUtilization() {
      return SystemDnService.utilization().then(function(data) {
        ctrl.utilization = data
        console.log('utilization', data)
      })
    }

    function download() {
      var now = Sugar.Date.format(new Date(), '%Y-%m-%d')
      var filename = 'bw-dn-utilization-' + now + '.csv'
      CsvService.export(ctrl.utilization).then(function(csv) {
        DownloadService.download(csv, filename)
      })
    }
  }
})()
