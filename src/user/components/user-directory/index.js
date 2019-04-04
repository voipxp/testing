import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userDirectory', {
  template,
  controller
})

controller.$inject = ['Alert', 'UserPhoneDirectoryService', '$routeParams']
function controller(Alert, UserPhoneDirectoryService, $routeParams) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.userId = $routeParams.userId

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
    return UserPhoneDirectoryService.show(ctrl.userId).then(function(data) {
      ctrl.users = data
    })
  }
}
