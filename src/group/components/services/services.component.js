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
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    ctrl.isServicePackServices = isServicePackServices
    ctrl.isGroupServices = isGroupServices
    ctrl.isUserServices = isUserServices
    ctrl.clone = clone
    ctrl.onClone = onInit
    ctrl.toggleUnlimited = toggleUnlimited

    ctrl.quantity = function(value) {
      return value === -1 ? 'Unlimited' : value
    }

    function onInit() {
      ctrl.canClone = ACL.has('Service Provider')
      ctrl.filter = {}
      ctrl.title = $filter('humanize')(ctrl.serviceType)
      ctrl.loading = true
      return loadServices()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadServices() {
      return GroupServiceService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.services = filterServices(data[ctrl.serviceType])
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

    function edit(service) {
      ctrl.editService = angular.copy(service)
      // fix when a service has been limited but was set at -1 prior
      if (service.allowed !== -1 && service.quantity === -1) {
        ctrl.editService.quantity = service.allowed
      }
      ctrl.editService.isUnlimited = ctrl.editService.quantity === -1
      Alert.modal.open('editGroupService', function onSave(close) {
        var runUpdate = function() {
          update(ctrl.editService, close)
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

    function toggleUnlimited(service) {
      service.quantity = service.isUnlimited ? -1 : 1
    }

    function clone() {
      $scope.$broadcast('groupCloneServices:load')
    }

    function update(service, callback) {
      Alert.spinner.open()

      // format as an array to fit API requirements
      var singleService = {}
      singleService[ctrl.serviceType] = [service]

      // Update service
      GroupServiceService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        singleService
      )
        .then(loadServices)
        .then(function() {
          Alert.notify.success('Service Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          console.log('error', error.data)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
