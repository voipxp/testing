import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenter', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  '$routeParams',
  'Route',
  'Alert',
  'GroupCallCenterService',
  'UserServiceService',
  'ACL',
  'Module'
]
function controller(
  $routeParams,
  Route,
  Alert,
  GroupCallCenterService,
  UserServiceService,
  ACL,
  Module
) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.serviceUserId = $routeParams.serviceUserId
  ctrl.$onInit = activate
  ctrl.update = update
  ctrl.updateProfile = updateProfile
  ctrl.destroy = destroy
  ctrl.hasPermission = hasPermission
  ctrl.assigned = assigned
  ctrl.hasIncoming = hasIncoming
  ctrl.loadAssigned = loadAssigned

  function activate() {
    ctrl.loading = true
    ctrl.hasBasicBounced = ACL.hasVersion('20')
    ctrl.hasMonitoring = Module.read('Call Center Monitoring')
    loadAssigned()
      .then(loadCallCenter)
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadCallCenter() {
    return GroupCallCenterService.show(ctrl.serviceUserId).then(function(data) {
      ctrl.center = data
      return data
    })
  }

  function update(center, callback) {
    Alert.spinner.open()
    GroupCallCenterService.update(ctrl.serviceUserId, center)
      .then(loadCallCenter)
      .then(function() {
        Alert.notify.success('Call Center Updated')
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

  function destroy(callback) {
    Alert.spinner.open()
    GroupCallCenterService.destroy(ctrl.serviceUserId)
      .then(function() {
        Alert.notify.success('Call Center Removed')
        callback()
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'callCenters'
        )
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function updateProfile(event) {
    var editCenter = angular.copy(ctrl.center)
    editCenter.serviceInstanceProfile = event.profile
    update(editCenter, event.callback)
  }

  function hasPermission(attribute) {
    return GroupCallCenterService.hasPermission(ctrl.center, attribute)
  }

  function loadAssigned() {
    return UserServiceService.assigned(ctrl.serviceUserId)
      .then(mapServices)
      .then(function(data) {
        ctrl._assigned = data
      })
  }

  function mapServices(assigned) {
    var services = {}
    assigned.userServices.forEach(function(service) {
      services[service.serviceName] = true
    })
    return services
  }

  function assigned(name) {
    return !!ctrl._assigned[name]
  }

  function hasIncoming() {
    var services = [
      'Call Forwarding Always',
      'Call Forwarding Busy',
      'Calling Name Retrieval',
      'Call Forwarding Selective',
      'Priority Alert'
    ]
    return _.find(services, assigned)
  }
}
