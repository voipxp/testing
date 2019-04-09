import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupServices', {
  template,
  controller,
  bindings: { serviceType: '@' }
})

controller.$inject = [
  'Alert',
  'GroupServiceService',
  '$routeParams',
  '$filter',
  '$scope',
  'ACL',
  '$q',
  'Route'
]
function controller(
  Alert,
  GroupServiceService,
  $routeParams,
  $filter,
  $scope,
  ACL,
  $q,
  Route
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId

  ctrl.onClick = onClick
  ctrl.onUserClick = onUserClick
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
    { key: 'alias', label: 'Service' },
    { key: 'allowedView', label: 'Allowed' },
    { key: 'quantityView', label: 'Limit' },
    { key: 'usageView', label: 'Allocated' },
    { key: 'authorized', label: 'Authorized', type: 'boolean' }
  ]
  ctrl.serviceColumns = [
    { key: 'userId', label: 'User id' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'phoneNumber', label: 'phoneNumber' }
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
    return GroupServiceService.show(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        var services = filterServices(data[ctrl.serviceType])
        services.forEach(function(service) {
          service.allowedView = ctrl.quantity(service.allowed)
          service.quantityView = ctrl.quantity(service.quantity)
          service.usageView = ctrl.quantity(service.usage)
        })
        ctrl.services = services
      }
    )
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
  function loadGroupServiceAssigned(service) {
    var serviceType = ''
    var serviceName = ''
    if (isServicePackServices()) {
      serviceType = 'servicePackName'
      serviceName = service.servicePackName
    } else if (isUserServices()) {
      serviceType = 'serviceName'
      serviceName = service.serviceName
    }
    return GroupServiceService.assigned(
      ctrl.serviceProviderId,
      ctrl.groupId,
      serviceType,
      serviceName
    ).then(function(data) {
      ctrl.users = data.users
    })
  }
  function onUserClick(user) {
    open(user)
  }
  function open(user) {
    Route.open('users', ctrl.serviceProviderId, ctrl.groupId, user.userId)
  }

  function onClick(service) {
    if (!ctrl.canUpdate) return
    if (!isGroupServices()) {
      Alert.spinner.open()
      loadGroupServiceAssigned(service)
        .then(function() {
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
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          Alert.spinner.close()
        })
    } else {
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
