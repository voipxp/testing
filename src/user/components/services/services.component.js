;(function() {
  angular.module('odin.user').component('userServices', {
    templateUrl: 'user/components/services/services.component.html',
    controller: Controller,
    bindings: { serviceType: '@', userId: '<' }
  })

  function Controller(Alert, UserServiceService, $filter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.toggle = toggle
    ctrl.filterService = filterService

    function onInit() {
      ctrl.title = $filter('humanize')(ctrl.serviceType)
      ctrl.loading = true
      return loadServices()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function filterService(item) {
      if (item.isLoading) return true
      if (!ctrl.filter) return true
      if (ctrl.filter === 'assigned') return item.assigned
      if (ctrl.filter === 'unassigned') return !item.assigned
    }

    function loadServices() {
      return UserServiceService.show(ctrl.userId).then(function(data) {
        ctrl.services = data[ctrl.serviceType]
      })
    }

    function toggle(service) {
      console.log('toggle', service)
      service.isLoading = true

      // format as an array to fit API requirements
      var singleService = {}
      singleService[ctrl.serviceType] = [service]

      // Update service
      UserServiceService.update(ctrl.userId, singleService)
        .then(function() {
          var message = service.assigned ? 'Assigned' : 'Unassigned'
          var action = service.assigned
            ? Alert.notify.success
            : Alert.notify.warning
          action(service.serviceName + ' ' + message)
        })
        .catch(function(error) {
          console.log('error', error.data)
          Alert.notify.danger(error)
          service.assigned = !service.assigned
        })
        .finally(function() {
          service.isLoading = false
        })
    }
  }
})()
