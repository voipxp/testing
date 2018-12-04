;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderGroups', {
    templateUrl: 'serviceProvider/components/groups/groups.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    GroupService,
    Route,
    $routeParams,
    $scope,
    $q,
    ServiceProviderPolicyService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.clone = clone
    ctrl.onCreate = onCreate
    ctrl.open = open
    ctrl.onPagination = onPagination
    ctrl.serviceProviderId = $routeParams.serviceProviderId

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      return $q
        .all([loadGroups(), ServiceProviderPolicyService.load()])
        .then(function() {
          ctrl.canCreate = ServiceProviderPolicyService.profileUpdate()
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })

      // ctrl.loading = true
      // loadGroups()
      //   .catch(function(error) {
      //     Alert.notify.danger(error)
      //   })
      //   .finally(function() {
      //     ctrl.loading = false
      //   })
    }

    function loadGroups() {
      return GroupService.index(ctrl.serviceProviderId).then(function(data) {
        ctrl.groups = data
        return data
      })
    }

    function clone() {
      $scope.$broadcast('groupClone:load')
    }

    function add() {
      $scope.$broadcast('groupCreate:load')
    }

    function onCreate(event) {
      open(event.group)
    }

    function open(group) {
      Route.open('groups', ctrl.serviceProviderId, group.groupId)
    }
  }
})()
