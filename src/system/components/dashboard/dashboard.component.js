;(function() {
  angular.module('odin.system').component('systemDashboard', {
    templateUrl: 'system/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller(Route, ProvisioningDashboardService, Alert) {
    var ctrl = this
    var route = Route.path()
    ctrl.open = open

    ctrl.$onInit = function() {
      ctrl.loading = true
      return ProvisioningDashboardService.load()
        .then(loadCards)
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadCards() {
      var _cards = cards()
      _cards.forEach(ProvisioningDashboardService.prepareCard)
      ctrl.cards = _cards
    }

    function cards() {
      return [
        {
          type: 'system',
          name: 'Devices',
          path: route('system', 'devices')
        },
        {
          type: 'system',
          name: 'License Reports',
          path: route('system', 'licensing')
        },
        {
          type: 'system',
          name: 'DN Reports',
          path: route('system', 'dn')
        },
        {
          type: 'services',
          name: 'Collaborate',
          path: route('system', 'collaborate')
        },
        {
          type: 'services',
          name: 'Network Class of Services',
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
      Route.open()(card.path)
    }
  }
})()
