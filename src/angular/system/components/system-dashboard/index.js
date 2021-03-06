import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('systemDashboard', {
  template,
  controller
})

controller.$inject = ['Route', 'SystemDashboardService', 'Alert', 'ACL']
function controller(Route, SystemDashboardService, Alert, ACL) {
  var ctrl = this
  var route = Route.path()
  ctrl.hasVersion22 = ACL.hasVersion('22')

  ctrl.$onInit = function() {
    ctrl.loading = true
    return SystemDashboardService.load()
      .then(loadCards)
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadCards() {
    var _cards = cards()
    _cards.forEach(SystemDashboardService.prepareCard)
    ctrl.cards = _cards
  }

  function cards() {
    return [
      {
        type: 'system',
        name: 'Devices',
        acl: 'System',
        path: route('system', 'devices')
      },
      {
        type: 'system',
        name: 'License Reports',
        acl: 'System',
        path: route('system', 'licensing')
      },
      {
        type: 'system',
        name: 'Service Pack Utilization Report',
        path: route('system', 'servicePackUtilizationReport')
      },
      {
        type: 'system',
        name: 'Service Utilization Report',
        path: route('system', 'systemServiceUtilizationReport')
      },
      {
        type: 'system',
        name: 'DN Reports',
        path: route('system', 'dn')
      },
      {
        type: 'system',
        name: 'Service Provider Report',
        path: route('system', 'serviceProvidersReport')
      },
      {
        type: 'system',
        name: 'Collaborate',
        acl: 'System',
        path: route('system', 'collaborate')
      },
      {
        type: 'system',
        name: 'Network Class of Services',
        acl: 'System',
        path: route('system', 'networkClassOfServices')
      },
      {
        type: 'provisioning',
        name: 'Service Providers',
        path: route('serviceProviders')
      },
      {
        type: 'odin',
        name: 'Audits',
        path: route('audits')
      },
      {
        type: 'odin',
        name: 'Migrate',
        path: route('exports')
      },
      {
        type: 'odin',
        name: 'Imports',
        path: route('imports')
      },
      {
        type: 'odin',
        name: 'Branding',
        path: route('branding')
      },
      {
        type: 'provisioning',
        name: 'Bulk Provisioning',
        path: route('bulk')
      },
      {
        type: 'odin',
        name: 'Event History',
        path: route('events')
      },
      {
        type: 'odin',
        name: 'Login History',
        path: route('events', 'logins')
      },
      {
        type: 'odin',
        name: 'Webhook History',
        path: route('webhooks')
      },
      {
        type: 'odin',
        name: 'Settings',
        path: route('settings')
      },
      {
        type: 'provisioning',
        module: 'VDM',
        path: route('vdm')
      }
    ]
  }
}
