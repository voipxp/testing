;(function() {
  angular.module('odin.group').component('groupUsersPanel', {
    templateUrl: 'group/components/users/usersPanel.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', limitTo: '<' }
  })

  function Controller(Alert, UserService, $scope, $location, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.add = add
    ctrl.bulk = bulk
    ctrl.onCreate = onCreate
    ctrl.onPagination = onPagination

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.loading = true
      loadUsers()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUsers() {
      return UserService.index(ctrl.serviceProviderId, ctrl.groupId).then(
        function(data) {
          ctrl.users = data
          return data
        }
      )
    }

    function add() {
      $scope.$broadcast('userCreate:load')
    }

    function bulk() {
      $location.path('/bulk/user.create').search({
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      })
    }

    function onCreate(event) {
      open({ item: event.user })
    }

    function open(event) {
      var user = event.item
      Route.open('users')(ctrl.serviceProviderId, ctrl.groupId, user.userId)
    }
  }
})()
