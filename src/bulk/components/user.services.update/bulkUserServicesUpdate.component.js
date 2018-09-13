;(function() {
  angular.module('odin.bulk').component('bulkUserServicesUpdate', {
    templateUrl:
      'bulk/components/user.services.update/bulkUserServicesUpdate.component.html',
    controller: Controller,
    bindings: { data: '<' }
  })

  function Controller(BulkImportService, $scope) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.select = select
    ctrl.onSelect = onSelect
    ctrl.canComplete = canComplete
    ctrl.complete = complete
    ctrl.clear = clear
    ctrl.task = 'user.services.update'

    ctrl.serviceTypes = {
      userServices: 'User Services',
      servicePackServices: 'Service Packs'
    }

    function onInit() {
      ctrl.actions = {
        userServices: 'skip',
        servicePackServices: 'skip'
      }
      ctrl.services = {
        userServices: [],
        servicePackServices: []
      }
    }

    function clear(type) {
      ctrl.services[type] = []
    }

    function select(type, action) {
      $scope.$broadcast('bulkSelectServices:load', {
        serviceProviderId: ctrl.data.serviceProviderId,
        groupId: ctrl.data.groupId,
        count: ctrl.data.users.length,
        services: ctrl.services[type],
        type: type,
        action: action.toLowerCase()
      })
    }

    function onSelect(event) {
      ctrl.services[event.type] = event.services
    }

    function canComplete() {
      return (
        ctrl.services.userServices.length > 0 ||
        ctrl.services.servicePackServices.length > 0
      )
    }

    function complete() {
      var data = ctrl.data.users.map(function(user) {
        return _.assign(
          {
            task: ctrl.task,
            userId: user.userId,
            serviceProviderId: user.serviceProviderId,
            groupId: user.groupId
          },
          ctrl.services
        )
      })
      console.log(JSON.stringify(data, null, 2))
      BulkImportService.open(data)
    }
  }
})()
