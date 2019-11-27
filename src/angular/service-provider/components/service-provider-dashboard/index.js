import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderDashboard', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderDashboardService',
  'Route',
  'ACL'
]
function controller(Alert, ServiceProviderDashboardService, Route, ACL) {
  var ctrl = this

  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    ctrl.isPaasAdmin = ACL.isPaasAdmin() && ACL.is('Service Provider')
    return ServiceProviderDashboardService.load(ctrl.serviceProviderId)
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
    _cards.forEach(ServiceProviderDashboardService.prepareCard)
    ctrl.cards = _cards
  }

  // always return a new set
  function cards() {
    var route = Route.path('serviceProviders', ctrl.serviceProviderId)
    var baseRoute = Route.path()
    return [
      {
        type: 'management',
        name: 'Business Profile',
        path: route('profile')
      },
      {
        type: 'management',
        name: 'Directory',
        path: route('directory')
      },
      {
        type: 'management',
        name: 'Groups',
        path: route('groups')
      },
      {
        type: 'management',
        name: 'Administrators',
        path: route('admins')
      },
      {
        type: 'management',
        name: 'Network Class of Service',
        path: route('networkClassOfServices')
      },
      {
        type: 'service',
        service: 'Meet-Me Conferencing',
        path: route('meetMe')
      },
      {
        type: 'service',
        name: 'Enterprise Trunk',
        service: 'Trunk Group',
        isEnterprise: true,
        path: route('enterpriseTrunks')
      },
      {
        type: 'provisioning',
        name: 'Audits',
        module: 'Audit',
        path: '/audits'
      },
      {
        type: 'provisioning',
        name: 'Bulk Provisioning',
        module: 'Provisioning',
        path: '/bulk'
      },
      {
        type: 'provisioning',
        name: 'Delete Service Provider',
        path: route('delete'),
        acl: 'Reseller'
      },
      {
        type: 'provisioning',
        name: 'Numbers',
        path: route('numbers')
      },
      {
        type: 'provisioning',
        name: 'Devices',
        path: route('devices'),
        acl: 'Reseller'
      },
      {
        type: 'provisioning',
        name: 'Service Packs',
        path: route('servicePacks'),
        module: 'Service Packs'
      },
      {
        type: 'provisioning',
        name: 'User Services',
        path: route('userServices')
      },
      {
        type: 'provisioning',
        name: 'Group Services',
        path: route('groupServices')
      },
      {
        type: 'report',
        module: 'User Report',
        path: route('reports', 'users')
      },
      {
        type: 'report',
        name: 'Trunk Call Capacity',
        module: 'User Report',
        path: route('reports', 'callCapacity')
      },
      {
        type: 'odin',
        name: 'Branding',
        acl: 'PaaS Admin',
        path: baseRoute('branding')
      },
      {
        type: 'odin',
        name: 'Event History',
        acl: 'PaaS Admin',
        path: baseRoute('events')
      },
      {
        type: 'odin',
        name: 'Webhook History',
        acl: 'PaaS Admin',
        path: baseRoute('webhooks')
      },
      {
        type: 'odin',
        name: 'Settings',
        acl: 'PaaS Admin',
        path: baseRoute('settings')
      }
    ]
  }
}
