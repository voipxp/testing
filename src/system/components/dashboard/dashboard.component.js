;(function() {
  angular.module('odin.system').component('systemDashboard', {
    templateUrl: 'system/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller(Route, SystemLicensingService) {
    var ctrl = this
    var route = Route.path()
    ctrl.open = open

    ctrl.$onInit = function() {
      SystemLicensingService.show().then(function(data) {
        console.log('licensing', data)
      })
    }

    ctrl.cards = [
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
        name: 'Settings',
        path: route('settings')
      }
    ]

    function open(card) {
      Route.open()(card.path)
    }
  }
})()
