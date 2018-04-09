;(function() {
  angular.module('odin.group').component('groupDeviceTypes', {
    templateUrl: 'group/components/deviceTypes/deviceTypes.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupDeviceTypeService, $routeParams, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    function onInit() {
      ctrl.loading = true
      loadDevices()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDevices() {
      return GroupDeviceTypeService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.devices = data
      })
    }

    function open(deviceType) {
      console.log('open', deviceType)
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'deviceTypes',
        deviceType
      )()
    }
  }
})()
