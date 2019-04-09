import angular from 'angular'
import template from './index.html'
import Sugar from 'sugar-date'

angular
  .module('odin.system')
  .component('systemLicensing', { template, controller })

controller.$inject = [
  'Alert',
  'SystemLicensingService',
  'CsvService',
  'DownloadService'
]
function controller(
  Alert,
  SystemLicensingService,
  CsvService,
  DownloadService
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.download = download

  function onInit() {
    ctrl.loading = true
    loadLicenses()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadLicenses() {
    return SystemLicensingService.show().then(function(data) {
      ctrl.licensing = data
      return mapLicenses(data)
    })
  }

  function mapLicenses(data) {
    var licenses = []
    data.userServices.forEach(function(item) {
      item.type = 'User Services'
      licenses.push(item)
    })
    data.subscribers.forEach(function(item) {
      item.type = 'Subscribers'
      licenses.push(item)
    })
    data.groupServices.forEach(function(item) {
      item.type = 'Group Services'
      licenses.push(item)
    })
    data.systemParameters.forEach(function(item) {
      item.type = 'System Parameters'
      licenses.push(item)
    })
    data.virtualServices.forEach(function(item) {
      item.type = 'Virtual Services'
      licenses.push(item)
    })
    ctrl.licenses = licenses
  }

  function download() {
    var now = Sugar.Date.format(new Date(), '%Y-%m-%d')
    var filename = 'bw-licensing-' + now + '.csv'
    CsvService.export(ctrl.licenses).then(function(csv) {
      DownloadService.download(csv, filename)
    })
  }
}
