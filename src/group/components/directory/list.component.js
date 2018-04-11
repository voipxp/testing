;(function() {
  angular.module('odin.group').component('groupPhoneList', {
    templateUrl: 'group/components/directory/list.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupPhoneListService, $routeParams) {
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
      return GroupPhoneListService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.users = data
        console.log('users', data)
      })
    }
  }
})()
