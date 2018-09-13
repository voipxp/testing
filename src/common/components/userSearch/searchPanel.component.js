;(function() {
  angular.module('odin.common').component('userSearchPanel', {
    templateUrl: 'common/components/userSearch/searchPanel.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

  function Controller(Alert, UserSearchService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$doCheck = doCheck
    ctrl.search = search
    ctrl.open = open
    ctrl.changeType = changeType

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
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.isLoading = false
        })
    }

    function changeType() {
      ctrl.users = null
    }

    function doCheck() {
      if (!ctrl.filter) {
        ctrl.users = null
      }
    }

    function open(user) {
      Route.open('users', user.serviceProviderId, user.groupId, user.userId)
    }
  }
})()
