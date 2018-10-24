;(function() {
  angular.module('odin.provisioning').component('provisioningDashboard', {
    templateUrl: 'provisioning/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller(Route, Alert, ProvisioningDashboardService) {
    var ctrl = this
    var route = Route.path()

    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      return ProvisioningDashboardService.load()
        .then(loadCards)
        .catch(function(error) {
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
          name: 'Branding',
          path: route('branding')
        },
        {
          name: 'Bulk Provisioning',
          path: route('bulk')
        },
        {
          name: 'Event History',
          path: route('events')
        },
        {
          name: 'Webhook History',
          path: route('webhooks')
        },
        {
          name: 'Settings',
          path: route('settings')
        },
        {
          name: 'Service Providers',
          path: route('serviceProviders')
        },
        {
          module: 'VDM',
          path: route('vdm')
        }
      ]
    }
  }
})()
