import angular from 'angular'
import template from './index.html'

angular.module('odin.common').directive('virtualUserMenu', Directive)

function Directive() {
  return {
    restrict: 'E',
    template,
    controller,
    transclude: true,
    scope: {},
    controllerAs: '$ctrl',
    bindToController: {
      serviceProviderId: '<',
      groupId: '<',
      userId: '<',
      module: '<'
    }
  }
}

controller.$inject = ['Alert', 'Module', 'UserServiceService', 'ACL']
function controller(Alert, Module, UserServiceService, ACL) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.hasAnnouncements = ACL.hasVersion('20')
    ctrl.loading = true
    Module.load()
      .then(loadServices)
      .then(loadPermissions)
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadServices() {
    return UserServiceService.assigned(ctrl.userId).then(data => {
      ctrl.services = (data.userServices || []).map(s => s.serviceName)
    })
  }

  function loadPermissions() {
    if (ctrl.module.name === 'Meet-Me Conferencing') {
      ctrl.isMeetMe = true
    }
    if (ctrl.module.name === 'Auto Attendant') {
      ctrl.showAutoAttendantReport = Module.read('Auto Attendant Report')
      ctrl.autoAttendantReportAlias = Module.alias('Auto Attendant Report')
    }
    if (ctrl.module.name === 'Call Center') {
      ctrl.showCallCenterReport = Module.read('Premium Call Records')
    }
    ctrl.showCallRecords = Module.read('Premium Call Records')
    ctrl.showBasicCallLogs =
      ctrl.services.includes('Basic Call Logs') &&
      Module.read('Basic Call Logs')
    ctrl.showAssignServices = Module.read('Provisioning')
    ctrl.showReporting =
      ctrl.showBasicCallLogs ||
      ctrl.showCallRecords ||
      ctrl.showAutoAttendantReport ||
      ctrl.showCallCenterReport
    if (ctrl.module.name === 'Flexible Seating Guest') {
      ctrl.isMeetMe = false
      ctrl.hasAnnouncements = false
      ctrl.showCallRecords = false
      ctrl.showReporting = false
    }
  }
}
