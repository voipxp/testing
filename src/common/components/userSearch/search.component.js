;(function() {
  angular.module('odin.common').component('userSearch', {
    templateUrl: 'common/components/userSearch/search.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

  function Controller(
    Alert,
    UserSearchService,
    HashService,
    Route,
    $rootScope
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$doCheck = doCheck
    ctrl.search = search
    ctrl.onPagination = onPagination
    ctrl.select = select

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.modalId = HashService.guid()
      ctrl.type = 'userId'
    }

    function doCheck() {
      if (!ctrl.filter) {
        ctrl.users = null
      }
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

    function select(user) {
      Alert.modal.close(ctrl.modalId)
      ctrl.filter = null
      ctrl.users = null
      Route.open('users')(user.serviceProviderId, user.groupId, user.userId)
    }

    $rootScope.$on('userSearch:load', function() {
      ctrl.filter = null
      ctrl.users = null
      Alert.modal.open(ctrl.modalId)
    })
  }
})()
