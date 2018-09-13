;(function() {
  angular.module('odin.common').component('userSearchNav', {
    templateUrl: 'common/components/userSearch/searchNav.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

  function Controller(Alert, UserSearchService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.search = search
    ctrl.onPagination = onPagination
    ctrl.open = open

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.type = 'userId'
    }

    function search() {
      ctrl.isLoading = true
      var params = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      params[ctrl.type] = ctrl.filter
      UserSearchService.index(params)
        .then(function(data) {
          ctrl.users = data
          show()
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.isLoading = false
        })
    }

    function show() {
      if (ctrl.users.length < 1) {
        Alert.notify.warning('No Users Found')
        return
      }
      Alert.modal.open('UserSearchNavModal')
    }

    function open(user) {
      Alert.modal.close('UserSearchNavModal')
      ctrl.filter = null
      Route.open('users', user.serviceProviderId, user.groupId, user.userId)
    }
  }
})()
