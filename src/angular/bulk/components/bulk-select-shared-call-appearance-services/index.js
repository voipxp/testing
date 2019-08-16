import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectSharedCallAppearanceServices', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    userCount: '<',
    endpointCount: '<',
    services: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['Alert', '$scope', '$q', 'ServiceProviderServicePackService', 'EventEmitter']
function controller(Alert, $scope, $q, ServiceProviderServicePackService, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select
  ctrl.onSelect = onSelect
  ctrl.canComplete = canComplete
  ctrl.next = next
  ctrl.clear = clear

  ctrl.serviceTypes = {
    userServices: 'User Services',
    servicePackServices: 'Service Packs'
  }

  function onInit() {
    ctrl.endpointCount = ctrl.endpointCount || 0
    ctrl.actions = {
      userServices: 'skip',
      servicePackServices: 'skip'
    }
    ctrl.services = ctrl.services || {}
    ctrl.services.userServices = ctrl.services.userServices || []
    ctrl.services.servicePackServices = ctrl.services.servicePackServices || []
    setMaxEndpoints()
  }

  function clear(type) {
    ctrl.services[type] = []
  }

  function select(type, action) {
    var data = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      count: ctrl.userCount,
      services: ctrl.services[type],
      type: type,
      action: action.toLowerCase()
    }
    if (type === 'userServices') {
      data.filter = 'Shared Call Appearance'
    }
    $scope.$broadcast('bulkSelectServices:load', data)
  }

  function onSelect(event) {
    ctrl.services[event.type] = event.services
    loadServices()
  }

  function canComplete() {
    return ctrl.maxEndpoints >= ctrl.endpointCount
  }

  function loadServices() {
    if (ctrl.services.servicePackServices.length > 0) {
      Alert.spinner.open()
    }
    return $q
      .all(ctrl.services.servicePackServices.map(loadServicePack))
      .then(function(data) {
        var userServices = _.map(ctrl.services.userServices, 'serviceName')
        return _.uniq(_.flatten(_.concat(userServices, data)))
      })
      .then(function(services) {
        setMaxEndpoints(services)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function loadServicePack(service) {
    return ServiceProviderServicePackService.show(ctrl.serviceProviderId, service.serviceName).then(
      function(data) {
        // just return the names of services
        return _.map(data.userServices || [], 'serviceName')
      }
    )
  }

  // get the number of endpoints based on the number
  // of SCA licenses
  function setMaxEndpoints(services) {
    // pull out the number of licenses
    var licenses = _.filter(services, function(service) {
      return /Shared Call Appearance/.exec(service)
    }).map(function(sca) {
      var number = parseInt(sca.replace(/[^\d]/g, '') || 1, 10)
      return number
    })
    ctrl.maxEndpoints = _.max(licenses) || 0
  }

  function next() {
    ctrl.onUpdate(EventEmitter(ctrl.services))
  }
}
