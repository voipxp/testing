import angular from 'angular'
import template from './index.html'
import gql from 'graphql-tag'

const USER_SERVICES_ASSIGNED = gql`
  query userServicesAssigned($userId: String!) {
    userServicesAssigned(userId: $userId) {
      _id
      userId
      userServices {
        serviceName
        isActive
      }
    }
  }
`

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

controller.$inject = ['Alert', 'Module', 'ACL', 'apollo']
function controller(Alert, Module, ACL, apollo) {
  const ctrl = this

  ctrl.$onInit = () => {
    ctrl.hasAnnouncements = ACL.hasVersion('20')
    ctrl.loading = true
    loadAssignedServices().then(services => {
      console.log('virtualUserMenu#loadAssignedServices', services)
      loadPermissions(services.userServices)
    })
  }

  function loadAssignedServices() {
    return apollo
      .query({
        query: USER_SERVICES_ASSIGNED,
        variables: { userId: ctrl.userId }
      })
      .then(({ data }) => data.userServicesAssigned)
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

    ctrl.showBasicCallLogs =
      services.includes('Basic Call Logs') && Module.read('Basic Call Logs')

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
