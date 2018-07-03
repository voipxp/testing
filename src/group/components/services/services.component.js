;(function() {
  angular.module('odin.group').component('groupServices', {
    templateUrl: 'group/components/services/services.component.html',
    controller: Controller,
    bindings: { serviceType: '@' }
  })

  function Controller(
    Alert,
    GroupServiceService,
    $routeParams,
    $filter,
    $scope,
    ACL,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.isServicePackServices = isServicePackServices
    ctrl.isGroupServices = isGroupServices
    ctrl.isUserServices = isUserServices
    ctrl.clone = clone
    ctrl.onClone = onInit
    ctrl.toggleUnlimited = toggleUnlimited

    ctrl.quantity = function(value) {
      return value === -1 ? 'Unlimited' : value
    }

    ctrl.columns = [
      { key: 'serviceName', label: 'Service' },
      { key: 'allowedView', label: 'Allowed' },
      { key: 'quantityView', label: 'Limit' },
      { key: 'usageView', label: 'Allocated' },
      { key: 'authorized', label: 'Authorized', type: 'boolean' }
    ]

    function onInit() {
      ctrl.filter = {}
      ctrl.title = $filter('humanize')(ctrl.serviceType)
      ctrl.loading = true
      return $q
        .all([loadServices(), loadPermissions()])
        .then(function() {
          if (isGroupServices()) {
            ctrl.columns.push({
              key: 'assigned',
              label: 'Assigned',
              type: 'boolean'
            })
          }
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    // TODO: Add a branding setting to disable assigning
    function loadPermissions() {
      ctrl.canUpdate = true
      ctrl.canClone = ACL.has('Service Provider')
      return $q.resolve()
    }

    function loadServices() {
      return GroupServiceService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        var services = filterServices(data[ctrl.serviceType])
        services.forEach(function(service) {
          service.allowedView = ctrl.quantity(service.allowed)
          service.quantityView = ctrl.quantity(service.quantity)
          service.usageView = ctrl.quantity(service.usage)
        })
        ctrl.services = services
      })
    }

    function filterServices(services) {
      if (isServicePackServices()) return services
      return _.filter(services, { licensed: true })
    }

    function isServicePackServices() {
      return ctrl.serviceType === 'servicePackServices'
    }

    function isGroupServices() {
      return ctrl.serviceType === 'groupServices'
    }

    function isUserServices() {
      return ctrl.serviceType === 'userServices'
    }

    function onClick(service) {
      if (!ctrl.canUpdate) return
      ctrl.editService = angular.copy(service)
      // fix when a service has been limited but was set at -1 prior
      if (service.allowed !== -1 && service.quantity === -1) {
        ctrl.editService.quantity = service.allowed
      }
      ctrl.editService.isUnlimited = ctrl.editService.quantity === -1
      Alert.modal.open('editGroupService', function onSave(close) {
        var runUpdate = function() {
          var singleService = {}
          singleService[ctrl.serviceType] = [ctrl.editService]
          update(singleService, close)
        }
        if (!ctrl.editService.authorized && service.authorized) {
          Alert.confirm
            .open('Are you sure you want to de-authorize this service?')
            .then(runUpdate)
        } else {
          runUpdate()
        }
      })
    }

    function onSelect(event) {
      ctrl.editService = { assigned: true, authorized: true, quantity: -1 }
      ctrl.editService.name = 'Edit ' + event.length + ' Services'
      Alert.modal.open('editGroupService', function onSave(close) {
        var services = {}
        services[ctrl.serviceType] = event.map(function(service) {
          return {
            serviceName: service.serviceName,
            assigned: ctrl.editService.assigned,
            authorized: ctrl.editService.authorized,
            quantity: ctrl.editService.quantity
          }
        })
        update(services, close)
      })
    }

    function toggleUnlimited(service) {
      service.quantity = service.isUnlimited ? -1 : 1
    }

    function clone() {
      $scope.$broadcast('groupCloneServices:load')
    }

    function update(service, callback) {
      console.log('UPDATE', service)
      Alert.spinner.open()
      GroupServiceService.update(ctrl.serviceProviderId, ctrl.groupId, service)
        .then(loadServices)
        .then(function() {
          Alert.notify.success('Service Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
