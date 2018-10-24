;(function() {
  angular.module('odin.group').component('groupPhoneDirectory', {
    templateUrl: 'group/components/directory/directory.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupPhoneDirectoryService, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

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
})()
