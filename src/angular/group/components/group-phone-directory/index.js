import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPhoneDirectory', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupPhoneDirectoryService', 'ACL', 'CsvService', 'DownloadService']
function controller(Alert, GroupPhoneDirectoryService, ACL, CsvService, DownloadService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.isGroupAdmin = ACL.is('Group')
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')
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
      label: 'Number'
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

  function loadDirectory() {
    return GroupPhoneDirectoryService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.users = data
    })
  }

  function download() {
    var now = new Date()
    var filename =
      ctrl.serviceProviderId + '-' + ctrl.groupId + '-directory-' + now.toJSON() + '.csv'
      CsvService.export(ctrl.users)
      .then(function(data) {
        DownloadService.download(data, filename)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
  }
}
