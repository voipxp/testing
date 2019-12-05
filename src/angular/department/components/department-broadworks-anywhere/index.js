import angular from 'angular'
import template from './index.html'

angular.module('odin.department').component('departmentBroadworksAnyWhere', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupPhoneDirectoryService']
function controller(Alert, GroupPhoneDirectoryService) {
  var ctrl = this
  ctrl.$onInit = onInit

  ctrl.columns = [
    {
      key: 'active',
      label: 'Active'
    },
    {
      key: 'name',
      label: 'Name'
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
      ctrl.anywhere = data
    })
  }
}
