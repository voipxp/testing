import angular from 'angular'
import template from './index.html'
import Sugar from 'sugar-date'

angular.module('odin.system').component('systemServicePackUtilizationReport', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  'Alert',
  'SystemServicePackUtilization',
  'Route',
  '$location',
  'CsvService',
  'DownloadService'
]
function controller(
  Alert,
  SystemServicePackUtilization,
  Route,
  $location,
  CsvService,
  DownloadService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.settings = {}
  ctrl.download = download

  ctrl.columns = [
    {
      key: 'serviceProviderId',
      label: 'Service Provider ID'
    },
    {
      key: 'serviceProviderName',
      label: 'Service Provider Name'
    },
    {
      key: 'isEnterprise',
      label: 'Enterprise'
    },
    {
      key: 'groupId',
      label: 'Group Id'
    },
    {
      key: 'groupName',
      label: 'Group Name'
    },
    {
      key: 'servicePackName',
      label: 'Service Pack Name'
    },
    {
      key: 'assigned',
      label: 'Assigned'
    },
    {
      key: 'totalPacks',
      label: 'Total Packs'
    },
    {
      key: 'userLimit',
      label: 'User Limit'
    },
    {
      key: 'userCount',
      label: 'Users'
    }
  ]
  function onInit() {
    ctrl.loading = true
    loadServicePackReport()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }
  function loadServicePackReport() {
    return SystemServicePackUtilization.index().then(function(data) {
      ctrl.items = data
      return ctrl.items
    })
  }
  function onClick(item) {
    var returnTo = $location.url()
    Route.open('groups', item.serviceProviderId, item.groupId).search({
      returnTo: returnTo
    })
  }
  function download() {
    var now = Sugar.Date.format(new Date(), '%Y-%m-%d')
    var filename = 'odin-service-pack-summary-' + now + '.csv'
    CsvService.export(ctrl.items).then(function(csv) {
      DownloadService.download(csv, filename)
    })
  }
}
