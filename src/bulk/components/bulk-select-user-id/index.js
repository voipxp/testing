import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectUserId', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    userId: '<',
    domain: '<',
    userCount: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['EventEmitter', 'GroupDomainService', 'Alert']
function controller(EventEmitter, GroupDomainService, Alert) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.complete = complete

  function onInit() {
    ctrl.loading = true
    ctrl.userIdPrefix = stripDomain(ctrl.userId)
    loadDomains()
      .then(function() {
        if (!ctrl.domain) {
          ctrl.domain = ctrl.domains.default
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function hasDomain(userId) {
    var templateRegex = /@{{\s?domain\s?}}$/
    var domainRegex = /@([A-Za-z0-9_\-.])+\.([a-zA-Z])+$/
    return templateRegex.test(userId) || domainRegex.test(userId)
  }

  function appendDomain(userId) {
    return hasDomain(userId) ? userId : userId + '@{{ domain }}'
  }

  function stripDomain(userId) {
    return hasDomain(userId) ? userId.split('@')[0] : userId
  }

  function loadDomains() {
    return GroupDomainService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.domains = data
        return data
      }
    )
  }

  function complete() {
    var userId = appendDomain(ctrl.userIdPrefix)
    ctrl.onUpdate(EventEmitter({ userId: userId, domain: ctrl.domain }))
  }
}
