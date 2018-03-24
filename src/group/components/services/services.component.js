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
    ServiceProviderService,
    ReplicateGroupServiceService,
    GroupService,
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.hasPermission = ACL.has

    ctrl.isServicePackServices = isServicePackServices
    ctrl.isGroupServices = isGroupServices
    ctrl.isUserServices = isUserServices
    ctrl.clone = clone
    ctrl.selectServiceProvider = selectServiceProvider
    ctrl.selectGroup = selectGroup
    ctrl.quantity = function(value) {
      return value === -1 ? 'Unlimited' : value
    }
    ctrl.showServiceProviderTable = showServiceProviderTable
    ctrl.showGroupTable = showGroupTable

    function onInit() {
      ctrl.spTable = true
      ctrl.groupTable = true
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
    function showServiceProviderTable() {
      ctrl.spTable = true
      ctrl.cloneGroupId = ''
      ctrl.groups = ''
      ctrl.cloneServices = ''
    }
    function showGroupTable() {
      ctrl.groupTable = true
      ctrl.cloneServices = ''
    }

    function clone() {
      ctrl.spTable = true
      ctrl.groupTable = true
      ctrl.assignment = {}
      ctrl.serviceProviderClone = ''
      ctrl.cloneGroupId = ''
      ctrl.groups = ''
      ctrl.serviceProviders = ''
      ctrl.cloneServices = ''
      loadServiceProviders().then(function() {
        Alert.modal.open('cloneServicePackModal', function(close) {
          replicate(close)
        })
      })
    }

    function replicate(callback) {
      Alert.spinner.open()
      var obj = {
        toServiceProviderId: ctrl.serviceProviderId,
        toGroupId: ctrl.groupId
      }
      ReplicateGroupServiceService.store(
        ctrl.cloneServiceProviderId,
        ctrl.cloneGroupId,
        obj
      )
        .then(GroupServiceService.clearCache)
        .then(loadServices)
        .then(function() {
          Alert.notify.success('Service Packs Reconciled')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function selectServiceProvider(serviceProviderId) {
      ctrl.cloneServiceProviderId = serviceProviderId
      ctrl.cloneGroupId = ''
      ctrl.cloneServices = ''
      ctrl.spTable = false
      ctrl.groupTable = true
      loadGroups(serviceProviderId).then(function() {
        // console.log(response)
      })
    }
    function selectGroup(groupId) {
      ctrl.cloneGroupId = groupId
      ctrl.spTable = false
      ctrl.groupTable = false
      ctrl.cloneServices = ''
      loadCloneServicePacks().then(function() {
        // console.log(response)
      })
    }

    function loadGroups(serviceProviderId) {
      return GroupService.index(serviceProviderId).then(function(data) {
        ctrl.groups = data
      })
    }

    function loadCloneServicePacks() {
      return GroupServiceService.show(
        ctrl.cloneServiceProviderId,
        ctrl.cloneGroupId
      ).then(function(data) {
        ctrl.cloneServices = filterServices(data['servicePackServices'])
      })
    }
    function loadServiceProviders() {
      return ServiceProviderService.index().then(function(data) {
        ctrl.serviceProviders = data
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
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
