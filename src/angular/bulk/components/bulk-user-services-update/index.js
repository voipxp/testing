import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserServicesUpdate', {
  template,
  controller
})

controller.$inject = ['BulkImportService', '$scope', '$window']
function controller(BulkImportService, $scope, $window) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select
  ctrl.onSelect = onSelect
  ctrl.onSelectUsers = onSelectUsers
  ctrl.canComplete = canComplete
  ctrl.complete = complete
  ctrl.clear = clear
  ctrl.task = ctrl.serviceTypes = {
    userServices: 'User Services',
    servicePackServices: 'Service Packs'
  }
  ctrl.goBack = goBack
  ctrl.data = { users: [] }

  function onSelectUsers(event) {
    ctrl.data = event
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
      return Object.assign(
        {
          task: 'user.services.update',
          userId: user.userId,
          serviceProviderId: user.serviceProviderId,
          groupId: user.groupId
        },
        ctrl.services
      )
    })
    // console.log(JSON.stringify(data, null, 2))
    BulkImportService.open(data)
  }

  function goBack() {
    $window.history.back()
  }
}
