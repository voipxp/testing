import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectServices', {
  template,
  controller,
  bindings: {
    onUpdate: '&'
  }
})

controller.$inject = ['Alert', 'HashService', '$scope', 'EventEmitter', 'GroupServiceService', '$q']
function controller(Alert, HashService, $scope, EventEmitter, GroupServiceService, $q) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.toggle = toggle

  ctrl.serviceTypes = {
    userServices: 'User Services',
    servicePackServices: 'Service Packs'
  }

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function loadServices(serviceProviderId, groupId, type, current) {
    Alert.spinner.open()
    return GroupServiceService.show(serviceProviderId, groupId)
      .then(function(services) {
        return services[type]
      })
      .then(function(services) {
        return filterServices(services)
      })
      .then(function(services) {
        return mergeServices(services, current)
      })
      .then(function(services) {
        ctrl.services = services
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  // remove unauthorized services
  function filterServices(services) {
    return _.filter(services, function(service) {
      return service.authorized
    })
  }

  // map services to user format
  // set assigned based on selected
  function mergeServices(services, current) {
    return _.map(services, function(service) {
      return {
        serviceName: service.serviceName,
        alias: service.alias,
        assigned: isAssigned(current, service),
        available: isAvailable(service),
        tags: service.tags || []
      }
    })
  }

  function isAssigned(services, service) {
    return !!_.find(services, {
      serviceName: service.serviceName,
      assigned: true
    })
  }

  function isAvailable(service) {
    if (service.quantity === -1) return true
    var available = service.quantity - service.usage
    return available >= ctrl.count
  }

  function canToggle(service) {
    if (ctrl.action === 'remove') {
      return true
    } else if (ctrl.action === 'add') {
      return service.available
    } else if (ctrl.action === 'replace') {
      return service.assigned ? true : service.available
    }
  }

  function toggle(service) {
    if (canToggle(service)) {
      service.assigned = !service.assigned
    } else {
      Alert.notify.success('Not enough licenses to Select this Service')
    }
  }

  function open(action, type) {
    ctrl.modalTitle = _.capitalize(action) + ' ' + ctrl.serviceTypes[type]
    Alert.modal.open(ctrl.modalId, function(close) {
      sendUpdate(ctrl.services, close)
    })
  }

  function sendUpdate(services, callback) {
    var results = []
    if (ctrl.action === 'add') {
      // pull out only the assigned
      results = _.filter(services, { assigned: true })
    } else if (ctrl.action === 'remove') {
      // pull out the assigned, then reverse it
      results = _.filter(services, { assigned: true })
      results.forEach(function(service) {
        service.assigned = false
      })
    } else if (ctrl.action === 'replace') {
      // send everything
      results = services
    }
    callback()
    return ctrl.onUpdate(EventEmitter({ type: ctrl.type, services: normalize(results) }))
  }

  // clean up the data to only return the needed info
  function normalize(services) {
    return _.map(services, function(service) {
      return {
        serviceName: service.serviceName,
        assigned: String(service.assigned)
      }
    })
  }

  /*
   * Required params
   *
   * serviceproviderId: 'string'
   * groupId: 'string'
   * type: 'userServices|servicePackServices'
   * action: 'add|remove|replace'
   * services: []
   * count: integer
   */
  $scope.$on('bulkSelectServices:load', function(event, data) {
    ctrl.action = data.action || 'add'
    ctrl.type = data.type
    ctrl.count = data.count
    ctrl.filter = data.filter
    loadServices(data.serviceProviderId, data.groupId, data.type, data.services).then(function() {
      open(ctrl.action, ctrl.type)
    })
  })
}
