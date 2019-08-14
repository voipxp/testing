import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderPhoneDirectory', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderPhoneDirectoryService',
  'CsvService',
  'DownloadService'
]
function controller(Alert, ServiceProviderPhoneDirectoryService, CsvService, DownloadService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onPagination = onPagination
  ctrl.download = download

  ctrl.columns = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'userId',
      label: 'User ID'
    },
    {
      key: 'number',
      label: 'Phone Number'
    },
    {
      key: 'extension',
      label: 'Extension'
    },
    {
      key: 'department',
      label: 'Department'
    },
    {
      key: 'groupId',
      label: 'Group ID'
    }
  ]

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function onInit() {
    ctrl.loading = true
    loadDirectory()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function download() {
    var now = new Date()
    var filename = ctrl.serviceProviderId + '-directory-' + now.toJSON() + '.csv'
    CsvService.export(ctrl.users)
      .then(function(data) {
        DownloadService.download(data, filename)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
  }

  function loadDirectory() {
    return ServiceProviderPhoneDirectoryService.show(ctrl.serviceProviderId).then(function(data) {
      ctrl.users = data
    })
  }
}
