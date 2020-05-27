import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userQuickSet', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserPermissionService',
  'BrandingResourceService'
]
function controller(Alert, UserPermissionService, BrandingResourceService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    UserPermissionService.load(ctrl.userId)
      .then(function(permission) {
        ctrl.has = permission.read
      })
      .then(loadPermissions)
      .then(loadResources)
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPermissions() {
    var quickActions = [
      'Call Forwarding Always',
      'Call Forwarding Busy',
      'Call Forwarding No Answer',
      'Do Not Disturb',
      'Remote Office'
    ]
    ctrl.showQuick = _.find(quickActions, function(service) {
      return ctrl.has(service)
    })
  }
  function loadResources() {
    return BrandingResourceService.hostname(window.location.hostname).then(
      function(data) {
        ctrl.resources = data
      }
    )
  }
}
