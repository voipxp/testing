;(function() {
  angular.module('odin.user').component('userPhoneDirectory', {
    templateUrl: 'user/components/directory/directory.component.html',
    controller: Controller
  })

  function Controller(Alert, UserPhoneDirectoryService, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

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
      return UserPhoneDirectoryService.show(ctrl.userId).then(function(data) {
        ctrl.users = data
        console.log('users', data)
      })
    }
  }
})()
