;(function() {
  angular.module('odin.group').component('groupHuntGroups', {
    templateUrl: 'group/components/huntGroups/huntGroups.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    GroupHuntGroupService,
    Route,
    $routeParams,
    $scope
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.toggle = toggle
    ctrl.add = add
    ctrl.onCreate = onCreate

    function onInit() {
      ctrl.loading = true
      loadHuntGroups()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadHuntGroups() {
      return GroupHuntGroupService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.huntGroups = data
      })
    }

    function toggle(service) {
      service.isLoading = true
      GroupHuntGroupService.status(service)
        .then(loadHuntGroups)
        .then(function() {
          if (service.isActive) {
            Alert.notify.success('Service Enabled')
          } else {
            Alert.notify.warning('Service Disabled')
          }
        })
        .catch(Alert.notify.danger)
    }

    function open(huntgroup) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'huntGroups',
        huntgroup.serviceUserId
      )()
    }

    function add() {
      $scope.$broadcast('groupHuntGroupCreate:load')
    }

    function onCreate(event) {
      open(event.huntGroup)
    }
  }
})()
