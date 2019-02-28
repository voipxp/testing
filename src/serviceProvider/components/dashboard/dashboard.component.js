;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderDashboard', {
    templateUrl:
      'serviceProvider/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    ServiceProviderDashboardService,
    $routeParams,
    Route,
    ACL
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId

    function onInit() {
      ctrl.loading = true
      ctrl.isPaasAdmin = ACL.isPaasAdmin()
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
          name: 'Bulk Provisioning',
          module: 'Provisioning',
          path: '/bulk'
        },
        {
          type: 'provisioning',
          name: 'Delete Service Provider',
          path: route('delete'),
          acl: 'Provisioning'
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
          acl: 'Provisioning'
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
          type: 'system',
          name: 'Branding',
          isPaasAdmin: true,
          path: baseRoute('branding')
        },
        {
          type: 'system',
          name: 'Event History',
          isPaasAdmin: true,
          path: baseRoute('events')
        },
        {
          type: 'system',
          name: 'Webhook History',
          isPaasAdmin: true,
          path: baseRoute('webhooks')
        },
        {
          type: 'system',
          name: 'Settings',
          isPaasAdmin: true,
          path: baseRoute('settings')
        }
      ]
    }
  }
})()
