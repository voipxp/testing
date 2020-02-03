import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkDashboard', {
  template,
  controller
})

controller.$inject = [
  'BulkTaskService',
  '$location',
  'ServiceProviderPolicyService'
]
function controller(BulkTaskService, $location, ServiceProviderPolicyService) {
  var ctrl = this
  ctrl.open = open
  ctrl.openCsv = openCsv
  ctrl.canCreateUser = ServiceProviderPolicyService.userCreate()
  ctrl.services = filterByPolicy(BulkTaskService.index)


  function open(service) {
    $location.path(`bulk/${service.task}`)
  }

  function openCsv() {
    $location.path('bulk/csv')
  }

  function filterByPolicy(services) {
    return (services = services.filter(service => {
      if (service.task === 'user.create' && !ctrl.canCreateUser) return false
      if (service.task === 'user.delete' && !ctrl.canCreateUser) return false

      /* temporarily hiding the task*/
      if (service.task === 'service.provider.bulk.clone') return false
      if (service.task === 'group.bulk.clone') return false
      if (service.task === 'group.device.tag.modify') return false

      return true
    }))
  }
}
