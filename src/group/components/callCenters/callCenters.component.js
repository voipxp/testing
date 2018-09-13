;(function() {
  angular.module('odin.group').component('groupCallCenters', {
    templateUrl: 'group/components/callCenters/callCenters.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Route,
    Alert,
    GroupCallCenterService,
    $scope
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.add = add
    ctrl.onSave = onSave
    ctrl.$onInit = activate
    ctrl.toggle = toggle

    function activate() {
      ctrl.canCreate = ctrl.module.permissions.create
      ctrl.loading = true
      loadCallCenters()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadCallCenters() {
      return GroupCallCenterService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.centers = data
        console.log('centers', data)
        return data
      })
    }

    function onSave(center) {
      open(center.serviceUserId)
    }

    function open(obj) {
      var serviceUserId = (obj && obj.serviceUserId) || obj
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callCenters',
        serviceUserId
      )
    }

    function add() {
      $scope.$broadcast('groupCallCenterCreate:load')
    }

    function toggle(service) {
      service.isLoading = true
      GroupCallCenterService.status(service)
        .then(loadCallCenters)
        .then(function() {
          if (service.isActive) {
            Alert.notify.success('Service Enabled')
          } else {
            Alert.notify.warning('Service Disabled')
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
