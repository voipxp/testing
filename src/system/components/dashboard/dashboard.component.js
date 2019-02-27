;(function() {
  angular.module('odin.system').component('systemDashboard', {
    templateUrl: 'system/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller(Route, SystemDashboardService, Alert) {
    var ctrl = this
    var route = Route.path()
    ctrl.open = open

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
          type: 'provisioning',
          name: 'Branding',
          path: route('branding')
        },
        {
          type: 'provisioning',
          name: 'Bulk Provisioning',
          path: route('bulk')
        },
        {
          type: 'provisioning',
          name: 'Event History',
          path: route('events')
        },
        {
          type: 'provisioning',
          name: 'Webhook History',
          path: route('webhooks')
        },
        {
          type: 'provisioning',
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

    function open(card) {
      Route.open(card.path)
    }
  }
})()
