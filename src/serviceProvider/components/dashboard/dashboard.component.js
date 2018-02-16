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
    ctrl.back = Route.open('serviceProviders')
    ctrl.isAdmin = ACL.has('Provisioning')

    function onInit() {
      ctrl.loading = true
      return ServiceProviderDashboardService.load(ctrl.serviceProviderId)
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
      _cards.forEach(ServiceProviderDashboardService.prepareCard)
      ctrl.cards = _cards
    }

    // always return a new set
    function cards() {
      var route = Route.path('serviceProviders', ctrl.serviceProviderId)
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
          name: 'Bulk Provisioning',
          module: 'Provisioning',
          path: '/bulk'
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
          path: route('enterpriseTrunks'),
          isEnterprise: true
        },
        {
          type: 'provisioning',
          name: 'Delete Service Provider',
          path: route('delete'),
          admin: true
        },
        {
          type: 'provisioning',
          name: 'Numbers',
          path: route('numbers'),
          admin: true
        },
        {
          type: 'provisioning',
          name: 'Devices',
          path: route('devices'),
          admin: true
        },
        {
          type: 'provisioning',
          name: 'Service Packs',
          path: route('servicePacks'),
          admin: true
        },
        {
          type: 'provisioning',
          name: 'User Services',
          path: route('userServices'),
          admin: true
        },
        {
          type: 'provisioning',
          name: 'Group Services',
          path: route('groupServices'),
          admin: true
        }
      ]
    }
  }
})()
