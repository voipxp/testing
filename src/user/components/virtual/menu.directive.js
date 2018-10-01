;(function() {
  angular.module('odin.user').directive('virtualUserMenu', Directive)

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'user/components/virtual/menu.directive.html',
      transclude: true,
      scope: {},
      controller: Controller,
      controllerAs: '$ctrl',
      bindToController: {
        serviceProviderId: '<',
        groupId: '<',
        userId: '<',
        module: '<'
      }
    }

    function Controller(Alert, Module, ACL) {
      var ctrl = this
      ctrl.$onInit = onInit

      function onInit() {
        ctrl.hasAnnouncements = ACL.hasVersion('20')
        ctrl.loading = true
        Module.load()
          .then(loadPermissions)
          .catch(Alert.notify.danger)
          .finally(function() {
            ctrl.loading = false
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
        ctrl.showBasicCallLogs = Module.read('Basic Call Logs')
        ctrl.showAssignServices = Module.read('Provisioning')
        ctrl.showReporting =
          ctrl.showBasicCallLogs ||
          ctrl.showCallRecords ||
          ctrl.showAutoAttendantReport ||
          ctrl.showCallCenterReport
      }
    }
  }
})()
