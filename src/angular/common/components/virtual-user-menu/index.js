import angular from 'angular'
import template from './index.html'
import { USER_SERVICES_ASSIGNED_QUERY } from '@/graphql'

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

controller.$inject = ['Alert', 'Module', 'ACL', 'GraphQL']
function controller(Alert, Module, ACL, GraphQL) {
  const ctrl = this

  ctrl.$onInit = () => {
    ctrl.hasAnnouncements = ACL.hasVersion('20')
    ctrl.loading = true
    loadAssignedServices().then(services => loadPermissions(services))
  }

  function loadAssignedServices() {
    return GraphQL.query({
      query: USER_SERVICES_ASSIGNED_QUERY,
      variables: { userId: ctrl.userId }
    }).then(({ data }) => {
      return data.userServicesAssigned.userServices.map(s => s.serviceName)
    })
  }

  // Can we simplify this with UserPermissionService?
  function loadPermissions(services) {
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

    ctrl.showBasicCallLogs = services.includes('Basic Call Logs') && Module.read('Basic Call Logs')

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
    ctrl.loading = false
  }
}
