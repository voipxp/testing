;(function() {
  angular.module('odin.group').component('autoAttendants', {
    templateUrl:
      'group/components/autoAttendants/autoAttendants.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    GroupAutoAttendantService,
    Route,
    $scope,
    $q,
    GroupPolicyService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.add = add
    ctrl.onCreate = onCreate
    ctrl.toggle = toggle
    ctrl.clone = clone

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadAutoAttendants(), GroupPolicyService.load()])
        .then(function() {
          ctrl.canCreate = GroupPolicyService.enhancedServiceCreate()
          console.log('ctrl.canCreate', ctrl.canCreate)
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })

      // return loadAutoAttendants()
      //   .catch(function(error) {
      //     Alert.notify.danger(error)
      //   })
      //   .finally(function() {
      //     ctrl.loading = false
      //   })
    }

    function loadAutoAttendants() {
      return GroupAutoAttendantService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.autoAttendants = data
      })
    }

    function open(autoAttendant) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'autoAttendants',
        'autoAttendant'
      ).search({ serviceUserId: autoAttendant.serviceUserId })
    }

    function toggle(service) {
      service.isLoading = true
      GroupAutoAttendantService.status(service)
        .then(loadAutoAttendants)
        .then(function() {
          if (service.isActive) {
            Alert.notify.success('Service Enabled')
          } else {
            Alert.notify.warning('Service Disabled')
          }
        })
        .catch(function(error) {
          service.isActive = !service.isActive
          Alert.notify.danger(error)
        })
    }

    function add() {
      $scope.$broadcast('autoAttendantCreate:load')
    }

    function clone() {
      $scope.$broadcast('groupCloneAutoAttendant:load')
    }

    function onCreate(event) {
      open(event.autoAttendant)
    }
  }
})()
