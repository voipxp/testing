import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('selectUserId', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    userId: '<',
    required: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['Alert', 'GroupDomainService', 'EventEmitter', '$timeout']
function controller(Alert, GroupDomainService, EventEmitter, $timeout) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.update = update

  function onInit() {
    ctrl.prefix = ''
    ctrl.suffix = ''
    ctrl.loading = true
    loadDomains()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onChanges(changes) {
    var userId = _.get(changes, 'userId.currentValue')
    if (_.isEmpty(userId)) return
    $timeout(function() {
      var split = userId.split('@')
      var prefix = split[0]
      var suffix = split[1]
      if (prefix && suffix) {
        ctrl.prefix = split[0]
        ctrl.suffix = split[1]
      }
    }, 0)
  }

  function loadDomains() {
    return GroupDomainService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.domains = data
        setDefaultDomain()
        return data
      }
    )
  }

  function update() {
    var prefix = ctrl.prefix || ''
    var suffix = ctrl.suffix || ''
    sendUpdate(prefix + '@' + suffix)
  }

  function setDefaultDomain() {
    ctrl.suffix = ctrl.suffix || _.get(ctrl, 'domains.default')
  }

  function sendUpdate(userId) {
    ctrl.onUpdate(EventEmitter({ userId: userId }))
  }
}
