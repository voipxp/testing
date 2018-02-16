;(function() {
  angular.module('odin.group').component('groupUsers', {
    templateUrl: 'group/components/users/users.component.html',
    controller: Controller
  })

  function Controller(
    $routeParams,
    Alert,
    UserService,
    $scope,
    $location,
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
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
      var returnTo = $location.absUrl()
      $location.path('/bulk/user.create').search({
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        returnTo: returnTo
      })
    }

    function onCreate(event) {
      open(event.user)
    }

    function open(user) {
      Route.open('users')(ctrl.serviceProviderId, ctrl.groupId, user.userId)
    }
  }
})()
