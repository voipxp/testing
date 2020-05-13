import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPhoneDirectory', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupPhoneDirectoryService', 'ACL']
function controller(Alert, GroupPhoneDirectoryService, ACL) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')
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
}
