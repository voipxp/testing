;(function() {
  angular.module('odin.group').component('groupPhoneDirectory', {
    templateUrl: 'group/components/directory/directory.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupPhoneDirectoryService, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

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

    function loadDirectory() {
      return GroupPhoneDirectoryService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.users = data
        console.log('users', data)
      })
    }
  }
})()
