;(function() {
  function acl(type) {
    return function(ACL) {
      'ngInject'
      return ACL.allow(type)
    }
  }
  function module(name) {
    return function(Module) {
      'ngInject'
      return Module.allow(name)
    }
  }
  function path() {
    var prefixes = Array.prototype.slice.call(arguments)
    prefixes.unshift('/serviceProviders/:serviceProviderId')
    return prefixes.join('/')
  }

  angular.module('odin.serviceProvider', [])
  angular
    .module('odin.serviceProvider')
    .config(function routeConfig($routeProvider) {
      $routeProvider
        .when(path(), {
          template: '<service-provider-dashboard></service-provider-dashboard>',
          resolve: {
            acl: acl('Service Provider')
          }
        })
        .when(path('profile'), {
          template: '<service-provider-profile></service-provider-profile>',
          resolve: {
            acl: acl('Service Provider')
          }
        })
        .when(path('groups'), {
          template:
            '<service-provider-groups-index></service-provider-groups-index>',
          resolve: {
            acl: acl('Service Provider')
          }
        })
        .when(path('admins'), {
          template: '<service-provider-admins></service-provider-admins>',
          resolve: {
            acl: acl('Service Provider')
          }
        })
        .when(path('directory'), {
          template:
            '<service-provider-phone-directory></service-provider-phone-directory>',
          resolve: {
            acl: acl('Service Provider')
          }
        })
        .when(path('enterpriseTrunks'), {
          template:
            '<enterprise-enterprise-trunks module="$resolve.module"></enterprise-enterprise-trunks>',
          resolve: {
            acl: acl('Service Provider'),
            module: module('Trunk Group')
          }
        })
        .when(path('enterpriseTrunks/:trunkName'), {
          template:
            '<enterprise-enterprise-trunk module="$resolve.module"></enterprise-enterprise-trunk>',
          resolve: {
            acl: acl('Service Provider'),
            module: module('Trunk Group')
          },
          reloadOnSearch: false
        })
        .when(path('meetMe'), {
          template:
            '<service-provider-meet-me module="$resolve.module"></service-provider-meet-me>',
          resolve: {
            acl: acl('Service Provider'),
            module: module('Meet-Me Conferencing')
          }
        })
        .when(path('numbers'), {
          template: '<service-provider-numbers></service-provider-numbers>',
          resolve: {
            acl: acl('Provisioning')
          }
        })
        .when(path('devices'), {
          template: '<service-provider-devices></service-provider-devices>',
          resolve: {
            acl: acl('Provisioning')
          }
        })
        .when(path('userServices'), {
          template:
            '<service-provider-services service-type="userServices"></service-provider-numbers>',
          resolve: {
            acl: acl('Provisioning')
          }
        })
        .when(path('groupServices'), {
          template:
            '<service-provider-services service-type="groupServices"></service-provider-numbers>',
          resolve: {
            acl: acl('Provisioning')
          }
        })
        .when(path('servicePacks'), {
          template:
            '<service-provider-service-packs></service-provider-service-packs>',
          resolve: {
            acl: acl('Provisioning')
          }
        })
        .when(path('servicePacks/:servicePackName'), {
          template:
            '<service-provider-service-pack></service-provider-service-pack>',
          resolve: {
            acl: acl('Provisioning')
          }
        })
        .when(path('delete'), {
          template: '<service-provider-delete></service-provider-delete>',
          resolve: {
            acl: acl('Provisioning')
          }
        })
        .when(path('networkClassOfServices'), {
          template:
            '<service-provider-network-class-of-services></service-provider-network-class-of-services>',
          resolve: {
            acl: acl('Service Provider')
          }
        })
    })
})()
